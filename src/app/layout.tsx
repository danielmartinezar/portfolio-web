import type { Metadata } from "next";
import { Georama } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { LanguageProvider } from "../shared/services";
import "../index.css";

const georama = Georama({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-georama",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/vite.svg" },
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" className={georama.variable}>
      <body>
        <LanguageProvider>
          <div className="min-h-screen bg-bg-primary pt-24">
            <Header />
            {children}
            <Footer />
          </div>
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
