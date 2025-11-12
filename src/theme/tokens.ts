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
