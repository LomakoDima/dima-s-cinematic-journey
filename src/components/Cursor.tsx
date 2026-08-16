import { useEffect, useRef } from "react";
import { gsap, useIsTouch } from "@/lib/motion";

/** Small precise cursor that expands and shows a context label over [data-cursor] elements. */
export function Cursor() {
  const touch = useIsTouch();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (touch) return;
    const d = dot.current!;
    const r = ring.current!;
    const l = label.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });

    const move = (e: PointerEvent) => {
      gsap.to([d, r], { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
      dx(e.clientX);
      dy(e.clientY);

      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const text = target?.dataset["cursor"] ?? "";
      if (text) {
        l.textContent = text;
        gsap.to(r, { width: 76, height: 76, duration: 0.4, ease: "expo.out" });
        gsap.to(l, { opacity: 1, duration: 0.3 });
        gsap.to(d, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(r, { width: 26, height: 26, duration: 0.4, ease: "expo.out" });
        gsap.to(l, { opacity: 0, duration: 0.2 });
        gsap.to(d, { scale: 1, duration: 0.3 });
      }
    };
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [touch]);

  if (touch) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-foreground" />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex size-[26px] items-center justify-center rounded-full border border-primary/70 backdrop-blur-[1px]"
      >
        <span ref={label} className="meta text-[9px] text-primary opacity-0" />
      </div>
    </div>
  );
}
