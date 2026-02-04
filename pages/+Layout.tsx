import type { ReactNode } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { LanguageProvider } from "../src/shared/services";
import "../src/index.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-primary pt-24">
        <Header />
        {children}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
