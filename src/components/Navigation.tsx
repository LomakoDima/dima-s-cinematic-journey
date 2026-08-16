import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./Magnetic";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Gallery", href: "#gallery" },
  { label: "Future", href: "#future" },
  { label: "AI", href: "#ai" },
];

export function Navigation() {
  const [dim, setDim] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setDim(window.scrollY > 120);
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-primary"
        ref={bar}
        style={{ transform: "scaleX(0)" }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 transition-all duration-500 md:px-10 ${
          dim ? "opacity-70 hover:opacity-100" : "opacity-100"
        }`}
      >
        <a
          href="#top"
          data-cursor="TOP"
          className="font-display text-sm tracking-[0.35em] text-foreground"
        >
          DIMA
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 md:gap-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Magnetic strength={0.25}>
                  <a
                    href={l.href}
                    className="meta inline-flex min-h-11 items-center px-2 text-[10px] text-muted-foreground transition-colors hover:text-primary md:px-3 md:text-[11px]"
                  >
                    {l.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
