# Global Shelf BD - Frontend

Standalone Next.js Modern Frontend Application for Global Shelf BD.

## 📁 Project Structure

```
frontend/
├── public/               # Public images, logos, banners
├── src/
│   ├── app/              # Next.js App Router (store, admin, profile, auth pages)
│   ├── components/       # Storefront & Admin UI components
│   ├── context/          # React Contexts (Auth, Cart, Wishlist, Site)
│   └── lib/              # Client-safe API clients, types & helpers
├── .env                  # Frontend environment variables
├── .env.example          # Environment template
├── next.config.ts        # Next.js config with proxy rewrites to Backend API
├── package.json          # Dependencies & scripts
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (already done by default):
```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
```

### 3. Run Development Server
Ensure the backend server is running on `http://localhost:5000`, then:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## 🔄 API Integration & Proxying

- All client-side calls (`fetch('/api/...')`, `authenticatedFetch('/api/...')`) are automatically rewritten by `next.config.ts` to `http://localhost:5000/api/...`.
- This ensures cookies (like `refreshToken`) and CORS work seamlessly without single-origin complications during development.
- Server-side rendering components automatically resolve full backend URLs via `lib/api.ts`.
