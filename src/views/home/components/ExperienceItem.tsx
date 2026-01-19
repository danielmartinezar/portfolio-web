import { useState, type ReactNode } from "react";
import styles from "./ExperienceItem.module.css";

// Import tool icons
import TypeScriptIcon from "../../../assets/tools/typescript.svg?react";
import ReactIcon from "../../../assets/tools/react.svg?react";
import NodeIcon from "../../../assets/tools/nodedotjs.svg?react";
import NestJsIcon from "../../../assets/tools/nestjs.svg?react";
import SpringbootIcon from "../../../assets/tools/springboot.svg?react";
import PostgresIcon from "../../../assets/tools/postgresql.svg?react";
import MongoIcon from "../../../assets/tools/mongodb.svg?react";
import FlutterIcon from "../../../assets/tools/flutter.svg?react";
import GitIcon from "../../../assets/tools/git.svg?react";
import GithubIcon from "../../../assets/tools/github.svg?react";

const iconMap: Record<string, ReactNode> = {
  typescript: <TypeScriptIcon />,
  react: <ReactIcon />,
  nodejs: <NodeIcon />,
  node: <NodeIcon />,
  nestjs: <NestJsIcon />,
  springboot: <SpringbootIcon />,
  postgresql: <PostgresIcon />,
  postgres: <PostgresIcon />,
  mongodb: <MongoIcon />,
  mongo: <MongoIcon />,
  flutter: <FlutterIcon />,
  git: <GitIcon />,
  github: <GithubIcon />,
};

function getIcon(iconKey: string): ReactNode {
  return iconMap[iconKey.toLowerCase()] || null;
}

export interface ExperienceItemProps {
  logo: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
}

export default function ExperienceItem({
  logo,
  company,
  role,
  period,
  description,
  skills,
}: ExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.leftSection}>
          <img src={logo} alt={company} className={styles.logo} />
          <div className={styles.info}>
            <div className={styles.companyRow}>
              <span className={styles.company}>{company}</span>
              <span
                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
              >
                ›
              </span>
            </div>
            <span className={styles.role}>{role}</span>
          </div>
        </div>
        <span className={styles.period}>{period}</span>
      </button>

      <div className={`${styles.content} ${isOpen ? styles.contentOpen : ""}`}>
        <div className={styles.contentInner}>
          <p className={styles.description}>{description}</p>

          <div className={styles.skillsSection}>
            <span className={styles.skillsLabel}>Skills:</span>
            <div className={styles.skillsIcons}>
              {skills.map((skill) => (
                <div key={skill} className={styles.skillIcon}>
                  {getIcon(skill)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
