import type { ReactNode } from "react";

interface SkillCardProps {
  /**
   * Skill name (e.g., "React", "TypeScript")
   */
  title: string;

  /**
   * Icon component to display
   */
  icon: ReactNode;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Card component for displaying individual skills with icons
 */
export default function SkillCard({ title, icon, className = "" }: SkillCardProps) {
  return (
    <div
      className={`
        bg-bg-primary rounded-lg p-4
        flex flex-col items-center justify-center gap-2
        w-28 h-24 md:w-32 md:h-28
        ${className}
      `}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 text-fg-primary [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current">
        {icon}
      </div>
      <span className="text-sm md:text-base font-medium text-fg-primary">{title}</span>
    </div>
  );
}
