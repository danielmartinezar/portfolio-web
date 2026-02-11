"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import type { SkillsTranslations } from "../../features/home/i18n";
import { HomeSection } from "./shared";
import { SkillCard, SkillTabs } from "./components";

// Import tool icons
import TypeScriptIcon from "../../assets/tools/typescript.svg";
import ReactIcon from "../../assets/tools/react.svg";
import NodeIcon from "../../assets/tools/nodedotjs.svg";
import NestJsIcon from "../../assets/tools/nestjs.svg";
import SpringbootIcon from "../../assets/tools/springboot.svg";
import PostgresIcon from "../../assets/tools/postgresql.svg";
import MongoIcon from "../../assets/tools/mongodb.svg";
import FlutterIcon from "../../assets/tools/flutter.svg";
import GitIcon from "../../assets/tools/git.svg";
import GithubIcon from "../../assets/tools/github.svg";

// Icon mapping by skill name
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

interface SkillsProps {
  translations: SkillsTranslations;
}

export default function Skills({ translations }: SkillsProps) {
  const categories = Object.keys(translations.categories);
  const [activeTab, setActiveTab] = useState(categories[0] || "");
  const [pulseTabIndex, setPulseTabIndex] = useState<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tabLabels = categories.map((cat) => translations.categories[cat].label);
  const activeCategory = translations.categories[activeTab];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPulseTabIndex(1);
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
      <SkillTabs
        tabs={tabLabels}
        activeTab={activeCategory?.label || ""}
        onTabChange={(label) => {
          const cat = categories.find((c) => translations.categories[c].label === label);
          if (cat) {
            setActiveTab(cat);
            if (pulseTabIndex !== undefined) {
              setPulseTabIndex(undefined);
            }
          }
        }}
        pulseTabIndex={pulseTabIndex}
      />
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {activeCategory?.items.map((skill) => (
          <SkillCard
            key={skill.name}
            title={skill.name}
            icon={getIcon(skill.icon)}
          />
        ))}
      </div>
    </HomeSection>
    </div>
  );
}
