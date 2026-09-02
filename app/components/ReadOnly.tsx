/** For a tool people point at production data, this is a feature section rather
 *  than a disclaimer, so it is set like one. */
export default function ReadOnly() {
  return (
    <div className="panel p-6 md:p-8" style={{ borderColor: "rgb(var(--index-rgb) / 0.35)" }}>
      <p className="text-[18px] md:text-[21px] leading-[1.5] font-semibold tracking-tight text-[var(--bright)] text-balance">
        It does not write. No route creates, compacts, restores or deletes anything,
        and the only file the whole project writes is its own settings file.
      </p>
      <p className="text-[14px] leading-relaxed text-[var(--haze)] mt-5 max-w-[62ch]">
        Enforced by a test rather than a promise: the write surface is quarantined
        to one module and CI fails if anything else reaches for it. The read path
        cannot mutate a table because it never opens one for writing.
      </p>
    </div>
  );
}
