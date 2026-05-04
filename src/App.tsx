import {
  type CSSProperties,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import cloudinary, { type VideoPlayer } from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";
import { ArrowRight, Check, ExternalLink, PlayCircle } from "lucide-react";

type Currency = "pkr" | "usd";

type PricingPlan = {
  name: string;
  price: { usd: number; pkr: number };
  originalPrice?: { usd: number; pkr: number };
  periodLabel: string;
  description: string;
  features: string[];
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
  slides: WinSlide[];
};

type TradingPartner = {
  name: string;
  mark: string;
  logo: string;
  description: string;
};

const CLOUDINARY_CLOUD_NAME = "dyoeaw8ik";

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
    videoTitle: "Community Wins Preview",
    videoSrc:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "TRADE RECAPS",
    videoTitle: "Trade Recaps Preview",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "FEEDBACK",
    videoTitle: "Feedback Preview",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    label: "TESTIMONIAL",
    videoTitle: "Testimonial Preview",
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
  },
];

const tradingPartners: TradingPartner[] = [
  {
    name: "Exness",
    mark: "EX",
    logo: "/exness-logo.png",
    description: "Global multi-asset broker for active traders.",
  },
  {
    name: "IC Market",
    mark: "IC",
    logo: "/ic-market.png",
    description: "Forex, indices, commodities, and CFD market access.",
  },
  {
    name: "Ripster",
    mark: "RP",
    logo: "/Ripster-logo.jpg",
    description: "Market education, trend tools, and trading insights.",
  },
  {
    name: "PMEX",
    mark: "PX",
    logo: "/pmex-logo.svg",
    description: "Pakistan Mercantile Exchange market access.",
  },
  {
    name: "Munir Khanani",
    mark: "MK",
    logo: "/logo_munirkhanani.png",
    description: "Pakistan market brokerage and trading services.",
  },
  {
    name: "Market Watch",
    mark: "MW",
    logo: "/market-watch.png",
    description: "Financial news, data, and market insights.",
  },
  {
    name: "Tenet Group",
    mark: "TG",
    logo: "/tenet-trade.jpg",
    description: "Earnings calendar, expectations, and market reactions.",
  },
  {
    name: "Interective Brocker",
    mark: "IB",
    logo: "/interective-brocker.png",
    description: "Breaking market news, analysis, and trading ideas.",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: { usd: 40, pkr: 11000 },
    periodLabel: "month",
    description:
      "A focused one month access plan for traders who want to start learning with community support and live market context.",
    features: [
      "Access to Pakistan, US Stocks, and Forex Trading Courses for 1 month",
      "Private Trading Community Access - Discord",
      "Proven Trade System and Setups - trade callouts setup based",
      "Weekly Live Sessions for value addition",
      "Market Updates",
    ],
    discountText: "START HERE",
    cta: "Join Starter",
    highlighted: false,
  },
  {
    name: "Elite Mentorship",
    price: { usd: 250, pkr: 68750 },
    originalPrice: { usd: 480, pkr: 132000 },
    periodLabel: "year",
    description:
      "The complete premium bundle with lifetime course access, future course enrollment, and a full year of community access.",
    features: [
      "Complete Course Bundle: VSA - Volume Spread Analysis, Pakistan Stocks, US Stocks, and Forex - Lifetime Access",
      "12 months Private Trading Community Access - Discord",
      "Automatic Enrollment in Future Courses, including Fundamental Analysis and Financial Analysis with AI",
      "Proven Trade System and Setups - trade callouts setup based",
      "Weekly Live Sessions with premium value addition",
      "Market Updates",
    ],
    discountText: "48% DISCOUNT",
    cta: "Join Elite Mentorship",
    highlighted: true,
  },
  {
    name: "Pro Trader",
    price: { usd: 96, pkr: 26400 },
    originalPrice: { usd: 120, pkr: 33000 },
    periodLabel: "quarter",
    description:
      "The best value for serious learners who want lifetime course access and a longer community runway.",
    features: [
      "Lifetime Access to Pakistan, US Stocks, and Forex Courses",
      "3 months Private Trading Community Access - Discord",
      "Proven Trade System and Setups - trade callouts setup based",
      "Weekly Live Sessions",
      "Market Updates",
    ],
    discountText: "20% DISCOUNT",
    cta: "Join Pro Trader",
    highlighted: false,
  },
];

