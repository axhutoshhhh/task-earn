export default function FAQPage() {
  const faqs = [
    {
      q: "What is Task Earn?",
      a: "Task Earn is a modern micro-earning platform where you can earn rewards across five distinct streams: taking timed knowledge speed quizzes, watching YouTube videos, training AI models, playing arcade games, and uploading POV video bounties."
    },
    {
      q: "How do I redeem rewards?",
      a: "You can redeem accumulated points for popular digital gift cards including Amazon shopping vouchers, Starbucks coffee passes, Apple credits, and Google Play cards. Digital codes are generated and archived in your Past Redemptions history."
    },
    {
      q: "How do Knowledge Speed Quizzes work?",
      a: "Each quiz features 5 timed questions with a 7-second countdown per question. Questions and answers are validated server-side to guarantee fairness, awarding 10 points per correct answer directly to your ledger."
    },
    {
      q: "How does Watch to Earn work?",
      a: "Stream featured partner YouTube video clips, tech reviews, and gaming highlights. As you watch, the completion progress bar advances; reaching 100% unlocks points for that session."
    },
    {
      q: "What is Train AI to Earn?",
      a: "AI training tasks present side-by-side prompt completions from modern language models. By voting on which model response is more accurate and helpful, you provide valuable reinforcement feedback (RLHF) and earn reward points."
    },
    {
      q: "What are POV Video Bounties?",
      a: "POV video bounties allow you to record and submit short 45-90s first-person perspective video sweeps of everyday environments (such as your desk setup, kitchen, or street walk) to train spatial computing and computer vision models for high reward payouts."
    },
    {
      q: "Is my personal data safe?",
      a: "Yes. Task Earn uses enterprise-grade Supabase authentication with strict Row Level Security. We never collect or store sensitive financial information, banking credentials, or UPI PINs."
    },
    {
      q: "How do I contact support?",
      a: "You can reach our team at support@taskearn.com or submit a message through our Contact page."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#793FFF]/10">
              <h3 className="text-xl font-bold mb-2 text-slate-900">{faq.q}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
