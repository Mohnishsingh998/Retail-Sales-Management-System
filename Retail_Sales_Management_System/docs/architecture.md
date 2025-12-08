# 🏗️ Monorepo Architecture - Retail Sales Management System

## 📂 Project Structure

```
Retail_Sales_Management_System/
│
├── backend/                              # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/                  # Request handlers
│   │   │   └── salesController.js       # Sales API logic
│   │   │
│   │   ├── models/                       # Database schemas
│   │   │   └── Sale.js                  # MongoDB Sale model
│   │   │
│   │   ├── routes/                       # API route definitions
│   │   │   └── salesRoutes.js           # Sales endpoints
│   │   │
│   │   ├── services/                     # Business logic layer
│   │   │   ├── dataService.js           # CSV import/export
│   │   │   ├── filterService.js         # Filter operations
│   │   │   ├── paginationService.js     # Pagination logic
│   │   │   ├── searchService.js         # Search operations
│   │   │   └── sortService.js           # Sorting logic
│   │   │
│   │   ├── utils/                        # Utility functions
│   │   ├── data/                         # CSV data files
│   │   └── index.js                      # Entry point
│   │
│   ├── node_modules/                     # Dependencies
│   │   ├── axios/                       # HTTP client
│   │   ├── cors/                        # CORS middleware
│   │   ├── csv-parser/                  # CSV parsing
│   │   ├── dotenv/                      # Environment config
│   │   ├── express/                     # Web framework
│   │   ├── mongodb/                     # MongoDB driver
│   │   ├── mongoose/                    # MongoDB ODM
│   │   └── nodemon/                     # Dev server
│   │
│   ├── package.json                      # Backend dependencies
│   ├── pnpm-lock.yaml                   # Lock file
│   └── README.md                         # Backend documentation
│
├── frontend/                             # Next.js 15 + React 19 Frontend
│   ├── src/
│   │   ├── app/                          # Next.js App Router
│   │   │   ├── layout.tsx               # Root layout
│   │   │   ├── page.tsx                 # Home/Dashboard page
│   │   │   ├── globals.css              # Global styles
│   │   │   └── favicon.ico              # Favicon
│   │   │
│   │   ├── components/                   # React components
│   │   │   ├── DateRangeFilter.jsx      # Date range picker
│   │   │   ├── FilterDropdown.jsx       # Multi-select filter
│   │   │   ├── Pagination.jsx           # Pagination controls
│   │   │   ├── RangeFilter.jsx          # Numeric range filter
│   │   │   ├── SearchBar.jsx            # Search input
│   │   │   ├── Sidebar.jsx              # Filter sidebar
│   │   │   ├── StatsCard.jsx            # Statistics card
│   │   │   └── TransactionTable.jsx     # Data table
│   │   │
│   │   ├── hooks/                        # Custom React hooks
│   │   │   ├── useFilters.js            # Filter state management
│   │   │   └── useSales.js              # Sales data fetching
│   │   │
│   │   ├── services/                     # API integration
│   │   │   └── api.js                   # API client
│   │   │
│   │   └── utils/                        # Utility functions
│   │       ├── constants.js             # App constants
│   │       └── helpers.js               # Helper functions
│   │
│   ├── public/                           # Static assets
│   │   └── nameLogo.png                 # Company logo
│   │
│   ├── node_modules/                     # Dependencies
│   │   ├── @tailwindcss/postcss/        # Tailwind v4 PostCSS
│   │   ├── @types/node/                 # Node type definitions
│   │   ├── @types/react/                # React type definitions
│   │   ├── @types/react-dom/            # React DOM types
│   │   ├── babel-plugin-react-compiler/ # React compiler
│   │   ├── eslint/                      # Code linting
│   │   ├── eslint-config-next/          # Next.js ESLint config
│   │   ├── lucide-react/                # Icon library
│   │   ├── next/                        # Next.js framework
│   │   ├── react/                       # React library
│   │   ├── react-dom/                   # React DOM
│   │   ├── tailwindcss/                 # Tailwind CSS
│   │   └── typescript/                  # TypeScript
│   │
│   ├── eslint.config.mjs                 # ESLint configuration
│   ├── next.config.ts                    # Next.js configuration
│   ├── next-env.d.ts                     # Next.js types
│   ├── package.json                      # Frontend dependencies
│   ├── pnpm-lock.yaml                   # Lock file
│   ├── postcss.config.mjs               # PostCSS configuration
│   ├── tailwind.config.ts               # Tailwind configuration
│   ├── tsconfig.json                     # TypeScript configuration
│   └── README.md                         # Frontend documentation
│
└── docs/                                 # Project documentation
    └── architecture.md                   # This file
```

