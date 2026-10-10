import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
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

    // 1. Fetch all ledger rows for this user to calculate real balance
    const { data: ledger, error: ledgerError } = await admin
      .from('reward_ledger')
      .select('id, amount, reason, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (ledgerError) {
      return NextResponse.json(
        { error: 'Failed to fetch reward ledger.' },
        { status: 500 }
      );
    }

    // 2. Compute balance on server (never trust client)
    const balance = (ledger || []).reduce((sum, item) => sum + (item.amount || 0), 0);

    // 3. Fetch past redemptions
    const { data: redemptions, error: redemptionsError } = await admin
      .from('redemptions')
      .select('id, points, status, reward_type, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (redemptionsError) {
      return NextResponse.json(
        { error: 'Failed to fetch redemptions.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      balance,
      ledger: ledger || [],
      redemptions: redemptions || [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
