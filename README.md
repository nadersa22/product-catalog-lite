# Product Catalog Lite

A simple, functional product browsing interface built with Vue.js 3 and TypeScript.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nadersa22/product-catalog-lite.git
cd product-catalog-lite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Tech Stack & Why

### Core Framework
- **Vue.js 3** - Modern, reactive framework with excellent TypeScript support and composition API
- **TypeScript** - Type safety helps catch bugs early and improves code maintainability

### State Management
- **Pinia** - Official Vue state management, simpler and more intuitive than Vuex with better TypeScript integration

### Routing
- **Vue Router** - Standard routing solution for Vue, enables future expansion

### Styling
- **TailwindCSS v4** - Utility-first CSS framework that speeds up development and keeps styling consistent without writing custom CSS

### API
- **FakeStoreAPI** - Free REST API for product data

## Features Implemented

-  Product grid display with images, titles, and prices
-  Search filter (client-side filtering by product title)
-  Category filter (dropdown with all available categories)
-  Loading state with animated spinner
-  Error handling with user-friendly messages
-  Product detail modal showing full description and ratings
-  Grid/List view toggle with smooth transitions
-  Responsive design (mobile-friendly)
-  Modern UI with gradients and hover effects

##  Reflection Questions

### 1. What would you improve if you had more time?

If I had more time, I would add several enhancements:
- **Pagination or infinite scroll** to handle large datasets more efficiently instead of loading all products at once
- **Price range filter** with a dual-handle slider component for better UX
- **Sort functionality** (by price ascending/descending, rating, name alphabetically)
- **Wishlist feature** allowing users to save favorite products to local storage
- **Unit and integration tests** using Vitest to ensure component reliability
- **Accessibility improvements** including ARIA labels, keyboard navigation, and screen reader support
- **Performance optimizations** like image lazy loading and memoization of expensive computations

### 2. Describe a time you learned a new technology from scratch
- **What was it?**
I learned Docker and containerization when I needed to deploy a full-stack application for a university/personal project. I had experience with traditional deployment but containers were completely new to me.

- **How did I approach learning it?**
I started with Docker's official documentation and their getting-started tutorial. I began by containerizing a simple Node.js app, then gradually moved to multi-container setups with Docker Compose. I also followed YouTube tutorials and read blog posts about Docker best practices and common pitfalls.

- **What challenges did I face?**
The biggest challenge was understanding container networking and how containers communicate with each other. Volume management for persistent data was also confusing at first - I lost data several times before understanding how volumes work. Debugging was difficult because error messages weren't always clear about what went wrong inside the container. I overcame these challenges by carefully reading Docker logs, using docker inspect to understand container configuration, and asking questions in Docker community forums where experienced developers explained concepts I was struggling with.

### 3. If this had 10,000 products, what performance issues might arise? How would you handle them?

**Potential Performance Issues:**

1. **Memory consumption** - Loading 10,000 products into browser memory would consume significant RAM
2. **Slow initial load** - Large API response (potentially several MB) would delay page rendering
3. **Sluggish filtering** - Client-side filtering through 10,000 items on every keystroke would freeze the UI
4. **DOM rendering bottleneck** - Even with virtual DOM, rendering thousands of components would cause lag
5. **Network bandwidth** - Users on slow connections would wait a long time for initial data

**Solutions:**

1. **Server-side pagination** - Fetch only 20-50 products per page via API query parameters (`?page=1&limit=20`). This reduces payload size and memory usage dramatically.

2. **Virtual scrolling** - Use libraries like `vue-virtual-scroller` to render only visible products (maybe 10-15 at a time) even if user has 1000+ loaded. This solves DOM performance issues.

3. **Server-side search/filtering** - Send search queries and filters to the backend API (`?search=shirt&category=men`) so filtering happens on the server, returning only matching results.

4. **Debouncing search input** - Add 300ms delay before triggering search to avoid excessive filtering on every keystroke.

5. **Lazy loading images** - Use `loading="lazy"` attribute or Intersection Observer API to load images only when they're about to enter viewport.

6. **Response caching** - Implement HTTP caching headers and service workers to cache API responses, reducing repeat requests.

7. **Web Workers** - Offload heavy filtering/sorting operations to background threads to keep UI responsive.

8. **Indexing and search optimization** - For client-side search, use libraries like Fuse.js for fuzzy search with better performance than simple `.filter()`.

9. **Code splitting** - Lazy load the product modal component only when needed, reducing initial bundle size.

10. **Database optimization** - On the backend, ensure proper indexing on searchable fields (title, category) for fast queries.

