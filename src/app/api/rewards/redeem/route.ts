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
    const { rewardType, points } = body;

    const pointsToDeduct = Number(points);
    if (!rewardType || isNaN(pointsToDeduct) || pointsToDeduct <= 0) {
      return NextResponse.json(
        { error: 'Invalid reward selection or points value.' },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    // 1. Check feature flag for redemptions
    const { data: flag, error: flagError } = await admin
      .from('feature_flags')
      .select('enabled')
      .eq('name', 'redemptions')
      .single();

    if (!flagError && flag && !flag.enabled) {
      return NextResponse.json(
        { error: 'Redemptions are currently paused by the administrator.' },
        { status: 403 }
      );
    }

    // 2. Validate current balance on the server (never trust client)
    const { data: ledger, error: ledgerError } = await admin
      .from('reward_ledger')
      .select('amount')
      .eq('user_id', user.id);

    if (ledgerError) {
      return NextResponse.json(
        { error: 'Failed to verify ledger balance.' },
        { status: 500 }
      );
    }

    const currentBalance = (ledger || []).reduce((sum, item) => sum + (item.amount || 0), 0);

    if (currentBalance < pointsToDeduct) {
      return NextResponse.json(
        {
          error: `Insufficient points balance. You have ${currentBalance} points, but this reward requires ${pointsToDeduct} points.`,
        },
        { status: 400 }
      );
    }

    // 3. Generate secure voucher code
    const voucherCode = `TE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 4. Record the redemption
    const { data: redemption, error: redemptionError } = await admin
      .from('redemptions')
      .insert({
        user_id: user.id,
        points: pointsToDeduct,
        status: 'completed',
        reward_type: `${rewardType} (${voucherCode})`,
      })
      .select('id')
      .single();

    if (redemptionError || !redemption) {
      return NextResponse.json(
        { error: 'Failed to process redemption record.' },
        { status: 500 }
      );
    }

    // 5. Append negative entry to reward ledger
    const { error: debitError } = await admin
      .from('reward_ledger')
      .insert({
        user_id: user.id,
        amount: -pointsToDeduct,
        reason: `Redeemed: ${rewardType}`,
        reference_id: redemption.id,
      });

    if (debitError) {
      return NextResponse.json(
        { error: 'Failed to update reward ledger balance.' },
        { status: 500 }
      );
    }

    const newBalance = currentBalance - pointsToDeduct;

    return NextResponse.json({
      success: true,
      newBalance,
      voucherCode,
      message: `Redemption successful! Your digital voucher code is ${voucherCode}.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