---

## 🔧 Technology Stack Overview

### Backend Stack
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB + Mongoose 9
- **Utilities**: Axios, CORS, CSV Parser, dotenv, Nodemon

### Frontend Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Tooling**: ESLint, React Compiler, PostCSS

### Package Management
- **Package Manager**: pnpm (for both frontend and backend)

---

## 🏛️ Architecture Layers

### Backend Architecture

```
┌─────────────────────────────────────────────┐
│           API Layer (Routes)                │
│         salesRoutes.js                      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│      Controller Layer (Controllers)         │
│        salesController.js                   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│       Service Layer (Services)              │
│  ├── dataService.js                         │
│  ├── filterService.js                       │
│  ├── searchService.js                       │
│  ├── sortService.js                         │
│  └── paginationService.js                   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│       Model Layer (Models)                  │
│          Sale.js (Mongoose)                 │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            MongoDB Database                 │
└─────────────────────────────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────────────┐
│         Page Layer (App Router)             │
│            page.tsx                         │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│      Component Layer (Components)           │
│  ├── TransactionTable.jsx                   │
│  ├── Sidebar.jsx                            │
│  ├── SearchBar.jsx                          │
│  ├── FilterDropdown.jsx                     │
│  ├── DateRangeFilter.jsx                    │
│  ├── RangeFilter.jsx                        │
│  ├── Pagination.jsx                         │
│  └── StatsCard.jsx                          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│        Hook Layer (Custom Hooks)            │
│  ├── useFilters.js                          │
│  └── useSales.js                            │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│       Service Layer (API Client)            │
│            api.js                           │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          Backend REST API                   │
└─────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Request Flow (Frontend → Backend)

```
User Action (Search/Filter/Sort)
        ↓
Component Event Handler
        ↓
Custom Hook (useSales/useFilters)
        ↓
API Service (api.js)
        ↓
Fetch API Request
        ↓
Backend Route (salesRoutes.js)
        ↓
Controller (salesController.js)
        ↓
Service Layer (filter/search/sort/pagination)
        ↓
MongoDB Query (via Mongoose)
        ↓
Response sent back through same chain
```

### Response Flow (Backend → Frontend)

```
MongoDB Result
        ↓
Mongoose Model (Sale.js)
        ↓
Service Processing
        ↓
Controller Format Response
        ↓
Express Response
        ↓
API Service Receives Data
        ↓
Custom Hook Updates State
        ↓
Component Re-renders
        ↓
UI Updates
```

---

## 📡 API Communication

### Endpoint Structure
```
Base URL: http://localhost:5002/api/sales (dev)
         https://retail-sales-management-system-vema.onrender.com/api (prod)

Main Endpoint: GET /api/sales

Query Parameters:
├── search        (string)  - Search term
├── region        (string)  - Region filter
├── gender        (string)  - Gender filter
├── category      (string)  - Category filter
├── payment       (string)  - Payment method filter
├── ageMin        (number)  - Min age
├── ageMax        (number)  - Max age
├── dateFrom      (string)  - Start date
├── dateTo        (string)  - End date
├── sortBy        (string)  - Sort field
├── sortOrder     (string)  - asc/desc
├── page          (number)  - Page number
└── limit         (number)  - Items per page
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              Vercel (Frontend)              │
│        Next.js 15 Static + SSR              │
│    https://retail-sales-management-system-6h1o.vercel.app/                   │
└──────────────────┬──────────────────────────┘
                   │
                   │ HTTPS/REST API
                   │
┌──────────────────▼──────────────────────────┐
│             Render (Backend)                │
│          Express.js REST API                │
│    https://retail-sales-management-system-vema.onrender.com/api                 │
└──────────────────┬──────────────────────────┘
                   │
                   │ MongoDB Driver
                   │
┌──────────────────▼──────────────────────────┐
│          MongoDB Atlas (Database)           │
│         Managed MongoDB Cluster             │
└─────────────────────────────────────────────┘
```

---

## 🔐 Environment Configuration

### Backend (.env)
```
PORT=5002
MONGO_URI=mongodb+srv://...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://retail-sales-management-system-vema.onrender.com/api/sales
```

---

## 📦 Package Management Strategy

- **Monorepo Structure**: Independent `package.json` for frontend and backend
- **Package Manager**: pnpm for both workspaces
- **Lock Files**: Separate `pnpm-lock.yaml` for each workspace
- **Node Modules**: Isolated dependencies per workspace

---

**Built for TruEstate SDE Intern Assignment**