import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Play,
  PlayCircle,
  X,
} from "lucide-react";

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

const heroBenefitCards = [
  {
    title: "Clear Learning Path",
    text: "Join a structured roadmap that takes you from basics to confident execution step by step.",
    highlight: false,
  },
  {
    title: "Real Trade Reviews",
    text: "Study real chart examples, entry logic, trade management, and mistakes to avoid.",
    highlight: true,
  },
  {
    title: "Risk Control",
    text: "Learn position sizing, stop placement, discipline, and rules that help protect your capital.",
    highlight: false,
  },
  {
    title: "Mentor Support",
    text: "Get guided lessons, weekly learning support, accountability, and a serious trading community.",
    highlight: false,
  },
];

const proofTabs = [
  {
    label: "COMMUNITY WINS",
    title: "Foundation results",
    intro:
      "Students start with structure first, so every chart, setup, and entry has context before money is at risk.",
    cards: [
      {
        title: "Clear chart reading",
        text: "Market structure, support and resistance, candle behavior, and trend context.",
        stat: "4x",
        statLabel: "faster chart confidence",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Beginner roadmap",
        text: "A step-by-step path from basic concepts to trade planning and execution.",
        stat: "30+",
        statLabel: "guided lessons",
        image:
          "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Trading vocabulary",
        text: "Learn the language of price action, risk, liquidity, and market behavior.",
        stat: "100%",
        statLabel: "structured learning",
        image:
          "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    label: "TRADE RECAPS",
    title: "Review-led progress",
    intro:
      "Members learn through real examples, trade recaps, and breakdowns that connect theory with live decisions.",
    cards: [
      {
        title: "Entry logic",
        text: "Understand why a setup is valid before taking action.",
        stat: "120+",
        statLabel: "trade examples",
        image:
          "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Management skills",
        text: "Learn when to hold, scale, exit, and protect your trade plan.",
        stat: "3x",
        statLabel: "better process",
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Mistake reviews",
        text: "See what failed, why it failed, and how to avoid repeating it.",
        stat: "60%",
        statLabel: "fewer forced trades",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    label: "FEEDBACK",
    title: "Risk that protects",
    intro:
      "The academy focuses on capital protection, position sizing, and emotional discipline before aggressive growth.",
    cards: [
      {
        title: "Position sizing",
        text: "Build rules for sizing trades without letting emotions control exposure.",
        stat: "1R",
        statLabel: "risk-first thinking",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Stop placement",
        text: "Place invalidation levels around structure instead of random numbers.",
        stat: "40%",
        statLabel: "less avoidable loss",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Psychology routines",
        text: "Use checklists and review habits to stay patient under pressure.",
        stat: "5",
        statLabel: "daily rules",
        image:
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    label: "TESTIMONIAL",
    title: "Support that compounds",
    intro:
      "Members get guidance, accountability, and community support so learning does not happen in isolation.",
    cards: [
      {
        title: "Weekly guidance",
        text: "Stay aligned with lessons, reviews, and practical next steps.",
        stat: "1:1",
        statLabel: "support mindset",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Community feedback",
        text: "Share charts, ask questions, and learn from other serious traders.",
        stat: "24/7",
        statLabel: "learning access",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Accountability",
        text: "Track progress with habits, trade notes, and execution reviews.",
        stat: "90%",
        statLabel: "clearer routine",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
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
            className="h-[160px] min-w-[340px] overflow-hidden rounded-[20px] border border-[#2f80ff]/10 bg-[#111827] shadow-sm"
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
  const [activeHeroVideo, setActiveHeroVideo] = useState<
    "reel" | "campaign" | "identity" | null
  >(null);
  const [benefitsInView, setBenefitsInView] = useState(false);
  const [activeProofTab, setActiveProofTab] = useState(0);
  const heroBenefitsRef = useRef<HTMLDivElement | null>(null);

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

  const heroVideos = {
    reel: {
      title: "Brand Identity Reel",
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1200&q=80",
    },
    campaign: {
      title: "Campaign Preview",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    },
    identity: {
      title: "Brand Identity Reel",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster:
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=1200&q=80",
    },
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveHeroVideo(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

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
        @keyframes heroVideoBackdropIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes heroVideoCardIn {
          0% {
            opacity: 0;
            transform: translateY(56px) scale(0.72) rotate(-6deg);
            border-radius: 34px;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            border-radius: 28px;
          }
        }
        @keyframes heroVideoCardOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(48px) scale(0.74) rotate(6deg);
          }
        }
        @keyframes benefitGlowPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }
      `}</style>

      <section
        id="overview"
        className="relative overflow-hidden bg-[#05070b] text-[#f8fbff]"
        style={{
          scrollBehavior: "smooth",
          fontFamily: '"Inter", "SF Pro Display", "Segoe UI", sans-serif',
        }}
      >
        <div className="fixed left-0 top-0 z-50 w-full border-b border-[#2f80ff]/10 bg-[#05070b]/92 backdrop-blur-xl">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 py-4 lg:px-8 xl:px-5">
            <div className="flex min-w-[150px] items-center">
              <img
                src="/tenet-logo.png"
                alt="The Trade School"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>

            <nav className="hidden min-w-0 items-center justify-center gap-1 rounded-full border border-[#2f80ff]/10 bg-[#111827]/70 px-2 py-2 lg:flex">
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
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition xl:px-4 ${
                    activeSection === item.href
                      ? "bg-[#2f80ff] text-[#070a11]"
                      : "text-[#dbe7f5]/62 hover:bg-[#172033] hover:text-[#2f80ff]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="inline-flex h-10 min-w-[142px] shrink-0 items-center justify-center gap-2 justify-self-end rounded-full bg-[#2f80ff] px-6 text-sm font-semibold text-[#070a11] transition hover:bg-[#7bb6ff]">
              Get started <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(47,128,255,0.08),transparent_28%),radial-gradient(circle_at_76%_12%,rgba(47,128,255,0.06),transparent_24%),linear-gradient(180deg,#05070b_0%,#05070b_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#2f80ff]/18" />
        </div>

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-32 lg:px-8 lg:pb-20 lg:pt-36 xl:px-5">
          <div className="grid min-h-[640px] items-center gap-10 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2f80ff]/80 px-3.5 py-2 text-[13px] font-medium text-[#2f80ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f80ff]" />
                Trusted by 3,400+ traders
              </div>

              <h1 className="max-w-[560px] text-[58px] font-black uppercase leading-[0.86] tracking-[-0.045em] text-[#f8fbff] sm:text-[88px] lg:text-[78px] xl:text-[88px]">
                Content
                <span className="block text-[#2f80ff]">that</span>
                converts
              </h1>

              <p className="mt-8 max-w-[365px] text-[15px] leading-6 text-[#dbe7f5]/60">
                Unlock your brand's potential with our social media strategies,
                from website audits to ready-to-post content that converts.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#pricing"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2f80ff] px-7 text-[14px] font-semibold text-[#070a11] transition hover:bg-[#7bb6ff]"
                >
                  Start for free <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#learning-experience"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#dbe7f5]/40 px-6 text-[14px] font-semibold text-[#f8fbff] transition hover:border-[#2f80ff] hover:text-[#2f80ff]"
                >
                  See our work
                </a>
              </div>

              <div className="mt-8 grid max-w-[360px] grid-cols-3 gap-4">
                {[
                  ["98%", "Satisfaction"],
                  ["12K+", "Videos made"],
                  ["314", "Brands served"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-[30px] font-black leading-none tracking-wide text-[#f8fbff]">
                      {value}
                    </p>
                    <p className="mt-2 text-[14px] text-[#dbe7f5]/62">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[460px] lg:min-h-[560px]">
              <button
                type="button"
                onClick={() => setActiveHeroVideo("reel")}
                className="group absolute left-[6%] top-[34%] hidden w-[260px] -rotate-[17deg] overflow-hidden rounded-[6px] bg-[#111827] text-left shadow-[0_28px_70px_rgba(0,0,0,0.34)] transition duration-500 hover:z-50 hover:-translate-y-2 hover:rotate-[-11deg] hover:shadow-[0_34px_86px_rgba(0,0,0,0.48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ff] sm:block lg:left-[2%] lg:w-[300px]"
                aria-label="Play brand identity reel"
              >
                <div className="relative h-[235px]">
                  <img
                    src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=900&q=80"
                    alt="Content reel preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/18 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                  <span className="absolute bottom-5 left-5 rounded-full bg-white/16 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    3:56
                  </span>
                </div>
                <div className="px-5 pb-4 pt-3">
                  <p className="truncate text-[11px] font-bold text-white">
                    Brand Identity Reel
                  </p>
                  <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[62%] bg-[#2f80ff]" />
                  </div>
                </div>
              </button>

              <div className="absolute left-[26%] top-[12%] z-20 hidden items-center gap-3 rounded-[10px] bg-[#172033] px-4 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#2f80ff] text-[#070a11]">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="text-[12px] font-medium leading-4 text-[#f8fbff]">
                  Engagement
                  <span className="block text-[#f8fbff]/68">+47%</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveHeroVideo("campaign")}
                className="group absolute right-[2%] top-[6%] h-[285px] w-[240px] rotate-[21deg] overflow-hidden rounded-t-[34px] rounded-b-[8px] bg-[#111827] text-left opacity-80 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition duration-500 hover:z-50 hover:-translate-y-2 hover:rotate-[14deg] hover:opacity-100 hover:shadow-[0_34px_86px_rgba(0,0,0,0.44)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ff] sm:right-[3%] sm:h-[335px] sm:w-[285px]"
                aria-label="Play campaign preview"
              >
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
                  alt="Campaign preview"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#070a11]/30" />
                <span className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur-sm transition group-hover:bg-[#2f80ff] group-hover:text-[#070a11]">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveHeroVideo("identity")}
                className="group absolute left-[22%] top-[18%] z-30 w-[300px] overflow-hidden rounded-t-[34px] rounded-b-[8px] bg-[#111827] text-left shadow-[0_30px_80px_rgba(0,0,0,0.46)] transition duration-500 hover:z-50 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_38px_92px_rgba(0,0,0,0.56)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ff] sm:left-[24%] sm:w-[345px] lg:left-[24%] xl:left-[26%]"
                aria-label="Play brand identity reel"
              >
                <div className="relative h-[260px] sm:h-[295px]">
                  <img
                    src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=900&q=80"
                    alt="Brand identity lesson"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-sm transition group-hover:bg-[#2f80ff] group-hover:text-[#070a11]">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                  <span className="absolute bottom-5 left-5 rounded-full bg-white/16 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    3:56
                  </span>
                </div>
                <div className="px-5 pb-4 pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] font-bold text-white">
                      Brand Identity Reel
                    </p>
                    <p className="text-[11px] font-bold text-[#2f80ff]">
                      + 2.6K views
                    </p>
                  </div>
                  <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[58%] bg-[#2f80ff]" />
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveHeroVideo("campaign")}
                className="absolute right-[1%] top-[24%] z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur-sm transition hover:bg-[#2f80ff] hover:text-[#070a11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ff] md:flex"
                aria-label="Play campaign preview"
              >
                <Play className="h-5 w-5 rotate-[-21deg] fill-current" />
              </button>

              <div className="absolute bottom-[18%] right-[7%] z-40 hidden items-center gap-3 rounded-[10px] bg-[#172033] px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.24)] md:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#2f80ff] text-[#070a11]">
                  <Heart className="h-4 w-4 fill-current text-[#070a11]" />
                </span>
                <span className="text-[12px] font-medium leading-4 text-[#f8fbff]">
                  Reach
                  <span className="block text-[#f8fbff]/68">314K</span>
                </span>
              </div>

              <div className="absolute bottom-6 left-[10%] hidden h-px w-[76%] bg-[#dbe7f5]/22 lg:block" />
            </div>
          </div>
        </div>

        {activeHeroVideo && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03050a]/82 px-4 py-6 backdrop-blur-xl"
            style={{ animation: "heroVideoBackdropIn 220ms ease-out both" }}
            onClick={() => setActiveHeroVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={heroVideos[activeHeroVideo].title}
          >
            <div
              className="relative w-full max-w-[920px] overflow-hidden rounded-[28px] border border-[#2f80ff]/20 bg-[#0d1320] shadow-[0_34px_110px_rgba(0,0,0,0.62)]"
              style={{
                animation:
                  "heroVideoCardIn 420ms cubic-bezier(.2,.8,.2,1) both",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#2f80ff]/10 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2f80ff]">
                    Now playing
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#f8fbff]">
                    {heroVideos[activeHeroVideo].title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHeroVideo(null)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2f80ff]/20 bg-[#111827] text-[#f8fbff] transition hover:bg-[#2f80ff] hover:text-[#070a11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f80ff]"
                  aria-label="Close video"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <video
                key={activeHeroVideo}
                className="aspect-video w-full bg-black object-cover"
                src={heroVideos[activeHeroVideo].src}
                poster={heroVideos[activeHeroVideo].poster}
                autoPlay
                controls
                playsInline
              />
            </div>
          </div>
        )}

        <div
          ref={heroBenefitsRef}
          className="relative mx-auto w-full max-w-[1240px] px-5 pb-20 pt-8 lg:px-8 lg:pb-28 lg:pt-14 xl:px-5"
        >
          <div className="pointer-events-none absolute left-1/2 top-[40%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f80ff]/7 blur-3xl" />
          <div
            className={`relative transition-all duration-700 ${
              benefitsInView
                ? "translate-y-0 opacity-100"
                : "translate-y-14 opacity-0"
            }`}
          >
            <div className="mb-14 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#dbe7f5]/78">
                Why Join <span className="text-[#2f80ff]">Trade School</span>
              </p>
              <h2 className="mx-auto mt-8 max-w-[760px] text-[48px] font-black lowercase leading-[0.88] tracking-[-0.045em] text-[#f8fbff] sm:text-[72px] lg:text-[82px]">
                benefits of <span className="text-[#2f80ff]">joining</span>
                <br />
                our academy
              </h2>
            </div>

            <div className="relative">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {heroBenefitCards.map((card, index) => (
                  <div
                    key={card.title}
                    className={`relative min-h-[170px] overflow-hidden rounded-[34px] p-7 transition-all duration-700 ${
                      benefitsInView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                    } ${
                      card.highlight
                        ? "bg-[#2f80ff] text-[#070a11] shadow-[0_24px_80px_rgba(47,128,255,0.22)]"
                        : "bg-[#f8fbff] text-[#070a11]"
                    } ${
                      index === 0
                        ? "lg:rounded-tl-[96px] lg:rounded-tr-[18px] lg:rounded-b-[18px]"
                        : index === heroBenefitCards.length - 1
                          ? "lg:rounded-tl-[18px] lg:rounded-tr-[96px] lg:rounded-b-[18px]"
                          : "lg:rounded-[18px]"
                    }`}
                    style={{ transitionDelay: `${index * 110}ms` }}
                  >
                    {card.highlight && (
                      <span className="pointer-events-none absolute -right-7 -top-8 text-[150px] font-black leading-none tracking-[-0.08em] text-[#070a11]/8">
                        pro
                      </span>
                    )}
                    <div className="relative z-10 flex h-full flex-col justify-end">
                      <h3 className="max-w-[220px] text-[22px] font-black leading-[0.95] tracking-[-0.025em] sm:text-[24px]">
                        {card.title}
                      </h3>
                      <p
                        className={`mt-5 max-w-[250px] text-[12px] leading-4 ${
                          card.highlight
                            ? "text-[#070a11]/62"
                            : "text-[#070a11]/48"
                        }`}
                      >
                        {card.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-5 pb-20 lg:grid-cols-[0.76fr_1.24fr] lg:px-8 lg:pb-28 xl:px-5">
          <div className="flex flex-col justify-center">
            <h2 className="max-w-[430px] text-[54px] font-black lowercase leading-[0.88] tracking-[-0.045em] text-[#f8fbff] sm:text-[72px] lg:text-[80px]">
              data that
              <br />
              proves
              <br />
              <span className="text-[#2f80ff]">your growth</span>
            </h2>

            <div className="mt-8 grid max-w-[420px] grid-cols-2 gap-3">
              {proofTabs.map((tab, index) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveProofTab(index)}
                  className={`h-12 rounded-full border px-4 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
                    activeProofTab === index
                      ? "border-[#2f80ff] bg-[#2f80ff] text-[#070a11]"
                      : "border-[#dbe7f5]/18 bg-transparent text-[#dbe7f5]/62 hover:border-[#2f80ff]/60 hover:text-[#2f80ff]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {proofTabs[activeProofTab].cards.map((card, index) => (
                  <div
                    key={`${proofTabs[activeProofTab].label}-${card.title}`}
                    className="min-w-[280px] overflow-hidden rounded-[26px] bg-[#f8fbff] text-[#070a11] shadow-[0_22px_70px_rgba(0,0,0,0.22)] sm:min-w-[330px]"
                    style={{
                      animation: `heroVideoCardIn ${360 + index * 70}ms cubic-bezier(.2,.8,.2,1) both`,
                    }}
                  >
                    <div className="h-[148px] overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#070a11]/45">
                        {proofTabs[activeProofTab].title}
                      </p>
                      <h3 className="mt-4 text-[26px] font-black leading-[0.95] tracking-[-0.035em]">
                        {card.title}
                      </h3>
                      <p className="mt-4 min-h-[64px] text-[13px] leading-5 text-[#070a11]/54">
                        {card.text}
                      </p>

                      <div className="mt-8 flex items-end justify-between gap-5">
                        <div>
                          <p className="text-[40px] font-black leading-none tracking-[-0.06em] text-[#2f80ff] [text-shadow:0_1px_0_#070a11]">
                            {card.stat}
                          </p>
                          <p className="mt-2 max-w-[130px] text-[12px] font-semibold leading-4 text-[#070a11]/70">
                            {card.statLabel}
                          </p>
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#070a11]/10">
                          <div
                            className="h-full rounded-full bg-[#2f80ff]"
                            style={{ width: `${52 + index * 16}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#dbe7f5]/18">
                <div
                  className="h-full rounded-full bg-[#2f80ff] transition-all duration-500"
                  style={{
                    width: `${((activeProofTab + 1) / proofTabs.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-16 pt-8 text-[#f8fbff] lg:px-8 lg:pb-24 xl:px-6">
          <div className="px-0 py-0">
            <div className="hidden px-4 py-8 lg:px-10 lg:py-12">
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-[#f8fbff]">
                    <span className="text-xl leading-none text-[#2f80ff]">
                      ★
                    </span>
                    <span>4.9/5 from Trade School members</span>
                  </div>

                  <h1 className="max-w-[880px] text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#f8fbff] sm:text-6xl lg:text-[88px]">
                    Trade smarter;
                    <br />
                    grow with structure.
                  </h1>
                </div>

                <div className="max-w-[560px] lg:justify-self-end">
                  <p className="text-lg leading-8 text-[#1f2937] sm:text-xl">
                    The Trade School helps students learn market structure,
                    review real setups, and build disciplined trading habits in
                    one focused learning dashboard.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex h-14 items-center justify-center rounded-[10px] bg-[#2f80ff] px-7 text-base font-semibold text-white shadow-[0_10px_26px_rgba(47,128,255,0.24)] transition hover:bg-[#7bb6ff]">
                      Start Learning
                    </button>
                    <button className="inline-flex h-14 items-center justify-center rounded-[10px] border border-[#2f80ff]/10 bg-[#111827] px-7 text-base font-semibold text-[#f8fbff] transition hover:bg-[#172033]">
                      View Curriculum
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-4 lg:grid-cols-[0.72fr_1.08fr_1.44fr]">
                <div className="flex min-h-[300px] flex-col justify-between rounded-[16px] bg-[#06111f] p-6 text-white shadow-sm lg:min-h-[340px]">
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
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#06111f] bg-[#111827] text-xs font-bold text-[#2f80ff]"
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

                <div className="min-h-[300px] rounded-[16px] bg-[#101827] p-6 text-[#f8fbff] shadow-sm lg:min-h-[340px]">
                  <div className="flex items-center justify-between border-b border-[#2f80ff]/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#172033] text-[#2f80ff]">
                        <PlayCircle className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold">
                        Weekly Setup Goal
                      </span>
                    </div>
                    <div className="text-2xl font-medium tracking-[-0.04em]">
                      12
                      <span className="ml-1 text-sm tracking-normal text-[#c8d2e0]">
                        reviews
                      </span>
                    </div>
                  </div>

                  <div className="pt-24">
                    <div className="flex items-end gap-2">
                      <span className="text-[34px] font-medium leading-none tracking-[-0.05em]">
                        8
                      </span>
                      <span className="pb-1 text-sm font-medium text-[#c8d2e0]">
                        setups studied today
                      </span>
                    </div>

                    <div className="mt-5 flex h-12 items-end gap-1">
                      {Array.from({ length: 34 }).map((_, index) => (
                        <span
                          key={index}
                          className={`block w-2 rounded-full ${
                            index < 25 ? "bg-[#06111f]" : "bg-white/75"
                          }`}
                          style={{
                            height: `${18 + ((index * 7) % 24)}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[300px] overflow-hidden rounded-[16px] bg-[#101827] shadow-sm lg:min-h-[340px]">
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
                    alt="Trading dashboard preview"
                    className="absolute inset-0 h-full w-full object-cover saturate-[0.78] sepia-[0.12]"
                  />
                  <div className="absolute inset-0 bg-[#2f80ff]/18 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/55 via-[#101827]/8 to-[#2f80ff]/10" />
                  <div className="absolute bottom-5 left-5 rounded-[8px] bg-[#111827] px-5 py-3 text-sm font-semibold text-[#f8fbff] shadow-lg">
                    Trading skills in your pocket
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden border-t border-[#2f80ff]/6 px-4 py-10 lg:px-10 lg:py-12">
              <div className="mx-auto max-w-[1480px] text-center">
                <h2 className="mx-auto max-w-[1200px] text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#f8fbff] sm:text-6xl lg:text-[84px]">
                  Fueling
                  <span className="mx-4 inline-flex h-[58px] w-[220px] translate-y-[-6px] overflow-hidden rounded-full align-middle border border-[#2f80ff]/8 bg-[#070a11] shadow-sm lg:h-[72px] lg:w-[270px]">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                      alt="Overview preview"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  Your Passion Igniting Your Potential!
                </h2>

                <p className="mx-auto mt-6 max-w-[760px] text-base leading-8 text-[#c8d2e0] sm:text-lg">
                  Your go to place for in depth trading education, recap driven
                  learning, and structured community support that helps members
                  build confidence step by step.
                </p>

                <div className="mt-8 flex justify-center">
                  <div className="relative w-full max-w-[900px] overflow-hidden rounded-[28px] border border-[#2f80ff]/8 bg-[#111111]">
                    <img
                      src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80"
                      alt="Trading video thumbnail"
                      className="h-[420px] w-full object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#f8fbff] shadow">
                      <PlayCircle className="h-4 w-4" />
                      Play
                    </div>
                    <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                      <PlayCircle className="h-10 w-10 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="flex justify-center">
                        <button className="rounded-[10px] bg-[#2f80ff] px-6 py-3 text-sm font-semibold text-white shadow-lg">
                          Start Now →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden my-16 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            <div
              id="curriculum"
              className="scroll-mt-28 border-t border-[#2f80ff]/6 px-0 py-14 lg:py-16"
            >
              <div className="mx-auto max-w-[1360px]">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                      Curriculum
                    </p>
                    <h2 className="mt-5 max-w-[560px] text-[46px] font-black lowercase leading-[0.9] tracking-[-0.045em] text-[#f8fbff] sm:text-[64px]">
                      your trading
                      <br />
                      <span className="text-[#2f80ff]">roadmap</span>
                    </h2>
                    <p className="mt-5 max-w-[560px] text-base leading-8 text-[#c8d2e0]">
                      A premium pathway from market basics to confident
                      execution, built around structure, repetition, review, and
                      risk-first decision making.
                    </p>

                    <div className="mt-8 grid max-w-[520px] grid-cols-3 gap-3">
                      {[
                        ["45", "lessons"],
                        ["5", "modules"],
                        ["24/7", "access"],
                      ].map(([value, label]) => (
                        <div
                          key={label}
                          className="rounded-[18px] border border-[#2f80ff]/12 bg-[#111827] p-4"
                        >
                          <p className="text-3xl font-black leading-none text-[#2f80ff]">
                            {value}
                          </p>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#dbe7f5]/50">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[34px] border border-[#2f80ff]/12 bg-[#111827] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
                    <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#2f80ff]/10 blur-3xl" />
                    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative min-h-[360px] overflow-hidden rounded-[26px] bg-black">
                        <img
                          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
                          alt={curriculumModules[openModule].title}
                          className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                        <div className="absolute left-5 top-5 rounded-full bg-[#dbe7f5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#070a11]">
                          Module {String(openModule + 1).padStart(2, "0")}
                        </div>
                        <button className="absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2f80ff] text-[#070a11] shadow-[0_18px_46px_rgba(47,128,255,0.24)]">
                          <PlayCircle className="h-9 w-9" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f80ff]">
                            Featured lesson
                          </p>
                          <h3 className="mt-2 text-3xl font-black leading-none tracking-[-0.035em] text-white">
                            {curriculumModules[openModule].title.replace(
                              /^Module \d+:\s/,
                              "",
                            )}
                          </h3>
                        </div>
                      </div>

                      <div className="relative flex min-h-[360px] flex-col justify-between rounded-[26px] border border-[#2f80ff]/10 bg-[#070a11] p-6">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="rounded-full border border-[#2f80ff]/20 bg-[#2f80ff]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2f80ff]">
                              {curriculumModules[openModule].lessons} lessons
                            </span>
                            <span className="text-sm font-semibold text-[#dbe7f5]/46">
                              {openModule + 1}/{curriculumModules.length}
                            </span>
                          </div>
                          <h3 className="mt-8 max-w-[420px] text-4xl font-black leading-[0.95] tracking-[-0.04em] text-[#f8fbff]">
                            {curriculumModules[openModule].title}
                          </h3>
                          <p className="mt-5 max-w-[520px] text-base leading-8 text-[#c8d2e0]">
                            {curriculumModules[openModule].content}
                          </p>
                        </div>

                        <div className="mt-8">
                          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#dbe7f5]/52">
                            <span>Roadmap progress</span>
                            <span>
                              {Math.round(
                                ((openModule + 1) / curriculumModules.length) *
                                  100,
                              )}
                              %
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[#dbe7f5]/10">
                            <div
                              className="h-full rounded-full bg-[#2f80ff] transition-all duration-500"
                              style={{
                                width: `${((openModule + 1) / curriculumModules.length) * 100}%`,
                              }}
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
                            className={`group rounded-[20px] border p-4 text-left transition ${
                              isOpen
                                ? "border-[#2f80ff] bg-[#2f80ff] text-[#070a11]"
                                : "border-[#2f80ff]/10 bg-[#070a11] text-[#f8fbff] hover:border-[#2f80ff]/45"
                            }`}
                          >
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${
                                isOpen
                                  ? "bg-[#070a11] text-[#2f80ff]"
                                  : "bg-[#172033] text-[#2f80ff]"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-5 text-sm font-black leading-tight">
                              {module.title.replace(/^Module \d+:\s/, "")}
                            </p>
                            <p
                              className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                                isOpen
                                  ? "text-[#070a11]/55"
                                  : "text-[#dbe7f5]/42"
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

              <div className="hidden">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                    Curriculum
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#f8fbff] sm:text-5xl lg:text-[60px]">
                    A premium roadmap from basics to execution.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[820px] text-base leading-8 text-[#c8d2e0] sm:text-lg">
                    Instead of random lessons, members follow a structured path
                    that builds confidence step by step through education,
                    examples, execution, and review.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[34px] border border-[#2f80ff]/8 bg-[#070a11] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.06)] lg:p-5">
                  <div className="grid gap-4 lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="flex h-full flex-col rounded-[28px] bg-[linear-gradient(180deg,#111827_0%,#172033_100%)] p-6 shadow-sm lg:p-8">
                      <div className="mb-6 inline-flex w-fit rounded-full border border-[#2f80ff]/15 bg-[#172033] px-4 py-2 text-sm font-semibold text-[#2f80ff] shadow-sm">
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
                                  ? "border-[#2f80ff]/20 bg-[#111827] shadow-[0_10px_24px_rgba(47,128,255,0.08)]"
                                  : "border-[#2f80ff]/6 bg-[#111827]/70 hover:bg-[#162033]"
                              }`}
                            >
                              <button
                                onClick={() =>
                                  setOpenModule(isOpen ? -1 : index)
                                }
                                className="flex w-full items-start gap-4 px-5 py-5 text-left"
                              >
                                <div
                                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-sm font-bold ${
                                    isOpen
                                      ? "bg-[#2f80ff] text-[#070a11]"
                                      : "bg-[#172033] text-[#f8fbff]"
                                  }`}
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-4">
                                    <p className="text-lg font-semibold text-[#f8fbff]">
                                      {module.title}
                                    </p>
                                    <div className="flex items-center gap-3">
                                      <span className="rounded-full border border-[#2f80ff]/15 bg-[#2f80ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2f80ff]">
                                        {module.lessons} lessons
                                      </span>
                                      <span
                                        className={`rounded-full border border-[#2f80ff]/6 bg-[#111827] p-2 text-[#c8d2e0] transition ${
                                          isOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                      >
                                        <ChevronDown className="h-4 w-4" />
                                      </span>
                                    </div>
                                  </div>

                                  {isOpen && (
                                    <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#c8d2e0] sm:text-base">
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

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#dbe7f5] px-4 py-2 text-sm font-medium text-[#070a11] shadow-sm">
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
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ec5ff]">
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
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ec5ff]">
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
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ec5ff]">
                            Step 03
                          </p>
                          <h3 className="mt-3 text-xl font-semibold text-white">
                            Build repeatability
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-white/75">
                            The focus is consistency, risk control, and a
                            process you can repeat instead of random entries.
                          </p>
                        </div>

                        <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(47,128,255,0.25),rgba(47,128,255,0.12))] p-5 backdrop-blur-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#101827]">
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
              </div>
            </div>

            <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2f80ff]/10 to-transparent" />

            <div id="benefits" className="mt-20 scroll-mt-28">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                    Benefits
                  </p>
                  <h2 className="mt-5 max-w-[560px] text-[46px] font-black lowercase leading-[0.9] tracking-[-0.045em] text-[#f8fbff] sm:text-[66px]">
                    outcomes you
                    <br />
                    can actually
                    <br />
                    <span className="text-[#2f80ff]">trade with</span>
                  </h2>
                  <p className="mt-6 max-w-[560px] text-base leading-8 text-[#c8d2e0]">
                    This program turns scattered information into a practical
                    process: clear rules, better risk, cleaner reviews, and more
                    confident execution.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    [
                      "01",
                      "Framework",
                      "Stop guessing and follow a repeatable trade plan.",
                    ],
                    [
                      "02",
                      "Execution",
                      "Build confidence around entries, exits, and management.",
                    ],
                    [
                      "03",
                      "Discipline",
                      "Use risk rules and review habits to stay controlled.",
                    ],
                  ].map(([step, title, text]) => (
                    <div
                      key={title}
                      className="rounded-[26px] border border-[#2f80ff]/10 bg-[#111827] p-5"
                    >
                      <p className="text-xs font-black tracking-[0.16em] text-[#2f80ff]">
                        {step}
                      </p>
                      <h3 className="mt-8 text-2xl font-black tracking-[-0.04em] text-[#f8fbff]">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#c8d2e0]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-[#2f80ff]/10 bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1800&q=80"
                    alt="Trading workspace"
                    className="absolute inset-0 h-full w-full object-cover opacity-72"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-[#dbe7f5] px-4 py-2 text-sm font-bold text-[#070a11] shadow">
                    <PlayCircle className="h-4 w-4" />
                    Watch outcomes
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f80ff]">
                      Real application
                    </p>
                    <h3 className="mt-3 max-w-[620px] text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white">
                      Learn the process behind better decisions, not just random
                      setups.
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((item, idx) => (
                    <div
                      key={item}
                      className={`relative min-h-[154px] overflow-hidden rounded-[26px] border p-5 ${
                        idx === 0 || idx === 3
                          ? "border-[#2f80ff]/25 bg-[#2f80ff] text-[#070a11]"
                          : "border-[#2f80ff]/10 bg-[#111827] text-[#f8fbff]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                          idx === 0 || idx === 3
                            ? "bg-[#070a11] text-[#2f80ff]"
                            : "bg-[#2f80ff] text-[#070a11]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className={`mt-8 text-[15px] font-bold leading-6 ${
                          idx === 0 || idx === 3
                            ? "text-[#070a11]"
                            : "text-[#f8fbff]"
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden">
              <div className="mt-20 scroll-mt-28">
                <div className="mb-10 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                    Benefits
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#f8fbff] sm:text-5xl">
                    What you will achieve inside the program.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#c8d2e0] sm:text-lg">
                    Learn with structure, improve decision making, and build a
                    repeatable trading process with clear guidance and real
                    market context.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[34px] border border-[#2f80ff]/8 bg-[#070a11] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
                  <div className="grid gap-0 lg:min-h-[520px] lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="flex h-full flex-col justify-center rounded-[28px] bg-[#111827] p-6 lg:p-8">
                      <div className="mb-6 inline-flex w-fit rounded-full border border-[#2f80ff]/12 bg-[#172033] px-4 py-2 text-sm font-semibold text-[#2f80ff] shadow-sm">
                        What you'll achieve
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {benefits.map((item, idx) => (
                          <div
                            key={item}
                            className={`group flex items-start gap-4 rounded-[22px] border p-4 transition ${
                              idx % 3 === 0
                                ? "border-[#2f80ff]/20 bg-[#101827] shadow-[0_8px_20px_rgba(47,128,255,0.08)]"
                                : "border-[#2f80ff]/6 bg-[#111827] shadow-sm"
                            }`}
                          >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[#2f80ff]/20 bg-[#2f80ff] text-[#070a11] shadow-[0_8px_18px_rgba(47,128,255,0.22)]">
                              <Check className="h-5 w-5" />
                            </div>
                            <p className="text-base font-medium leading-7 text-[#f8fbff]">
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
                        <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-[#dbe7f5] px-4 py-2 text-sm font-medium text-[#070a11] shadow">
                          <PlayCircle className="h-4 w-4" />
                          Watch Benefits
                        </div>
                        <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                          <PlayCircle className="h-10 w-10 text-white" />
                        </button>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                          <div className="flex justify-center">
                            <button className="rounded-[10px] bg-[#2f80ff] px-6 py-3 text-sm font-semibold text-[#070a11] shadow-lg">
                              See How It Works →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2f80ff]/10 to-transparent" />

            <div id="community-wins" className="mt-20 scroll-mt-28">
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                  Community Wins
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#f8fbff] sm:text-5xl">
                  Real member wins moving all day.
                </h2>
                <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#c8d2e0] sm:text-lg">
                  A live style wall of community wins, trade ideas, and shared
                  executions that keeps moving automatically.
                </p>
              </div>

              <div className="overflow-hidden rounded-[34px] border border-[#2f80ff]/8 bg-[#070a11] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
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
                        className="relative h-[620px] overflow-hidden rounded-[26px] border border-[#2f80ff]/6 bg-[#111827]"
                      >
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#111827] to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#111827] to-transparent" />

                        <div
                          className="flex flex-col gap-4 p-4"
                          style={{
                            animation: `${reverse ? "communityWinsUpReverse" : "communityWinsUp"} 24s linear infinite`,
                          }}
                        >
                          {duplicated.map((item, idx) => (
                            <div
                              key={`${item.user}-${item.setup}-${idx}`}
                              className="rounded-[22px] border border-[#2f80ff]/8 bg-[#131313] p-4 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                            >
                              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                                <div>
                                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#2f80ff]">
                                    Community Win
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-white">
                                    {item.user}
                                  </p>
                                </div>
                                <div className="rounded-full bg-[#172033] px-3 py-1 text-xs font-semibold text-[#8ec5ff]">
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
                                      <p className="mt-1 text-2xl font-semibold text-[#8ec5ff]">
                                        {item.pnl}
                                      </p>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#2f80ff]/18 text-[#8ec5ff]">
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

            <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2f80ff]/10 to-transparent" />

            <div id="learning-experience" className="mt-20 scroll-mt-28">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                    Learning Experience
                  </p>
                  <h2 className="mt-5 max-w-[560px] text-[46px] font-black lowercase leading-[0.9] tracking-[-0.045em] text-[#f8fbff] sm:text-[66px]">
                    built like a
                    <br />
                    trader's
                    <br />
                    <span className="text-[#2f80ff]">operating system</span>
                  </h2>
                </div>

                <p className="max-w-[650px] text-base leading-8 text-[#c8d2e0] lg:justify-self-end">
                  Lessons, reviews, routines, and community feedback are
                  organized into a workflow that helps you learn, apply, review,
                  and refine without losing the plot.
                </p>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[620px] overflow-hidden rounded-[38px] border border-[#2f80ff]/10 bg-[#070a11] p-5">
                  <img
                    src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1800&q=80"
                    alt="Learning dashboard"
                    className="absolute inset-0 h-full w-full object-cover opacity-24"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(47,128,255,0.18),transparent_28%),linear-gradient(180deg,rgba(7,10,17,0.15),#070a11_78%)]" />

                  <div className="relative z-10 grid h-full gap-5 md:grid-cols-[0.82fr_1.18fr]">
                    <div className="flex flex-col justify-between rounded-[30px] border border-[#2f80ff]/12 bg-[#111827]/88 p-6 backdrop-blur">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f80ff]">
                          Weekly cockpit
                        </p>
                        <h3 className="mt-5 text-4xl font-black leading-[0.92] tracking-[-0.04em] text-[#f8fbff]">
                          learn with a visible plan
                        </h3>
                        <p className="mt-5 text-sm leading-7 text-[#c8d2e0]">
                          Each week connects lessons, chart examples, and review
                          prompts so your next step is always clear.
                        </p>
                      </div>

                      <div className="mt-10 grid grid-cols-2 gap-3">
                        {[
                          ["06", "weekly tasks"],
                          ["03", "review loops"],
                          ["12", "chart drills"],
                          ["01", "focus goal"],
                        ].map(([value, label]) => (
                          <div
                            key={label}
                            className="rounded-[18px] border border-[#2f80ff]/10 bg-[#070a11] p-4"
                          >
                            <p className="text-3xl font-black leading-none text-[#2f80ff]">
                              {value}
                            </p>
                            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dbe7f5]/45">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid content-end gap-4">
                      {[
                        [
                          "Plan",
                          "Set the market theme, key levels, and risk limit before looking for entries.",
                        ],
                        [
                          "Execute",
                          "Use confirmation, invalidation, and position sizing before taking a setup.",
                        ],
                        [
                          "Review",
                          "Break down the decision, outcome, and emotional quality after the trade.",
                        ],
                      ].map(([title, text], index) => (
                        <div
                          key={title}
                          className={`rounded-[24px] border p-5 ${
                            index === 1
                              ? "border-[#2f80ff]/30 bg-[#2f80ff] text-[#070a11]"
                              : "border-[#2f80ff]/10 bg-[#111827]/86 text-[#f8fbff]"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                                index === 1
                                  ? "bg-[#070a11] text-[#2f80ff]"
                                  : "bg-[#172033] text-[#2f80ff]"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="text-2xl font-black tracking-[-0.035em]">
                                {title}
                              </h4>
                              <p
                                className={`mt-2 text-sm leading-6 ${
                                  index === 1
                                    ? "text-[#070a11]/62"
                                    : "text-[#c8d2e0]"
                                }`}
                              >
                                {text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  {showcaseRows.slice(0, 4).map((row, index) => (
                    <div
                      key={row.title}
                      className="group grid gap-4 rounded-[28px] border border-[#2f80ff]/10 bg-[#111827] p-4 transition hover:border-[#2f80ff]/35 sm:grid-cols-[150px_1fr]"
                    >
                      <div className="relative h-[140px] overflow-hidden rounded-[22px] bg-black sm:h-full">
                        <img
                          src={row.slides[0]}
                          alt={row.title}
                          className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-[#2f80ff] px-3 py-1 text-xs font-black text-[#070a11]">
                          0{index + 1}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center p-2">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f80ff]">
                          Experience layer
                        </p>
                        <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.03em] text-[#f8fbff]">
                          {row.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#c8d2e0]">
                          {row.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2f80ff]/10 to-transparent" />

            <div id="testimonials" className="mt-20 scroll-mt-28">
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                  Testimonials
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#f8fbff] sm:text-5xl">
                  Real feedback from our community
                </h2>
              </div>

              <TestimonialRow images={testimonialImages} />
              <TestimonialRow images={testimonialImages} reverse />
              <TestimonialRow images={testimonialImages} />
            </div>

            <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-[#2f80ff]/10 to-transparent" />

            <div id="pricing" className="mt-20 scroll-mt-28">
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2f80ff]">
                  Pricing
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#f8fbff] sm:text-5xl">
                  Choose your Trade School plan.
                </h2>
                <p className="mx-auto mt-4 max-w-[760px] text-base leading-8 text-[#c8d2e0] sm:text-lg">
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
                        ? "border-[#2f80ff]/25 bg-[#101827] shadow-[0_14px_30px_rgba(47,128,255,0.10)]"
                        : "border-[#2f80ff]/8 bg-[#111827]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
                            plan.highlighted
                              ? "bg-[#2f80ff] text-[#070a11]"
                              : "bg-[#111827] text-[#f8fbff] border border-[#2f80ff]/8"
                          }`}
                        >
                          {plan.discountText}
                        </div>
                        <h3 className="mt-4 text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#f8fbff]">
                          {plan.name}
                        </h3>
                        <p className="mt-3 max-w-[290px] text-sm leading-6 text-[#c8d2e0]">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[20px] border border-[#2f80ff]/8 bg-[#111827]/80 p-4">
                      <div className="inline-flex rounded-[10px] border border-[#2f80ff]/8 bg-[#172033] p-1">
                        <button
                          onClick={() => setCurrency("pkr")}
                          className={`min-w-[88px] rounded-[8px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                            currency === "pkr"
                              ? "bg-[#2f80ff] text-[#070a11]"
                              : "text-[#c8d2e0]"
                          }`}
                        >
                          PKR
                        </button>
                        <button
                          onClick={() => setCurrency("usd")}
                          className={`min-w-[88px] rounded-[8px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                            currency === "usd"
                              ? "bg-[#2f80ff] text-[#070a11]"
                              : "text-[#c8d2e0]"
                          }`}
                        >
                          USD
                        </button>
                      </div>

                      <div className="mt-5 flex items-end gap-1">
                        <span className="text-5xl font-semibold leading-none tracking-[-0.06em] text-[#f8fbff] sm:text-[56px]">
                          {formatPrice(plan)}
                        </span>
                        <span className="pb-1 text-lg font-medium text-[#c8d2e0]">
                          /month
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 rounded-[18px] border border-[#2f80ff]/6 bg-[#111827]/70 p-3"
                        >
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f80ff] text-[#070a11]">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-sm leading-6 text-[#f8fbff]">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3.5 text-[14px] font-semibold transition ${
                        plan.highlighted
                          ? "bg-[#2f80ff] text-[#070a11] hover:bg-[#7bb6ff]"
                          : "border border-[#2f80ff]/10 bg-[#111827] text-[#f8fbff] hover:bg-[#172033]"
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
      </section>
    </>
  );
}
