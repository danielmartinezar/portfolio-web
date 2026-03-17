import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "../index.css";

const georama = Georama({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-georama",
  display: "swap",
});

export const metadata: Metadata = {
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" className={georama.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
