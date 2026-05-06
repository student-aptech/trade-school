const faqs = [
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes. The lessons start with foundations and then move into practical chart reading, setups, and risk management.",
  },
  {
    question: "How is access shared after payment?",
    answer:
      "After you submit payment proof, our team manually verifies the details and shares access through your WhatsApp contact.",
  },
  {
    question: "Do you provide trade signals?",
    answer:
      "The community includes setup based trade callouts and market updates, but every learner is encouraged to understand risk before taking any trade.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can contact support on WhatsApp if you want to upgrade your plan after joining.",
  },
];

export function FAQs() {
  return (
    <section
      id="faqs"
      data-reveal
      className="relative mt-12 scroll-mt-28 px-5 py-10 lg:mt-16 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
            FAQs
          </p>
          <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px]">
            Common questions
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              data-reveal
              className="rounded-[18px] border border-[#080808]/10 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black tracking-[-0.02em] text-[#080808]">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#080808]/64">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
