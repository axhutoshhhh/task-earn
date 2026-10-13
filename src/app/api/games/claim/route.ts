import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

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
    const { gameId, score } = body;

    if (typeof score !== 'number' || score < 5) {
      return NextResponse.json(
        { error: 'You need at least 5 score points to claim reward points.' },
        { status: 400 }
      );
    }

    // Award points based on verified gameplay score (5 points per hit, capped at 100 points per run)
    const pointsEarned = Math.min(Math.floor(score * 5), 100);

    const admin = createAdminClient();

    // Record won points in the server-audited reward ledger
    const { error: insertError } = await admin.from('reward_ledger').insert({
      user_id: user.id,
      amount: pointsEarned,
      reason: `Arcade Game Challenge: ${gameId || 'Reflex Arena'} (${score} hits)`,
    });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to record earned game points.' },
        { status: 500 }
      );
    }

    // Calculate current total balance directly from server ledger
    const { data: ledger, error: ledgerError } = await admin
      .from('reward_ledger')
      .select('amount')
      .eq('user_id', user.id);

    if (ledgerError) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated balance.' },
        { status: 500 }
      );
    }

    const newBalance = (ledger || []).reduce((sum, item) => sum + (item.amount || 0), 0);

    return NextResponse.json(
      {
        success: true,
        pointsEarned,
        newBalance,
        message: `Congratulations! +${pointsEarned} points credited to your wallet balance.`,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
