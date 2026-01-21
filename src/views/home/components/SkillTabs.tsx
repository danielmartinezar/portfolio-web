import styles from "./SkillTabs.module.css";

interface SkillTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  pulseTabIndex?: number;
}

export default function SkillTabs({ tabs, activeTab, onTabChange, pulseTabIndex }: SkillTabsProps) {
  return (
    <div className={styles.container}>
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""} ${index === pulseTabIndex ? styles.pulseHint : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
