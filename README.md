<div align="center">
  <img src="public/imgs/logo.png" alt="Yummy Logo" width="80" height="80" />
  <h1>Yummy</h1>
  <p>Discover, explore, and cook the world's best recipes — all in one place.</p>

  ![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
  ![DaisyUI](https://img.shields.io/badge/DaisyUI_v5-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
  ![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=flat-square&logo=greensock&logoColor=black)
  ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
</div>

---

## Overview

**Yummy** is a recipe discovery app built on **Next.js 15 (Page Router)** that lets users explore over 1,000 recipes from [TheMealDB](https://www.themealdb.com/), filter by category, cuisine area, or ingredient, and follow step-by-step cooking instructions — all wrapped in a fluid, animated UI with 9 switchable themes.

---

## Features

- **Recipe search** — search by name or browse alphabetically by first letter
- **Category browsing** — filter recipes by food category (Chicken, Seafood, Dessert…)
- **World cuisines** — explore dishes by country of origin
- **Ingredient lookup** — discover recipes that use a specific ingredient
- **Rich meal pages** — full ingredients list, step-by-step instructions, YouTube tutorial link, and source reference
- **9 themes** — Yummy (default), Dark, Light, Synthwave, Cyberpunk, Luxury, Nord, Sunset, Cupcake
- **Fluid animations** — GSAP-powered page transitions, scroll-triggered reveals, staggered entrances, and responsive sidebar drawer
- **Custom 404 page** — animated, on-brand error page

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | [Next.js 15](https://nextjs.org) — Page Router, ISR, SSG |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [DaisyUI v5](https://daisyui.com) |
| Animation | [GSAP 3](https://gsap.com) + [@gsap/react](https://gsap.com/resources/React) + ScrollTrigger |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Theming | [theme-change](https://github.com/saadeghi/theme-change) |
| Deployment | [Netlify](https://netlify.com) + [@netlify/plugin-nextjs](https://github.com/netlify/netlify-plugin-nextjs) |

---

## Getting Started

### Prerequisites

- Node.js **20+**
- npm **9+**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/yummy.git
cd yummy

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and adjust if needed:

```env
# TheMealDB API base URL (v1 free tier — no key required)
NEXT_PUBLIC_API_BASE_URL=https://www.themealdb.com/api/json/v1/1

# Request timeout in milliseconds
NEXT_PUBLIC_API_TIMEOUT=10000
```

> The free TheMealDB v1 API requires no authentication key.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── api/
│   └── mealApi.ts          # Axios instance, retry logic, deduplication, ApiError
├── components/
│   ├── layout/
│   │   ├── Layout.tsx       # Root layout wrapper
│   │   ├── Sidebar.tsx      # Responsive sidebar with GSAP animations
│   │   └── Footer.tsx       # Footer with newsletter + GSAP scroll reveal
│   ├── meals/
│   │   ├── MealCard.tsx     # Recipe card with next/image
│   │   ├── MealCardSkeleton.tsx
│   │   ├── MealDetail.tsx   # Full recipe page component
│   │   └── MealGrid.tsx     # Responsive grid with skeleton loading
│   ├── transitions/
│   │   └── PageTransition.tsx  # GSAP page-level fade transition
│   └── ui/
│       ├── AnimatedSection.tsx  # Scroll-triggered GSAP wrapper
│       ├── AreaCard.tsx
│       ├── Badge.tsx
│       ├── CategoryCard.tsx
│       ├── IngredientCard.tsx
│       ├── LoadingSpinner.tsx
│       ├── PageHeader.tsx   # GSAP clip-path animated header
│       └── ThemePicker.tsx  # DaisyUI dropdown with per-theme colour preview
├── hooks/
│   └── useStaggerReveal.ts  # Reusable GSAP stagger hook
├── lib/
│   └── cn.ts                # clsx + tailwind-merge utility
├── pages/
│   ├── _app.tsx             # QueryClient + GSAP registration + PageTransition
│   ├── _document.tsx        # HTML shell, default theme, meta
│   ├── 404.tsx              # Custom animated 404 page
│   ├── index.tsx            # Home — featured recipes (ISG, 1h revalidate)
│   ├── search.tsx           # Name + first-letter search (client)
│   ├── categories.tsx       # All categories (SSG)
│   ├── area.tsx             # All world cuisines (SSG)
│   ├── ingredients.tsx      # Ingredient grid (SSG)
│   ├── contact.tsx          # Contact form
│   ├── meal/[id].tsx        # Meal detail (ISR, 1h revalidate)
│   ├── category/[category].tsx  # Category meals (ISR)
│   ├── area/[area].tsx          # Cuisine meals (ISR)
│   └── ingredient/[ingredient].tsx  # Ingredient meals (SSR)
├── styles/
│   └── globals.css          # Tailwind v4 imports, DaisyUI themes, GSAP classes
└── types/
    └── meal.ts              # Meal, Category, Area, Ingredient types
```

---

## API Layer

The [`src/api/mealApi.ts`](src/api/mealApi.ts) module wraps every TheMealDB call with three reliability layers:

```
Request
  └─► dedupe()      — concurrent identical calls share one network request
        └─► withRetry()  — up to 3 attempts, 300/600/1200ms backoff (skips 4xx)
              └─► axios   — 10s timeout, error interceptor → ApiError
```

Catch `ApiError` to branch on HTTP status:

```ts
import { mealService, ApiError } from "@/api/mealApi";

try {
  const meals = await mealService.getMealsByCategory("Seafood");
} catch (err) {
  if (err instanceof ApiError && err.status === 404) {
    // handle not found
  }
}
```

---

## Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| `/` | ISG (`revalidate: 3600`) | Popular meals, updated hourly |
| `/categories`, `/area`, `/ingredients` | SSG | Rarely changes |
| `/meal/[id]` | ISR (`fallback: "blocking"`) | Thousands of IDs — lazy-built on first hit, cached 1h |
| `/category/[category]` | ISR | All paths pre-built at deploy, refreshed hourly |
| `/area/[area]` | ISR | Same as category |
| `/ingredient/[ingredient]` | SSR | Long-tail ingredient combinations |
| `/search` | CSR | User-driven, no SEO value |

---

## Deployment

The project is pre-configured for **Netlify** via [`netlify.toml`](netlify.toml).

```bash
# Deploy via Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

Or connect the repository to Netlify — it will auto-detect the `netlify.toml` and deploy on every push to `master`.

**Required Netlify environment variables** (set in Netlify UI → Site → Environment):

```
NEXT_PUBLIC_API_BASE_URL=https://www.themealdb.com/api/json/v1/1
NEXT_PUBLIC_API_TIMEOUT=10000
```

---

## Data Source

All recipe data is provided by the free tier of [TheMealDB API](https://www.themealdb.com/api.php) — no API key required for v1.

---

## License

MIT © 2026 Mohamed Hegazy
