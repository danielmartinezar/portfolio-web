import type { SkillsTranslations } from "../../pages/home/i18n";
import { HomeSection } from "./shared";
import {SkillCard} from "./components";

interface SkillsProps {
  translations: SkillsTranslations;
}

export default function Skills({ translations }: SkillsProps) {
  return (
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="secondary"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {translations.items.map((skill) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            description={skill.description}
          />
        ))}
      </div>
    </HomeSection>
  );
}
