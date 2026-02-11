"use client";

import { useState, type ReactNode } from "react";
import styles from "./ExperienceItem.module.css";

// Import tool icons
import TypeScriptIcon from "../../../assets/tools/typescript.svg";
import ReactIcon from "../../../assets/tools/react.svg";
import NodeIcon from "../../../assets/tools/nodedotjs.svg";
import NestJsIcon from "../../../assets/tools/nestjs.svg";
import SpringbootIcon from "../../../assets/tools/springboot.svg";
import PostgresIcon from "../../../assets/tools/postgresql.svg";
import MongoIcon from "../../../assets/tools/mongodb.svg";
import FlutterIcon from "../../../assets/tools/flutter.svg";
import GitIcon from "../../../assets/tools/git.svg";
import GithubIcon from "../../../assets/tools/github.svg";
import StrapiIcon from "../../../assets/tools/strapi.svg";
import GoogleCloudIcon from "../../../assets/tools/googlecloud.svg";
import SupabaseIcon from "../../../assets/tools/supabase.svg";
import AwsIcon from "../../../assets/tools/aws.svg";
import DockerIcon from "../../../assets/tools/docker.svg";
import NextJsIcon from "../../../assets/tools/nextdotjs.svg";
import ReduxIcon from "../../../assets/tools/redux.svg";
import MaterialUiIcon from "../../../assets/tools/mui.svg";
import AntDesignIcon from "../../../assets/tools/antdesign.svg";
import CssIcon from "../../../assets/tools/css.svg";
import ExpressIcon from "../../../assets/tools/express.svg";
import DigitalOceanIcon from "../../../assets/tools/digitalocean.svg";
import StripeIcon from "../../../assets/tools/stripe.svg";
import VercelIcon from "../../../assets/tools/vercel.svg";
import LanggraphIcon from "../../../assets/tools/langgraph.svg";

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
