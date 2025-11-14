import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import I18nSwitchButton from "./I18nSwitchButton";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
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
        <div className="flex items-center">
          {/* I18n Switch Button */}
          <I18nSwitchButton size="sm" className="" />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <DesktopNavbar />
          </div>

          {/* Mobile Navigation */}
          <div className="block md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
}
