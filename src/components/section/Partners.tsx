import { ExternalLink } from "lucide-react";
import { tradingPartners } from "../../data/appData";

export function Partners() {
  return (
    <div
      id="trading-partners"
      data-reveal
      className="relative mt-12 scroll-mt-28 overflow-visible p-5 lg:mt-16 lg:p-8 d-flex justify-center items-center"
    >
      <div className="relative z-10 mb-8 text-center lg:mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
          Partners
        </p>
        <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
          Our trading
          <br />
          <span className="text-[#0899b8]">partners</span>
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
        {tradingPartners.map((partner) => (
          <div
            key={partner.name}
            data-reveal
            className="motion-lift flex min-h-[185px] flex-col justify-between rounded-[14px] border border-[#0899b8]/18 bg-[#080808] p-4 text-center shadow-sm"
          >
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#0899b8]/18 bg-white p-2">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-[15px] font-black leading-tight text-white">
                {partner.name}
              </h3>
              <p className="mt-2 text-[11px] leading-4 text-[#cfcfcf]">
                {partner.description}
              </p>
            </div>

            <button className="mt-4 inline-flex h-8 items-center justify-center gap-1.5 rounded-[8px] border border-[#0899b8] px-3 text-[11px] font-semibold text-white transition hover:bg-[#0899b8] hover:text-[#080808]">
              Visit Site
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="relative left-1/2 right-1/2 mt-12 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden py-2"
      >
        <div
          className="motion-ticker flex w-max"
          style={{ animation: "scrollLeft 24s linear infinite" }}
        >
          {[0, 1].map((group) => (
            <div
              key={`partners-left-${group}`}
              className="flex shrink-0 items-center gap-20 pr-20"
            >
              {tradingPartners.map((partner) => (
                <div
                  key={`${partner.name}-logo-${group}`}
                  className="flex h-24 min-w-[210px] items-center justify-center opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-[190px] object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className="motion-ticker mt-6 flex w-max"
          style={{ animation: "scrollRight 28s linear infinite" }}
        >
          {[0, 1].map((group) => (
            <div
              key={`partners-right-${group}`}
              className="flex shrink-0 items-center gap-20 pr-20"
            >
              {tradingPartners.map((partner) => (
                <div
                  key={`${partner.name}-logo-reverse-${group}`}
                  className="flex h-24 min-w-[210px] items-center justify-center opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-[190px] object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
