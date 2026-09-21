"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PREP_PAGES } from "@/app/lib/prep";

/** The row of study pages. Scrolls sideways on a phone rather than wrapping into
 *  three lines of links above the content. */
export default function PrepNav() {
  const pathname = usePathname();
  return (
    <div className="sticky top-14 z-40 border-b border-[var(--hairline)]"
         style={{ background: "var(--rail)", backdropFilter: "blur(8px)" }}>
      <nav aria-label="Interview prep"
           className="max-w-[880px] mx-auto px-6 flex gap-1 overflow-x-auto mono text-[11px]
                      [scrollbar-width:none]">
        {PREP_PAGES.map((p) => {
          const here = pathname === p.href;
          return (
            <Link key={p.href} href={p.href}
                  aria-current={here ? "page" : undefined}
                  className={`shrink-0 px-2.5 py-3 border-b-2 transition-colors
                    ${here
                      ? "border-[var(--video)] text-[var(--bright)]"
                      : "border-transparent text-[var(--haze)] hover:text-[var(--bright)]"}`}>
              {p.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
