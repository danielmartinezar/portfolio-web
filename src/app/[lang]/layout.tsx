import { LanguageProvider } from "../../shared/services";
import type { Language } from "../../shared/services";
import { SUPPORTED_LANGUAGES } from "../../shared/services";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const resolvedLang: Language = SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : "en";

  return (
    <LanguageProvider defaultLanguage={resolvedLang}>
      <div className="min-h-screen bg-bg-primary pt-24">
        <Header />
        {children}
        <Footer />
      </div>
      <ScrollToTop />
    </LanguageProvider>
  );
}
