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
  "A workbench for reading LanceDB datasets: schema, versions, indices, fragments " +
  "and rows, with the byte cost of every read shown as you go.";

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

/* Resolved before first paint, so a reader who chose light does not get a frame of
   dark first. An absent attribute is meaningful: it means "follow the OS", which is
   what the media query in globals.css handles. */
const NO_FLASH = `
try {
  var t = localStorage.getItem('lancescope-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className={`${schibsted.variable} ${martian.variable} antialiased`}>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
