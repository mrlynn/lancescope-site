/** The top of every prep page: an eyebrow, a title and an optional lead. */
export default function Head({ eyebrow, title, lead, children }: {
  eyebrow?: string;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-10">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h1 className="text-[28px] md:text-[36px] leading-[1.1] font-black tracking-tight
                     text-[var(--bright)] mb-4 text-balance">
        {title}
      </h1>
      {lead && <div className="text-[15px] leading-relaxed text-[var(--body)] max-w-[64ch]">{lead}</div>}
      {children}
    </header>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-[19px] font-bold tracking-tight text-[var(--bright)] mt-14 mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] leading-relaxed text-[var(--body)] mb-4 max-w-[68ch]">{children}</p>;
}

/** A line to say out loud. */
export function Say({ children, label = "Say it" }: { children: React.ReactNode; label?: string }) {
  return (
    <blockquote className="border-l-2 pl-4 py-1 my-5 max-w-[68ch]"
                style={{ borderColor: "rgb(var(--video-rgb) / 0.6)" }}>
      <div className="eyebrow mb-1.5" style={{ color: "var(--video)" }}>{label}</div>
      <p className="text-[15px] leading-relaxed text-[var(--bright)]">{children}</p>
    </blockquote>
  );
}
