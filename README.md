# ELUME

A full-stack e-commerce web application featuring a React frontend and an Express/MongoDB backend dedicated to user authentication and session management.

---

## Architecture & Directory Structure

The repository is organized into separate `frontend` and `backend` workspaces:

```text
Eleum/
├── backend/                  # Node.js + Express + MongoDB Authentication Server
│   ├── config/
│   │   └── db.js             # Mongoose connection with DNS fallback for Atlas SRV
│   ├── controllers/
│   │   └── authController.js # Auth handlers (register, login, logout, me, updateProfile)
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT verification from HttpOnly cookie
│   │   └── rateLimiter.js    # In-memory IP rate limiter for auth routes
│   ├── models/
│   │   └── User.js           # Mongoose User schema with bcrypt password hashing
│   ├── routes/
│   │   └── authRoutes.js     # Express router for /api/auth endpoints
│   ├── .env.example          # Backend environment variable template
│   ├── package.json          # Backend dependencies and scripts
│   ├── server.js             # Express app entry point, CORS, and CSRF middleware
│   └── test_auth.js          # In-memory integration test suite for auth endpoints
│
├── frontend/                 # React 19 + Vite 8 + Tailwind CSS v4 Client
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # UI, layout, and section components
│   │   ├── context/          # React contexts (AuthContext, Cart, Order, Wishlist)
│   │   ├── hooks/            # Custom React hooks (useAuth, useCart)
│   │   ├── layouts/          # MainLayout component
│   │   ├── pages/            # Views (Home, Products, ProductDetails, Cart, Checkout, Login, Signup, Profile, Wishlist)
│   │   ├── routes/           # AppRoutes and ProtectedRoute
│   │   ├── services/         # API clients (api.js for DummyJSON, backendApi.js for Auth server)
│   │   ├── utils/            # Constants, helpers, and storage utilities
│   │   ├── App.jsx           # Root application component
│   │   ├── index.css         # Global Tailwind CSS styles
│   │   └── main.jsx          # React entry point
│   ├── .env.example          # Frontend environment variable template
│   ├── eslint.config.js      # ESLint configuration
│   ├── index.html            # Vite HTML template
│   ├── package.json          # Frontend dependencies and scripts
│   ├── vercel.json           # Vercel deployment routing configuration
│   └── vite.config.js        # Vite configuration
│
├── .gitignore                # Excludes node_modules, dist, and all .env files
├── package.json              # Root workspace convenience scripts
└── README.md                 # Project documentation
```

---

## Features & Implementation Status

### Backend & Authentication (MongoDB Atlas + Express)
* **User Registration (`POST /api/auth/register`):** Validates name, email, and password (min 6 characters), prevents duplicate accounts, hashes passwords using bcrypt, sets an `HttpOnly` cookie, and returns user data (excluding password).
* **User Login (`POST /api/auth/login`):** Validates credentials using bcrypt comparison and issues a JWT inside an `HttpOnly` session cookie.
* **Session Verification (`GET /api/auth/me`):** Authenticates incoming requests via cookie token and retrieves user data to persist sessions across page reloads.
* **Profile & Password Updates (`PUT /api/auth/profile`, `PATCH /api/auth/profile`):** Allows updating name and email with uniqueness validation. Password updates strictly require validating `currentPassword`.
* **User Logout (`POST /api/auth/logout`):** Clears the `token` cookie with matching security flags.
* **Security & Hardening:**
  * Passwords hashed with bcrypt salt rounds before saving (`User.js` pre-save hook).
  * JWT stored in `HttpOnly` cookie (`sameSite: "none"` and `secure: true` in production) to mitigate XSS.
  * In-memory IP rate limiter on sensitive endpoints (`/register`, `/login`) to counter brute-force attempts.
  * CSRF defense validating `Origin` and `Referer` headers against allowed origins on all state-changing requests (`POST`, `PUT`, `PATCH`, `DELETE`).
  * `app.set("trust proxy", 1)` enabled for reverse proxy environments (e.g. Render, Vercel).
  * Automated backend test suite (`test_auth.js`) using `mongodb-memory-server` covering 29 integration tests.

