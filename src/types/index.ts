export type Currency = "pkr" | "usd";

export type HeroBenefitCard = {
  title: string;
  text: string;
  highlight: boolean;
};

export type PricingPlan = {
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

export type TestimonialPost = {
  image: string;
  accent: string;
  kind: "thin" | "thick";
};

export type TradingPartner = {
  name: string;
  mark: string;
  logo: string;
  description: string;
};

export type WinSlide = {
  image: string;
  label: string;
};
