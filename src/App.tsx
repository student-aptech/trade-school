import { useEffect, useState } from "react";
import { Footer, Navbar } from "./components/layout";
import { BenefitCards } from "./components/section/benefits";
import { sectionIds } from "./data/appData";
import { CommunityWins } from "./components/section/CommunityWins";
import { Curriculam } from "./components/section/curriculam";
import { Hero } from "./components/section/hero";
import { Partners } from "./components/section/Partners";
import { Plans } from "./components/section/Plans";
import { Testimonials } from "./components/section/Testimonials";
import { Checkout } from "./pages/Checkout";
// import { MyIntroduction } from "./components/section/MyIntroduction";
import { FAQs } from "./components/section/FAQs";
// import { RiskDisclosure } from "./components/section/RiskDisclosure";

export default function App() {
  const [activeSection, setActiveSection] = useState("#overview");
  const [path, setPath] = useState(window.location.pathname);

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
  }, [path]);

  useEffect(() => {
    if (path === "/checkout") return;

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
  }, [path]);

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  if (path === "/checkout") {
    return <Checkout />;
  }

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

        <Plans />

        {/* <MyIntroduction /> */}

        <Partners />

        <FAQs />

        {/* <RiskDisclosure /> */}

        <Footer />
      </section>
    </>
  );
}