const winCards: WinCard[] = [
  {
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

const communityWinItems: WinSlide[] = winCards.flatMap((card) => card.slides);

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

type TestimonialPost = {
  image: string;
  accent: string;
  kind: "thin" | "thick";
};

function TestimonialRow({
  posts,
  reverse = false,
}: {
  posts: TestimonialPost[];
  reverse?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const segmentWidthRef = useRef(0);
  const list = [...posts, ...posts, ...posts];

  const normalizeScroll = () => {
    const scroller = scrollerRef.current;
    const segmentWidth = segmentWidthRef.current;
    if (!scroller || !segmentWidth) return;

    if (scroller.scrollLeft >= segmentWidth * 2) {
      scroller.scrollLeft -= segmentWidth;
    } else if (scroller.scrollLeft <= 0) {
      scroller.scrollLeft += segmentWidth;
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrame = 0;
    const speed = reverse ? -0.7 : 0.7;

    const measure = () => {
      segmentWidthRef.current = scroller.scrollWidth / 3;
      if (segmentWidthRef.current && scroller.scrollLeft === 0) {
        scroller.scrollLeft = segmentWidthRef.current;
      }
    };

    const tick = () => {
      measure();

      if (!isDraggingRef.current) {
        scroller.scrollLeft += speed;
        normalizeScroll();
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    measure();
    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [reverse, posts]);

  return (
    <div className="relative left-1/2 right-1/2 mb-5 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
      <div
        ref={scrollerRef}
        className="testimonial-scroller flex cursor-grab select-none items-center gap-5 overflow-x-auto active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onPointerDown={(event) => {
          isDraggingRef.current = true;
          lastPointerXRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!isDraggingRef.current) return;

          const scroller = scrollerRef.current;
          if (!scroller) return;

          const delta = event.clientX - lastPointerXRef.current;
          scroller.scrollLeft -= delta;
          lastPointerXRef.current = event.clientX;
          normalizeScroll();
        }}
        onPointerUp={(event) => {
          isDraggingRef.current = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          isDraggingRef.current = false;
        }}
      >
        {list.map((post, i) => {
          const isThin = post.kind === "thin";

          return (
            <div
              key={`${post.image}-${i}`}
              className={`overflow-hidden rounded-[18px] border border-white/8 bg-[#1b1c21] p-3 text-white ${
                isThin
                  ? "min-w-[300px] sm:min-w-[500px]"
                  : "min-w-[350px] sm:min-w-[440px]"
              }`}
            >
              <div className="overflow-hidden rounded-[8px] border border-black/30 bg-[#0b0b0d]">
                <img
                  src={post.image}
                  alt="Feedback screenshot"
                  className={`${isThin ? "h-[110px]" : "h-[420px]"} w-full object-contain`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CloudinaryVideoPlayer({
  source,
  poster,
  title,
  className = "",
}: {
  source: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const reactId = useId();
  const playerId = `cld-video-${reactId.replace(/:/g, "")}`;
  const playerRef = useRef<VideoPlayer | null>(null);
  const disposeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (disposeTimerRef.current !== null) {
      window.clearTimeout(disposeTimerRef.current);
      disposeTimerRef.current = null;
    }

    if (!playerRef.current) {
      playerRef.current = cloudinary.videoPlayer(playerId, {
        cloudName: CLOUDINARY_CLOUD_NAME,
        controls: true,
        fluid: true,
        sourceTypes: ["auto"],
      });
    }

    playerRef.current.source(source, {
      sourceTypes: ["auto"],
      ...(poster ? { posterOptions: { publicId: poster } } : {}),
    });
  }, [playerId, poster, source]);

  useEffect(() => {
    return () => {
      disposeTimerRef.current = window.setTimeout(() => {
        playerRef.current?.dispose();
        playerRef.current = null;
      }, 0);
    };
  }, []);

  return (
    <div className={`cld-player-shell ${className}`}>
      <video
        id={playerId}
        className="cld-video-player cld-fluid"
        controls
        playsInline
        poster={poster}
        aria-label={title}
      />
    </div>
  );
}

export default function TradingHeroSection() {
  const [activeSection, setActiveSection] = useState("#overview");
  const [openModule, setOpenModule] = useState(0);
  const [currency, setCurrency] = useState<Currency>("pkr");
  const [benefitsInView, setBenefitsInView] = useState(false);
  const [activeProofTab, setActiveProofTab] = useState(0);
  const heroBenefitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "#overview",
        "#curriculum",
        "#community-wins",
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
      { label: "Community Wins", href: "#community-wins" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
    ],
    [],
  );

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

  const testimonialPosts: TestimonialPost[] = [
    {
      image: "/testimonial/testi-1.png",
      accent: "#d8c18d",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-2.png",
      accent: "#6965ff",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-3.png",
      accent: "#ffcc4d",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-4.png",

      accent: "#35d399",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-5.png",
      accent: "#89e4ff",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-6.png",
      accent: "#ff8f70",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-7.jpg",

      accent: "#b391ff",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-8.jpg",
      accent: "#f2df7d",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-10.jpg",

      accent: "#79d2ff",
      kind: "thin",
    },
    {
      image: "/testimonial/testi-12.jpg",
      accent: "#ffb86b",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-15.jpg",
      accent: "#35d399",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-16.jpg",
      accent: "#89e4ff",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-17.jpg",
      accent: "#ff8f70",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-18.jpg",
      accent: "#b391ff",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-18 (1).jpg",
      accent: "#f2df7d",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-19.jpg",
      accent: "#79d2ff",
      kind: "thick",
    },
    {
      image: "/testimonial/testi-20.jpg",
      accent: "#ffb86b",
      kind: "thick",
    },
  ];

  const thinTestimonialPosts = testimonialPosts.filter(
    (post) => post.kind === "thin",
  );
  const thickTestimonialPosts = testimonialPosts.filter(
    (post) => post.kind === "thick",
  );

  const heroVideo = {
    title: "Trade School Preview",
    source: "2026-04-30_12-06-25_a601z7",
    poster:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=1200&q=80",
  };

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

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.14 },
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [activeProofTab, openModule]);

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
        @keyframes heroVideoHang {
          0% {
            opacity: 1;
            transform: translateY(-132px) rotate(-1.5deg);
          }
          32% {
            opacity: 1;
            transform: translateY(0) rotate(3.6deg);
          }
          48% {
            transform: translateY(0) rotate(-2.4deg);
          }
          63% {
            transform: translateY(0) rotate(1.35deg);
          }
          77% {
            transform: translateY(0) rotate(-0.62deg);
          }
          89% {
            transform: translateY(0) rotate(0.24deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }
        .hero-hanging-video {
          animation: heroVideoHang 2200ms cubic-bezier(0.16, 0.86, 0.22, 1) 160ms both;
          transform-origin: 50% 0;
          will-change: transform, opacity;
        }
        .testimonial-scroller::-webkit-scrollbar {
          display: none;
        }
        .cld-player-shell,
        .cld-player-shell .video-js,
        .cld-player-shell .cld-video-player {
          height: 100%;
          width: 100%;
        }
        .cld-player-shell .vjs-tech {
          object-fit: cover;
        }
      `}</style>

      <section
        id="overview"
        className="relative overflow-hidden bg-white text-[#080808]"
        style={{
          scrollBehavior: "smooth",
          fontFamily: '"Inter", "SF Pro Display", "Segoe UI", sans-serif',
        }}
      >
        <div className="fixed left-0 top-0 z-50 w-full border-b border-[#0899b8]/10 bg-[#050505]/92 backdrop-blur-xl">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[auto_auto_auto] items-center justify-between gap-6 px-5 py-4 lg:px-8 xl:px-5">
            <div className="flex min-w-[150px] items-center">
              <img
                src="/trade-school-logo.png"
                alt="The Trade School"
                className="h-14 w-auto object-contain"
              />
            </div>

            <nav className="hidden w-fit items-center justify-center gap-1 rounded-full border border-[#0899b8]/10 bg-[#111111]/80 px-2 py-2 shadow-sm lg:flex">
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
                      ? "bg-[#0899b8] text-[#080808]"
                      : "text-[#e8e8e8]/62 hover:bg-[#1a1a1a] hover:text-[#0899b8]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="motion-shine inline-flex h-10 min-w-[142px] shrink-0 items-center justify-center gap-2 justify-self-end rounded-full bg-[#0899b8] px-6 text-sm font-semibold text-[#080808] transition hover:bg-[#0899b8]">
              Enroll Now
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

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
                className="hero-display-heading motion-rise max-w-[560px] text-[58px] uppercase leading-[0.86] tracking-[-0.055em] text-[#080808] sm:text-[88px] lg:text-[78px] xl:text-[88px]"
                style={{ "--motion-delay": "120ms" } as CSSProperties}
              >
                Content
                <span className="block text-[#0899b8]">that</span>
                <span className="block text-[#080808] mix-blend-difference">
                  converts
                </span>
              </h1>

              <p
                className="motion-rise relative z-20 mt-8 max-w-[365px] text-[15px] font-medium leading-6 text-[#080808]"
                style={{ "--motion-delay": "220ms" } as CSSProperties}
              >
                Unlock your brand's potential with our social media strategies,
                from website audits to ready-to-post content that converts.
              </p>

              <div
                className="motion-rise mt-6 flex flex-wrap items-center gap-3"
                style={{ "--motion-delay": "320ms" } as CSSProperties}
              >
                <a
                  href="#pricing"
                  className="motion-shine inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0899b8] px-7 text-[14px] font-semibold text-[#080808] transition hover:bg-[#0899b8]"
                >
                  Start for free <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#testimonials"
                  className="motion-lift inline-flex h-11 items-center justify-center rounded-full border border-[#080808]/18 bg-white px-6 text-[14px] font-semibold text-[#080808] shadow-sm transition hover:border-[#0899b8] hover:text-[#0899b8]"
                >
                  See our work
                </a>
              </div>

              <div
                className="motion-rise mt-8 grid max-w-[360px] grid-cols-3 gap-4"
                style={{ "--motion-delay": "420ms" } as CSSProperties}
              >
                {[
                  ["98%", "Satisfaction"],
                  ["12K+", "Videos made"],
                  ["314", "Brands served"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-[30px] font-black leading-none tracking-wide text-[#080808]">
                      {value}
                    </p>
                    <p className="mt-2 text-[14px] text-[#080808]/58">
                      {label}
                    </p>
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
                      Featured video
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-[#ffffff]">
                      {heroVideo.title}
                    </h2>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0899b8]/15 bg-[#111111] px-4 py-2 text-xs font-semibold text-[#cfcfcf]">
                    <PlayCircle className="h-4 w-4 text-[#0899b8]" />
                    Trade School
                  </span>
                </div>

                <CloudinaryVideoPlayer
                  source={heroVideo.source}
                  poster={heroVideo.poster}
                  title={heroVideo.title}
                  className="h-[300px] w-full bg-black sm:h-[380px] lg:h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>

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
                  {heroBenefitCards.map((card, index) => {
                    return (
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
                              card.highlight
                                ? "text-[#080808]/62"
                                : "text-[#080808]/58"
                            }`}
                          >
                            {card.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="relative z-10 mx-auto grid w-full max-w-[1240px] gap-8 overflow-hidden bg-white px-5 py-14 text-[#080808] lg:grid-cols-[0.76fr_1.24fr] lg:gap-12 lg:px-8 lg:py-20 xl:px-5"
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

        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-2 text-[#080808] lg:px-8 lg:pb-20 xl:px-5">
          <div className="px-0 py-0">
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
                          alt={curriculumModules[openModule].title}
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
                            {curriculumModules[openModule].title.replace(
                              /^Module \d+:\s/,
                              "",
                            )}
                          </h3>
                        </div>
                      </div>

                      <div className="relative flex min-h-[360px] flex-col justify-between rounded-[26px] border border-[#0899b8]/10 bg-[#080808] p-6">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="rounded-full border border-[#0899b8]/20 bg-[#0899b8]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0899b8]">
                              {curriculumModules[openModule].lessons} lessons
                            </span>
                            <span className="text-sm font-semibold text-[#e8e8e8]/46">
                              {openModule + 1}/{curriculumModules.length}
                            </span>
                          </div>
                          <h3 className="mt-8 max-w-[420px] text-4xl font-black leading-[0.95] tracking-[-0.04em] text-[#ffffff]">
                            {curriculumModules[openModule].title}
                          </h3>
                          <p className="mt-5 max-w-[520px] text-base leading-8 text-[#cfcfcf]">
                            {curriculumModules[openModule].content}
                          </p>
                        </div>

                        <div className="mt-8">
                          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#e8e8e8]/52">
                            <span>Roadmap progress</span>
                            <span>
                              {Math.round(
                                ((openModule + 1) / curriculumModules.length) *
                                  100,
                              )}
                              %
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[#e8e8e8]/10">
                            <div
                              className="h-full rounded-full bg-[#0899b8] transition-all duration-500"
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
                                isOpen
                                  ? "text-[#080808]/55"
                                  : "text-[#e8e8e8]/42"
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

            <div className="my-10 h-[1px] w-full bg-gradient-to-r from-transparent via-[#0899b8]/10 to-transparent lg:my-12" />

            <div
              id="community-wins"
              data-reveal
              className="relative mt-12 scroll-mt-28 overflow-hidden  lg:mt-16 lg:p-8"
            >
              <div className="relative z-10 mb-8 text-center lg:mb-10">
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
                className="relative z-10 overflow-hidden rounded-[34px] border border-[#0899b8]/8 bg-[#080808] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
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
                        className="relative h-[620px] overflow-hidden rounded-[26px] border border-[#0899b8]/6 bg-[#111111]"
                      >
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#111111] to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#111111] to-transparent" />

                        <div
                          className="motion-ticker flex flex-col gap-4 p-4"
                          style={{
                            animation: `${reverse ? "communityWinsUpReverse" : "communityWinsUp"} 24s linear infinite`,
                          }}
                        >
                          {duplicated.map((item, idx) => (
                            <div
                              key={`${item.user}-${item.setup}-${idx}`}
                              className="motion-lift rounded-[22px] border border-[#0899b8]/8 bg-[#131313] p-4 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                            >
                              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                                <div>
                                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#0899b8]">
                                    Community Win
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-white">
                                    {item.user}
                                  </p>
                                </div>
                                <div className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-semibold text-[#0899b8]">
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
                                      <p className="mt-1 text-2xl font-semibold text-[#0899b8]">
                                        {item.pnl}
                                      </p>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#0899b8]/18 text-[#0899b8]">
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

            <div className="my-10 h-[1px] w-full bg-gradient-to-r from-transparent via-[#0899b8]/10 to-transparent lg:my-12" />

            <div
              id="testimonials"
              data-reveal
              className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-12 w-screen scroll-mt-28 overflow-hidden border-y border-[#080808]/10 bg-white px-5 py-16 text-[#080808] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(8,8,8,0.045)_1px,transparent_1px)] before:bg-[size:36px_36px] lg:mt-16 lg:px-8 lg:py-24"
            >
              <div className="relative z-10 mx-auto max-w-[1240px]">
                <div className="mb-8 text-center lg:mb-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0899b8]">
                    Testimonials
                  </p>
                  <h2 className="section-display-heading mt-4 text-[44px] leading-[0.88] tracking-[-0.045em] text-[#080808] sm:text-[62px] lg:text-[72px]">
                    Real <span className="text-[#0899b8]">feedback</span> from
                    <br />
                    our community
                  </h2>
                </div>

                <TestimonialRow posts={thinTestimonialPosts} />
                <TestimonialRow posts={thickTestimonialPosts} reverse />
              </div>
            </div>

            <div className="my-10 h-[1px] w-full bg-gradient-to-r from-transparent via-[#0899b8]/10 to-transparent lg:my-12" />

            <div
              id="trading-partners"
              data-reveal
              className="relative mt-12 scroll-mt-28 overflow-visible p-5 lg:mt-16 lg:p-8"
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

            <div className="my-10 h-[1px] w-full bg-gradient-to-r from-transparent via-[#0899b8]/10 to-transparent lg:my-12" />

            <div
              id="pricing"
              data-reveal
              className="relative mt-12 scroll-mt-28 overflow-hidden  p-5 lg:mt-16 lg:p-8"
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
                  Pick the level that matches your learning stage and switch
                  between PKR and USD inside each card.
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
          </div>
        </div>
      </section>
    </>
  );
}
