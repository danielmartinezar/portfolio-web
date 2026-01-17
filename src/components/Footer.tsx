import { useTranslation } from '../shared/services';
import { footerTranslationLoaders } from './i18n';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(footerTranslationLoaders);

  if (!t) return null;

  return (
    <footer className="bg-bg-primary py-8">
      {/* Divider with fade effect */}
      <div className="px-6 md:px-[170px]">
        <div className="h-px bg-linear-to-r from-transparent via-fg-secondary to-transparent mb-8" />
      </div>

      {/* Footer content */}
      <div className="px-6 md:px-[170px]">
        <div className="flex items-center justify-between md:justify-center md:gap-12">
          {/* Logo */}
          <div className="text-primary text-4xl font-bold">D.</div>

          {/* Copyright */}
          <p className="text-fg-primary text-sm text-center">
            ©{t.copyright} {currentYear}
            <br className="md:hidden" />
            <span className="hidden md:inline">|</span>
            {t.designedBy}
          </p>

          {/* Social Icons */}
          <SocialIcons
            direction="horizontal"
            size="md"
            gap="gap-4"
            links={{
              linkedin: 'https://linkedin.com',
              github: 'https://github.com',
              instagram: 'https://instagram.com',
            }}
          />
        </div>
      </div>
    </footer>
  );
}
