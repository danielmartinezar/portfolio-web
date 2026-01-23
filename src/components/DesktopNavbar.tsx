import { Link, useLocation } from "react-router-dom";
import type { NavbarTranslations } from "./i18n";
import { NAVIGATION_LINKS } from "../shared/constants";
import { isActive } from "../shared/utils/navigation.utils";

interface DesktopNavbarProps {
  translations: NavbarTranslations;
  className?: string;
}

export default function DesktopNavbar({
  translations,
  className = "",
}: DesktopNavbarProps) {
  const { pathname } = useLocation();

  return (
    <nav className={`flex items-center ${className}`}>
      <ul className="flex items-center gap-6 md:gap-8">
        {NAVIGATION_LINKS.map((link) => {
          const label = translations?.[link.translationKey] || link.fallbackLabel;
          const active = isActive(pathname, link.href);

          return (
            <li key={link.href} className="relative">
              <Link
                to={link.href}
                className={`transition-colors text-base md:text-lg font-medium ${
                  active
                    ? "text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary"
                }`}
              >
                {label}
              </Link>
              {active && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 bg-primary rounded-full"></div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
