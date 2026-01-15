import type { ReactNode } from "react";
import { ContentContainer, FullWidthSection } from "../../../components/layout";
import styles from "./HomeSection.module.css";

interface HomeSectionProps {
  /**
   * Small label/tag that appears above the title (e.g., "Services", "Portfolio")
   */
  subtitle: string;

  /**
   * Main section title (e.g., "What I Am Providing", "What I've Worked On")
   */
  title: string;

  /**
   * Main content of the section
   */
  children: ReactNode;

  /**
   * Optional background color variant
   * @default 'secondary'
   */
  variant?: "primary" | "secondary";

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Generic home section component with consistent styling
 *
 * Provides standardized structure for all home page sections with:
 * - Subtitle (small tag/label)
 * - Title (main heading)
 * - Body content (flexible children)
 * - Consistent spacing and typography
 */
export default function HomeSection({
  subtitle,
  title,
  children,
  variant = "secondary",
  className = "",
}: HomeSectionProps) {
  const variantClass =
    variant === "primary" ? styles.sectionPrimary : styles.sectionSecondary;

  return (
    <FullWidthSection className={`${styles.section} ${variantClass} ${className}`}>
      <ContentContainer>
        {/* Header: Subtitle + Title */}
        <header className={styles.header}>
          {/* Subtitle/Tag */}
          <p className={styles.subtitle}>{subtitle}</p>

          {/* Main Title */}
          <h2 className={styles.title}>{title}</h2>
        </header>

        {/* Body Content */}
        <div>{children}</div>
      </ContentContainer>
    </FullWidthSection>
  );
}
