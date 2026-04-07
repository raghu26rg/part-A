# Inventory Search Application

A full stack inventory search app using:

- Backend: Node.js + Express
- Frontend: React + Vite
- Data: In-memory array of sample products

## Project Structure

```text
backend/
  server.js
  data.js
  routes/search.js
frontend/
  src/
    App.jsx
    components/SearchBar.jsx
    components/Filters.jsx
    components/Results.jsx
  index.html
README.md
```

## Setup Instructions

### 1) Backend setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2) Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## API Explanation

### Endpoint

`GET /search`

### Query Parameters

- `q` (string): product name partial match
- `category` (string): exact category match
- `minPrice` (number): minimum price
- `maxPrice` (number): maximum price

### Examples

- `GET /search`
- `GET /search?q=desk`
- `GET /search?category=Electronics`
- `GET /search?q=book&minPrice=20&maxPrice=40`

## Search Logic Explanation

- Filtering is done on an in-memory products array.
- Product name matching is **case-insensitive** and supports **partial matching** using `includes()`.
- Category comparison is case-insensitive.
- Price filters are combined with text/category filters.
- When no filters are passed (or inputs are empty), all products are returned.
- If `minPrice > maxPrice`, API returns HTTP 400 with an error message.
- If no products match, API returns an empty array.

## Frontend Behavior

- Supports product search input, category dropdown, min/max price fields, and a Search button.
- Builds query params dynamically based on filled inputs.
- Shows loading state while API request is in progress.
- Shows:
  - `No results found` when response is empty
  - Validation error for invalid min/max range
  - API/network errors from the backend

## One Performance Improvement (for large datasets)

For production-scale data, replace in-memory filtering with a database search strategy:

- Add indexes on searchable fields (`name`, `category`, `price`) in MongoDB/PostgreSQL, or
- Use a search engine like Elasticsearch for fast text search and filtering
- Add pagination (`page`, `limit`) to reduce payload size and improve response times
