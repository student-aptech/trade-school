import { useEffect, useRef, useState } from "react";
import { PlayCircle } from "lucide-react";
import { CloudinaryVideoPlayer } from "../CloudinaryVideoPlayer";
import { heroBenefitCards, proofTabs } from "../../data/appData";

export function BenefitCards() {
  const [benefitsInView, setBenefitsInView] = useState(false);
  const [activeProofTab, setActiveProofTab] = useState(0);
  const heroBenefitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = heroBenefitsRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBenefitsInView(true);
      },
      { threshold: 0.28 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 overflow-hidden border-y border-[#080808]/10 bg-white text-[#080808] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(8,8,8,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(8,8,8,0.045)_1px,transparent_1px)] before:bg-[size:42px_42px] before:[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
      <div
        ref={heroBenefitsRef}
        className="relative mx-auto w-full max-w-[1240px] px-5 py-14 lg:px-8 lg:py-20 xl:px-5"
      >
        <div
          className={`relative transition-all duration-700 ${
            benefitsInView
              ? "translate-y-0 opacity-100"
              : "translate-y-14 opacity-0"
          }`}
        >
          <div className="mb-8 text-center lg:mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#080808]/58">
              Why Join <span className="text-[#0899b8]">Trade School</span>
            </p>
            <h2 className="section-display-heading mx-auto mt-5 max-w-[760px] text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
              Benefits of <span className="text-[#0899b8]">joining</span>
              <br />
              our academy
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-3">
              {heroBenefitCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`relative min-h-[150px] overflow-hidden rounded-[18px] p-5 text-left transition-all duration-700 sm:min-h-[170px] sm:rounded-[22px] sm:p-5 md:min-h-[174px] md:rounded-[24px] md:p-5 lg:min-h-[190px] lg:rounded-[28px] lg:p-5 ${
                    benefitsInView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  } ${
                    card.highlight
                      ? "bg-[#0899b8] text-[#080808] shadow-[0_24px_80px_rgba(8,153,184,0.22)]"
                      : "border border-[#080808]/10 bg-[#f5f5f5] text-[#080808] shadow-sm"
                  } ${
                    index === 0
                      ? "rounded-tl-[52px] sm:rounded-tl-[64px] md:rounded-tl-[82px] lg:rounded-b-[18px] lg:rounded-tl-[96px] lg:rounded-tr-[18px]"
                      : index === heroBenefitCards.length - 1
                        ? "rounded-tr-[52px] sm:rounded-tr-[64px] md:rounded-tr-[82px] lg:rounded-b-[18px] lg:rounded-tl-[18px] lg:rounded-tr-[96px]"
                        : "lg:rounded-[18px]"
                  }`}
                  style={{ transitionDelay: `${index * 110}ms` }}
                >
                  <div className="relative z-10 flex h-full flex-col justify-end">
                    <h3 className="max-w-[260px] text-[22px] font-black leading-[1.02] tracking-normal sm:text-[22px] md:text-[22px] lg:text-[24px]">
                      {card.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-[340px] text-[13px] leading-5 sm:text-[13px] sm:leading-5 md:mt-4 md:text-[13px] md:leading-5 lg:text-[13px] lg:leading-5 ${
                        card.highlight ? "text-[#080808]/62" : "text-[#080808]/58"
                      }`}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="relative z-10 mx-auto mt-14 grid w-full gap-8 overflow-hidden bg-white py-0 text-[#080808] lg:grid-cols-[0.76fr_1.24fr] lg:gap-12"
          >
            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="section-display-heading max-w-[430px] text-[54px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[72px] lg:text-[80px]">
                Data that
                <br />
                proves
                <br />
                <span className="text-[#0899b8]">your growth</span>
              </h2>

              <div className="mt-8 grid max-w-[420px] grid-cols-2 gap-3">
                {proofTabs.map((tab, index) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveProofTab(index)}
                    className={`h-12 rounded-full border px-4 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
                      activeProofTab === index
                        ? "border-[#0899b8] bg-[#0899b8] text-[#080808]"
                        : "border-[#080808]/12 bg-white text-[#080808]/62 shadow-sm hover:border-[#0899b8]/60 hover:text-[#0899b8]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-[#0899b8]/14 bg-[#080808] shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
                <div className="flex flex-col gap-3 border-b border-[#0899b8]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0899b8]">
                      Now watching
                    </p>
                    <h3 className="mt-1 text-lg font-black tracking-[-0.03em] text-[#ffffff]">
                      {proofTabs[activeProofTab].videoTitle}
                    </h3>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0899b8]/15 bg-[#111111] px-4 py-2 text-xs font-semibold text-[#cfcfcf]">
                    <PlayCircle className="h-4 w-4 text-[#0899b8]" />
                    {proofTabs[activeProofTab].label}
                  </span>
                </div>

                <CloudinaryVideoPlayer
                  source={proofTabs[activeProofTab].videoSrc}
                  poster={proofTabs[activeProofTab].poster}
                  title={proofTabs[activeProofTab].videoTitle}
                  className="aspect-video w-full bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
