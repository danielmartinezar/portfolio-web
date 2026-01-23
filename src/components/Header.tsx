import { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import I18nSwitchButton from "./I18nSwitchButton";
import { useTranslation } from "../shared/services";
import { navbarTranslationLoaders } from "./i18n";
import { Link } from "react-router-dom";
import { ContentContainer } from "./layout";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const { t: navbar } = useTranslation(navbarTranslationLoaders);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 py-6 z-50 transition-colors duration-300 ${isScrolled ? 'bg-bg-header-scroll' : 'bg-bg-primary'} ${className}`}>
      <ContentContainer>
        <div className="flex justify-between items-center">
        {/* Logo D. */}
        <Link
          to=""
          className="text-4xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          D<span className="text-primary">.</span>
        </Link>

        {/* Right side: I18n + Navigation */}
        <div className="flex items-center md:gap-3">
          {/* I18n Switch Button */}
          <I18nSwitchButton size="sm" className="" />

          {/* Desktop Navigation */}
          {navbar && (
            <div className="hidden md:block">
              <DesktopNavbar translations={navbar} />
            </div>
          )}

          {/* Mobile Navigation */}
          {navbar && (
            <div className="block md:hidden">
              <MobileNavbar translations={navbar} />
            </div>
          )}
        </div>
      </div>
      </ContentContainer>
    </header>
  );
}
