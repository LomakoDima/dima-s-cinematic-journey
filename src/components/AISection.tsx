import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "@/lib/motion";

const PANELS = [
  {
    k: "TOOL",
    q: "Which AI tool did I use?",
    a: "Mainly ChatGPT, plus a coding assistant while building. I treated them like a fast, tireless collaborator that never gets bored of my questions.",
  },
  {
    k: "HELP",
    q: "What did AI help with?",
    a: "Brainstorming directions, improving my English, structuring ideas, exploring design references, refining wording and unblocking me during development.",
  },
  {
    k: "MINE",
    q: "What did I edit myself?",
    a: "Everything personal. The facts about me, the tone, the final structure and every creative decision were written, checked and rewritten by hand. AI drafted; I chose.",
  },
];

const PROS = ["Faster ideation", "Learning support", "Room to experiment", "Higher productivity"];
const CONS = [
  "Can produce inaccurate information",
  "Can make writing feel less personal",
  "Always requires human verification",
  "Easy to over-rely on",
];

export function AISection() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState(0);

  return (
    <section ref={ref} id="ai" className="px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="07" title="Human × AI" />

      <h2 className="display-lg mt-14 max-w-4xl">
        <span className="line-mask">
          <span className="block" data-reveal>
            HUMAN × AI.
          </span>
        </span>
      </h2>
      <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        This site was made with AI in the room, not instead of me. Here&apos;s exactly where the line
        between the two sits.
      </p>

      <div className="mt-16 border-t border-hairline">
        {PANELS.map((p, i) => (
          <div key={p.k} className="border-b border-hairline">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-baseline gap-6 py-7 text-left transition-colors hover:text-primary"
            >
              <span className="meta w-16 shrink-0 text-primary">{p.k}</span>
              <span className="display-md flex-1">{p.q}</span>
              <span className="meta">{open === i ? "—" : "+"}</span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 pl-0 text-[15px] leading-relaxed text-muted-foreground md:pl-[5.5rem]">
                  {p.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <p className="meta text-primary">Advantages</p>
          <ul className="mt-6 space-y-4">
            {PROS.map((x) => (
              <li key={x} className="border-b border-hairline pb-4 font-display text-lg">
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="meta">Disadvantages</p>
          <ul className="mt-6 space-y-4">
            {CONS.map((x) => (
              <li
                key={x}
                className="border-b border-hairline pb-4 font-display text-lg text-muted-foreground"
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
