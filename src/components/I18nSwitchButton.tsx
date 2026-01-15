import { useLanguage } from '../shared/services';
import i18nIcon from '../assets/i18n-icon.svg';

interface I18nSwitchButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function I18nSwitchButton({
  size = 'md',
  className = '',
}: I18nSwitchButtonProps) {
  const { language, setLanguage } = useLanguage();

  const sizeClasses = {
    sm: 'h-6 px-2 text-xs',
    md: 'h-8 px-3 text-sm',
    lg: 'h-10 px-4 text-base',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const handleToggle = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`${sizeClasses[size]} flex items-center gap-2 bg-fg-secondary rounded-full transition-colors hover:opacity-90 ${className}`}
      aria-label="Switch language"
    >
      <span className="text-bg-primary font-medium">
        {language.toUpperCase()}
      </span>
      <img
        src={i18nIcon}
        alt="Language"
        className={iconSizes[size]}
      />
    </button>
  );
}
