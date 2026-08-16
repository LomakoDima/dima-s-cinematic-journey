import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, useReveal } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";
import portrait from "@/assets/portrait.jpg";

export function AboutSection() {
  const ref = useReveal<HTMLElement>();
  const mask = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const m = mask.current;
    const i = img.current;
    if (!m || !i || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        m,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: m, start: "top 80%" },
        },
      );
      gsap.fromTo(
        i,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="01" title="About" />

      <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <h2 className="display-lg">
            <span className="line-mask">
              <span className="block" data-reveal>
                A LITTLE
              </span>
            </span>
            <span className="line-mask">
              <span className="block text-muted-foreground" data-reveal>
                ABOUT ME.
              </span>
            </span>
          </h2>

          <div className="mt-10 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            <p>
              I&apos;m Dima — a student from Almaty, Kazakhstan, who spends most of his free time
              building things on a screen. Programming started as curiosity and quietly turned into
              the way I think.
            </p>
            <p>
              I like the moment an idea becomes something you can actually click. Web development,
              interfaces, small experiments, Minecraft modding, and lately AI — anything that lets me
              take a concept and give it a shape.
            </p>
            <p>
              Outside of code: music while working late, mountains on weekends, and an ongoing habit
              of starting more projects than I finish.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-4">
            {[
              ["Name", "Dima"],
              ["Age", "[edit: your age]"],
              ["Studies", "[edit: school / university]"],
              ["Based in", "Almaty, KZ"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="meta">{k}</dt>
                <dd className="mt-2 font-display text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5">
          <div ref={mask} className="relative aspect-[4/5] overflow-hidden">
            <img
              ref={img}
              src={portrait}
              alt="Portrait of Dima in low, cinematic light"
              width={1024}
              height={1280}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <p className="meta mt-4">Fig. 01 — Portrait</p>
        </div>
      </div>
    </section>
  );
}
