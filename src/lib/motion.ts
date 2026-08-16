import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function useGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useIsTouch() {
  const [touch, setTouch] = useState(true);
  useEffect(() => {
    setTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return touch;
}

/** Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const l = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis = l as unknown as typeof lenis;
      l.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => l.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
      return () => gsap.ticker.remove(raf);
    })();

    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, []);
}

/** Staggered mask reveal for elements marked with [data-reveal] inside the ref. */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  useGsap();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;
    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 78%" },
        },
      );
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export { gsap, ScrollTrigger };
