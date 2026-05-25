---
name: Architectural Light
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c494e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c797f'
  outline-variant: '#bbc9cf'
  surface-tint: '#00677f'
  primary: '#00677f'
  on-primary: '#ffffff'
  primary-container: '#00d1ff'
  on-primary-container: '#00566a'
  inverse-primary: '#4cd6ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#505f76'
  on-tertiary: '#ffffff'
  tertiary-container: '#b1c1db'
  on-tertiary-container: '#3f4f65'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b7eaff'
  primary-fixed-dim: '#4cd6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The design system embodies a "Precision Modernist" aesthetic. It transitions the structural integrity of its dark-mode predecessor into a bright, airy, and high-clarity environment. The personality is professional, tech-forward, and meticulously organized, evoking the feel of a modern architectural firm’s studio. 

The visual style is a blend of **Minimalism** and **Corporate Modern**. It prioritizes extreme legibility, generous whitespace, and a high-contrast relationship between structural elements and interactive accents. By utilizing clean surfaces and surgical precision in layout, the UI creates an atmosphere of competence and innovative thinking.

## Colors
The palette is anchored by the vibrant **Cyan (#00D1FF)**, which serves as the primary engine for interactivity and brand recognition. This high-energy hue is balanced against a sophisticated foundation of light neutrals.

- **Primary:** Reserved for primary actions, progress indicators, and critical highlights.
- **Secondary:** A deep Slate used for typography and structural icons to ensure high contrast against light backgrounds.
- **Neutral:** A range of cool-toned whites and greys (`#F8FAFC`, `#F1F5F9`, `#E2E8F0`) provide the layering for containers and backgrounds.
- **Accent/Semantic:** Use the primary Cyan sparingly for focus states and "on" indicators to maintain its visual impact.

## Typography
This design system utilizes **Hanken Grotesk** across all tiers to maintain a sharp, contemporary look. The type scale is optimized for information density and hierarchy. 

Headlines use bold weights and slight negative letter-spacing to feel "built" and sturdy. Body text is set with generous line heights to ensure readability against the bright white surfaces. Use the semi-bold weight for labels and UI metadata to provide distinct contrast from standard body copy.

## Layout & Spacing
The layout follows a strict 8px (0.5rem) grid system. It employs a **Fixed Grid** approach for desktop dashboards and a **Fluid Grid** for content-heavy pages.

- **Desktop:** 12-column grid, 24px gutters, max-width 1440px.
- **Tablet:** 8-column grid, 16px gutters.
- **Mobile:** 4-column grid, 16px gutters, 16px side margins.

Horizontal rhythm is achieved through consistent padding within containers, mirroring the architectural "setback" principle. Elements should align to the grid to maintain a structured, technical feel.

## Elevation & Depth
Elevation is defined by **Ambient Shadows** and tonal layering. Unlike the Dark version which relied on stroke light, the Light version uses soft, multi-layered shadows to lift elements off the page.

- **Level 0 (Base):** `#F8FAFC` — used for the main application background.
- **Level 1 (Surface):** `#FFFFFF` — used for cards and main content areas. It features a very soft shadow: `0 2px 4px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Overlay):** Used for modals and dropdowns. Features a more pronounced, diffused shadow: `0 12px 24px rgba(15, 23, 42, 0.08)`.

Low-contrast outlines (`1px solid #E2E8F0`) are used on Level 1 elements to provide definition without adding visual weight.

## Shapes
The "Round Eight" philosophy remains the core of the shape language. 

A base radius of **8px (0.5rem)** is applied to standard components like buttons, input fields, and small cards. Larger containers and sections utilize **16px (1rem)** to soften the architectural rigidness while maintaining a modern feel. Interactive elements never use sharp 0px corners, ensuring the system feels approachable and sophisticated.

## Components
- **Buttons:** Primary buttons are solid `#00D1FF` with white text. Secondary buttons use a Slate (`#0F172A`) outline with a subtle 4% Slate hover fill. All buttons use the 8px corner radius.
- **Cards:** White surfaces with a 1px border (`#E2E8F0`) and the Level 1 soft shadow. Content should have 24px internal padding.
- **Input Fields:** Backgrounds are `#F1F5F9`. On focus, the border transitions to the primary Cyan with a 2px outer glow.
- **Chips/Tags:** Small 4px radius or fully rounded pill-shape. Use a light Cyan tint (`#00D1FF` at 10% opacity) for active states.
- **Lists:** Separated by thin 1px horizontal dividers (`#F1F5F9`). Hover states use a subtle tonal shift to `#F8FAFC`.
- **Checkboxes/Radios:** When active, these are filled with the primary Cyan. The "Architectural" feel is reinforced by using slightly thicker 2px strokes for the borders of these elements.