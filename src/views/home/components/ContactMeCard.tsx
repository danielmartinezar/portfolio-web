import styles from './ContactMeCard.module.css';

interface ContactMeCardProps {
  /**
   * Icon type for the contact card
   */
  icon: 'email' | 'phone' | 'location';

  /**
   * Contact information value
   */
  value: string;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Contact information card component
 *
 * Displays contact information with appropriate icons and interaction:
 * - Email: Opens mail client on click
 * - Phone: Opens phone dialer on click
 * - Location: Display only (no interaction)
 */
export default function ContactMeCard({
  icon,
  value,
  className = '',
}: ContactMeCardProps) {
  const iconMap = {
    email: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 6l-10 7L2 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    phone: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    location: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  const getHref = () => {
    switch (icon) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      default:
        return undefined;
    }
  };

  const href = getHref();
  const isInteractive = href !== undefined;

  const cardClassName = `${styles.card} ${
    isInteractive ? styles.interactive : styles.static
  } ${className}`;

  const content = (
    <>
      <div className={styles.iconContainer}>{iconMap[icon]}</div>
      <p className={styles.value}>{value}</p>
    </>
  );

  if (isInteractive) {
    return (
      <a href={href} className={cardClassName}>
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
