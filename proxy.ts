import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/** A password on /prep, and nothing else.
 *
 *  HTTP Basic auth against PREP_PASSWORD, checked on the server before any of the
 *  section is sent — including the RSC payloads a client-side navigation fetches,
 *  which go through the same paths. The browser remembers the credential for the
 *  session, so it is asked for once. Any username works; only the password counts.
 *
 *  Fails closed: with PREP_PASSWORD unset the section is a 404, so a deploy that
 *  forgot the variable hides the pages rather than publishing them.
 */
export function proxy(request: NextRequest) {
  const password = process.env.PREP_PASSWORD;
  if (!password) return new NextResponse(null, { status: 404 });

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let supplied = "";
    try {
      const decoded = atob(header.slice(6));
      supplied = decoded.slice(decoded.indexOf(":") + 1);
    } catch {
      // Malformed header: treated as no credential.
    }
    const a = Buffer.from(supplied);
    const b = Buffer.from(password);
    if (a.length === b.length && timingSafeEqual(a, b)) {
      const res = NextResponse.next();
      // Behind a password, so no shared cache should keep a copy.
      res.headers.set("Cache-Control", "private, no-store");
      return res;
    }
  }

  return new NextResponse("Password required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="prep", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}

export const config = {
  matcher: ["/prep", "/prep/:path*"],
};
