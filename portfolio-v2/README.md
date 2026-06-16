# Rino Genistus Ruban — Portfolio (v2)

A redesigned frontend for the portfolio, built fresh while preserving **all**
content from the original `rino-portfolio` site.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`, theme tokens in `src/index.css`)
- **Motion** (`motion/react`) for scroll-reveal, layout, and modal animation
- **react-icons** (Feather set)

## Design

- Animated **aurora + grid + grain** background
- **Glassmorphism** surfaces with a cyan → violet → mint gradient accent
- Dark / light theme toggle (persisted to `localStorage`)
- Magnetic buttons, cursor glow, scroll-progress bar, back-to-top
- Gradient display type (Space Grotesk), JetBrains Mono accents, Inter body

## Sections (all original info preserved)

| Section  | Content |
|----------|---------|
| Hero     | "I just like building stuff." + typewriter roles + intro + CTAs + socials |
| About    | Full bio (Rutgers NB, CS + Math minor, NN/LLMs), aspirations, contact buttons, animated terminal (`whoami` / `cat profile.json` / `ls currently/`), count-up stats |
| Skills   | Languages · ML/AI · Infra & Tools · Frontend (all tech tags) |
| Projects | Bento grid of all 6 projects + filter (All / In Progress / Completed) + detail modal with highlights + GitHub links |
| Contact  | Modal form (Name / Email / Message) that composes a mailto |
| Footer   | Name, build stack, social links |

All copy, links, project data and the terminal content live in `src/data.js`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview
```

> Drop a `resume.pdf` into `public/` to enable the "Resume" download button.
