import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { BenefitCards } from "./components/section/benefits";
import { sectionIds } from "./data/appData";
import { CommunityWins } from "./components/section/CommunityWins";
import { Curriculam } from "./components/section/curriculam";
import { Hero } from "./components/section/hero";
import { Partners } from "./components/section/Partners";
import { Plans } from "./components/section/Plans";
import { Testimonials } from "./components/section/Testimonials";

export default function TradingHeroSection() {
  const [activeSection, setActiveSection] = useState("#overview");

  useEffect(() => {
    const handleScroll = () => {
      let current = "#overview";
      sectionIds.forEach((id) => {
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
  }, []);

  return (
    <>
      <section
        id="overview"
        className="relative overflow-hidden bg-white text-[#080808]"
        style={{
          scrollBehavior: "smooth",
          fontFamily: '"Inter", "SF Pro Display", "Segoe UI", sans-serif',
        }}
      >
        <Navbar activeSection={activeSection} />
        <Hero />

        <BenefitCards />

        <Curriculam />

        <CommunityWins />

        <Testimonials />

        <Partners />

        <Plans />
      </section>
    </>
  );
}
