interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export default function ContactButton({ onClick, className = '', label = "Let's talk" }: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-0 text-primary hover:opacity-80 transition-opacity ${className} text-lg`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6066 15.9098L0 5.30322L15.9099 -7.87862e-05L10.6066 15.9098ZM9.73435 12.8046L11.3847 7.83973L13.035 2.87487L3.10522 6.17548L5.42542 8.49567L9.76924 6.14059L7.41415 10.4844L9.73435 12.8046Z"
          fill="#FFD154"
        />
      </svg>
      <span className="underline font-medium">{label}</span>
    </button>
  );
}
