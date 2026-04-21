const faqs = [
  {
    question: "Do I need an architect or electrical contractor to start?",
    answer:
      "Usually, a prospect does not need an architect just to explore the opportunity. Most sites eventually need an electrical contractor for technical review, and more complex projects may also need an engineer or architect later.",
  },
  {
    question: "How much does a charging station usually cost?",
    answer:
      "For many New York style host sites, Level 2 charging often lands around $8,000 to $25,000 per port before incentives. Final cost depends on electrical capacity, trenching, panel upgrades, permits, and site layout.",
  },
  {
    question: "What kind of ROI should a property expect?",
    answer:
      "There is no single average ROI. Utilization is the biggest driver. For a straightforward Level 2 site with incentives and real usage, rough payback is often around 3 to 7 years. Stronger sites can do better, and weak-utilization sites may not justify the project.",
  },
  {
    question: "Can Jetizon help with incentives and screening?",
    answer:
      "Yes. Jetizon can help screen whether a site looks viable, organize intake materials, and identify likely incentive and rebate paths. Final eligibility depends on program rules, utility review, and project details.",
  },
];

export default function FaqBlock() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.85fr,1.15fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            Common questions from host sites.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            These are the questions Jetizon hears most often from property owners,
            managers, and businesses exploring charging for the first time.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                <div className="flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-cyan-300 transition group-open:rotate-45">+</span>
                </div>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
