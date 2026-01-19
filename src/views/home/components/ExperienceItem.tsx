import { useState } from 'react';
import styles from './ExperienceItem.module.css';

export interface ExperienceItemProps {
  logo: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export default function ExperienceItem({
  logo,
  company,
  role,
  period,
  achievements,
}: ExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.leftSection}>
          <img src={logo} alt={company} className={styles.logo} />
          <div className={styles.info}>
            <div className={styles.companyRow}>
              <span className={styles.company}>{company}</span>
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                ›
              </span>
            </div>
            <span className={styles.role}>{role}</span>
          </div>
        </div>
        <span className={styles.period}>{period}</span>
      </button>

      <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
        <ul className={styles.achievements}>
          {achievements.map((achievement, index) => (
            <li key={index} className={styles.achievement}>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
