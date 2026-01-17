interface SkillCardProps {
  /**
   * Skill category title (e.g., "Backend", "Frontend")
   */
  title: string;

  /**
   * Technologies or skills description (e.g., "React, Vite, NextJs")
   */
  description: string;

  /**
   * Whether the card has a highlighted border
   * @default false
   */
  highlighted?: boolean;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Card component for displaying skill categories
 *
 * Features:
 * - Clean card design with title and description
 * - Optional highlighted border variant
 * - Responsive styling
 */
export default function SkillCard({
  title,
  description,
  className = "",
}: SkillCardProps) {
  return (
    <div
      className={`
        bg-bg-primary rounded-lg p-4 md:p-6 text-center
        h-28 flex flex-col justify-center
        ${className}
      `}
    >
      <h3 className="text-lg font-semibold text-fg-primary mb-2">{title}</h3>
      <p className="text-sm text-fg-secondary leading-relaxed">{description}</p>
    </div>
  );
}
