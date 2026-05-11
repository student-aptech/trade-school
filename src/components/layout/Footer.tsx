import type { SVGProps } from "react";
import { ArrowUpRight, Globe, Link2 } from "lucide-react";
import { navItems } from "../../data/appData";

type SocialIconProps = SVGProps<SVGSVGElement>;

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.2V6.6c0-.8.5-1 1-1h1.4V3.1c-.7-.1-1.5-.2-2.3-.2-2.4 0-4 1.5-4 4.2v1.1H7.8V11h2.5v10h3V11h2.5l.4-2.8h-2z" />
    </svg>
  );
}

function YouTubeIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2s-.2-1.5-.9-2.2c-.8-.9-1.7-.9-2.2-1C15.4 3.8 12 3.8 12 3.8s-3.4 0-6.5.2c-.5.1-1.4.1-2.2 1-.7.7-.9 2.2-.9 2.2S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.5.9 2.2c.8.9 1.9.9 2.4 1 1.7.2 6.3.2 6.3.2s3.4 0 6.5-.3c.5 0 1.4-.1 2.2-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.7c0-1.7-.2-3.5-.2-3.5zM9.9 14.7V8.5l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}

function XIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 10.2 22.2 1h-1.9l-7.1 8-5.7-8H1l8.6 12.1L1 23h1.9l7.6-8.6 6.1 8.6H23l-9-12.8zm-2.7 3.1-.9-1.2L3.5 2.4h3.1l5.6 7.9.9 1.2 7.2 10.2h-3.1l-5.9-8.4z" />
    </svg>
  );
}

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        width="16"
        height="16"
        x="4"
        y="4"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon(props: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.9 3c.3 2.3 1.6 3.7 3.8 3.9v3.1c-1.3.1-2.5-.3-3.7-1.1v5.7c0 4.3-4.7 7.1-8.6 4.8-2.5-1.5-3.3-4.9-1.6-7.3 1.2-1.8 3.1-2.6 5.4-2.2v3.3c-.4-.1-.8-.2-1.2-.1-1.7.1-2.7 1.9-1.8 3.3.8 1.2 2.7 1.2 3.5 0 .3-.5.4-1 .4-1.6V3h3.8z" />
    </svg>
  );
}

const legalLinks = [
  {
    label: "EULA",
    href: "https://thetradeschool.info/end-user-license-agreement/",
  },
  { label: "Legal Disclaimer", href: "/legal-disclaimer" },
  {
    label: "Privacy Policy",
    href: "https://thetradeschool.info/privacy-policy-2/",
  },
  { label: "Return and Refund", href: "/return-and-refund" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

const contactLinks = [
  {
    label: "management@thetradeschool.info",
    href: "mailto:management@thetradeschool.info",
  },
  { label: "03153206125", href: "tel:03153206125" },
  { label: "03211952111", href: "tel:03211952111" },
];

const socialLinks = [
  {
    label: "Linktree",
    href: "https://linktr.ee/thetradeschool.info",
    icon: Link2,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/TheTradeSchool.info",
    icon: FacebookIcon,
  },
  {
    label: "Facebook Group",
    href: "https://www.facebook.com/groups/thetradeschool.info",
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TheTradeSchool",
    icon: YouTubeIcon,
  },
  { label: "Twitter / X", href: "https://x.com/mtrade_", icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thetradeschool.info/",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@thetradeschool.info",
    icon: TikTokIcon,
  },
  {
    label: "Courses",
    href: "https://thetradeschool.info/courses/",
    icon: Globe,
  },
];

export function Footer() {
  return (
    <footer className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black px-4 pb-5 pt-10 text-white sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 rounded-[2px] bg-black px-6 py-8  md:grid-cols-[1.05fr_1px_0.72fr_0.95fr_1fr_1px_auto] md:items-start lg:px-10">
        <div>
          <img
            src="/trade-school-logo.png"
            alt="The Trade School"
            className="h-12 w-auto object-contain"
          />
          <h2 className="mt-5 max-w-[360px] text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[#f3f3f3] sm:text-[32px]">
            Confident trades
            <br />
            for serious traders.
          </h2>

          <form
            className="mt-7 max-w-[300px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <label
              htmlFor="footer-email"
              className="text-sm font-medium text-[#cfcfcf]"
            >
              Subscribe to our newsletter
            </label>
            <div className="mt-3 flex h-11 items-center rounded-full border border-white/10 bg-[#151515] pl-4 pr-1.5">
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#777777]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3a3a3a] text-white transition hover:bg-[#0899b8] hover:text-[#080808]"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="hidden h-full w-px bg-white/10 md:block" />

        <nav>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0899b8]">
            Explore the Site
          </h3>
          <div className="mt-5 grid gap-4 text-sm font-medium text-[#aaa]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[#0899b8]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <nav>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0899b8]">
            Policies & Legal
          </h3>
          <div className="mt-5 grid gap-4 text-sm font-medium text-[#aaa]">
            {legalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[#0899b8]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0899b8]">
            Get in Touch
          </h3>
          <div className="mt-5 grid gap-4 text-sm font-medium text-[#aaa]">
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="break-all transition hover:text-[#0899b8]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden h-full w-px bg-white/10 md:block" />

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#0899b8]">
            Follow Us
          </h3>
          <div className="mt-5 grid grid-cols-4 gap-3 md:grid-cols-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-xs font-black text-[#aaa] transition hover:border-[#0899b8] hover:text-[#0899b8]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
