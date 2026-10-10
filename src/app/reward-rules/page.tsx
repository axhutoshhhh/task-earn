export default function RewardRulesPage() {
  return (
    <div className="min-h-screen bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-[#793FFF]/15 shadow-xl">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900">Reward Rules</h1>
        
        <div className="bg-[#793FFF]/10 border-l-4 border-[#793FFF] p-6 mb-8 rounded-r-2xl">
          <h3 className="text-lg font-bold text-[#793FFF] mb-2">Reward Program Policy</h3>
          <p className="text-slate-700 text-sm leading-relaxed">Task Earn rewards active users with redeemable points across quizzes, YouTube videos, AI training, gaming challenges, and POV video bounties. Points are recorded in an append-only ledger and can be exchanged for digital gift card vouchers.</p>
        </div>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How Points Are Earned</h2>
          <p>Members earn points through verified participation across multiple categories:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600">
            <li><strong>Knowledge Speed Quizzes:</strong> +10 points per correct answer on 7-second timed questions.</li>
            <li><strong>Watch YouTube Videos:</strong> +20 to +35 points for completed watch sessions.</li>
            <li><strong>Train AI Models:</strong> +25 to +35 points per completed model evaluation batch.</li>
            <li><strong>Play Arcade Games:</strong> +40 to +120 points for reaching designated quest milestones.</li>
            <li><strong>POV Video Bounties:</strong> +150 to +220 points for approved first-person perspective clips.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Point Redemptions</h2>
          <p>Points can be redeemed from the Rewards Catalog for digital gift cards including Amazon, Starbucks, Apple, and Google Play. Upon confirmation, digital voucher codes are issued instantly and permanently accessible in your Past Redemptions history.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Security & Fair Play</h2>
          <p>To ensure fairness for all community members, we employ server-side answer scoring, timing bounds verification, anti-replay protections, and automated cheat prevention systems.</p>
        </section>
      </div>
    </div>
  </div>
  );
}
