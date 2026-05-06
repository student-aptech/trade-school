export function MyIntroduction() {
  return (
    <section
      id="introduction"
      data-reveal
      className="relative mt-12 scroll-mt-28 px-5 py-10 lg:mt-16 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1180px] gap-6 rounded-[24px] border border-[#080808]/10 bg-[#f7f7f7] p-5 shadow-sm md:grid-cols-[0.9fr_1.1fr] sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
            My Introduction
          </p>
          <h2 className="section-display-heading mt-4 text-[40px] leading-[0.9] tracking-[-0.045em] text-[#080808] sm:text-[56px]">
            Learn trading with a practical mentor.
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-7 text-[#080808]/68 sm:text-base">
          <p>
            I built The Trade School for learners who want clear structure,
            real chart examples, and disciplined execution instead of random
            market noise.
          </p>
          <p>
            The focus is simple: understand the market, manage risk, practice
            repeatable setups, and grow with a serious trading community.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Structured lessons", "Live context", "Risk-first mindset"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[14px] border border-[#0899b8]/14 bg-white p-4 text-sm font-bold text-[#080808]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
