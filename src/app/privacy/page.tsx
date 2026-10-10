export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-gray">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: October 2024</p>
      
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">What We Collect</h2>
          <p>We collect minimal information required to provide our service:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Email address (for authentication)</li>
            <li>Display name</li>
            <li>Basic quiz participation data for point validation only (no detailed quiz history is stored)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">What We Don&apos;t Collect</h2>
          <p>We absolutely never collect, ask for, or store sensitive financial or personal data such as:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>UPI PINs</li>
            <li>Bank passwords or credentials</li>
            <li>OTPs</li>
            <li>Detailed quiz answers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Data</h2>
          <p>Your data is used strictly for account management, preventing platform abuse, and improving the overall user experience.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Data Storage</h2>
          <p>We utilize Supabase for our database needs, implementing Row Level Security to ensure your data is isolated and protected. We practice minimal data retention.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Third-Party Services</h2>
          <p>We use Supabase as our primary third-party provider for authentication and database services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Rights</h2>
          <p>You have the right to request the deletion of your account and its associated data, or request an export of your data at any time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to Policy</h2>
          <p>This policy may be updated as our platform evolves. Significant changes will be prominently communicated.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact</h2>
          <p>If you have privacy concerns, please contact us at support@taskearn.com.</p>
        </section>
      </div>
    </div>
  );
}
