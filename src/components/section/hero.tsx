import type { CSSProperties } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { CloudinaryVideoPlayer } from "../CloudinaryVideoPlayer";

const heroVideo = {
  title: "Welcome Members",
  source: "2026-04-30_12-06-25_a601z7",
  poster:
    "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=1200&q=80",
};

const heroStats = [
  ["80%+", "Success Rate"],
  ["7+", "Trading Experience"],
  ["3400+", "International Clients"],
];

export function Hero() {
  return (
    <>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(8,8,8,0.055)_1px,transparent_1px)] bg-[size:44px_44px,44px_44px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#080808]/10" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-14 pt-28 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-36 xl:px-5">
        <div className="grid min-h-[600px] items-center gap-10 lg:min-h-[660px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          <div className="relative z-10">
            <div className="motion-rise mb-8 inline-flex items-center gap-2 rounded-full border border-[#0899b8]/80 px-3.5 py-2 text-[13px] font-medium text-[#0899b8]">
              <span className="motion-pulse-dot h-1.5 w-1.5 rounded-full bg-[#0899b8]" />
              Trusted by 3,400+ traders
            </div>

            <h1
              className="hero-display-heading motion-rise max-w-[560px] text-[46px] uppercase leading-[0.94] tracking-[-0.035em] text-[#080808] sm:text-[68px] lg:text-[64px] xl:text-[72px]"
              style={{ "--motion-delay": "120ms" } as CSSProperties}
            >
              Master VSA,
              <span className="block text-[#0899b8]">Trade with</span>
              <span className="block text-[#080808] mix-blend-difference">
                Confidence.
              </span>
            </h1>

            <p
              className="motion-rise relative z-20 mt-8 max-w-[365px] text-[15px] font-medium leading-6 text-[#080808]"
              style={{ "--motion-delay": "220ms" } as CSSProperties}
            >
              Master VSA & Ripster's EMA Setup with a fixed, repeatable trading
              system. Start your journey today join our discord community and
              unlock expert trading stratigies.
            </p>

            <div
              className="motion-rise mt-6 flex flex-wrap items-center gap-3"
              style={{ "--motion-delay": "320ms" } as CSSProperties}
            >
              <a
                href="#pricing"
                className="motion-shine inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0899b8] px-7 text-[14px] font-semibold text-[#080808] transition hover:bg-[#0899b8]"
              >
                Start Trading Now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#testimonials"
                className="motion-lift inline-flex h-11 items-center justify-center rounded-full border border-[#080808]/18 bg-white px-6 text-[14px] font-semibold text-[#080808] shadow-sm transition hover:border-[#0899b8] hover:text-[#0899b8]"
              >
                Trade Recaps
              </a>
            </div>

            <div
              className="motion-rise mt-8 grid max-w-[360px] grid-cols-3 gap-4"
              style={{ "--motion-delay": "420ms" } as CSSProperties}
            >
              {heroStats.map(([value, label]) => (
                <div key={label}>
                  <p className="text-[30px] font-black leading-none tracking-wide text-[#080808]">
                    {value}
                  </p>
                  <p className="mt-2 text-[14px] text-[#080808]/58">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[360px] items-center sm:min-h-[440px] lg:min-h-[580px]">
            <div className="pointer-events-none absolute -top-[180px] left-[20%] z-10 hidden h-[280px] w-4 rounded-b-full border-x border-[#0899b8]/20 bg-[#080808] shadow-[0_14px_34px_rgba(0,0,0,0.28)] lg:block" />
            <div className="pointer-events-none absolute -top-[180px] right-[20%] z-10 hidden h-[280px] w-4 rounded-b-full border-x border-[#0899b8]/20 bg-[#080808] shadow-[0_14px_34px_rgba(0,0,0,0.28)] lg:block" />

            <div className="hero-hanging-video relative z-20 w-full overflow-hidden rounded-[34px] border-2 border-[#080808] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
              <span className="pointer-events-none absolute left-[20%] top-0 z-20 hidden h-3 w-8 -translate-x-2 rounded-b-full bg-[#080808] lg:block" />
              <span className="pointer-events-none absolute right-[20%] top-0 z-20 hidden h-3 w-8 translate-x-2 rounded-b-full bg-[#080808] lg:block" />

              <div className="flex flex-col gap-3 border-b border-[#0899b8]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0899b8]">
                    The Trade School
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#ffffff]">
                    {heroVideo.title}
                  </h2>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0899b8]/15 bg-[#111111] px-4 py-2 text-xs font-semibold text-[#cfcfcf]">
                  <PlayCircle className="h-4 w-4 text-[#0899b8]" />
                  The Trade School
                </span>
              </div>

              <CloudinaryVideoPlayer
                source={heroVideo.source}
                poster={heroVideo.poster}
                title={heroVideo.title}
                autoPlay
                className="h-[300px] w-full bg-black sm:h-[380px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
