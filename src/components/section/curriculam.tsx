import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { curriculumModules } from "../../data/appData";

const curriculumStats = [
  ["45", "lessons"],
  ["5", "modules"],
  ["24/7", "access"],
];

export function Curriculam() {
  const [openModule, setOpenModule] = useState(0);
  const activeModule = curriculumModules[openModule];
  const progress = ((openModule + 1) / curriculumModules.length) * 100;

  return (
    <div
      id="curriculum"
      data-reveal
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen scroll-mt-28 overflow-hidden border-y border-[#080808]/10 bg-white px-5 py-16 text-[#080808] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(8,8,8,0.06)_0_1px,transparent_1px_18px)] lg:px-8 lg:py-24"
    >
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
              Curriculum
            </p>
            <h2 className="section-display-heading mt-5 max-w-[560px] text-[46px] leading-[0.9] tracking-[-0.045em] text-[#080808] sm:text-[64px]">
              Your trading
              <br />
              <span className="text-[#0899b8]">roadmap</span>
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-8 text-[#080808]/62">
              A premium pathway from market basics to confident execution, built
              around structure, repetition, review, and risk-first decision
              making.
            </p>

            <div className="mt-8 grid max-w-[520px] grid-cols-3 gap-3">
              {curriculumStats.map(([value, label]) => (
                <div
                  key={label}
                  data-reveal
                  className="motion-lift rounded-[18px] border border-[#080808]/10 bg-white p-4 shadow-sm"
                >
                  <p className="text-3xl font-black leading-none text-[#0899b8]">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#080808]/52">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="relative overflow-hidden rounded-[34px] border border-[#0899b8]/20 bg-[#080808] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
          >
            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[360px] overflow-hidden rounded-[26px] bg-black">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
                  alt={activeModule.title}
                  className="motion-image absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-[#e8e8e8] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#080808]">
                  Module {String(openModule + 1).padStart(2, "0")}
                </div>
                <button className="motion-shine absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0899b8] text-[#080808] shadow-[0_18px_46px_rgba(8,153,184,0.24)]">
                  <PlayCircle className="h-9 w-9" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0899b8]">
                    Featured lesson
                  </p>
                  <h3 className="mt-2 text-3xl font-black leading-none tracking-[-0.035em] text-white">
                    {activeModule.title.replace(/^Module \d+:\s/, "")}
                  </h3>
                </div>
              </div>

              <div className="relative flex min-h-[360px] flex-col justify-between rounded-[26px] border border-[#0899b8]/10 bg-[#080808] p-6">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-[#0899b8]/20 bg-[#0899b8]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0899b8]">
                      {activeModule.lessons} lessons
                    </span>
                    <span className="text-sm font-semibold text-[#e8e8e8]/46">
                      {openModule + 1}/{curriculumModules.length}
                    </span>
                  </div>
                  <h3 className="mt-8 max-w-[420px] text-4xl font-black leading-[0.95] tracking-[-0.04em] text-[#ffffff]">
                    {activeModule.title}
                  </h3>
                  <p className="mt-5 max-w-[520px] text-base leading-8 text-[#cfcfcf]">
                    {activeModule.content}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#e8e8e8]/52">
                    <span>Roadmap progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e8e8e8]/10">
                    <div
                      className="h-full rounded-full bg-[#0899b8] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {curriculumModules.map((module, index) => {
                const isOpen = openModule === index;
                return (
                  <button
                    key={module.title}
                    type="button"
                    onClick={() => setOpenModule(index)}
                    data-reveal
                    className={`group motion-lift rounded-[20px] border p-4 text-left transition ${
                      isOpen
                        ? "border-[#0899b8] bg-[#0899b8] text-[#080808]"
                        : "border-[#0899b8]/10 bg-[#080808] text-[#ffffff] hover:border-[#0899b8]/45"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${
                        isOpen
                          ? "bg-[#080808] text-[#0899b8]"
                          : "bg-[#1a1a1a] text-[#0899b8]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 text-sm font-black leading-tight">
                      {module.title.replace(/^Module \d+:\s/, "")}
                    </p>
                    <p
                      className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        isOpen ? "text-[#080808]/55" : "text-[#e8e8e8]/42"
                      }`}
                    >
                      {module.lessons} lessons
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
