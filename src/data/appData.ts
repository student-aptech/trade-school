import type {
  HeroBenefitCard,
  PricingPlan,
  TestimonialPost,
  TradingPartner,
  WinSlide,
} from "../types";

export const sectionIds = [
  "#overview",
  "#curriculum",
  "#community-wins",
  "#testimonials",
  "#pricing",
];

export const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Community Wins", href: "#community-wins" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export const heroBenefitCards: HeroBenefitCard[] = [
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

export const proofTabs = [
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

export const tradingPartners: TradingPartner[] = [
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

export const pricingPlans: PricingPlan[] = [
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

export const communityWinItems: WinSlide[] = [
  { image: "/wins/win-1.png", label: "Community win 1" },
  { image: "/wins/win-2.png", label: "Community win 2" },
  { image: "/wins/win-3.png", label: "Community win 3" },
  { image: "/wins/win-4.jpg", label: "Community win 4" },
  { image: "/wins/win-5.jpg", label: "Community win 5" },
  { image: "/wins/win-6.jpg", label: "Community win 6" },
  { image: "/wins/win-7.jpg", label: "Community win 7" },
  { image: "/wins/win-8.jpg", label: "Community win 8" },
  { image: "/wins/win-9.jpg", label: "Community win 9" },
  { image: "/wins/win-10.jpg", label: "Community win 10" },
  { image: "/wins/win-11.jpg", label: "Community win 11" },
  { image: "/wins/win-12.jpg", label: "Community win 12" },
  { image: "/wins/win-13.jpg", label: "Community win 13" },
  { image: "/wins/win-14.jpg", label: "Community win 14" },
];

export const curriculumModules = [
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

export const testimonialPosts: TestimonialPost[] = [
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
