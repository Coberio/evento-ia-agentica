# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for "IA Agéntica 2026" - an executive event about Agentic AI for banking and insurance C-Level decision makers in Spain. Hosted on GitHub Pages at www.inteligenciaartificialagentica.com

**Repository:** github.com/Coberio/evento-ia-agentica

## Development

This is a static site with no build process. To develop locally:

```bash
# Open in browser directly or use any local server
open index.html
python -m http.server 8000
```

## Deployment

The site deploys automatically to GitHub Pages on push to `main` branch. The custom domain is configured via the CNAME file. HTTPS is enforced.

## Architecture

- `index.html` - Single-page landing with all sections (hero, stats, about, agenda, speakers, venue, pricing, registration form, partners, FAQ, footer)
- `assets/css/styles.css` - All styles using CSS custom properties for theming
- `assets/js/main.js` - Vanilla JS for: countdown timer, mobile menu, smooth scroll, form validation, scroll animations (Intersection Observer)
- `assets/images/` - Logo files (logo-white.png for dark backgrounds, logo.png for light backgrounds)
- `favicon.png` - Browser favicon

## CSS Custom Properties

Colors and theming use CSS variables defined in `:root`:
- `--color-primary`, `--color-secondary`, `--color-accent` for brand colors
- `--gradient-primary`, `--gradient-accent`, `--gradient-gold` for gradients
- `--font-display` (Space Grotesk) for headings, `--font-body` (DM Sans) for text
- `--spacing-*` for consistent spacing scale
- `--radius-*` for border radius values

## Key Event Details (for content updates)

- Date: June 16, 2026
- Venue: Auditorio El Beatriz Madrid
- Pricing: Early Bird 30% discount (until March 23), Group +10% additional discount for 3+ committee members
- Capacity: 150 C-Level attendees
- LinkedIn: linkedin.com/company/inteligenciaartificialagentica

## Language

All content is in Spanish. Ensure proper use of accents (á, é, í, ó, ú, ñ, ü) and Spanish punctuation (¿?, ¡!).
