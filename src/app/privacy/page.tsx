import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Task Earn',
  description: 'Comprehensive Privacy Policy, data protection practices, and user privacy rights at Task Earn.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
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
            Official Privacy Charter
          </span>
        </div>

        {/* Main Document Container */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#793FFF]/15 shadow-xl space-y-10">
          {/* Header */}
          <div className="border-b border-slate-100 pb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#793FFF]">
              Data Protection & Privacy Governance
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Last Updated & Effective: October 2026 • Compliant with GDPR, CCPA/CPRA & Global Privacy Frameworks
            </p>
          </div>

          {/* Privacy Commitment Banner */}
          <div className="rounded-2xl bg-[#793FFF]/5 border border-[#793FFF]/20 p-6 space-y-2">
            <h2 className="text-base font-bold text-[#793FFF]">Our Privacy Commitment</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              At Task Earn (&quot;Platform&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;), we believe privacy is a fundamental human right. We are dedicated to maintaining strict transparency regarding how your data is collected, processed, and safeguarded. We adhere to the principles of data minimization: we only request data essential to operating your account, verifying task participation, and issuing digital reward vouchers. We never sell your personal data to third-party brokers.
            </p>
          </div>

          {/* Document Sections */}
          <div className="space-y-10 text-slate-700 text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">1.</span> Scope & Data Controller Information
              </h2>
              <p>
                This Privacy Policy applies to all services, features, websites, and dashboards provided by Task Earn. For the purposes of global data protection laws (including the General Data Protection Regulation / GDPR and the California Consumer Privacy Act / CCPA), the Data Controller responsible for your information is:
              </p>
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p><strong>Data Controller:</strong> Ashutosh Raj (Task Earn Platform Administration)</p>
                <p><strong>Official Contact:</strong> <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">axhutoshhhh@gmail.com</a> | <a href="tel:8302072636" className="text-slate-900 font-bold hover:underline">+91 8302072636</a></p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">2.</span> Information We Collect
              </h2>
              <p>
                We collect information across several clearly defined categories:
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">A. Account & Profile Information</h3>
                  <p className="text-xs text-slate-600">
                    When you create an account, we collect your email address and display name. Authentication passwords are cryptographically salted and hashed via Supabase Auth; we never have access to, nor do we store, your plaintext password.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">B. Task Participation & Verification Telemetry</h3>
                  <p className="text-xs text-slate-600">
                    To authenticate reward eligibility, our servers record activity timestamps, quiz timing intervals, answer correctness, video watch completion percentages, AI evaluation ratings and written rationales, arcade game quest completion events, and POV bounty submission metadata (file duration, resolution, upload timestamp).
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">C. Technical & Anti-Fraud Telemetry</h3>
                  <p className="text-xs text-slate-600">
                    When you access Task Earn, our security systems log your IP address, browser user-agent, operating system, network routing details, and device attributes. This data is strictly utilized to identify botnets, emulator clusters, and multi-accounting rings to ensure fair reward distribution.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">D. Reward Ledger & Redemption Records</h3>
                  <p className="text-xs text-slate-600">
                    We maintain an immutable ledger of all points earned, points deducted, digital voucher SKUs selected, redemption timestamps, and digital voucher codes issued to your account history.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">E. User-Submitted POV Video Bounties</h3>
                  <p className="text-xs text-slate-600">
                    If you choose to participate in POV Video Bounties, you submit first-person perspective video recordings of physical environments. We process this footage to train computer vision and spatial AI models.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">3.</span> Information We Explicitly NEVER Collect
              </h2>
              <p>
                We practice aggressive data minimization. We will NEVER ask for, collect, or store:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Bank account credentials, internet banking passwords, or UPI PINs.</li>
                <li>Credit or debit card numbers, CVVs, or cardholder billing addresses.</li>
                <li>SMS One-Time Passwords (OTPs) or financial two-factor codes.</li>
                <li>National identification numbers (such as Aadhaar, PAN, SSN, or Passport numbers).</li>
                <li>Continuous real-time background GPS tracking coordinates.</li>
                <li>Biometric facial recognition profiles or retina scans.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">4.</span> Legal Bases for Data Processing (GDPR & International Standards)
              </h2>
              <p>
                We only process your personal data where lawful grounds exist under Article 6 of the General Data Protection Regulation (GDPR) and comparable global regulations:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Contractual Necessity:</strong> Processing required to operate your account, validate activities, calculate reward balances, and issue gift card codes under our Terms of Service.</li>
                <li><strong>Legitimate Interests:</strong> Protecting the platform against botting, malicious hacking, fraudulent multi-accounting, and maintaining server stability.</li>
                <li><strong>Consent:</strong> When you voluntarily upload POV video clips or opt into elective communication channels. You may withdraw consent at any time.</li>
                <li><strong>Legal Obligation:</strong> Retaining financial transaction audit trails to satisfy statutory tax and bookkeeping requirements.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">5.</span> How We Use Your Data
              </h2>
              <p>
                We utilize collected information exclusively for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Authenticating user sessions and granting secure access to your member dashboard.</li>
                <li>Calculating point allocations and updating your immutable reward transaction ledger.</li>
                <li>Delivering digital voucher redemption codes (Amazon, Starbucks, Apple, Google Play) directly to your account.</li>
                <li>Detecting and stopping automated scripts, proxies, emulators, and cheating attempts.</li>
                <li>Anonymizing and aggregating AI training votes for computer model alignment.</li>
                <li>Responding to inquiries submitted through our Contact portal or direct telephone/email desk.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">6.</span> Third-Party Service Providers & Sub-Processors
              </h2>
              <p>
                We do not sell, rent, or lease your personal information. We partner only with reputable, enterprise-grade cloud providers bound by strict data processing agreements:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Supabase Inc.:</strong> Cloud database and authentication infrastructure. Data is stored in secure PostgreSQL clusters with Row Level Security (RLS) and encrypted backups.</li>
                <li><strong>Vercel Inc.:</strong> Application edge hosting, serverless functions, and global CDN delivery.</li>
                <li><strong>YouTube API Services:</strong> Powering embedded partner video streams. Video watch metrics comply with YouTube API Services Terms and Google Privacy Policies.</li>
                <li><strong>AI Research Partners:</strong> Receiving strictly anonymized model votes and sanitized spatial video datasets for neural network training.</li>
                <li><strong>Gift Card Merchant Networks:</strong> API endpoints responsible for generating and delivering digital gift voucher codes.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">7.</span> POV Video Footage Privacy & Sanitation
              </h2>
              <p>
                We treat POV video submissions with rigorous privacy controls:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Anonymization & Blurring:</strong> Uploaded video files undergo automated computer vision filtering designed to blur identifiable human faces, vehicle license plates, and sensitive documents prior to model training ingestion.</li>
                <li><strong>Restricted Storage:</strong> Source video files are stored in access-controlled cloud storage buckets accessible solely to authorized data engineering systems.</li>
                <li><strong>No Surveillance:</strong> POV bounties are strictly intended for spatial scene understanding (e.g. room layout, street topography, desk geometry), never for personal surveillance or biometric indexing.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">8.</span> Data Security & Storage Architecture
              </h2>
              <p>
                We implement comprehensive technical and organizational safeguards:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Encryption in Transit:</strong> All communications between your device and our servers are encrypted using modern Transport Layer Security (TLS 1.3).</li>
                <li><strong>Encryption at Rest:</strong> Database tables, storage buckets, and user records are encrypted using industry-standard AES-256 algorithms.</li>
                <li><strong>Row Level Security (RLS):</strong> Our database enforces granular Row Level Security policies at the database engine level, ensuring users can only read and write their own authorized records.</li>
                <li><strong>Auditable Ledger:</strong> All point ledger operations are logged with unique reference identifiers and tamper-evident server timestamps.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">9.</span> Data Retention & Account Deletion
              </h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or until your account is terminated.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Active Accounts:</strong> Account data and point transaction ledgers are retained while your account remains active.</li>
                <li><strong>Telemetry Logs:</strong> Transient security logs and anti-cheat network traces are automatically purged after ninety (90) days.</li>
                <li><strong>Right to Deletion:</strong> You may request complete account deletion at any time by contacting us at <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">axhutoshhhh@gmail.com</a>. Upon verification, your profile, authentication records, and associated personal identifiers will be permanently expunged from production databases within thirty (30) days.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">10.</span> Your Privacy Rights (GDPR, CCPA/CPRA, DPDP)
              </h2>
              <p>
                Regardless of where you reside, Task Earn extends global privacy rights to all members:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li><strong>Right to Know / Access:</strong> You can request a complete export of the personal information we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You can request correction of inaccurate or incomplete personal information.</li>
                <li><strong>Right to Erasure (&quot;Right to Be Forgotten&quot;):</strong> You have the right to request permanent deletion of your data.</li>
                <li><strong>Right to Restriction / Objection:</strong> You can object to or request restrictions on certain processing activities.</li>
                <li><strong>Right to Data Portability:</strong> You can request your data in a structured, machine-readable format.</li>
                <li><strong>Non-Discrimination:</strong> We will never deny services, charge different prices, or degrade quality because you exercised your statutory privacy rights.</li>
              </ul>
              <p>
                To exercise any of these rights, simply email our data lead at <a href="mailto:axhutoshhhh@gmail.com" className="text-[#793FFF] font-bold hover:underline">axhutoshhhh@gmail.com</a> with your registered account email.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">11.</span> Children&apos;s Privacy Protection
              </h2>
              <p>
                Task Earn is strictly designed for individuals aged thirteen (13) and older. We do not knowingly collect, solicit, or maintain personal information from children under the age of 13. If we discover that an individual under 13 has registered an account without verified parental consent, we will promptly delete all associated data from our systems.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">12.</span> Cookies & Local Storage
              </h2>
              <p>
                We use strictly necessary browser cookies and secure local storage tokens solely to maintain authenticated user sessions, prevent Cross-Site Request Forgery (CSRF) attacks, and preserve UI preferences. We do not use third-party tracking pixels or behavioral marketing cookies.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">13.</span> Policy Updates & Notifications
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect changes in our platform features, technology, or applicable legal standards. When updates occur, we will revise the &quot;Last Updated & Effective&quot; date at the top of this page. Substantial changes will be communicated via prominent notices across our platform.
              </p>
            </section>

            {/* Section 14 */}
            <section className="space-y-3 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#793FFF]">14.</span> Privacy Desk & Contact Information
              </h2>
              <p>
                For any questions, concerns, data export requests, or privacy inquiries, please contact our Data Protection Officer directly:
              </p>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 text-xs sm:text-sm space-y-1 text-slate-800">
                <p><strong>Data Protection Officer:</strong> Ashutosh Raj</p>
                <p>
                  <strong>Direct Email:</strong>{' '}
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
