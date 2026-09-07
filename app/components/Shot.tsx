/** A product screenshot, framed.
 *
 *  The console is shown in its light theme and this page is dark by default, so a
 *  bare `<img>` would sit on the page as a hole rather than as a picture of
 *  something. The frame is what makes it read as a screen: a hairline, a radius,
 *  and a shadow that lifts it off the dot field. See `.shot` in globals.css, which
 *  also holds the crop and the phone behaviour.
 *
 *  `ratio` crops from the top, and it is passed as a custom property rather than as
 *  `aspect-ratio` directly so the stylesheet can drop the crop on a narrow screen
 *  without fighting an inline style. Cropping in CSS rather than in the file keeps
 *  the original around, which matters because the original is the evidence and a
 *  re-crop is otherwise a re-shoot.
 *
 *  The caption is not decoration. Every other block on this page carries the number
 *  it is claiming; a screenshot should say what is on it and what that read cost, in
 *  the same voice, or it is the one element on the page arguing from a picture.
 */
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Shot as ShotData } from "@/app/data/measurements";

export default function Shot({
  shot,
  priority = false,
  className = "",
}: {
  shot: ShotData;
  /** Set on the one above the fold. Everything else loads lazily. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="shot"
        data-crop={shot.ratio ? "" : undefined}
        style={shot.ratio ? ({ "--shot-ratio": shot.ratio } as CSSProperties) : undefined}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          priority={priority}
          /* 720px below 640: on a phone the frame scrolls a fixed-width image
             rather than shrinking a console screenshot to illegibility. */
          sizes="(max-width: 640px) 720px, (max-width: 900px) 100vw, 880px"
        />
      </div>
      <figcaption className="mono text-[10px] leading-relaxed text-[var(--dim)] mt-3">
        {shot.caption}
      </figcaption>
    </figure>
  );
}
