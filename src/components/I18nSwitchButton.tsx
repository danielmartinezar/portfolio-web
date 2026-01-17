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
  const isSpanish = language === 'es';

  // Proportional sizes using rem (scaled up)
  const sizeConfig = {
    sm: {
      track: 'w-[3.5rem] h-[1.5rem]',
      thumb: 'w-[1.5rem] h-[1.5rem]',
      thumbLeft: 'left-0',
      thumbRight: 'left-[2rem]',
      text: 'text-[0.625rem]',
      textLeft: 'left-[0.375rem]',
      textRight: 'right-[0.375rem]',
      icon: 'h-[0.875rem] w-[0.875rem]',
    },
    md: {
      track: 'w-[4.5rem] h-[1.875rem]',
      thumb: 'w-[1.875rem] h-[1.875rem]',
      thumbLeft: 'left-0',
      thumbRight: 'left-[2.625rem]',
      text: 'text-xs',
      textLeft: 'left-[0.5rem]',
      textRight: 'right-[0.5rem]',
      icon: 'h-[1.125rem] w-[1.125rem]',
    },
    lg: {
      track: 'w-[5.5rem] h-[2.25rem]',
      thumb: 'w-[2.25rem] h-[2.25rem]',
      thumbLeft: 'left-0',
      thumbRight: 'left-[3.25rem]',
      text: 'text-sm',
      textLeft: 'left-[0.625rem]',
      textRight: 'right-[0.625rem]',
      icon: 'h-[1.375rem] w-[1.375rem]',
    },
  };

  const config = sizeConfig[size];

  const handleToggle = () => {
    setLanguage(isSpanish ? 'en' : 'es');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSpanish}
      onClick={handleToggle}
      className={`relative cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      aria-label={`Switch to ${isSpanish ? 'English' : 'Spanish'}`}
    >
      {/* Track */}
      <div className={`relative ${config.track} bg-[#D9D9D9]/30 rounded-full`}>
        {/* Language label inside track */}
        <span
          className={`absolute ${config.textLeft} top-1/2 -translate-y-1/2 font-semibold ${config.text} text-[#D9D9D9] transition-opacity duration-300 ${
            isSpanish ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ES
        </span>
        <span
          className={`absolute ${config.textRight} top-1/2 -translate-y-1/2 font-semibold ${config.text} text-[#D9D9D9] transition-opacity duration-300 ${
            isSpanish ? 'opacity-0' : 'opacity-100'
          }`}
        >
          EN
        </span>

        {/* Sliding thumb with icon */}
        <span
          className={`absolute top-0 ${config.thumb} bg-[#D9D9D9] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
            isSpanish ? config.thumbRight : config.thumbLeft
          }`}
        >
          <img
            src={i18nIcon}
            alt=""
            className={`${config.icon} filter-[invert(42%)_brightness(58%)_contrast(89%)]`}
          />
        </span>
      </div>
    </button>
  );
}
