import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";
import holiday1 from "@/assets/holiday-1.jpg";
import holiday2 from "@/assets/holiday-2.jpg";

export function HolidaySection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.6,
        },
      });
      tl.fromTo("[data-img-a]", { scale: 1.15 }, { scale: 1, ease: "none" }, 0)
        .fromTo("[data-story]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
        .to("[data-story]", { opacity: 0, y: -30, duration: 0.4 }, 0.75)
        .fromTo(
          "[data-img-b]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 },
          0.7,
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative">
      <div className="px-5 md:px-10">
        <SectionLabel index="04" title="Escape" />
      </div>

      <div data-pin className="relative h-svh w-full overflow-hidden">
        <img
          data-img-a
          src={holiday1}
          alt="Snow-covered mountains above a valley at dusk"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <img
          data-img-b
          src={holiday2}
          alt="A still mountain lake surrounded by pine forest in morning fog"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />

        <div
          data-story
          className="absolute inset-0 flex flex-col justify-center px-5 md:px-10"
        >
          <p className="meta">My favourite holiday</p>
          <h2 className="display-lg mt-6 max-w-4xl">THE MOUNTAINS ABOVE THE CITY.</h2>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-foreground/80 md:text-base">
            My favourite escape isn&apos;t far away — it&apos;s an hour above Almaty, where the noise
            stops and the air gets thin. We left early, walked until the city disappeared under the
            clouds, and sat there long enough for the light to change twice. No screens, no tabs
            open. Just cold air, tea, and the kind of quiet that resets your head.
          </p>
          <p className="meta mt-8">[Edit: replace with your real holiday, place and dates]</p>
        </div>
      </div>
    </section>
  );
}
