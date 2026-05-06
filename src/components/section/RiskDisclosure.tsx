export function RiskDisclosure() {
  return (
    <section
      id="risk-disclosure"
      data-reveal
      className="relative mt-10 bg-[#080808] px-5 py-10 text-white lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
          Risk Disclosure
        </p>
        <h2 className="section-display-heading mt-3 text-[34px] leading-none tracking-[-0.04em] sm:text-[48px]">
          Trading involves risk.
        </h2>
        <div className="mt-5 grid gap-4 text-sm leading-6 text-[#cfcfcf] md:grid-cols-2">
          <p>
            The Trade School provides education, market discussion, and learning
            resources only. Nothing on this website should be treated as
            financial advice, investment advice, or a guarantee of profit.
          </p>
          <p>
            Markets can move against you, and losses can happen. Always trade
            with a plan, use proper risk management, and make decisions based on
            your own research and financial situation.
          </p>
        </div>
      </div>
    </section>
  );
}
