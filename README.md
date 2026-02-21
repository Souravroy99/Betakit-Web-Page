# Betakit Dashboard

A production-ready financial dashboard built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, Material UI v5, and Recharts.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Material UI v5
- **Charts:** Recharts
- **Icons:** lucide-react
- **Font:** Inter (via next/font/google)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

## Project Structure

```
betakit-dashboard/
├─ app/                    # Next.js App Router pages
│  ├─ layout.tsx           # Root layout with MUI theme + font
│  ├─ globals.css          # Tailwind directives + custom scrollbar
│  ├─ page.tsx             # Redirects to /dashboard
│  └─ dashboard/page.tsx   # Main dashboard page
├─ components/
│  ├─ layout/              # Sidebar, Topbar, DashboardLayout
│  ├─ cards/               # Balance, Spending, Card Preview, Budget
│  ├─ charts/              # Cash Breakdown bar chart
│  └─ tables/              # Transactions history table
├─ lib/
│  ├─ theme.ts             # Centralized MUI theme
│  ├─ chartData.ts         # Mock data for charts & tables
│  └─ utils.ts             # cn() utility + formatCurrency
├─ public/                 # Static assets
├─ tailwind.config.ts      # Tailwind configuration
└─ next.config.js          # Next.js configuration
```

## Performance

- Server Components by default; `"use client"` only where needed
- Dynamic imports with `{ ssr: false }` for charts and tables
- `React.memo` on all presentational components
- `useMemo` / `useCallback` for data and event handlers
- Tree-shaken MUI imports via `modularizeImports`

## Responsive

Fully responsive from mobile (320px) to desktop. Sidebar collapses to hamburger menu on smaller screens.
"# Betakit-Web-Page" 
