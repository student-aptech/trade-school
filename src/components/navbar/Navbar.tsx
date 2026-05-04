import { ArrowRight } from "lucide-react";
import { navItems } from "../../data/appData";

type NavbarProps = {
  activeSection: string;
};

export function Navbar({ activeSection }: NavbarProps) {
  return (
    <div
      id="overview"
      className="fixed left-0 top-0 z-50 w-full border-b border-[#0899b8]/10 bg-[#050505]/92 backdrop-blur-xl"
    >
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
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
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
  );
}
