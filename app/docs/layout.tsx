import type { Metadata } from "next";
import { DocsNav } from "@/app/components/docs/DocsNav";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import { SECTIONS, docIndex } from "@/app/lib/docs";

export const metadata: Metadata = {
  title: "Guide",
  description: "How to read a LanceDB database, and what every answer costs.",
};

/** The guide, wearing the site's chrome rather than the console's.
 *
 *  Ported from `web/app/docs/layout.tsx` in mrlynn/lancescope, with one change:
 *  the console's `AppBar` — which carries a settings icon and a link to a database
 *  that does not exist out here — becomes the site's `Nav` and `Footer`, so the
 *  guide is part of the site rather than a copy of the app embedded in it.
 *
 *  Wider than the rest of the site on purpose. The prose pages cap at 720px because
 *  they are one column; this is three, and the middle one still measures ~72ch.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative z-10 min-h-screen max-w-[1200px] mx-auto px-6 pt-10 pb-20">
        {/* `items-start` only once there is a row to start in. In the stacked
            column layout it is align-items on the cross axis, which is horizontal:
            it sized the article to its own max-content (651px inside 307px of
            phone) and widened the whole page. The rail and the article should
            stretch to the column's width until `lg` turns the axis. */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-start">
          <DocsNav docs={docIndex()} sections={SECTIONS} />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
