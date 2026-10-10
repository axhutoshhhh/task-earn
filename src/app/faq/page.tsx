export default function FAQPage() {
  const faqs = [
    {
      q: "What is Task Earn?",
      a: "Task Earn is a demo platform where you can earn simulated points by completing quizzes. It is currently in development."
    },
    {
      q: "Are the rewards real?",
      a: "No. All points and rewards on Task Earn are simulated and have no real-world monetary value. This is clearly indicated throughout the platform."
    },
    {
      q: "How do quizzes work?",
      a: "Each quiz has 5 multiple-choice questions with a 7-second timer per question. You earn demo points for correct answers."
    },
    {
      q: "When will Tasks and Surveys be available?",
      a: "Tasks and Surveys will be added once we have verified and approved provider integrations. We will not add them until legitimate providers approve our platform."
    },
    {
      q: "Is my data safe?",
      a: "We use Supabase with Row Level Security and follow security best practices. We never collect sensitive financial information like UPI PINs or bank passwords."
    },
    {
      q: "How do I contact support?",
      a: "Visit our Contact page or email support@taskearn.com (placeholder)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{faq.q}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
