import type { Metadata } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

/* Standing in for LanceDB's Aeonik Pro / Aeonik Fono, same as the console does. */
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "A read-only workbench for LanceDB: schema, versions, indices, fragments and " +
  "rows, with the byte cost of every read shown as you go.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lancescope.mlynn.dev"),
  title: "LanceScope — see what a LanceDB dataset costs to read",
  description: DESCRIPTION,
  openGraph: {
    title: "LanceScope",
    description: DESCRIPTION,
    url: "https://lancescope.mlynn.dev",
    siteName: "LanceScope",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "LanceScope", description: DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${schibsted.variable} ${martian.variable} antialiased`}>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