### Frontend E-Commerce Features (React + Tailwind)
* **Product Catalog:** Browsing, category filtering, search, and product detail views fetched dynamically via the public DummyJSON API (`https://dummyjson.com`).
* **Shopping Cart & Wishlist:** Add, remove, and adjust quantity; state is managed via React Context and persisted in browser `localStorage`.
* **Protected Routes:** Restricts access to user profile pages to authenticated users using `ProtectedRoute.jsx`.

### Current Limitations
* **Product Catalog:** Products are loaded from external DummyJSON mock endpoints, not stored in MongoDB.
* **Cart & Wishlist Persistence:** Cart and wishlist items are stored locally in the user's browser `localStorage`, not synced to the backend database.
* **Orders & Payments:** The checkout flow generates a client-side mock order ID and saves order history in `localStorage` (`orders_${email}`). There is no payment gateway integration (no Stripe/PayPal) and no backend order persistence endpoint.

---

## API Endpoints

All backend endpoints are prefixed under `/api`:

| Method  | Endpoint             | Access                | Description                                     |
|:--------|:---------------------|:----------------------|:------------------------------------------------|
| `GET`   | `/api/health`        | Public                | Service health check                            |
| `POST`  | `/api/auth/register` | Public (Rate-limited) | Register new user, set session cookie           |
| `POST`  | `/api/auth/login`    | Public (Rate-limited) | Login with email/password, set session cookie   |
| `POST`  | `/api/auth/logout`   | Public                | Clear session cookie                            |
| `GET`   | `/api/auth/me`       | Protected             | Get authenticated user info from session cookie |
| `PUT`   | `/api/auth/profile`  | Protected             | Update profile info or password                 |
| `PATCH` | `/api/auth/profile`  | Protected             | Update profile info or password                 |

---

## Environment Variables

### Backend (`backend/.env`)

Create `backend/.env` using `backend/.env.example` as a template:

| Variable       | Required | Default / Example                                                | Purpose                                                             |
|:---------------|:---------|:-----------------------------------------------------------------|:--------------------------------------------------------------------|
| `MONGODB_URI`  | **Yes**  | `mongodb+srv://<username>:<password>@cluster.mongodb.net/elume`  | MongoDB Atlas connection string                                     |
| `JWT_SECRET`   | **Yes**  | `your_jwt_secret_key_here`                                       | Secret key for signing and verifying JWT tokens                     |
| `PORT`         | No       | `5000`                                                           | Port for Express server                                             |
| `NODE_ENV`     | No       | `development`                                                    | Set to `production` for secure cross-site cookies                   |
| `CLIENT_URL`   | No       | `http://localhost:5173`                                         | Trusted frontend origin for CORS & CSRF validation                  |
| `FRONTEND_URL` | No       | `https://your-app.vercel.app`                                   | Additional trusted frontend origin (supports comma-separated list) |

### Frontend (`frontend/.env`)

Create `frontend/.env` using `frontend/.env.example` as a template:

| Variable            | Required | Default / Example       | Purpose                                           |
|:--------------------|:---------|:------------------------|:--------------------------------------------------|
| `VITE_API_BASE_URL` | No       | `http://localhost:5000` | Backend API base URL for authentication requests  |

---

## Local Development Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm**
* A **MongoDB Atlas** cluster (or local MongoDB instance)

### 1. Install Dependencies

Install dependencies for both frontend and backend from the root directory:

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Files

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/elume?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Run Development Servers

You can launch both applications from the project root:

```bash
# Start backend server (starts on http://localhost:5000)
npm run dev:backend

# Start frontend client in a separate terminal (starts on http://localhost:5173)
npm run dev:frontend
```

Alternatively, run each workspace directly:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## Testing & Quality Checks

Run the following checks from the project root:

* **Backend Auth Test Suite (In-Memory MongoDB):**
  ```bash
  npm run test:backend
  ```
  Runs 29 automated tests verifying registration, login, logout, password hashing, HttpOnly cookies, CSRF defenses, and profile updates without modifying production data.

* **Frontend Code Quality (ESLint):**
  ```bash
  npm run lint:frontend
  ```

* **Frontend Production Build (Vite):**
  ```bash
  npm run build:frontend
  ```