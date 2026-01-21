import { useState, useEffect, useRef } from 'react';
import type { ServicesTranslations } from '../../pages/home/i18n';
import { HomeSection } from './shared';
import { CardService } from './components';
import MobileIcon from '../../assets/mobile-icon.svg?react';
import StackIcon from '../../assets/stack-icon.svg?react';
import CloudIcon from '../../assets/cloud-icon.svg?react';

const serviceIcons = [
  <MobileIcon key="mobile" />,
  <StackIcon key="stack" />,
  <CloudIcon key="cloud" />,
  <MobileIcon key="mobile2" />,
];

interface ServicesProps {
  translations: ServicesTranslations;
}

export default function Services({ translations }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showFlipHint, setShowFlipHint] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFlipHint(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="secondary"
    >
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
        {translations.items.map((service, index) => (
          <CardService
            key={index}
            title={service.title}
            icon={serviceIcons[index]}
            description={service.description}
            showFlipHint={index === 0 && showFlipHint}
          />
        ))}
      </div>
    </HomeSection>
    </div>
  );
}
