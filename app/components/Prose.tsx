/** The shell the legal and about pages share.
 *
 *  Deliberately plain: these are pages people read to check something specific,
 *  not to be sold to, so they get one column, real headings and no ornament.
 */
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default function Prose({
  title,
  updated,
  lead,
  children,
}: {
  title: string;
  updated?: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 py-14 md:py-20">
        <Link
          href="/"
          className="mono text-[11px] text-[var(--haze)] hover:text-[var(--bright)] transition-colors"
        >
          ← LanceScope
        </Link>
        <h1 className="text-[30px] md:text-[38px] leading-[1.1] font-black tracking-tight
                       text-[var(--bright)] mt-5 mb-4 text-balance">
          {title}
        </h1>
        {updated && <p className="mono text-[10px] text-[var(--dim)] mb-8">Last updated {updated}</p>}
        {lead && (
          <p className="text-[16px] leading-relaxed text-[var(--body)] mb-10 max-w-[62ch]">{lead}</p>
        )}
        <div className="prose-body">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[18px] font-bold tracking-tight text-[var(--bright)] mt-10 mb-3">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] leading-relaxed text-[var(--body)] mb-4 max-w-[64ch]">{children}</p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 mb-4 space-y-2 text-[14px] leading-relaxed
                   text-[var(--body)] max-w-[64ch] marker:text-[var(--rule)]">
      {children}
    </ul>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-[var(--video)] hover:underline">
      {children}
    </a>
  );
}
