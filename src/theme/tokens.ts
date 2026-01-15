/**
 * Design Tokens
 *
 * Centralized design system configuration for the portfolio.
 * These tokens define the visual language of the application including colors,
 * spacing, typography, and other design properties.
 *
 * @see https://designtokens.org/ for design tokens specification
 */

export const tokens = {
  colors: {
    // Background colors for different sections and components
    background: {
      primary: '#292C40',    // Main background color (Hero, primary sections)
      secondary: '#2E3247',  // Alternative background color (Services, secondary sections)
    },

    // Accent/Primary brand colors for interactive elements
    primary: '#FFD154',      // Primary brand color (buttons, CTAs, highlights, links)

    // Foreground colors for content hierarchy (text, icons, borders, UI elements)
    foreground: {
      primary: '#FBFCFF',    // High emphasis: headings, important text, primary icons, light UI elements
      secondary: '#A5A9BC',  // Medium emphasis: body text, descriptions, secondary icons, subtle UI elements
    },
  },

  typography: {
    // Font sizes for different text hierarchies
    fontSize: {
      // Section titles (e.g., "What I Am Providing", "What I've Worked On")
      title: '1.75rem',      // 28px - Main section titles

      // Section subtitles/taglines (e.g., "Services", "Portfolio")
      subtitle: '0.875rem',  // 14px - Section labels/tags

      // Paragraphs and body text
      paragraph: '1rem',     // 16px - Standard body text

      // Small text (e.g., captions, metadata)
      small: '0.875rem',     // 14px - Secondary information
    },

    // Font weights for text emphasis
    fontWeight: {
      regular: 400,          // Normal text
      semibold: 600,         // Medium emphasis
      bold: 700,             // Strong emphasis
    },

    // Line heights for readability
    lineHeight: {
      tight: 1.2,            // For titles
      normal: 1.5,           // For body text
      relaxed: 1.75,         // For large paragraphs
    },
  },

  spacing: {
    // Section spacing (vertical margins/padding)
    section: {
      paddingTop: '1rem',    // 16px - Top padding for sections
      paddingBottom: '4rem', // 64px - Bottom padding for sections
      gap: '2rem',           // 32px - Gap between title/subtitle and content
    },
  },

  layout: {
    // Content container settings - consistent padding/width across all sections
    container: {
      // Horizontal padding for all content sections
      paddingX: {
        mobile: '1.5rem',    // 24px - Mobile padding (px-6)
        desktop: '170px',    // 170px - Desktop padding (md:px-[170px])
      },
      // Maximum width for content container
      maxWidth: '1900px',    // Maximum width before centering
    },
  },
} as const;

/**
 * Type-safe access to design tokens
 */
export type DesignTokens = typeof tokens;

/**
 * Semantic color mapping for specific use cases
 * Maps design tokens to semantic purposes in the application
 */
export const semanticColors = {
  // Layout backgrounds
  hero: tokens.colors.background.primary,
  section: tokens.colors.background.secondary,

  // Interactive elements
  button: {
    primary: tokens.colors.primary,
    text: tokens.colors.background.primary, // Dark text on yellow button for contrast
  },

  // Typography
  heading: tokens.colors.foreground.primary,
  body: tokens.colors.foreground.secondary,
  link: tokens.colors.primary,
} as const;

export default tokens;
