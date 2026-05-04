import { communityWinItems } from "../../data/appData";

export function CommunityWins() {
  return (
    <div
      id="community-wins"
      data-reveal
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-12 w-screen scroll-mt-28 overflow-hidden lg:mt-16"
    >
      <div className="relative z-10 mx-auto mb-8 max-w-[1240px] px-5 text-center lg:mb-10 lg:px-8 xl:px-5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
          Community Wins
        </p>
        <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
          Real <span className="text-[#0899b8]">member</span> wins
          <br />
          moving all day
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#080808]/62 sm:text-lg">
          A live style wall of community wins, trade ideas, and shared
          executions that keeps moving automatically.
        </p>
      </div>

      <div
        data-reveal
        className="relative z-10 w-full overflow-hidden border-y border-[#0899b8]/8 px-4 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid w-full max-w-[1640px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((columnIndex) => {
            const items = communityWinItems.filter(
              (_, idx) => idx % 3 === columnIndex,
            );
            const duplicated = [...items, ...items];
            const reverse = columnIndex === 1;

            return (
              <div
                key={columnIndex}
                className={`${columnIndex === 2 ? "hidden lg:block" : ""} relative h-[680px] overflow-hidden rounded-[18px] border border-[#0899b8]/8 sm:h-[740px] lg:h-[820px]`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#ffffff] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#ffffff] to-transparent" />

                <div
                  className="motion-ticker flex flex-col gap-4 p-4"
                  style={{
                    animation: `${reverse ? "communityWinsUpReverse" : "communityWinsUp"} 32s linear infinite`,
                  }}
                >
                  {duplicated.map((item, idx) => (
                    <div
                      key={`${item.image}-${idx}`}
                      className="motion-lift mx-auto w-full max-w-[420px] overflow-hidden rounded-[14px] border border-[#0899b8]/10 p-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        loading="lazy"
                        className="w-full rounded-[10px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
