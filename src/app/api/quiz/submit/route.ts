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
      .select('id, correct_index')
      .in('id', questionIds);

    if (qError || !questions) {
      return NextResponse.json(
        { error: 'Unable to evaluate quiz questions.' },
        { status: 500 }
      );
    }

    // 4. Calculate score on server
    let correctCount = 0;
    if (!isExpired) {
      for (const q of questions) {
        const userAnswerIndex = answers[q.id];
        if (typeof userAnswerIndex === 'number' && userAnswerIndex === q.correct_index) {
          correctCount++;
        }
      }
    }

    const pointsEarned = correctCount * 10; // 10 demo points per correct answer

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
          reason: `Completed quiz (${correctCount}/${questionIds.length} correct)`,
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
      message: isExpired
        ? 'Quiz submission exceeded the allowed time limit. 0 points awarded.'
        : `Congratulations! You scored ${correctCount}/${questionIds.length} and earned ${pointsEarned} demo points.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
