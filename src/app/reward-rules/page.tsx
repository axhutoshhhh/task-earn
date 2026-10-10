import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Official Reward Rules | Task Earn',
  description: 'Comprehensive guidelines, redemption policies, and program terms for Task Earn reward points.',
};

export default function RewardRulesPage() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF]">
            Official Policy Document
          </span>
        </div>

        {/* Main Document Container */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#793FFF]/15 shadow-xl space-y-10">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Platform Compliance & Operations
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Official Reward Rules
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Last Updated & Effective: October 2026 • Governs All Earning & Redemption Operations
            </p>
          </div>

          {/* Program Overview Banner */}
          <div className="rounded-2xl bg-[#793FFF]/5 border border-[#793FFF]/20 p-6 space-y-2">
            <h2 className="text-base font-bold text-[#793FFF]">Program Governance Notice</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These Official Reward Rules constitute a legally binding agreement between you (&quot;Member&quot;, &quot;User&quot;, or &quot;You&quot;) and Task Earn (&quot;Platform&quot;, &quot;We&quot;, or &quot;Us&quot;). By creating an account, participating in platform tasks, accumulating points, or redeeming digital vouchers, you explicitly agree to adhere to all terms, verification procedures, and anti-abuse safeguards contained herein.
            </p>
          </div>

          {/* Document Sections */}
          <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">1.</span> Program Overview & Nature of Points
              </h2>
              <p>
                Task Earn operates an engagement-based micro-rewards program designed to incentivize active participation across authenticated digital activities. Points awarded on Task Earn (&quot;Points&quot;) represent internal accounting units within our closed-loop platform ecosystem.
              </p>
              <p>
                Points do not constitute legal tender, personal property, currency, or securities of any kind. Points carry no intrinsic cash value, do not accrue interest, cannot be purchased directly, and cannot be transferred, assigned, bartered, or sold between user accounts or to any third party. Points may solely be exchanged for eligible digital vouchers offered in our official Rewards Catalog pursuant to these Rules.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">2.</span> Eligibility & Account Verification
              </h2>
              <p>
                To qualify for point accrual and reward redemption, members must satisfy the following criteria:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Be at least thirteen (13) years of age or the age of legal majority in your jurisdiction.</li>
                <li>Maintain a singular, verified account associated with a legitimate, active email address.</li>
                <li>Operate from a residential, non-commercial network without unauthorized proxy or VPN masking intended to circumvent regional allocations.</li>
                <li>Not have been previously suspended, banned, or terminated from Task Earn for terms violations.</li>
              </ul>
              <p>
                Task Earn reserves the absolute right to request identity or activity verification prior to processing any high-value redemption or in instances of flagged anomalies.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">3.</span> Point Accrual & Earning Principles
              </h2>
              <p>
                Points are credited to your account upon the verified completion of eligible platform activities. The point values, time thresholds, session quotas, and availability of activities fluctuate dynamically based on network demand, partner allocations, and data validation standards.
              </p>
              <p>
                <strong>Verification Standards:</strong> Point allocations are not finalized until all underlying activity criteria are verified server-side. For speed quizzes, this entails answer correctness and time-window bounds checks; for streaming activities, continuous session metrics; for artificial intelligence evaluations, quality-control validation against consensus datasets; for video bounties, spatial criteria and resolution compliance.
              </p>
              <p>
                Any activity completion determined to involve automated script execution, screen recording manipulation, headless browser instances, or falsified interaction data will be deemed void, resulting in immediate cancellation of pending points.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">4.</span> The Verified Reward Ledger Architecture
              </h2>
              <p>
                All point credits, debits, adjustments, and redemptions are recorded in a permanent, append-only cryptographic transaction ledger. Your active balance is calculated dynamically by summing validated ledger entries linked to your authenticated user identifier.
              </p>
              <p>
                In the event of a discrepancy between client-side displays and server ledger entries, the server-side ledger record shall prevail as the definitive authority. Ledger records are maintained with immutable timestamps and unique reference identifiers for comprehensive auditability.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">5.</span> Redemption Catalog & Digital Voucher Delivery
              </h2>
              <p>
                Members with sufficient validated point balances may initiate redemptions for available digital gift card vouchers (such as Amazon, Starbucks, Apple, and Google Play) featured in the Rewards Catalog.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Instant Issuance:</strong> Digital voucher codes are generated upon real-time server balance validation and permanently archived in the member&apos;s Past Redemptions dashboard.</li>
                <li><strong>Finality of Redemptions:</strong> Once a digital voucher code has been issued, the redemption is final, non-reversible, and non-refundable. Points deducted cannot be reinstated unless a technical defect prevents code generation.</li>
                <li><strong>Merchant Terms:</strong> All digital vouchers and gift cards are subject to the specific terms, conditions, redemption portals, and geographic restrictions of the respective issuing merchant. Task Earn is not affiliated with, sponsored by, or an agent of third-party gift card brands.</li>
                <li><strong>Code Security:</strong> Members are solely responsible for safeguarding their issued digital voucher codes. Task Earn cannot replace codes that are lost, stolen, or redeemed by unauthorized third parties after issuance.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">6.</span> Account Inactivity & Balance Expiration
              </h2>
              <p>
                Points remain active so long as the member maintains an active account status. An account is deemed &quot;Inactive&quot; if twelve (12) consecutive months elapse without the member logging in or completing at least one verified earning activity.
              </p>
              <p>
                Prior to point expiration due to dormancy, Task Earn may dispatch notification to the member&apos;s registered email. If no qualifying activity occurs within thirty (30) days following notice, accumulated points may be forfeited and the ledger closed.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">7.</span> Fraud Prevention, Anti-Abuse & Penalty Forfeiture
              </h2>
              <p>
                Task Earn maintains an uncompromising zero-tolerance stance toward fraudulent exploitation, botting, and malicious conduct. Prohibited practices include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Creating multiple accounts for the same individual to multiply rewards.</li>
                <li>Utilizing automated macro scripts, auto-clickers, bots, or browser emulation frameworks.</li>
                <li>Tampering with client-side application code, API payloads, network sockets, or timing loops.</li>
                <li>Submitting fraudulent, plagiarized, synthesized, or copyright-infringing video clips for POV bounties.</li>
                <li>Engaging in coordinated ring manipulation or collusion to exploit point allocations.</li>
              </ul>
              <p>
                Discovery of prohibited conduct will result in immediate and permanent account termination, cancellation of all unredeemed points, invalidation of pending transactions, and potential referral to relevant authorities where fraudulent financial manipulation is evident.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">8.</span> Taxes, Regulatory Compliance & Local Laws
              </h2>
              <p>
                Members are exclusively responsible for determining, reporting, and remitting any applicable local, state, provincial, or national taxes that may arise from the receipt of digital vouchers or prizes. Task Earn makes no representations regarding the tax treatment of rewards in your jurisdiction.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">9.</span> Program Modifications & Discontinuation
              </h2>
              <p>
                Task Earn reserves the discretionary right to amend, suspend, or terminate the rewards program, modify point ratios, add or retire earning categories, or substitute catalog items at any time with reasonable advance notice published through the platform interface or via direct member communication.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">10.</span> Inquiries & Compliance Contact
              </h2>
              <p>
                For questions regarding reward ledger calculations, redemption verification, or compliance disputes, please contact our program director directly:
              </p>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm space-y-1 text-slate-800">
                <p><strong>Program Support:</strong> Ashutosh Raj (Task Earn Administration)</p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">
                    axhutoshhhh@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Telephone:</strong>{' '}
                  <a href="tel:8302072636" className="text-slate-900 font-bold hover:underline">
                    +91 8302072636
                  </a>
                </p>
                <p><strong>Response Commitment:</strong> Within 24-48 business hours</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
