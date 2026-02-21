# Betakit Dashboard

A production-ready financial dashboard built with Next.js 14+ (App Router), JavaScript, Tailwind CSS, Material UI v5, and Recharts.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS + Material UI v5
- **Charts:** Recharts
- **Icons:** lucide-react

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
│  ├─ layout.jsx           # Root layout with MUI theme + font
│  ├─ globals.css          # Tailwind directives + custom scrollbar
│  ├─ page.jsx             # Redirects to /dashboard
│  └─ dashboard/page.jsx   # Main dashboard page
├─ components/
│  ├─ layout/              # Sidebar, Topbar, DashboardLayout
│  ├─ cards/               # Balance, Spending, Card Preview, Budget
│  ├─ charts/              # Cash Breakdown bar chart
│  └─ tables/              # Transactions history table
├─ lib/
│  ├─ theme.js             # Centralized MUI theme
│  ├─ chartData.js         # Mock data for charts & tables
│  └─ utils.js             # cn() utility + formatCurrency
├─ public/                 # Static assets
├─ tailwind.config.js      # Tailwind configuration
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
