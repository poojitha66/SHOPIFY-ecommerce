# ShopSphere E-commerce

A modern demo e-commerce application built with a React + TypeScript + Tailwind frontend and an Express + MongoDB + Stripe backend.

## Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or hosted)
- Stripe account with a test secret key

## Project Structure

```
SHOPIFY-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
    └── src/
```

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The backend listens on `http://localhost:5000` by default and exposes REST endpoints under `/api`.

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The React app runs on `http://localhost:5173` and expects the backend to be available at `http://localhost:5000`.

## Available Backend Routes

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and retrieve a JWT
- `GET /api/products` – Fetch all products
- `GET /api/products/:id` – Fetch a single product
- `POST /api/products` – Create a product (admin only)
- `PUT /api/products/:id` – Update a product (admin only)
- `DELETE /api/products/:id` – Delete a product (admin only)
- `POST /api/orders` – Create a new order (authenticated users)
- `POST /api/create-checkout-session` – Generate a Stripe Checkout session (authenticated users)

## Scripts

- Frontend: `npm run dev` – start the Vite dev server
- Backend: `npm run dev` – start the Express server with nodemon

## Notes

- Update the `VITE_API_URL` environment variable in the frontend (e.g., via a `.env` file) if your backend runs on a different URL.
- Seed your MongoDB database with products to see them listed in the UI, or rely on the `/api/products/test` route for a quick smoke test.
