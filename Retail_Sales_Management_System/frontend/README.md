# TruEstate Sales Management System - Frontend

A modern, responsive sales management dashboard built with Next.js 15, React 19, and Tailwind CSS v4. Features advanced search, filtering, sorting, and pagination capabilities for managing retail sales data.

## 🚀 Features

- **Advanced Search**: Real-time search across customer names and phone numbers
- **Multi-Filter Support**: Filter by region, gender, age, category, payment method, and date ranges
- **Dynamic Sorting**: Sort by date, quantity, customer name, and amount
- **Pagination**: Efficient data pagination with 10 items per page
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live data fetching from MongoDB backend
- **Performance Optimized**: Built with Next.js App Router and React Server Components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React Icons
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Package Manager**: pnpm



## Project Structure
```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── favicon.ico              # App favicon
│   │   ├── globals.css              # Global styles with Tailwind CSS v4
│   │   ├── layout.tsx               # Root layout component
│   │   └── page.tsx                 # Home page (main dashboard)
│   │
│   ├── components/                   # React Components
│   │   ├── DateRangeFilter.jsx      # Date range picker component
│   │   ├── FilterDropdown.jsx       # Multi-select dropdown filter
│   │   ├── Pagination.jsx           # Pagination navigation component
│   │   ├── RangeFilter.jsx          # Numeric range filter (age)
│   │   ├── SearchBar.jsx            # Search input component
│   │   ├── Sidebar.jsx              # Sidebar navigation/filters
│   │   ├── StatsCard.jsx            # Summary statistics card
│   │   └── TransactionTable.jsx     # Main data table component
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useFilters.js            # Filter state management hook
│   │   └── useSales.js              # Sales data fetching hook
│   │
│   ├── services/                     # API Services
│   │   └── api.js                   # API client and endpoints
│   │
│   └── utils/                        # Utility Functions
│       ├── constants.js             # App-wide constants
│       └── helpers.js               # Helper functions
│
├── public/                           # Static Assets
│   └── nameLogo.png                 # Company logo
│
├── node_modules/                     # Dependencies (git-ignored)
│
├── .next/                            # Next.js build output (git-ignored)
│
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Project dependencies and scripts
├── postcss.config.mjs                # PostCSS configuration (Tailwind)
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── .gitignore                        # Git ignore rules
└── README.md                         # Project documentation
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the frontend root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
```

For production (Vercel):
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

### 4. Run development server
```bash
pnpm dev
```


### 5. Build for production
```bash
pnpm build
```

### 6. Start production server
```bash
pnpm start
```

## 📦 Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

## 🎨 Styling with Tailwind CSS v4

This project uses Tailwind CSS v4 with the new PostCSS plugin:

**Configuration**: `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
```

**Global CSS**: `src/app/globals.css`
```css
@import "tailwindcss";
```

## 🔌 API Integration

The frontend connects to the backend API for all data operations:

**Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable

**Main Endpoint**: `GET /api/sales`

**Query Parameters**:
- `search` - Search term
- `region` - Customer region filter
- `gender` - Gender filter
- `category` - Product category filter
- `payment` - Payment method filter
- `ageMin`, `ageMax` - Age range
- `dateFrom`, `dateTo` - Date range
- `sortBy` - Sort field (date/quantity/name)
- `page` - Page number


## 🚀 Deployment on Vercel

🔗 **Live Demo:** https://retail-sales-management-system-6h1o.vercel.app/

## 📝 Key Features Implementation


### Search Implementation
- Real-time search with debouncing
- Searches customer name and phone number
- Case-insensitive matching

### Filter Implementation
- Multi-select filters for categories
- Range filters for age and date
- Filters work in combination
- State preserved across pagination

### Sorting Implementation
- Sort by date (newest first)
- Sort by quantity (highest first)
- Sort by customer name (A-Z)
- Maintains active filters

### Pagination Implementation
- 10 items per page
- Next/Previous navigation
- Direct page number access
- Total count display

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://retail-sales-management-system-vema.onrender.com/api` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.


## 🙏 Acknowledgments

- TruEstate for the assignment and opportunity
---

**Built  for TruEstate SDE Intern Assignment**