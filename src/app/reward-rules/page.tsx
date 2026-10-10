export default function RewardRulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Reward Rules</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Notice</h3>
        <p className="text-yellow-700">All points and rewards on Task Earn are completely simulated. They have absolutely no real-world monetary value and cannot be exchanged for cash, cryptocurrency, or gift cards.</p>
      </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How Points Are Earned</h2>
          <p>Users earn simulated points exclusively through quiz completion. Demo points are awarded for answering questions correctly within the allotted time frame.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Point Values</h2>
          <p>Specific point values for actions are to be determined. The system is currently in a testing phase.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Redemption</h2>
          <p>The redemption system is purely a UI simulation. There are no actual payouts or reward deliveries processed by this platform.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Anti-Abuse</h2>
          <p>To ensure fair simulation, we employ server-side validation, timing checks during quizzes, and duplicate action prevention systems.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes</h2>
          <p>These rules are subject to change as the platform continues development.</p>
        </section>
      </div>
    </div>
  );
}
