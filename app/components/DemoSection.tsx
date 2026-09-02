/** Secondary, and labelled a demo.
 *
 *  The repo moved this off `/` for a reason: leading with it made the demo look
 *  like the product. It keeps that position here.
 */
export default function DemoSection() {
  return (
    <div className="panel p-6">
      <div className="eyebrow mb-3">the demo it grew out of</div>
      <h3 className="text-[19px] font-bold tracking-tight text-[var(--bright)] mb-3">
        Ctrl-F for Video
      </h3>
      <p className="text-[14px] leading-relaxed text-[var(--body)] max-w-[62ch]">
        Multimodal search over conference talks, where{" "}
        <span className="text-[var(--bright)]">the video and its index are the same table</span>.
        Searching the whole corpus reads zero bytes of video — not very little, zero.
      </p>
      <p className="text-[13px] leading-relaxed text-[var(--haze)] mt-4 max-w-[62ch]">
        It needs a built corpus and a local embedding model, so it is not in the
        packaged app: the DMG deliberately ships without torch, and the demo screen
        says so rather than failing quietly. Build it from the repo to run it.
      </p>
    </div>
  );
}
