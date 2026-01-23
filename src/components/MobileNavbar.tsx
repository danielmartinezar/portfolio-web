import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavbarTranslations } from "./i18n";
import { NAVIGATION_LINKS } from "../shared/constants";
import { isActive } from "../shared/utils/navigation.utils";

interface MobileNavbarProps {
  translations: NavbarTranslations;
  className?: string;
}

export default function MobileNavbar({
  translations,
  className = "",
}: MobileNavbarProps) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Block scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <>
      <nav className={`flex items-center ${className}`}>
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={`text-fg-primary hover:text-primary transition-all duration-300 ${
            isPressed ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM7.834 15.75C7.41979 15.75 7.084 16.0858 7.084 16.5C7.084 16.9142 7.41979 17.25 7.834 17.25V15.75ZM17.167 17.25C17.5812 17.25 17.917 16.9142 17.917 16.5C17.917 16.0858 17.5812 15.75 17.167 15.75V17.25ZM7.834 7.75C7.41979 7.75 7.084 8.08579 7.084 8.5C7.084 8.91421 7.41979 9.25 7.834 9.25V7.75ZM17.167 9.25C17.5812 9.25 17.917 8.91421 17.917 8.5C17.917 8.08579 17.5812 7.75 17.167 7.75V9.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM7.834 17.25H17.167V15.75H7.834V17.25ZM7.834 9.25H17.167V7.75H7.834V9.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-bg-primary z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            onClick={toggleMenu}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className={`text-fg-primary hover:text-primary transition-all duration-300 ${
              isPressed ? "scale-90 rotate-90" : "scale-100 rotate-0"
            }`}
            aria-label="Close menu"
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start px-8 py-12 gap-8">
          {NAVIGATION_LINKS.map((link, index) => {
            const label = translations?.[link.translationKey] || link.fallbackLabel;
            const active = isActive(pathname, link.href);
            const delayClass = isOpen
              ? ["delay-0", "delay-100", "delay-200"][index]
              : "delay-0";
            return (
              <div
                key={link.href}
                className={`relative flex items-center gap-4 transition-all duration-500 ${delayClass} ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <Link
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`text-6xl transition-colors font-medium leading-none ${
                    active
                      ? "text-fg-primary"
                      : "text-fg-secondary hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
                {active && (
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
