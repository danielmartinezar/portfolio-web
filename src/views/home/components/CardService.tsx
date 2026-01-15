import { useState, type ReactNode } from "react";
import styles from "./CardService.module.css";

interface CardServiceProps {
  /**
   * Service title displayed on the front of the card
   */
  title: string;

  /**
   * Icon component to display on the front of the card
   */
  icon: ReactNode;

  /**
   * Description text displayed on the back of the card
   */
  description: string;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Flip card component for displaying services
 *
 * Features:
 * - Click to flip animation revealing description on back
 * - Visual indicator showing the card is interactive
 * - Responsive design adapting to different screen sizes
 * - Smooth 3D flip animation
 */
export default function CardService({
  title,
  icon,
  description,
  className = "",
}: CardServiceProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className={`${styles.cardContainer} ${className}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title}. Click to ${isFlipped ? "hide" : "show"} description`}
    >
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front Face */}
        <div className={styles.cardFace}>
          {/* Flip indicator */}
          <div className={styles.flipIndicator} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Icon */}
          <div className={styles.iconWrapper}>{icon}</div>

          {/* Title */}
          <h3 className={styles.title}>{title}</h3>
        </div>

        {/* Back Face */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          {/* Flip indicator */}
          <div className={styles.flipIndicator} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
