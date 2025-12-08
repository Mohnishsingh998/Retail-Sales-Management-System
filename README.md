# 🏢 Retail Sales Management System

A full-stack retail sales management dashboard with advanced search, filtering, sorting, and pagination capabilities. Built with Next.js 15, React 19, Express.js, and MongoDB.

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express.js-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## 🎯 Overview

This monorepo contains a complete retail sales management system designed to handle large datasets efficiently. The system provides real-time search, multi-dimensional filtering, dynamic sorting, and server-side pagination for analyzing retail sales data.

**Live Demo**: [https://retail-sales-management-system-6h1o.vercel.app/](https://retail-sales-management-system-6h1o.vercel.app/)

**API Endpoint**: [https://retail-sales-management-system-vema.onrender.com/api](https://retail-sales-management-system-vema.onrender.com/api/sales)

---

## ✨ Features

### Frontend Features
- 🔍 **Real-time Search** - Search across customer names and phone numbers with debouncing
- 🎛️ **Advanced Filtering** - Multi-select filters for region, gender, category, payment method
- 📊 **Range Filters** - Age range and date range filtering
- ↕️ **Dynamic Sorting** - Sort by date, quantity, customer name, and amount
- 📄 **Pagination** - Efficient server-side pagination with 10 items per page
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- ⚡ **Performance Optimized** - Built with Next.js App Router and React Server Components

### Backend Features
- 🚀 **RESTful API** - Clean and intuitive API design
- 🗄️ **MongoDB Integration** - Efficient data storage with Mongoose ODM
- 🔎 **Full-text Search** - Case-insensitive search with regex patterns
- 🎯 **Complex Filtering** - Support for multiple simultaneous filters
- 📈 **Flexible Sorting** - Multi-field sorting capabilities
- 📑 **Server-side Pagination** - Optimized pagination for large datasets
- 🔒 **CORS Enabled** - Secure cross-origin resource sharing
- 📦 **CSV Import** - Bulk data import from CSV files

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB
- **ODM**: Mongoose 9
- **Utilities**: Axios, CORS, CSV Parser, dotenv
- **Deployment**: Render

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git

---

## 📁 Project Structure

```
Retail_Sales_Management_System/
│
├── frontend/                  # Next.js 15 + React 19 Frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # React Components
│   │   ├── hooks/            # Custom Hooks
│   │   ├── services/         # API Services
│   │   └── utils/            # Utilities
│   ├── public/               # Static Assets
│   └── package.json
│
├── backend/                   # Express.js + MongoDB Backend
│   ├── src/
│   │   ├── controllers/      # Request Handlers
│   │   ├── models/           # Database Models
│   │   ├── routes/           # API Routes
│   │   ├── services/         # Business Logic
│   │   ├── utils/            # Utilities
│   │   └── data/             # CSV Data Files
│   └── package.json
│
├── docs/                      # Project Documentation
│   └── architecture.md       # Architecture Guide
│
├── package.json               # Root package.json (Monorepo)
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Mohnishsingh998/Retail-Sales-Management-System.git
cd Retail_Sales_Management_System
```

### 2. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
pnpm install:all
```

### 3. Environment Setup

#### Backend Environment (.env)
Create `backend/.env`:
```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/sales-management
```

#### Frontend Environment (.env.local)
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api
```

### 4. Start Development Servers

```bash
# Start both frontend and backend concurrently
pnpm dev

# Or start individually
pnpm dev:frontend  # Frontend only (http://localhost:3000)
pnpm dev:backend   # Backend only (http://localhost:5002)
```

### 5. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5002/api](http://localhost:5002/api)
- **API Health**: [http://localhost:5002/api/sales](http://localhost:5002/api/sales)

---

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start both frontend and backend in development mode
pnpm dev:frontend     # Start frontend only
pnpm dev:backend      # Start backend only

# Production Build
pnpm build            # Build both frontend and backend
pnpm build:frontend   # Build frontend only
pnpm build:backend    # Build backend only

# Production Start
pnpm start            # Start both in production mode
pnpm start:frontend   # Start frontend only
pnpm start:backend    # Start backend only

# Maintenance
pnpm install:all      # Install all dependencies
pnpm clean            # Remove all node_modules and build files
pnpm lint             # Run ESLint on frontend
pnpm format           # Format code with Prettier
pnpm type-check       # TypeScript type checking
```

### Development Workflow

1. **Frontend Development**: Make changes in `frontend/src/`
2. **Backend Development**: Make changes in `backend/src/`
3. **Hot Reload**: Both servers support hot module replacement
4. **Testing**: Test API endpoints using the frontend UI or tools like Postman

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy automatically

**Live Frontend**: [https://retail-sales-management-system-6h1o.vercel.app/](https://retail-sales-management-system-6h1o.vercel.app/)

### Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Configure:
   - **Build Command**: `pnpm install`
   - **Start Command**: `pnpm start`
5. Add environment variables:
   - `MONGO_URI`
6. Deploy

**Live Backend**: [https://retail-sales-management-system-vema.onrender.com/api](https://retail-sales-management-system-vema.onrender.com/api/sales)

### Database (MongoDB Atlas)

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure network access and database user
3. Get connection string
4. Update `MONGO_URI` in backend `.env`

---

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Frontend setup and features
- [Backend README](./backend/README.md) - Backend API documentation
- [Architecture Guide](./docs/architecture.md) - System architecture and design

### API Documentation

**Base URL**: `http://localhost:5002/api` (development)

**Main Endpoint**: `GET /api/sales`

**Query Parameters**:
- `search` - Search term for customer name/phone
- `region` - Filter by region(s)
- `gender` - Filter by gender
- `category` - Filter by product category
- `payment` - Filter by payment method
- `ageMin`, `ageMax` - Age range filter
- `dateFrom`, `dateTo` - Date range filter
- `sortBy` - Sort field (date/quantity/customerName/totalAmount)
- `sortOrder` - Sort direction (asc/desc)
- `page` - Page number
- `limit` - Items per page

**Example Request**:
```bash
GET /api/sales?search=john&region=North&sortBy=date&page=1&limit=10
```

---

### Code Style

- Frontend: Follow TypeScript and React best practices
- Backend: Follow Node.js and Express conventions
- Use Prettier for code formatting
- Run ESLint before committing

---

## 🙏 Acknowledgments

- **TruEstate** for the assignment and opportunity
- **Next.js Team** for the amazing framework
- **MongoDB Team** for excellent database and documentation
- **Express.js Community** for middleware and ecosystem support
- **Vercel** and **Render** for deployment platforms

---

## 📞 Contact

**Developer**: MohnishSingh Yadav

**Project Link**: [https://github.com/Mohnishsingh998/Retail-Sales-Management-System/tree/main/Retail_Sales_Management_System](https://github.com/Mohnishsingh998/Retail-Sales-Management-System/tree/main/Retail_Sales_Management_System)

---

## 🎯 Project Status

✅ **Completed Features**:
- Full-stack implementation
- Search, filter, sort, pagination
- Responsive UI design
- MongoDB integration
- Production deployment
---

**Built for TruEstate SDE Intern Assignment**
