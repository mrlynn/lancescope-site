/** One band of the page. Keeps the rhythm identical everywhere so the sections
 *  read as one document rather than a stack of cards. */
export default function Section({
  eyebrow,
  title,
  lead,
  children,
  source,
}: {
  eyebrow?: string;
  title?: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  /** Where the numbers in this section came from. Rendered as a footnote. */
  source?: string;
}) {
  return (
    <section className="max-w-[880px] mx-auto px-6 py-16 md:py-20">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      {title && (
        <h2 className="text-[26px] md:text-[32px] leading-[1.15] font-extrabold tracking-tight
                       text-[var(--bright)] mb-4 text-balance">
          {title}
        </h2>
      )}
      {lead && (
        <div className="text-[15px] md:text-[16px] leading-relaxed text-[var(--body)] max-w-[62ch]">
          {lead}
        </div>
      )}
      {children && <div className="mt-8">{children}</div>}
      {source && (
        <p className="mono text-[10px] text-[var(--dim)] mt-6 leading-relaxed">{source}</p>
      )}
    </section>
  );
}
