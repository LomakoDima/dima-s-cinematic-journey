import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";

const TRAITS = ["CURIOUS", "CREATIVE", "PERSISTENT", "EXPERIMENTAL", "BUILDER"];

export function PersonalitySection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-trait]").forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.08, xPercent: i % 2 === 0 ? -4 : 4, filter: "blur(6px)" },
          {
            opacity: 1,
            xPercent: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: { trigger: word, start: "top 88%", end: "top 45%", scrub: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="02" title="Personality" />

      <ul className="mt-16 space-y-1 md:space-y-2">
        {TRAITS.map((t, i) => (
          <li
            key={t}
            data-trait
            className="display-lg flex items-baseline gap-4 border-b border-hairline pb-3 md:gap-8"
            style={{ paddingLeft: `${i * 3}%` }}
          >
            <span className="meta hidden shrink-0 md:inline">0{i + 1}</span>
            <span className={i % 2 ? "text-muted-foreground" : ""}>{t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-8 md:grid-cols-12">
        <p className="meta md:col-span-3">In words</p>
        <div className="max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground md:col-span-9 md:text-base">
          <p>
            I&apos;m calm on the outside and restless on the inside. I ask a lot of questions, I get
            attached to details, and I&apos;d rather rebuild something three times than ship it half
            right. When something breaks, I stay with it — that stubbornness is probably my most
            useful trait.
          </p>
          <p>
            People usually describe me as quiet at first and talkative once the topic is interesting.
            [Edit: add a short description of your appearance — height, hair, style, how friends
            describe you.]
          </p>
        </div>
      </div>
    </section>
  );
}
