/** The LanceScope mark. Source and reasoning: brand/mark.svg.
 *
 *  The lattice is LanceDB's, cell for cell — same 4x4 grid on a 204pt box, same
 *  axis, same radius. The glass over cell [3,3] is ours, and it is what makes
 *  this a different mark rather than theirs with a tint. Drawn here rather than
 *  imported from the console because that lives in another repository now; the
 *  shared thing is brand/mark.svg, whose twin in mrlynn/lancescope is what
 *  scripts/gen_icons.py renders the app icons from. Keep the two in step.
 *
 *  `mono` draws everything in currentColor. It is also the test: a change that
 *  makes the mark illegible in one colour at 16px has turned it back into the
 *  LanceDB mark.
 */
const DOTS: Array<[number, number]> = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [2, 1], [3, 1],
  [0, 2], [1, 2], [2, 2],
  [1, 3],
];

const AXIS = [48.5, 84.2, 119.8, 155.0];
const LENS = 155.0;

export default function Mark({
  size = 18,
  className = "",
  mono = false,
}: {
  size?: number;
  className?: string;
  mono?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 204 204"
      className={className}
      role="img"
      aria-label="LanceScope"
    >
      <g fill="currentColor" opacity={mono ? 1 : 0.55}>
        {DOTS.map(([c, r]) => (
          <circle key={`${c}-${r}`} cx={AXIS[c]} cy={AXIS[r]} r={18.5} />
        ))}
      </g>
      <g fill="none" strokeWidth={11} stroke={mono ? "currentColor" : "var(--video)"}>
        <circle cx={LENS} cy={LENS} r={22} />
        <line x1={172} y1={172} x2={191.8} y2={191.8} strokeLinecap="round" />
      </g>
    </svg>
  );
}
