# Design System

This directory contains the centralized design system configuration for the portfolio.

## Structure

- **`tokens.ts`** - Design tokens (colors, spacing, typography, etc.)

## Design Tokens

Design tokens are the single source of truth for design properties. They ensure consistency across the entire application.

### Colors

Our color palette is organized by purpose:

#### Background Colors
- **Primary Background** (`#292C40`) - Used in Hero section and primary content areas
- **Secondary Background** (`#2E3247`) - Used in Services section and alternating sections

#### Primary/Accent Color
- **Primary** (`#FFD154`) - Used for buttons, CTAs, links, and interactive elements

#### Foreground Colors (Text, Icons, UI Elements)
- **Primary Foreground** (`#FBFCFF`) - Used for headings, titles, high-emphasis text, primary icons, and light UI elements
- **Secondary Foreground** (`#A5A9BC`) - Used for body text, descriptions, secondary icons, borders, and subtle UI elements

## Usage

### With Tailwind CSS

The tokens are automatically integrated with Tailwind CSS. Use them with the standard Tailwind class syntax:

```tsx
// Backgrounds
<div className="bg-bg-primary">Hero Section</div>
<div className="bg-bg-secondary">Services Section</div>

// Text colors
<h1 className="text-fg-primary">Daniel Martinez.</h1>
<p className="text-fg-secondary">Full-stack Software Engineer...</p>

// Icons
<LinkedInIcon className="text-fg-secondary" />
<GitHubIcon className="text-fg-secondary" />

// Primary/Accent color
<button className="bg-primary text-bg-primary">Let's talk</button>
<a className="text-primary">Learn more</a>
```

### Direct Usage in TypeScript/JavaScript

You can also import tokens directly for use in styled-components, inline styles, or JavaScript logic:

```tsx
import { tokens, semanticColors } from '@/theme/tokens';

// Using raw tokens
const heroStyle = {
  backgroundColor: tokens.colors.background.primary,
  color: tokens.colors.foreground.primary,
};

// Icon color
const iconStyle = {
  color: tokens.colors.foreground.secondary,
};

// Using semantic colors (recommended)
const buttonStyle = {
  backgroundColor: semanticColors.button.primary,
  color: semanticColors.button.text,
};
```

## Best Practices

1. **Always use design tokens** - Never hardcode color values in components
2. **Use semantic names** - Prefer semantic colors from `semanticColors` over raw token values
3. **Use Tailwind classes** - Leverage Tailwind for consistency and performance
4. **Update tokens, not components** - If you need to change a color, update the token, not individual components

## Examples

### Hero Section
```tsx
<section className="bg-bg-primary min-h-screen">
  <h1 className="text-text-primary text-5xl font-bold">
    Daniel Martinez.
  </h1>
  <p className="text-text-secondary text-lg">
    Hi! I'm a Full-stack Software Engineer...
  </p>
  <button className="bg-primary text-bg-primary px-6 py-3 rounded-lg">
    Let's talk
  </button>
</section>
```

### Services Section
```tsx
<section className="bg-bg-secondary py-16">
  <h2 className="text-text-primary text-4xl font-bold">
    Services
  </h2>
  <h3 className="text-text-primary text-2xl">
    What I Am Providing
  </h3>
  <p className="text-text-secondary">
    Professional development services...
  </p>
</section>
```

### Button Component
```tsx
// Primary CTA Button
<button className="bg-primary text-bg-primary hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-semibold">
  Let's talk
</button>

// Text link
<a className="text-primary hover:underline cursor-pointer">
  View portfolio
</a>
```
