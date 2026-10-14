import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { attemptId, answers } = body;

    if (!attemptId || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid submission data.' }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Fetch attempt and verify ownership & status
    const { data: attempt, error: attemptError } = await admin
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .eq('user_id', user.id)
      .single();

    if (attemptError || !attempt) {
      return NextResponse.json(
        { error: 'Quiz attempt not found or unauthorized.' },
        { status: 404 }
      );
    }

    if (attempt.claimed) {
      return NextResponse.json(
        { error: 'Rewards for this attempt have already been claimed.' },
        { status: 400 }
      );
    }

    // 2. Validate timing (allow 5 seconds network latency grace period)
    const now = new Date();
    const expiresAt = new Date(attempt.expires_at);
    const graceExpiry = new Date(expiresAt.getTime() + 5000);
    const isExpired = now > graceExpiry;

    // 3. Fetch questions with correct answers strictly on the server
    const questionIds = attempt.question_ids as string[];
    const { data: questions, error: qError } = await admin
      .from('quiz_questions')
      .select('id, question, options, correct_index')
      .in('id', questionIds);

    if (qError || !questions) {
      return NextResponse.json(
        { error: 'Unable to evaluate quiz questions.' },
        { status: 500 }
      );
    }

    const orderedQuestions = questionIds
      .map((id) => questions.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => !!q);

    // 4. Calculate score on server and prepare question-by-question review
    let correctCount = 0;
    const review: Array<{
      id: string;
      question: string;
      options: string[];
      userAnswerIndex: number | null;
      correctIndex: number;
      isCorrect: boolean;
    }> = [];

    if (!isExpired) {
      for (const q of orderedQuestions) {
        const userAnswerIndex = answers[q.id];
        const isCorrect = typeof userAnswerIndex === 'number' && userAnswerIndex === q.correct_index;
        if (isCorrect) {
          correctCount++;
        }
        review.push({
          id: q.id,
          question: q.question,
          options: (q.options as string[]) || [],
          userAnswerIndex: typeof userAnswerIndex === 'number' ? userAnswerIndex : null,
          correctIndex: q.correct_index,
          isCorrect,
        });
      }
    }

    const hasPassed = !isExpired && correctCount >= 3;
    const pointsEarned = hasPassed ? correctCount * 5 : 0; // 5 points per correct answer, minimum 3 correct required

    // 5. Mark attempt as claimed and record the final count
    await admin
      .from('quiz_attempts')
      .update({
        claimed: true,
        score: correctCount,
      })
      .eq('id', attemptId);

    // 6. Record points in the auditable reward ledger (never trust client)
    if (pointsEarned > 0) {
      await admin
        .from('reward_ledger')
        .insert({
          user_id: user.id,
          amount: pointsEarned,
          reason: `Completed quiz (${correctCount}/${questionIds.length} correct - earned ${pointsEarned} points)`,
          reference_id: attemptId,
        });
    }

    // 7. Temporary data cleanup:
    // Delete older expired attempts for this user older than 1 hour or already claimed,
    // ensuring we do not retain quiz history or result logs.
    const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
    await admin
      .from('quiz_attempts')
      .delete()
      .eq('user_id', user.id)
      .neq('id', attemptId)
      .or(`claimed.eq.true,expires_at.lt.${oneHourAgo}`);

    return NextResponse.json({
      success: true,
      correctCount,
      totalQuestions: questionIds.length,
      pointsEarned,
      isExpired,
      hasPassed,
      review,
      message: isExpired
        ? 'Quiz submission exceeded the allowed time limit. 0 points awarded.'
        : hasPassed
        ? `Congratulations! You scored ${correctCount}/${questionIds.length} and earned ${pointsEarned} points.`
        : `You scored ${correctCount}/${questionIds.length}. You need at least 3 correct answers out of 5 to earn points (0 points earned).`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
