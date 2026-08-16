import { Magnetic } from "./Magnetic";
import { useReveal } from "@/lib/motion";

export function Footer() {
  const ref = useReveal<HTMLElement>();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="px-5 pb-10 pt-28 md:px-10 md:pt-40">
      <h2 className="display-xl">
        <span className="line-mask">
          <span className="block" data-reveal>
            THANKS FOR
          </span>
        </span>
        <span className="line-mask">
          <span className="block text-muted-foreground" data-reveal>
            SCROLLING.
          </span>
        </span>
      </h2>

      <p className="display-md mt-14 text-primary">KEEP BUILDING.</p>

      <div className="hairline-t mt-24 flex items-center justify-between pt-6">
        <p className="meta">Dima</p>
        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={toTop}
            data-cursor="TOP"
            className="meta min-h-11 px-3 text-foreground transition-colors hover:text-primary"
          >
            Back to top ↑
          </button>
        </Magnetic>
        <p className="meta">Almaty / 2026</p>
      </div>
    </footer>
  );
}
