/** A stable download URL: lancescope.mlynn.dev/download
 *
 *  Worth having because tag names change and QR codes, slides and READMEs do not.
 *  It resolves the latest release at request time and redirects to the DMG asset,
 *  or to the releases page when the API is unreachable.
 */

import { redirect } from "next/navigation";
import { getLatestRelease } from "@/app/lib/release";

export async function GET() {
  const release = await getLatestRelease();
  redirect(release.url);
}
