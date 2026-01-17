import type { ContactTranslations, ContactItem } from "../../pages/home/i18n";
import { HomeSection } from "./shared";
import { ContactMeCard } from "./components";
import styles from "./Contact.module.css";

interface ContactProps {
  translations: ContactTranslations;
}

export default function Contact({ translations }: ContactProps) {
  return (
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="primary"
    >
      {/* Description paragraph */}
      <p className={styles.description}>{translations.description}</p>

      {/* Contact cards grid */}
      <div className={styles.contactGrid}>
        {translations.items.map((item: ContactItem, index: number) => (
          <ContactMeCard key={index} icon={item.icon} value={item.value} />
        ))}
      </div>
    </HomeSection>
  );
}
