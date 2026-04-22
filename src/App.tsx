import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, PlayCircle } from "lucide-react";

type Currency = "pkr" | "usd";

type PricingPlan = {
  name: string;
  monthly: { usd: number; pkr: number };
  description: string;
  features: string[];
  code: string;
  discountText: string;
  cta: string;
  highlighted: boolean;
};

type WinSlide = {
  user: string;
  setup: string;
  pnl: string;
  tag: string;
  notes: string;
};

type WinCard = {
  title: string;
  text: string;
  slides: WinSlide[];
};

type CommunityWinItem = {
  user: string;
  setup: string;
  pnl: string;
  tag: string;
  notes: string;
  title: string;
};

type ShowcaseRow = {
  title: string;
  text: string;
  slides: string[];
};

const benefits = [
  "Build a clear trading framework instead of relying on random entries",
  "Understand market structure, momentum, and execution with more confidence",
  "Learn repeatable setups you can apply in real market conditions",
  "Improve risk management so losses stay controlled and planned",
  "Follow a structured learning path from beginner concepts to advanced execution",
  "Develop discipline, patience, and decision making under pressure",
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthly: { usd: 29, pkr: 8199 },
    description:
      "Perfect for beginners who want a clear foundation and access to the core Trade School experience.",
    features: [
      "Core trading lessons and beginner roadmap",
      "Access to recorded educational modules",
      "Trade recap library",
      "Basic community access",
      "Weekly learning updates",
    ],
    code: "START20",
    discountText: "LIMITED OFFER",
    cta: "Join Starter",
    highlighted: false,
  },
  {
    name: "Pro Trader",
    monthly: { usd: 49, pkr: 13999 },
    description:
      "Built for serious learners who want deeper education, stronger structure, and more active guidance.",
    features: [
      "Everything in Starter",
      "Advanced strategy lessons",
      "Priority access to trade recap breakdowns",
      "Members only market insights",
      "Private community channels",
      "Bonus execution focused content",
    ],
    code: "PRO20",
    discountText: "MOST POPULAR",
    cta: "Join Pro Trader",
    highlighted: true,
  },
  {
    name: "Elite Mentorship",
    monthly: { usd: 79, pkr: 22499 },
    description:
      "Designed for traders who want the most complete learning experience with premium support and deeper access.",
    features: [
      "Everything in Pro Trader",
      "Elite workshops and mentorship sessions",
      "Priority support inside the community",
      "Exclusive premium trade reviews",
      "Advanced risk and execution training",
      "First access to all new resources",
    ],
    code: "ELITE20",
    discountText: "PREMIUM ACCESS",
    cta: "Join Elite Mentorship",
    highlighted: false,
  },
];

const winCards: WinCard[] = [
  {
    title: "Breakout winner shared by a community member",
    text: "A clean momentum trade with disciplined execution, partials into strength, and strong follow through after the breakout.",
    slides: [
      {
        user: "Ali R.",
        setup: "$NVDA Breakout Long",
        pnl: "+$482",
        tag: "A+ Setup",
        notes:
          "Entry over pre market high, trimmed into extension, final exit into momentum fade.",
      },
      {
        user: "Hamza T.",
        setup: "$TSLA Trend Continuation",
        pnl: "+$365",
        tag: "Clean Execution",
        notes:
          "Held trend above key EMA levels and managed risk tightly on the pullback entry.",
      },
      {
        user: "Sana K.",
        setup: "$META Reclaim Long",
        pnl: "+$529",
        tag: "Member Win",
        notes:
          "Waited for reclaim confirmation, scaled out into resistance, and protected gains well.",
      },
    ],
  },
  {
    title: "High quality trade plans from inside the community",
    text: "Members improve by sharing structure, reviewing execution, and focusing on risk first before chasing outcomes.",
    slides: [
      {
        user: "Usman M.",
        setup: "$AMD Day 2 Continuation",
        pnl: "+$418",
        tag: "Structured Trade",
        notes:
          "Planned the move pre market and executed around key levels with patience and discipline.",
      },
      {
        user: "Areeba N.",
        setup: "$PLTR Range Break",
        pnl: "+$274",
        tag: "Good Risk",
        notes:
          "Kept the stop tight, respected the plan, and let the setup develop before adding.",
      },
      {
        user: "Bilal S.",
        setup: "$AMZN Pullback Long",
        pnl: "+$603",
        tag: "Strong Follow Through",
        notes:
          "Entered after pullback confirmation and locked profits into the next major expansion leg.",
      },
    ],
  },
  {
    title: "Students turning education into real confidence",
    text: "These examples show how members apply repeatable process, clearer planning, and better decision making in live markets.",
    slides: [
      {
        user: "Hassan P.",
        setup: "$AAPL Opening Range Break",
        pnl: "+$391",
        tag: "Disciplined Win",
        notes:
          "Waited for confirmation after the open and followed the plan without overtrading.",
      },
      {
        user: "Zara F.",
        setup: "$QQQ Trend Ride",
        pnl: "+$458",
        tag: "Trend Trade",
        notes:
          "Managed the trade around structure and stayed in the move while momentum remained intact.",
      },
      {
        user: "Omar J.",
        setup: "$SMCI Momentum Push",
        pnl: "+$712",
        tag: "Community Highlight",
        notes:
          "Good entry timing, well managed size, and disciplined exits into strength.",
      },
    ],
  },
];

