import type { NavbarTranslations } from './i18n';

interface DesktopNavbarProps {
  translations: NavbarTranslations;
  activeHref?: string;
  className?: string;
}

export default function DesktopNavbar({
  translations,
  activeHref = '#services',
  className = '',
}: DesktopNavbarProps) {
  // Navigation structure defined here, translations only provide labels
  const navigationLinks = [
    { label: translations?.services || 'Services', href: '#services' },
    { label: translations?.works || 'Works', href: '#works' },
    { label: translations?.blog || 'Blog', href: '#blog' },
  ];

  return (
    <nav className={`flex items-center ${className}`}>
      {/* Navigation Links */}
      <ul className="flex items-center gap-6 md:gap-8">
        {navigationLinks.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={`transition-colors text-base md:text-lg font-medium ${
                  isActive
                    ? 'text-fg-primary'
                    : 'text-fg-secondary hover:text-fg-primary'
                }`}
              >
                {link.label}
              </a>
              {/* Yellow dot below active item */}
              {isActive && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 bg-primary rounded-full"></div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
