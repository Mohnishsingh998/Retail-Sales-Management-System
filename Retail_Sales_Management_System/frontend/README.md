# 🎨 Frontend – Retail Sales Management System

## 1. 📌 Overview (Frontend)

A high-performance frontend dashboard built with Next.js 15, React 19, and Tailwind CSS v4 for visualizing retail sales data.  
It provides real-time search, filtering, sorting, and pagination, rendering large datasets efficiently.  
The interface is fully responsive, optimized for speed, and integrates seamlessly with the backend REST API.

---

## 2. 🛠 Tech Stack (Frontend)

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Package Manager**: pnpm
- **Deployment**: Vercel

---

## 3. 🔍 Search Implementation Summary

The frontend implements real-time search with debouncing, allowing users to search customer names and phone numbers.  

**Key Features:**
- Search field updates the query parameters and triggers a new fetch without reloading the page
- Case-insensitive matching
- Integrates seamlessly with other filters, sorting, and pagination
- Debounce delay of 500ms to optimize API calls

**Example Implementation:**
```jsx
const [searchTerm, setSearchTerm] = useState("");

// Debounced search
useEffect(() => {
  const timer = setTimeout(() => {
    fetchSales({ search: searchTerm, ...filters });
  }, 500);
  
  return () => clearTimeout(timer);
}, [searchTerm]);
```

---

## 4. 🎛 Filter Implementation Summary

The dashboard includes multi-dimensional filters:
- **Multi-select filters**: Region, Gender, Product Category, Payment Method
- **Range filters**: Age Range, Date Range

Filters are managed through a centralized `useFilters` hook, ensuring clean state handling.  
All filters work in combination and persist during navigation, providing an intuitive user experience.

**Filter Management:**
```jsx
const useFilters = () => {
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    category: [],
    payment: [],
    ageMin: null,
    ageMax: null,
    dateFrom: null,
    dateTo: null
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { filters, updateFilter };
};
```

---

## 5. ↕ Sorting Implementation Summary

Users can sort sales records by:
- Date (newest first)
- Quantity (highest first)
- Customer Name (A-Z)
- Total Amount (highest first)

The frontend passes sorting parameters to the backend through URL query strings while preserving active filters and search terms.  
Sorting is applied instantly and updates the table without a full page reload.

**Example Implementation:**
```jsx
const [sortBy, setSortBy] = useState("date");
const [sortOrder, setSortOrder] = useState("desc");

const handleSort = (field) => {
  const newOrder = sortBy === field && sortOrder === "desc" ? "asc" : "desc";
  setSortBy(field);
  setSortOrder(newOrder);
  fetchSales({ sortBy: field, sortOrder: newOrder, ...filters });
};
```

---

## 6. 📄 Pagination Implementation Summary

Pagination is implemented using a custom component that supports:
- **10 items per page** (default)
- **Next/Previous navigation**
- **Direct page number selection**
- **Total count display**

The frontend updates the `page` query parameter, and the backend returns paginated data along with total count, ensuring fast browsing through large datasets.

**Pagination Component:**
```jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <span>Page {currentPage} of {totalPages}</span>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
```

---

## 7. ⚙ Frontend Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Mohnishsingh998/Retail-Sales-Management-System.git
cd frontend
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5002/api/sales
```

Production (Vercel):
```env
NEXT_PUBLIC_API_URL=https://retail-sales-management-system-vema.onrender.com/api
```

### 4. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
pnpm build
```

### 6. Start Production Server
```bash
pnpm start
```

### 7. Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## 🚀 Deployment on Vercel

🔗 **Live Demo**: [https://retail-sales-management-system-6h1o.vercel.app/](https://retail-sales-management-system-6h1o.vercel.app/)

### Deploy Steps:
1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy automatically

---

**Built for TruEstate SDE Intern Assignment**