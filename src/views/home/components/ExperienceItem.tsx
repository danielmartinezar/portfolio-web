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
import StrapiIcon from "../../../assets/tools/strapi.svg?react";
import GoogleCloudIcon from "../../../assets/tools/googlecloud.svg?react";
import SupabaseIcon from "../../../assets/tools/supabase.svg?react";
import AwsIcon from "../../../assets/tools/aws.svg?react";
import DockerIcon from "../../../assets/tools/docker.svg?react";
import NextJsIcon from "../../../assets/tools/nextdotjs.svg?react";
import ReduxIcon from "../../../assets/tools/redux.svg?react";
import MaterialUiIcon from "../../../assets/tools/mui.svg?react";
import AntDesignIcon from "../../../assets/tools/antdesign.svg?react";
import CssIcon from "../../../assets/tools/css.svg?react";
import ExpressIcon from "../../../assets/tools/express.svg?react";
import DigitalOceanIcon from "../../../assets/tools/digitalocean.svg?react";
import StripeIcon from "../../../assets/tools/stripe.svg?react";
import VercelIcon from "../../../assets/tools/vercel.svg?react";
import LanggraphIcon from "../../../assets/tools/langgraph.svg?react";

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
  strapi: <StrapiIcon />,
  googlecloud: <GoogleCloudIcon />,
  supabase: <SupabaseIcon />,
  aws: <AwsIcon />,
  docker: <DockerIcon />,
  nextjs: <NextJsIcon />,
  redux: <ReduxIcon />,
  materialui: <MaterialUiIcon />,
  antdesign: <AntDesignIcon />,
  css: <CssIcon />,
  express: <ExpressIcon />,
  digitalocean: <DigitalOceanIcon />,
  stripe: <StripeIcon />,
  vercel: <VercelIcon />,
  langraph: <LanggraphIcon />,
  langgraph: <LanggraphIcon />,
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