const communityWinItems: CommunityWinItem[] = winCards.flatMap((card) =>
  card.slides.map((slide) => ({ ...slide, title: card.title })),
);

const showcaseRows: ShowcaseRow[] = [
  {
    title: "See how members review and improve their setups",
    text: "Every lesson is designed to help traders understand why a setup works, what risk looks like, and how to plan trades with more clarity.",
    slides: [
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Watch real examples that connect theory with execution",
    text: "Our breakdowns focus on practical learning so students can see market structure, timing, and decision making in action.",
    slides: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Follow a path built for confidence and consistency",
    text: "We simplify the learning process with clear modules, reviews, and visual examples that help members grow step by step.",
    slides: [
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Learn inside a serious trading community",
    text: "The goal is not just content. It is building a complete environment where traders can learn, review, and stay accountable.",
    slides: [
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Study practical workflows that can be applied immediately",
    text: "From pre market preparation to trade management, our material is structured to make learning easier and more actionable.",
    slides: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Turn education into a repeatable daily process",
    text: "Members do not just watch content. They learn how to build routines, improve execution, and approach the market with intent.",
    slides: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

const curriculumModules = [
  {
    title: "Module 1: Trading Foundations",
    lessons: 8,
    content:
      "Learn market basics, chart structure, terminology, and how to build a strong trading mindset before taking live setups.",
  },
  {
    title: "Module 2: Technical Analysis",
    lessons: 12,
    content:
      "Understand support and resistance, trend structure, momentum, price action, and how to read charts with clarity.",
  },
  {
    title: "Module 3: Strategy and Execution",
    lessons: 10,
    content:
      "Discover repeatable setups, trade planning, entry timing, stop placement, and disciplined execution rules.",
  },
  {
    title: "Module 4: Risk Management",
    lessons: 6,
    content:
      "Protect capital with position sizing, risk control frameworks, drawdown management, and emotional discipline.",
  },
  {
    title: "Module 5: Live Market Application",
    lessons: 9,
    content:
      "Apply what you learn using real market examples, review sessions, and guided trade breakdowns.",
  },
];

function TestimonialRow({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) {
  const list = [...images, ...images];

  return (
    <div className="mb-5 overflow-hidden">
      <div
        className="flex gap-5"
        style={{
          animation: `${reverse ? "scrollRight" : "scrollLeft"} 22s linear infinite`,
        }}
      >
        {list.map((img, i) => (
          <div
            key={`${img}-${i}`}
            className="h-[160px] min-w-[340px] overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm"
          >
            <img
              src={img}
              alt={`Feedback preview ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TradingHeroSection() {
  const [activeSection, setActiveSection] = useState("#overview");
  const [openModule, setOpenModule] = useState(0);
  const [currency, setCurrency] = useState<Currency>("pkr");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "#overview",
        "#curriculum",
        "#benefits",
        "#community-wins",
        "#learning-experience",
        "#testimonials",
        "#pricing",
      ];

      let current = "#overview";
      sections.forEach((id) => {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Overview", href: "#overview" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "Benefits", href: "#benefits" },
      { label: "Community Wins", href: "#community-wins" },
      { label: "Learning", href: "#learning-experience" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
    ],
    [],
  );

  const formatPrice = (plan: PricingPlan) => {
    const amount = plan.monthly[currency];
    return currency === "pkr" ? `₨${amount.toLocaleString()}` : `$${amount}`;
  };

  const testimonialImages = [
    "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <>
      <style>{`
        @keyframes communityWinsUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes communityWinsUpReverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <section
        id="overview"
        className="relative overflow-hidden bg-[#d9d8d4] text-[#171717]"
        style={{
          scrollBehavior: "smooth",
          fontFamily: '"Inter", "SF Pro Display", "Segoe UI", sans-serif',
        }}
      >
        <div className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-[#f3f0ea]/90 backdrop-blur-xl">
          <div className="flex w-full items-center justify-between gap-4 px-4 py-4 lg:px-6">
            <div className="hidden items-center gap-3 lg:flex">
              <img
                src="/tenet-logo.png"
                alt="The Trade School"
                className="h-16   w-auto object-contain"
              />
            </div>

            <nav className="hidden items-center gap-2 rounded-full border border-black/6 bg-white/80 px-3 py-2 shadow-sm lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(item.href);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeSection === item.href
                      ? "bg-[#2d7a52] text-white"
                      : "text-[#5f5a54] hover:bg-[#f0ece5] hover:text-[#171717]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="shrink-0 rounded-full bg-[#181818] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:opacity-90">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,122,82,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(45,122,82,0.05),transparent_24%),linear-gradient(to_bottom,rgba(248,245,239,0.98),rgba(235,232,226,1))]" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <div className="relative w-full px-2 pb-12 pt-28 lg:px-6 lg:pb-16">
          <div className="overflow-hidden rounded-[36px] border border-black/6 bg-[#f7f4ee]/95 shadow-[0_20px_70px_rgba(24,24,24,0.08)]">
            <div className="px-4 py-8 lg:px-10 lg:py-12">
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-[#171717]">
                    <span className="text-xl leading-none text-[#d7a24f]">★</span>
                    <span>4.9/5 from Trade School members</span>
                  </div>

                  <h1 className="max-w-[880px] text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#111111] sm:text-6xl lg:text-[88px]">
                    Trade smarter;
                    <br />
                    grow with structure.
                  </h1>
                </div>

                <div className="max-w-[560px] lg:justify-self-end">
                  <p className="text-lg leading-8 text-[#4f4a45] sm:text-xl">
                    The Trade School helps students learn market structure,
                    review real setups, and build disciplined trading habits in
                    one focused learning dashboard.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex h-14 items-center justify-center rounded-[10px] bg-[#2d7a52] px-7 text-base font-semibold text-white shadow-[0_10px_26px_rgba(45,122,82,0.24)] transition hover:bg-[#266847]">
                      Start Learning
                    </button>
                    <button className="inline-flex h-14 items-center justify-center rounded-[10px] border border-black/10 bg-[#fffdf9] px-7 text-base font-semibold text-[#171717] transition hover:bg-[#f0ece5]">
                      View Curriculum
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-4 lg:grid-cols-[0.72fr_1.08fr_1.44fr]">
                <div className="flex min-h-[300px] flex-col justify-between rounded-[16px] bg-[#789382] p-6 text-white shadow-sm lg:min-h-[340px]">
                  <div>
                    <h3 className="max-w-[220px] text-2xl font-medium leading-7">
                      Guided trading education
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/88">
                      Clear lessons, market recaps, and community feedback for
                      better decision making.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white/75">
                      Join the program with
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {["A", "H", "S"].map((member) => (
                          <div
                            key={member}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#789382] bg-[#f7f4ee] text-xs font-bold text-[#2d7a52]"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm font-semibold leading-4">
                        5.8k+
                        <span className="block text-xs font-medium text-white/78">
                          Members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-h-[300px] rounded-[16px] bg-[#e8dfc9] p-6 text-[#171717] shadow-sm lg:min-h-[340px]">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#fffaf0] text-[#d7a24f]">
                        <PlayCircle className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold">
                        Weekly Setup Goal
                      </span>
                    </div>
                    <div className="text-2xl font-medium tracking-[-0.04em]">
                      12
                      <span className="ml-1 text-sm tracking-normal text-[#5f5a54]">
                        reviews
                      </span>
                    </div>
                  </div>

                  <div className="pt-24">
                    <div className="flex items-end gap-2">
                      <span className="text-[34px] font-medium leading-none tracking-[-0.05em]">
                        8
                      </span>
                      <span className="pb-1 text-sm font-medium text-[#5f5a54]">
                        setups studied today
                      </span>
                    </div>

                    <div className="mt-5 flex h-12 items-end gap-1">
                      {Array.from({ length: 34 }).map((_, index) => (
                        <span
                          key={index}
                          className={`block w-2 rounded-full ${
                            index < 25 ? "bg-[#3f321f]" : "bg-white/75"
                          }`}
                          style={{
                            height: `${18 + ((index * 7) % 24)}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[300px] overflow-hidden rounded-[16px] bg-[#d8d1bf] shadow-sm lg:min-h-[340px]">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
                    alt="Trading dashboard preview"
                    className="absolute inset-0 h-full w-full object-cover saturate-[0.78] sepia-[0.12]"
                  />
                  <div className="absolute inset-0 bg-[#2d7a52]/18 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173322]/55 via-[#e8dfc9]/8 to-[#f7f4ee]/22" />
                  <div className="absolute bottom-5 left-5 rounded-[8px] bg-[#fffdf9] px-5 py-3 text-sm font-semibold text-[#171717] shadow-lg">
                    Trading skills in your pocket
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/6 px-4 py-10 lg:px-10 lg:py-12">
              <div className="mx-auto max-w-[1480px] text-center">
                <h2 className="mx-auto max-w-[1200px] text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#171717] sm:text-6xl lg:text-[84px]">
                  Fueling
                  <span className="mx-4 inline-flex h-[58px] w-[220px] translate-y-[-6px] overflow-hidden rounded-full align-middle border border-black/8 bg-[#d9d8d4] shadow-sm lg:h-[72px] lg:w-[270px]">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                      alt="Overview preview"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  Your Passion Igniting Your Potential!
                </h2>

                <p className="mx-auto mt-6 max-w-[760px] text-base leading-8 text-[#5f5a54] sm:text-lg">
                  Your go to place for in depth trading education, recap driven
                  learning, and structured community support that helps members
                  build confidence step by step.
                </p>

                <div className="mt-8 flex justify-center">
                  <div className="relative w-full max-w-[900px] overflow-hidden rounded-[28px] border border-black/8 bg-[#111111]">
                    <img
                      src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80"
                      alt="Trading video thumbnail"
                      className="h-[420px] w-full object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#171717] shadow">
                      <PlayCircle className="h-4 w-4" />
                      Play
                    </div>
                    <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <PlayCircle className="h-10 w-10 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="flex justify-center">
                        <button className="rounded-[10px] bg-[#2d7a52] px-6 py-3 text-sm font-semibold text-white shadow-lg">
                          Start Now →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            <div
              id="curriculum"
              className="border-t border-black/6 px-4 py-10 lg:px-10 lg:py-14 scroll-mt-28"
            >
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                  Curriculum
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl lg:text-[60px]">
                  A premium roadmap from basics to execution.
                </h2>
                <p className="mx-auto mt-4 max-w-[820px] text-base leading-8 text-[#5f5a54] sm:text-lg">
                  Instead of random lessons, members follow a structured path
                  that builds confidence step by step through education,
                  examples, execution, and review.
                </p>
              </div>

              <div className="overflow-hidden rounded-[34px] border border-black/8 bg-[#f5f1ea] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.06)] lg:p-5">
                <div className="grid gap-4 lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex h-full flex-col rounded-[28px] bg-[linear-gradient(180deg,#fcfaf6_0%,#f3efe7_100%)] p-6 shadow-sm lg:p-8">
                    <div className="mb-6 inline-flex w-fit rounded-full border border-[#2d7a52]/15 bg-[#e7f1eb] px-4 py-2 text-sm font-semibold text-[#2d7a52] shadow-sm">
                      Learning Journey
                    </div>

                    <div className="space-y-4">
                      {curriculumModules.map((module, index) => {
                        const isOpen = openModule === index;
                        return (
                          <div
                            key={module.title}
                            className={`rounded-[24px] border transition-all ${
                              isOpen
                                ? "border-[#2d7a52]/20 bg-white shadow-[0_10px_24px_rgba(45,122,82,0.08)]"
                                : "border-black/6 bg-white/70 hover:bg-white"
                            }`}
                          >
                            <button
                              onClick={() => setOpenModule(isOpen ? -1 : index)}
                              className="flex w-full items-start gap-4 px-5 py-5 text-left"
                            >
                              <div
                                className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-sm font-bold ${
                                  isOpen
                                    ? "bg-[#2d7a52] text-white"
                                    : "bg-[#f0ebe3] text-[#171717]"
                                }`}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-4">
                                  <p className="text-lg font-semibold text-[#171717]">
                                    {module.title}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <span className="rounded-full border border-[#2d7a52]/15 bg-[#2d7a52]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2d7a52]">
                                      {module.lessons} lessons
                                    </span>
                                    <span
                                      className={`rounded-full border border-black/6 bg-white p-2 text-[#5f5a54] transition ${
                                        isOpen ? "rotate-180" : "rotate-0"
                                      }`}
                                    >
                                      <ChevronDown className="h-4 w-4" />
                                    </span>
                                  </div>
                                </div>

                                {isOpen && (
                                  <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#5f5a54] sm:text-base">
                                    {module.content}
                                  </p>
                                )}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex h-full flex-col rounded-[28px] bg-[#111111] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)] lg:p-5">
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black">
                      <img
                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
                        alt="Curriculum overview video"
                        className="h-[280px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#171717] shadow-sm">
                        <PlayCircle className="h-4 w-4" />
                        Curriculum Overview
                      </div>

                      <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <PlayCircle className="h-8 w-8 text-white" />
                      </button>

                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-5">
                        <p className="text-base font-semibold text-white">
                          Watch how the full course is structured
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/80">
                          Foundations, chart reading, execution, risk
                          management, and real market examples.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee2a8]">
                          Step 01
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-white">
                          Learn the framework
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/75">
                          Start with the rules, structure, and market logic
                          before moving into active execution.
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee2a8]">
                          Step 02
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-white">
                          Apply with examples
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/75">
                          Breakdowns and visual examples help members connect
                          theory with real charts and live context.
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee2a8]">
                          Step 03
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-white">
                          Build repeatability
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/75">
                          The focus is consistency, risk control, and a process
                          you can repeat instead of random entries.
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(45,122,82,0.25),rgba(45,122,82,0.12))] p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8f0ce]">
                          Outcome
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-white">
                          Trade with more confidence
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/85">
                          By the end, members have a clearer system, better
                          decision making, and more disciplined execution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              <div id="benefits" className="mt-24 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                    Benefits
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl">
                    What you will achieve inside the program.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#5f5a54] sm:text-lg">
                    Learn with structure, improve decision making, and build a
                    repeatable trading process with clear guidance and real
                    market context.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[34px] border border-black/8 bg-[#f5f1ea] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                  <div className="grid gap-0 lg:min-h-[520px] lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="flex h-full flex-col justify-center rounded-[28px] bg-[#fcfaf6] p-6 lg:p-8">
                      <div className="mb-6 inline-flex w-fit rounded-full border border-[#2d7a52]/12 bg-[#e7f1eb] px-4 py-2 text-sm font-semibold text-[#2d7a52] shadow-sm">
                        What you'll achieve
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {benefits.map((item, idx) => (
                          <div
                            key={item}
                            className={`group flex items-start gap-4 rounded-[22px] border p-4 transition ${
                              idx % 3 === 0
                                ? "border-[#2d7a52]/20 bg-[#eef7f1] shadow-[0_8px_20px_rgba(45,122,82,0.08)]"
                                : "border-black/6 bg-white shadow-sm"
                            }`}
                          >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#2d7a52]/20 bg-[#2d7a52] text-white shadow-[0_8px_18px_rgba(45,122,82,0.22)]">
                              <Check className="h-5 w-5" />
                            </div>
                            <p className="text-base font-medium leading-7 text-[#171717]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex h-full items-stretch p-0 lg:pl-4">
                      <div className="relative w-full overflow-hidden rounded-[28px] bg-[#111111]">
                        <img
                          src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80"
                          alt="Benefits video preview"
                          className="h-full min-h-[420px] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-[#171717]/8 to-transparent" />
                        <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#171717] shadow">
                          <PlayCircle className="h-4 w-4" />
                          Watch Benefits
                        </div>
                        <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                          <PlayCircle className="h-10 w-10 text-white" />
                        </button>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                          <div className="flex justify-center">
                            <button className="rounded-[10px] bg-[#2d7a52] px-6 py-3 text-sm font-semibold text-white shadow-lg">
                              See How It Works →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              <div id="community-wins" className="mt-24 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                    Community Wins
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl">
                    Real member wins moving all day.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#5f5a54] sm:text-lg">
                    A live style wall of community wins, trade ideas, and shared
                    executions that keeps moving automatically.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[34px] border border-black/8 bg-[#f5f1ea] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                  <div className="grid gap-4 lg:grid-cols-3">
                    {[0, 1, 2].map((columnIndex) => {
                      const items = communityWinItems.filter(
                        (_, idx) => idx % 3 === columnIndex,
                      );
                      const duplicated = [...items, ...items];
                      const reverse = columnIndex === 1;

                      return (
                        <div
                          key={columnIndex}
                          className="relative h-[620px] overflow-hidden rounded-[26px] border border-black/6 bg-[#fcfaf6]"
                        >
                          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#fcfaf6] to-transparent" />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#fcfaf6] to-transparent" />

                          <div
                            className="flex flex-col gap-4 p-4"
                            style={{
                              animation: `${reverse ? "communityWinsUpReverse" : "communityWinsUp"} 24s linear infinite`,
                            }}
                          >
                            {duplicated.map((item, idx) => (
                              <div
                                key={`${item.user}-${item.setup}-${idx}`}
                                className="rounded-[22px] border border-black/8 bg-[#131313] p-4 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                              >
                                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                                  <div>
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7a24f]">
                                      Community Win
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">
                                      {item.user}
                                    </p>
                                  </div>
                                  <div className="rounded-full bg-[#123926] px-3 py-1 text-xs font-semibold text-[#7ee2a8]">
                                    {item.tag}
                                  </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                  <div className="rounded-[16px] border border-white/8 bg-[#1a1a1a] p-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                                      Setup
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">
                                      {item.setup}
                                    </p>
                                  </div>

                                  <div className="rounded-[16px] border border-white/8 bg-[#1a1a1a] p-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                                          Realized PnL
                                        </p>
                                        <p className="mt-1 text-2xl font-semibold text-[#7ee2a8]">
                                          {item.pnl}
                                        </p>
                                      </div>
                                      <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2d7a52]/18 text-[#7ee2a8]">
                                        <Check className="h-5 w-5" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-[16px] border border-white/8 bg-[#1a1a1a] p-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                                      Trade Note
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-white/75">
                                      {item.notes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              <div id="learning-experience" className="mt-24 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                    Learning Experience
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl">
                    A step by step path to becoming consistent.
                  </h2>
                </div>

                <div className="space-y-10">
                  {showcaseRows.map((row, index) => {
                    const reverse = index % 2 === 1;
                    const step = index + 1;

                    return (
                      <div
                        key={row.title}
                        className={`grid items-center gap-8 rounded-[28px] border border-black/6 bg-[#fcfaf6] p-6 shadow-sm lg:p-8 ${reverse ? "lg:grid-cols-[1fr_0.8fr]" : "lg:grid-cols-[0.8fr_1fr]"}`}
                      >
                        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d7a52] text-lg font-bold text-white shadow">
                              {step}
                            </div>
                            <div>
                              <h3 className="text-2xl font-semibold text-[#171717]">
                                {row.title}
                              </h3>
                              <p className="mt-3 text-base leading-7 text-[#5f5a54]">
                                {row.text}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 flex gap-3">
                            <div className="h-[2px] w-16 bg-[#2d7a52]" />
                            <div className="h-[2px] w-6 bg-black/20" />
                          </div>
                        </div>

                        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
                          <div className="relative w-full max-w-[520px] overflow-hidden rounded-[24px] border border-black/6 bg-[#111111]">
                            <img
                              src={row.slides[0]}
                              alt={row.title}
                              className="h-[240px] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                              <PlayCircle className="h-7 w-7 text-white" />
                            </button>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                              <p className="text-sm font-medium text-white">
                                Watch breakdown
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              <div id="testimonials" className="mt-24 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                    Testimonials
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl">
                    Real feedback from our community
                  </h2>
                </div>

                <TestimonialRow images={testimonialImages} />
                <TestimonialRow images={testimonialImages} reverse />
                <TestimonialRow images={testimonialImages} />
              </div>

              <div className="my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              <div id="pricing" className="mt-24 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7a52]">
                    Pricing
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-5xl">
                    Choose your Trade School plan.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#5f5a54] sm:text-lg">
                    Pick the level that matches your learning stage and switch
                    between PKR and USD inside each card.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {pricingPlans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative overflow-hidden rounded-[28px] border p-6 shadow-sm transition ${
                        plan.highlighted
                          ? "border-[#2d7a52]/25 bg-[#eef7f1] shadow-[0_14px_30px_rgba(45,122,82,0.10)]"
                          : "border-black/8 bg-[#fcfaf6]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                              plan.highlighted
                                ? "bg-[#2d7a52] text-white"
                                : "bg-white text-[#171717] border border-black/8"
                            }`}
                          >
                            {plan.discountText}
                          </div>
                          <h3 className="mt-4 text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#171717]">
                            {plan.name}
                          </h3>
                          <p className="mt-3 max-w-[290px] text-sm leading-6 text-[#5f5a54]">
                            {plan.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[20px] border border-black/8 bg-white/80 p-4">
                        <div className="inline-flex rounded-[10px] border border-black/8 bg-[#f3eee6] p-1">
                          <button
                            onClick={() => setCurrency("pkr")}
                            className={`min-w-[88px] rounded-[8px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                              currency === "pkr"
                                ? "bg-[#d7a24f] text-white"
                                : "text-[#6e675f]"
                            }`}
                          >
                            PKR
                          </button>
                          <button
                            onClick={() => setCurrency("usd")}
                            className={`min-w-[88px] rounded-[8px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                              currency === "usd"
                                ? "bg-[#d7a24f] text-white"
                                : "text-[#6e675f]"
                            }`}
                          >
                            USD
                          </button>
                        </div>

                        <div className="mt-5 flex items-end gap-1">
                          <span className="text-5xl font-semibold leading-none tracking-[-0.06em] text-[#171717] sm:text-[56px]">
                            {formatPrice(plan)}
                          </span>
                          <span className="pb-1 text-lg font-medium text-[#5f5a54]">
                            /month
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {plan.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-white/70 p-3"
                          >
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2d7a52] text-white">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <p className="text-sm leading-6 text-[#171717]">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3.5 text-[14px] font-semibold transition ${
                          plan.highlighted
                            ? "bg-[#2d7a52] text-white hover:bg-[#266847]"
                            : "border border-black/10 bg-white text-[#171717] hover:bg-[#f0ece5]"
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
