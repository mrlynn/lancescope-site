/** A stable download URL: lancescope.mlynn.dev/download
 *
 *  Worth having because tag names change and QR codes, slides and READMEs do not.
 *  It resolves the latest release at request time and redirects to the DMG asset.
 *
 *  When there is no published release it redirects to the build instructions on the
 *  home page instead of to an empty releases page. Sending someone who clicked
 *  "download" to a page listing nothing is the worst of the available outcomes: it
 *  reads as a broken project rather than an early one.
 */

import { redirect } from "next/navigation";
import { getLatestRelease } from "@/app/lib/release";

export async function GET() {
  const release = await getLatestRelease();
  redirect(release.resolved ? release.url : "/#get");
}
