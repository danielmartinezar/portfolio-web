import type { ReactNode } from "react";

interface ContentContainerProps {
  /**
   * Content to be wrapped with consistent padding and max-width
   */
  children: ReactNode;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * ContentContainer - Provides consistent horizontal padding and max-width
 *
 * This component ensures all content sections have the same padding and width constraints:
 * - Mobile: 24px (1.5rem) horizontal padding
 * - Desktop: 170px horizontal padding
 * - Max-width: 1900px with auto centering
 *
 * Use this for:
 * - Header
 * - Hero content
 * - Section content (inside full-width section backgrounds)
 * - Any content that needs consistent horizontal spacing
 *
 * @example
 * ```tsx
 * <ContentContainer>
 *   <h1>My Title</h1>
 *   <p>My content</p>
 * </ContentContainer>
 * ```
 */
export default function ContentContainer({
  children,
  className = "",
}: ContentContainerProps) {
  return (
    <div className={`px-6 md:px-[170px] max-w-[1900px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
