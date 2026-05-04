import { useState } from "react";
import { Check } from "lucide-react";
import { pricingPlans } from "../../data/appData";
import type { Currency, PricingPlan } from "../../types";

export function Plans() {
  const [currency, setCurrency] = useState<Currency>("pkr");

  const formatPrice = (plan: PricingPlan) => {
    const amount = plan.price[currency];
    return currency === "pkr"
      ? `PKR ${amount.toLocaleString()}`
      : `$${amount.toLocaleString()}`;
  };

  const formatAmount = (amount: number) =>
    currency === "pkr"
      ? `PKR ${amount.toLocaleString()}`
      : `$${amount.toLocaleString()}`;

  return (
    <div
      id="pricing"
      data-reveal
      className="relative mt-12 scroll-mt-28 overflow-hidden p-5 lg:mt-16 lg:p-8"
    >
      <div className="relative z-10 mb-8 text-center lg:mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
          Pricing
        </p>
        <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
          Choose your
          <br />
          trade school <span className="text-[#0899b8]">plan</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#080808]/62 sm:text-lg">
          Pick the level that matches your learning stage and switch between PKR
          and USD inside each card.
        </p>
      </div>

      <div className="relative z-10 mt-20 mx-auto grid w-full gap-6 md:max-w-[560px] lg:max-w-none lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            data-reveal
            className={`motion-lift relative overflow-hidden rounded-[24px] border p-5 shadow-sm transition ${
              plan.highlighted
                ? "z-10 border-2 border-[#0899b8] bg-[#0b0b0b] shadow-[0_26px_80px_rgba(8,153,184,0.30),0_16px_42px_rgba(0,0,0,0.28)] ring-4 ring-[#0899b8]/12 lg:-mt-6 lg:scale-[1.04]"
                : "border-[#0899b8]/8 bg-[#111111]"
            }`}
          >
            {plan.highlighted && (
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#0899b8]/22 blur-3xl" />
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                    plan.highlighted
                      ? "bg-[#0899b8] text-[#080808]"
                      : "bg-[#111111] text-[#ffffff] border border-[#0899b8]/8"
                  }`}
                >
                  {plan.discountText}
                </div>
                <h3 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#ffffff]">
                  {plan.name}
                </h3>
                <p className="mt-2 max-w-[290px] text-[13px] leading-5 text-[#cfcfcf]">
                  {plan.description}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[18px] border border-[#0899b8]/8 bg-[#111111]/80 p-3">
              <div className="inline-flex rounded-[10px] border border-[#0899b8]/8 bg-[#1a1a1a] p-1">
                <button
                  onClick={() => setCurrency("pkr")}
                  className={`min-w-[82px] rounded-[8px] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    currency === "pkr"
                      ? "bg-[#0899b8] text-[#080808]"
                      : "text-[#cfcfcf]"
                  }`}
                >
                  PKR
                </button>
                <button
                  onClick={() => setCurrency("usd")}
                  className={`min-w-[82px] rounded-[8px] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    currency === "usd"
                      ? "bg-[#0899b8] text-[#080808]"
                      : "text-[#cfcfcf]"
                  }`}
                >
                  USD
                </button>
              </div>

              {plan.originalPrice && (
                <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-[#cfcfcf]/70">
                  <span>Was</span>
                  <span className="line-through decoration-[#ff6b6b] decoration-2">
                    {formatAmount(plan.originalPrice[currency])}
                  </span>
                </div>
              )}

              <div
                className={`flex items-end gap-1 ${
                  plan.originalPrice ? "mt-1" : "mt-3"
                }`}
              >
                <span className="text-[42px] font-semibold leading-none tracking-[-0.06em] text-[#ffffff] sm:text-5xl">
                  {formatPrice(plan)}
                </span>
                <span className="pb-1 text-lg font-medium text-[#cfcfcf]">
                  /{plan.periodLabel}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 rounded-[14px] border border-[#0899b8]/6 bg-[#111111]/70 p-2.5"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0899b8] text-[#080808]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-[13px] leading-5 text-[#ffffff]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <button
              className={`motion-shine mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[14px] font-semibold transition ${
                plan.highlighted
                  ? "bg-[#0899b8] text-[#080808] shadow-[0_16px_34px_rgba(8,153,184,0.28)] hover:bg-[#13b2d1]"
                  : "border border-[#0899b8]/10 bg-[#111111] text-[#ffffff] hover:bg-[#1a1a1a]"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
