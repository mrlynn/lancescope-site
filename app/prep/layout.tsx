import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import PrepNav from "@/app/components/prep/PrepNav";

/** Interview prep for LanceDB. Not linked from anywhere on the site, kept out of
 *  search indexes, and behind a password — see proxy.ts. */
export const metadata: Metadata = {
  title: "Prep · LanceScope",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PrepLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <PrepNav />
      <main className="max-w-[880px] mx-auto px-6 pt-10 pb-20 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
