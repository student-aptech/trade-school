import { useEffect, useRef } from "react";
import { testimonialPosts } from "../../data/appData";
import type { TestimonialPost } from "../../types";

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

export function Testimonials() {
  const thinTestimonialPosts = testimonialPosts.filter(
    (post) => post.kind === "thin",
  );
  const thickTestimonialPosts = testimonialPosts.filter(
    (post) => post.kind === "thick",
  );

  return (
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
  );
}
