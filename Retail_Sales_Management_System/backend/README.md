# 📦 Backend – Retail Sales Management System

## 1. 📌 Overview (Backend)

The backend provides a fast, scalable REST API for managing and analyzing retail sales data.  
It supports searching, filtering, sorting, and paginating  database-driven datasets.  
Built with Node.js and Express, the backend ensures reliable performance in both development and deployment environments.

---

## 2. 🛠 Tech Stack (Backend)

- **Node.js**
- **Express.js 5**
- **MongoDB**
- **Mongoose 9**
- **CSV Parser** (for CSV dataset ingestion)
- **Axios** (HTTP client)
- **CORS** (Cross-origin resource sharing)
- **dotenv** (Environment configuration)
- **Nodemon** (Development)
- **Render** (Deployment)
- **Package Manager**: pnpm

---

## 3. 🔍 Search Implementation Summary

- Search works using the query parameter `search`.
- Supports searching across multiple fields like:
  - Customer name  
  - Phone number  
- Uses case-insensitive regex for flexible partial matching.

**Example Request:**  
```bash
GET /api/sales?search=john
```

**Example Backend Logic:**
```js
if (req.query.search) {
  query.$or = [
    { customerName: { $regex: req.query.search, $options: "i" } },
    { phoneNumber: { $regex: req.query.search, $options: "i" } }
  ];
}
```

---

## 4. 🎛 Filter Implementation Summary

Backend supports multiple filter types:

### Multi-select filters
- `region` → `region=North,West`
- `gender` → `gender=Male,Female`
- `category` → `category=Electronics,Clothes`
- `payment` → `payment=Credit Card,Cash`

### Range filters
- Age range → `ageMin=20&ageMax=40`
- Date range → `dateFrom=2023-01-01&dateTo=2023-12-31`

Backend builds dynamic queries like:
```js
if (req.query.region) {
  query.region = { $in: req.query.region.split(",") };
}

if (req.query.ageMin || req.query.ageMax) {
  query.age = {};
  if (req.query.ageMin) query.age.$gte = Number(req.query.ageMin);
  if (req.query.ageMax) query.age.$lte = Number(req.query.ageMax);
}

if (req.query.dateFrom || req.query.dateTo) {
  query.date = {};
  if (req.query.dateFrom) query.date.$gte = new Date(req.query.dateFrom);
  if (req.query.dateTo) query.date.$lte = new Date(req.query.dateTo);
}
```

---

## 5. ↕ Sorting Implementation Summary

Sorting is handled by two parameters:
- `sortBy` → field name (e.g., `date`, `quantity`, `customerName`, `totalAmount`)
- `sortOrder` → `asc` or `desc` (defaults to `desc`)

**Example:**
```bash
GET /api/sales?sortBy=date&sortOrder=desc
```

**Backend Example:**
```js
const sortOption = {};
if (req.query.sortBy) {
  sortOption[req.query.sortBy] = req.query.sortOrder === "asc" ? 1 : -1;
}

const results = await Sales.find(query).sort(sortOption);
```

---

## 6. 📄 Pagination Implementation Summary

Backend uses server-side pagination for high performance.

### Query Params:
- `page` → current page number (default: 1)
- `limit` → number of records per page (default: 10)

**Example:**
```bash
GET /api/sales?page=1&limit=10
```

**Backend Logic:**
```js
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

const totalItems = await Sales.countDocuments(query);
const results = await Sales.find(query)
  .sort(sortOption)
  .skip(skip)
  .limit(limit);

const totalPages = Math.ceil(totalItems / limit);
```

**The API returns a pagination object:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 2,
    "totalPages": 15,
    "totalItems": 289,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

---

## 7. ⚙ Backend Setup Instructions

### Install Dependencies
```bash
pnpm install
```

### Environment Variables
Create a `.env` file:
```env
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sales-management
```

For production (MongoDB Atlas):
```env
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sales-management
```

### Start Development Server
```bash
pnpm dev
```

### Production Build
```bash
pnpm start
```

### API Base URL
- **Local**: `http://localhost:5002/api/sales`
- **Production**: `https://retail-sales-management-system-vema.onrender.com/api`

---

**Built for TruEstate SDE Intern Assignment**