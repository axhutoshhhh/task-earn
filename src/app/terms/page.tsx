import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Task Earn',
  description: 'Comprehensive Terms of Service, user agreement, and platform policies governing Task Earn.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation / Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF]">
            Official Legal Agreement
          </span>
        </div>

        {/* Main Document Container */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#793FFF]/15 shadow-xl space-y-10">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Legal Governance & Compliance
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Last Updated & Effective: October 2026 • Governs All Platform Access, Activities & Rewards
            </p>
          </div>

          {/* Binding Notice Box */}
          <div className="rounded-2xl bg-[#793FFF]/5 border border-[#793FFF]/20 p-6 space-y-2">
            <h2 className="text-base font-bold text-[#793FFF]">Binding Agreement Notice</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) carefully before accessing or using Task Earn (&quot;Platform&quot;, &quot;Service&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;). By creating an account, browsing the website, completing quizzes or tasks, participating in AI evaluations, watching partner video streams, uploading video bounties, or redeeming reward vouchers, you (&quot;User&quot;, &quot;Member&quot;, or &quot;You&quot;) agree to be bound by these Terms and our incorporated Privacy Policy and Reward Rules. If you do not agree, you must immediately cease accessing or using the platform.
            </p>
          </div>

          {/* Sections List */}
          <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">1.</span> Acceptance of Terms & Eligibility
              </h2>
              <p>
                By registering or using Task Earn, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>You are at least thirteen (13) years of age, or the legal age of majority in your jurisdiction, whichever is greater. If you are between 13 and the age of majority, you confirm that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</li>
                <li>You possess the legal authority and mental capacity to enter into a binding contractual agreement under applicable law.</li>
                <li>You have not been previously banned, suspended, or terminated from Task Earn for fraudulent conduct or policy violations.</li>
                <li>Your access and use of the platform comply with all applicable local, national, and international laws, regulations, and statutes.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">2.</span> Description of the Platform & Services
              </h2>
              <p>
                Task Earn operates an interactive digital micro-earning platform providing verified engagement activities. Members can participate across five distinct streams:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Knowledge Speed Quizzes:</strong> Timed multiple-choice question sessions validated server-side for speed and accuracy.</li>
                <li><strong>Watch to Earn:</strong> Verified streaming sessions of partner educational, technology, and gaming YouTube video media.</li>
                <li><strong>Train AI Models:</strong> Human evaluation benchmarks (RLHF) comparing model outputs for helpfulness, tone, and factual accuracy.</li>
                <li><strong>Play Games to Earn:</strong> Arcade challenges and web-based skill quests offering milestone-driven rewards.</li>
                <li><strong>POV Video Bounties:</strong> Uploads of user-recorded first-person perspective sweeps of physical environments to train spatial computing and computer vision systems.</li>
              </ul>
              <p>
                Validated completions earn internal reward points recorded to an auditable server ledger, which may be exchanged for digital gift card vouchers from merchant partners.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">3.</span> Account Registration, Security & Single-Account Policy
              </h2>
              <p>
                To participate in platform activities, you must register a unique account with a valid, functional email address and a secure password.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Single-Account Mandate:</strong> Each individual user is strictly permitted to create and operate exactly one (1) Task Earn account. Creating multiple accounts for the same person, household, device, or automated proxy cluster to multiply rewards constitutes fraud and results in immediate permanent termination and forfeiture of all points.</li>
                <li><strong>Credential Confidentiality:</strong> You are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. You agree not to disclose your password or authorize any third party to access your account.</li>
                <li><strong>Notification of Breach:</strong> You agree to notify Task Earn immediately at <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">axhutoshhhh@gmail.com</a> if you suspect any unauthorized access, security breach, or compromise of your credentials.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">4.</span> Prohibited Conduct & Anti-Cheating Policies
              </h2>
              <p>
                Task Earn operates automated fraud-detection engines and server-side verification algorithms. You strictly agree NOT to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Deploy, run, or utilize automated bots, macro scripts, auto-clickers, emulators, screen-scraping bots, or headless browser automation tools.</li>
                <li>Use Virtual Private Networks (VPNs), residential proxies, Tor exit nodes, or IP-masking services to circumvent geographic allocations, device caps, or fraud checks.</li>
                <li>Reverse engineer, decompile, disassemble, intercept, or tamper with API calls, WebSocket protocols, server responses, client bundles, or database schemas.</li>
                <li>Attempt to bypass quiz timers, alter client-side scoring states, manipulate video playback counters, or falsify game milestone payloads.</li>
                <li>Submit AI feedback containing gibberish, automated script-generated text, or deceptive ratings that degrade model training integrity.</li>
                <li>Submit fraudulent, stolen, stock, synthesized, deepfaked, or third-party copyrighted video footage for POV video bounties.</li>
                <li>Interfere with or disrupt the platform infrastructure, networks, or servers, or introduce malicious payloads, viruses, or worms.</li>
              </ul>
              <p>
                Any member engaging in prohibited conduct faces immediate account suspension, permanent banning, irrevocable cancellation of point balances, and potential legal recourse.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">5.</span> Intellectual Property Rights
              </h2>
              <p>
                All platform assets—including software source code, visual UI layouts, interactive designs, branding, logos, graphics, icons, audio, databases, algorithms, and documentation—are the exclusive intellectual property of Task Earn and its licensors.
              </p>
              <p>
                Task Earn grants you a limited, revocable, non-exclusive, non-transferable license to access and use the platform solely for personal, non-commercial micro-earning purposes. You may not reproduce, modify, distribute, sell, lease, reverse-engineer, or create derivative works from platform assets without prior written consent.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">6.</span> User Submissions & POV Video License
              </h2>
              <p>
                When participating in POV Video Bounties or submitting content:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Ownership:</strong> You retain underlying copyright ownership of original video files and media created and uploaded by you.</li>
                <li><strong>Dataset License:</strong> By submitting video clips, you grant Task Earn and its authorized AI research partners a worldwide, royalty-free, perpetual, irrevocable, sublicensable, and transferable license to host, store, crop, normalize, annotate, blur identifiable bystanders, process, and incorporate the footage into machine learning, spatial computing, and computer vision training datasets.</li>
                <li><strong>Privacy & Content Warranties:</strong> You represent and warrant that your uploads: (a) were filmed by you in public or lawfully accessible areas where you had legal authority to record; (b) do not capture confidential documents, financial papers, passwords, or private spaces without explicit authorization; (c) do not contain sexually explicit, violent, abusive, defamatory, or unlawful material; and (d) do not infringe any third-party privacy, publicity, or intellectual property rights.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">7.</span> Points, Ledger Balance & Reward Redemptions
              </h2>
              <p>
                Point accruals and digital gift card voucher redemptions are governed by our <Link href="/reward-rules" className="text-[#793FFF] font-bold hover:underline">Official Reward Rules</Link>, which are incorporated into these Terms by reference.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Points are internal accounting units and do not constitute money, currency, property, or legal tender. Points cannot be redeemed for fiat bank cash, UPI transfers, or cryptographic tokens.</li>
                <li>Points are non-transferable and may not be gifted, bartered, or sold between users.</li>
                <li>Once a digital voucher code has been issued in your Past Redemptions dashboard, the redemption is final and non-refundable.</li>
                <li>Gift card merchant brands (including Amazon, Starbucks, Apple, and Google Play) are independent third parties and are not sponsors, affiliates, or endorsers of Task Earn. Use of merchant vouchers is governed exclusively by the terms and policies of each respective merchant.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">8.</span> Third-Party Media & Embedded Content
              </h2>
              <p>
                Our platform features embedded YouTube videos and links to external partner services. Embedded media is powered via YouTube API services and embedded players. By engaging with video watch tasks, you acknowledge that you are also bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-[#793FFF] font-bold hover:underline">YouTube Terms of Service</a> and Google Privacy Policy. Task Earn assumes no liability or responsibility for content hosted on third-party domains.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">9.</span> Disclaimer of Warranties
              </h2>
              <p>
                THE PLATFORM, INCLUDING ALL ACTIVITIES, SOFTWARE, INTERFACES, CONTENT, AND REWARD REDEMPTION MECHANISMS, IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              </p>
              <p>
                TASK EARN EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ACCURACY. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, ERROR-FREE, OR VIRUS-FREE, NOR DO WE GUARANTEE ANY MINIMUM NUMBER OF AVAILABLE TASKS, BOUNTIES, OR REWARD EARNINGS.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">10.</span> Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TASK EARN, ITS FOUNDER, OPERATORS, DIRECTORS, AFFILIATES, AGENTS, OR PARTNERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES—INCLUDING LOSS OF PROFITS, LOSS OF DATA, GOODWILL, INTERRUPTED EARNING OPPORTUNITIES, OR VOUCHER EXPIRATION—ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE PLATFORM.
              </p>
              <p>
                IN ALL CIRCUMSTANCES, TASK EARN&apos;S TOTAL AGGREGATE LIABILITY ARISING UNDER OR RELATED TO THESE TERMS SHALL NOT EXCEED THE VALUE OF UNREDEEMED POINTS LAWFULLY ACCUMULATED BY YOU IN THE PRECEDING THIRTY (30) DAYS OR ₹1,000 INR (WHICHEVER IS LESS).
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">11.</span> Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless Task Earn, its administrators, founders, officers, partners, and contractors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) your access to or use of the Service; (b) your violation of these Terms; (c) your violation of any third-party right, including intellectual property, privacy, or property rights; or (d) any video footage or data uploaded by you through the POV video bounty program.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">12.</span> Suspension, Termination & Account Closure
              </h2>
              <p>
                Task Earn reserves the absolute right, without liability or prior notice, to suspend, disable, or permanently terminate your account and invalidate any accrued points if:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>You breach or violate any provision of these Terms or the Reward Rules.</li>
                <li>We detect botting, automated macros, proxy masking, or multi-accounting fraud.</li>
                <li>Your account remains inactive for twelve (12) consecutive months.</li>
                <li>We are instructed to do so by a competent court, regulatory body, or law enforcement agency.</li>
              </ul>
              <p>
                You may delete your account at any time by contacting our support desk. Upon voluntary deletion, any unredeemed points in your ledger are permanently forfeited.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">13.</span> Dispute Resolution & Governing Law
              </h2>
              <p>
                <strong>Informal Resolution:</strong> Before initiating any formal legal dispute, you agree to contact us in writing at <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">axhutoshhhh@gmail.com</a> to attempt good-faith informal resolution for at least thirty (30) days.
              </p>
              <p>
                <strong>Governing Law:</strong> These Terms and any dispute arising out of or relating to your use of Task Earn shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
              </p>
              <p>
                <strong>Class Action Waiver:</strong> You agree that any proceeding to resolve disputes will be conducted exclusively on an individual basis. You shall not seek to have any dispute heard as a class action, consolidated action, or representative proceeding.
              </p>
            </section>

            {/* Section 14 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">14.</span> Amendments & Updates to Terms
              </h2>
              <p>
                We reserve the right to revise, update, or replace these Terms at our sole discretion. When modifications occur, we will update the &quot;Last Updated & Effective&quot; date at the top of this page. Continued access or use of Task Earn following the publication of revised Terms constitutes your irrevocable agreement to such revisions.
              </p>
            </section>

            {/* Section 15 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">15.</span> Severability & Entire Agreement
              </h2>
              <p>
                If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions. These Terms, together with our Privacy Policy and Reward Rules, constitute the entire agreement between you and Task Earn concerning the platform.
              </p>
            </section>

            {/* Section 16 */}
            <section className="space-y-3 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">16.</span> Legal Inquiries & Direct Contact
              </h2>
              <p>
                For official legal notices, compliance queries, terms clarification, or formal inquiries, please contact our platform administration directly:
              </p>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm space-y-1 text-slate-800">
                <p><strong>Platform Administrator:</strong> Ashutosh Raj</p>
                <p>
                  <strong>Direct Email:</strong>{' '}
                  <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">
                    axhutoshhhh@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Direct Phone:</strong>{' '}
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
