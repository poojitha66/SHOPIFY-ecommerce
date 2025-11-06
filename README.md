# ShopSphere E-commerce

ShopSphere is a full-stack demo e-commerce platform showcasing how modern product discovery, cart management, checkout, and administration features come together in a cohesive shopping experience. It demonstrates a typical online retail workflow—from browsing a catalog and managing a shopping cart to completing secure payments and fulfilling orders.

## Agenda & Core Experience
- **Product discovery**: Customers explore curated listings, filter by category, and inspect detailed product descriptions with pricing, imagery, and inventory insights.
- **Personalized shopping**: Authenticated users can maintain persistent carts, manage profile details, and review order history.
- **Secure checkout**: Orders transition from cart to Stripe-powered checkout sessions for safe payment handling.
- **Operational efficiency**: Administrators oversee inventory, update listings, and monitor sales via a dedicated dashboard.

These flows emulate the agenda of a real-world commerce operation—delighting customers with a frictionless purchase journey while equipping operators with the tooling they need to manage catalog and orders.

## How It Works
1. **Authentication & Authorization**
   - Customers register and authenticate via the `/api/auth` endpoints.
   - JSON Web Tokens (JWT) secure subsequent requests and guard admin-only routes.
2. **Catalog Management**
   - The React frontend fetches product data from the Express API (`/api/products`).
   - Admin users can create, update, or archive items; changes persist in MongoDB.
3. **Cart & Order Flow**
   - Cart state is handled by the Context API, mirroring selections across the app.
   - Order submissions trigger the `/api/orders` route, storing order payloads and customer linkage.
4. **Payments**
   - Checkout calls `/api/create-checkout-session`, which uses Stripe SDKs to initialize payment sessions.
   - Stripe responds with a session ID that the frontend uses to redirect customers to hosted checkout.
5. **Post-Purchase Management**
   - After payment confirmation, Stripe webhooks (stubbed for future extension) can notify the backend to finalize orders and update inventory.

## Tech Stack
### Frontend
- **Framework**: React 18 with Vite bundling and TypeScript typings for reliability.
- **Styling**: Tailwind CSS for utility-first design, enabling rapid UI composition.
- **State Management**: React Context for cart state, `react-router-dom` for declarative routing.
- **API Layer**: Axios-based service (`src/services/api.ts`) centralizes HTTP calls and token handling.
- **Stripe Integration**: `@stripe/stripe-js` powers client-side payment redirection.

### Backend
- **Runtime**: Node.js with Express for routing, middleware orchestration, and REST APIs.
- **Database**: MongoDB (via Mongoose ODM) stores users, products, and orders with schema validation.
- **Security**: `bcryptjs` for password hashing, `jsonwebtoken` for JWT issuance, `cors` for controlled cross-origin access.
- **Payments**: Stripe Node SDK (`stripe`) creates checkout sessions.
- **Dev Tooling**: `nodemon` provides live reload during development; environment secrets load from `.env` via `dotenv`.

## Architectural Overview
```
[React + Context + Tailwind] ⇄ [Axios Service Layer] ⇄ [Express API]
                                              ⇅
                                   [MongoDB via Mongoose]
                                              ⇅
                                         [Stripe APIs]
```
- The frontend consumes REST endpoints exposed under `/api`, synchronizing UI state with the backend.
- JWT-authenticated requests protect sensitive operations such as order creation and product management.
- Stripe services handle PCI-compliant payment processing while keeping sensitive card data off the server.

## Project Structure
```
SHOPIFY-ecommerce/
├── backend/
│   ├── config/              # MongoDB connection helper
│   ├── controllers/         # Auth, product, order, and checkout logic
│   ├── middleware/          # JWT auth guard
│   ├── models/              # Mongoose schemas (User, Product, Order)
│   └── routes/              # Express routers wired into index.js
└── frontend/
    ├── src/components/      # Shared UI components (Navbar, etc.)
    ├── src/context/         # CartContext provider
    ├── src/pages/           # Home, ProductDetails, Cart, Checkout, Auth, AdminDashboard
    └── src/services/        # API client abstraction
```

## Running the Apps Locally
### Backend
1. Navigate into the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Provide environment variables by copying the template and updating values:
   ```bash
   cp .env.example .env
   # populate DB_URI, JWT_SECRET, STRIPE_SECRET_KEY
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The API will be available at `http://localhost:5000` with the following primary endpoints:
   - `POST /api/auth/register`, `POST /api/auth/login`
   - `GET|POST|PUT|DELETE /api/products`
   - `POST /api/orders`
   - `POST /api/create-checkout-session`

### Frontend
1. Start from the project root, change into the frontend folder, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Configure a `.env` file if you need to override the default API URL (`VITE_API_URL`).
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to explore the storefront. Login/register to unlock protected flows, add items to your cart, and complete the checkout journey.

## Extending the Demo
- **Inventory seeding**: Add seed scripts or use MongoDB Atlas UI to populate products for richer catalog views.
- **Order lifecycle**: Implement Stripe webhook handlers to update order statuses post-payment.
- **Analytics**: Integrate tools like Segment or Google Analytics for behavior insights.
- **Deployment**: Containerize services or deploy to providers (e.g., Vercel + Render) for production-like testing.

## License
This project is provided as-is for educational purposes. Customize and extend it to fit your commerce experimentation needs.
