# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for "IA Agéntica 2026" - an executive event about Agentic AI for banking and insurance C-Level decision makers in Spain. Hosted on GitHub Pages at www.inteligenciaartificialagentica.com

## Development

This is a static site with no build process. To develop locally:

```bash
# Open in browser directly or use any local server
open index.html
python -m http.server 8000
```

## Deployment

The site deploys automatically to GitHub Pages on push to `main` branch. The custom domain is configured via the CNAME file.

## Architecture

- `index.html` - Single-page landing with all sections (hero, agenda, speakers, venue, pricing, registration form, FAQ)
- `assets/css/styles.css` - All styles using CSS custom properties for theming (colors defined as `--primary`, `--accent`, etc.)
- `assets/js/main.js` - Vanilla JS for: countdown timer, mobile menu, smooth scroll, form validation, scroll animations (Intersection Observer)

## Key Event Details (for content updates)

- Date: June 11, 2026
- Venue: Auditorio El Beatriz Madrid
- Pricing: Early Bird 900 EUR (until March 23) / Regular 1,200 EUR
- Capacity: 150 C-Level attendees

## Language

All content is in Spanish. Ensure proper use of accents (á, é, í, ó, ú, ñ, ü) and Spanish punctuation (¿?, ¡!).
