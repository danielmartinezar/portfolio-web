import type { ReactNode } from "react";

interface FullWidthSectionProps {
  /**
   * Content to be rendered inside the section
   */
  children: ReactNode;

  /**
   * Optional additional CSS classes for styling (including background color and padding)
   */
  className?: string;
}

/**
 * FullWidthSection - Provides a full-width background container
 *
 * This component creates a section that extends to the full width of the viewport
 * with a specified background color. Content inside should use ContentContainer
 * for consistent padding.
 *
 * Use this for:
 * - Sections that need full-width colored backgrounds
 * - Any section where the background should extend edge-to-edge
 *
 * @example
 * ```tsx
 * <FullWidthSection backgroundColor="#2E3247">
 *   <ContentContainer>
 *     <h2>My Section Title</h2>
 *     <p>Content goes here</p>
 *   </ContentContainer>
 * </FullWidthSection>
 * ```
 */
export default function FullWidthSection({
  children,
  className = "",
}: FullWidthSectionProps) {
  return <section className={`w-full ${className}`}>{children}</section>;
}
