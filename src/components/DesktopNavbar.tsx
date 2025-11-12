interface NavLink {
  label: string;
  href: string;
}

interface DesktopNavbarProps {
  links?: NavLink[];
  activeHref?: string;
  className?: string;
}

export default function DesktopNavbar({
  links = [
    { label: 'Services', href: '#services' },
    { label: 'Works', href: '#works' },
    { label: 'Blog', href: '#blog' },
  ],
  activeHref = '#services',
  className = '',
}: DesktopNavbarProps) {
  return (
    <nav className={`flex items-center ${className}`}>
      {/* Navigation Links */}
      <ul className="flex items-center gap-6 md:gap-8">
        {links.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={`transition-colors text-base md:text-lg font-medium ${
                  isActive
                    ? 'text-fg-primary'
                    : 'text-fg-secondary hover:text-primary'
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
