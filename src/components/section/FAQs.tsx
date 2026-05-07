import { useState } from "react";
import { faqs } from "../../data/appData";

export function FAQs() {
  const [openQuestion, setOpenQuestion] = useState(`${faqs[0].question}-0`);

  const goToCheckout = () => {
    window.history.pushState({}, "", "/checkout");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section
      id="faqs"
      data-reveal
      className="relative mt-12 scroll-mt-28 px-5 py-16 lg:mt-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[980px]">
        <div className="relative z-10 mb-8 text-center lg:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
            Frequently Asked Questions
          </p>
          <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
            Everything you need
            <br />
            <span className="text-[#0899b8]">to know</span>
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#080808] px-8 text-sm font-semibold text-black transition hover:border-[#0899b8] hover:bg-[#0899b8] hover:text-[#ffffff]"
            >
              See Plans
            </a>
            <button
              type="button"
              onClick={goToCheckout}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#080808] px-8 text-sm font-semibold text-white transition hover:bg-[#0899b8] hover:text-[#080808]"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-[760px] gap-5">
          {faqs.map((faq, index) => {
            const faqId = `${faq.question}-${index}`;
            const isOpen = openQuestion === faqId;

            return (
              <div
                key={faqId}
                data-reveal
                className="rounded-[24px] bg-white px-6 py-5 border-2 border-gray-300 shadow-[0_30px_50px_rgba(8,8,8,0.08)] sm:px-8"
              >
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? "" : faqId)}
                  className="flex w-full items-center justify-between gap-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-black leading-tight tracking-[-0.02em] text-[#080808] sm:text-xl">
                    {faq.question}
                  </span>
                  <span className="relative h-6 w-6 shrink-0 text-[#080808]/72">
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    <span
                      className={`absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition ${
                        isOpen ? "rotate-90 opacity-0" : "opacity-100"
                      }`}
                    />
                  </span>
                </button>

                {isOpen ? (
                  <p className="mt-3 max-w-[610px] text-base leading-7 text-[#080808]/50">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
