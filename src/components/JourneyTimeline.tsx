import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";

const MILESTONES = [
  {
    year: "2024",
    title: "The first real line of code",
    body: "Started seriously exploring programming — syntax, logic, and the strange satisfaction of fixing your own bug at 1 a.m.",
  },
  {
    year: "2025",
    title: "Building, breaking, repeating",
    body: "Real projects: web development, Minecraft modding, and first experiments with AI. Learned that finishing is a separate skill from starting.",
  },
  {
    year: "2026",
    title: "Wider rooms",
    body: "Hackathons, university, new projects and a deeper dive into technology, design and how people actually use the things I build.",
  },
];

export function JourneyTimeline() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 85%", scrub: 0.4 },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((m) => {
        gsap.fromTo(
          m,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: m, start: "top 82%" },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="journey" className="px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="03" title="Journey" />
      <h2 className="display-lg mt-14 max-w-3xl">HOW I GOT HERE.</h2>

      <div className="relative mt-20 pl-8 md:pl-0">
        <div className="absolute left-0 top-0 h-full w-px bg-hairline md:left-[22%]" />
        <div
          ref={line}
          className="absolute left-0 top-0 h-full w-px origin-top bg-primary md:left-[22%]"
        />

        <ol className="space-y-24">
          {MILESTONES.map((m) => (
            <li key={m.year} data-milestone className="relative md:grid md:grid-cols-12 md:gap-10">
              <div className="md:col-span-3">
                <span className="absolute -left-8 top-2 size-1.5 rounded-full bg-primary md:left-[calc(22%-3px)] md:-translate-x-[22%]" />
                <p className="font-display text-3xl text-primary md:text-4xl">{m.year}</p>
              </div>
              <div className="mt-4 md:col-span-8 md:col-start-5 md:mt-0">
                <h3 className="display-md">{m.title}</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
