import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import I18nSwitchButton from "./I18nSwitchButton";
import { useTranslation } from "../shared/services";
import { navbarTranslationLoaders } from "./i18n";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const { t: navbar } = useTranslation(navbarTranslationLoaders);

  return (
    <header className={`py-6 ${className}`}>
      <div className="flex justify-between items-center">
        {/* Logo D. */}
        <a
          href="#"
          className="text-4xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          D<span className="text-primary">.</span>
        </a>

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
    </header>
  );
}
