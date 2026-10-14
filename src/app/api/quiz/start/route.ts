import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createAdminClient();

    // 1. Check feature flag for quizzes
    const { data: flag, error: flagError } = await admin
      .from('feature_flags')
      .select('enabled')
      .eq('name', 'quizzes')
      .single();

    if (!flagError && flag && !flag.enabled) {
      return NextResponse.json(
        { error: 'Quizzes are currently paused by the administrator.' },
        { status: 403 }
      );
    }

    // 2. Fetch all active question IDs to randomly pick 5
    const { data: allQuestions, error: qError } = await admin
      .from('quiz_questions')
      .select('id')
      .eq('is_active', true);

    if (qError || !allQuestions || allQuestions.length < 5) {
      return NextResponse.json(
        { error: 'Insufficient quiz questions available. Please check back later.' },
        { status: 500 }
      );
    }

    // Shuffle and pick 5 random unique questions using Fisher-Yates algorithm
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedIds = shuffled.slice(0, 5).map((q) => q.id);

    // Fetch the 5 selected questions from the database
    const { data: questions, error: fetchError } = await admin
      .from('quiz_questions')
      .select('id, question, options')
      .in('id', selectedIds);

    if (fetchError || !questions || questions.length < 5) {
      return NextResponse.json(
        { error: 'Failed to retrieve quiz questions. Please try again.' },
        { status: 500 }
      );
    }

    // Preserve the randomized order
    const orderedQuestions = selectedIds
      .map((id) => questions.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => !!q);

    // 3. Timing calculation: 5 questions * 7s = 35s + 20s network grace period = 55s total
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 55 * 1000);
    const questionIds = orderedQuestions.map((q) => q.id);

    // 4. Create temporary attempt record to validate timing and prevent duplicate claims
    const { data: attempt, error: attemptError } = await admin
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        question_ids: questionIds,
        started_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        claimed: false,
        score: 0,
      })
      .select('id')
      .single();

    if (attemptError || !attempt) {
      return NextResponse.json(
        { error: 'Failed to initiate quiz attempt.' },
        { status: 500 }
      );
    }

    // 5. Return questions strictly WITHOUT correct_index (client security)
    return NextResponse.json({
      attemptId: attempt.id,
      questions: orderedQuestions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
      })),
      timePerQuestion: 7,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
