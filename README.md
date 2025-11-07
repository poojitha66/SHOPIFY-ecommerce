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
   - The React frontend fetches product data from the Rails API (`/api/products`).
   - Admin users can create, update, or archive items; changes persist in PostgreSQL.
3. **Cart & Order Flow**
   - Cart state is handled by the Context API, mirroring selections across the app.
   - Order submissions trigger the `/api/orders` route, storing order payloads, shipping details, and customer linkage.
4. **Payments**
   - Checkout calls `/api/checkout/session`, which uses the Stripe Ruby SDK to initialize payment sessions.
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
- **Framework**: Ruby on Rails 7 (API-only mode) provides controllers, routing, and Active Record models.
- **Database**: PostgreSQL stores users, products, and orders with relational integrity.
- **Security**: `bcrypt` for password hashing, `jwt` for token issuance, and `rack-cors` for controlled cross-origin access.
- **Payments**: Stripe Ruby SDK (`stripe`) creates checkout sessions.
- **Dev Tooling**: Rails credentials or `.env` files manage secrets; `puma` serves HTTP traffic during development.

## Architectural Overview
```
[React + Context + Tailwind] ⇄ [Axios Service Layer] ⇄ [Rails API]
                                            ⇅
                                      [PostgreSQL]
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
│   ├── app/                 # Rails models, controllers, and services
│   ├── config/              # Database, environment, and routing configuration
│   ├── db/                  # Active Record migrations and seeds
│   └── Gemfile              # Ruby dependencies for the API
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
   bundle install
   ```
2. Configure PostgreSQL access via environment variables or `config/database.yml`. A sample `.env.example` is provided with the following keys:
    - `POSTGRES_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, database names (`POSTGRES_DB`, `POSTGRES_TEST_DB`, `POSTGRES_PROD_DB`)
   - `JWT_SECRET` and `STRIPE_SECRET_KEY`
   - Optionally override `FRONTEND_ORIGIN` and `SECRET_KEY_BASE`
3. Prepare the database:
   ```bash
   rails db:create db:migrate db:seed
   ```
4. Start the Rails API server:
   ```bash
   rails server
   ```
5. The API will be available at `http://localhost:3000/api` with the following primary endpoints:
   - `POST /api/auth/register`, `POST /api/auth/login`
   - `GET|POST|PUT|DELETE /api/products`
   - `GET|POST /api/orders`
   - `POST /api/checkout/session`

### Frontend
1. Start from the project root, change into the frontend folder, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Configure a `.env` file if you need to override the default API URL (`VITE_API_URL`, defaults to `http://localhost:3000/api`).
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to explore the storefront. Login/register to unlock protected flows, add items to your cart, and complete the checkout journey.

## Extending the Demo
- **Inventory seeding**: Extend `db/seeds.rb` or write custom rake tasks to populate products for richer catalog views.
- **Order lifecycle**: Implement Stripe webhook handlers to update order statuses post-payment.
- **Analytics**: Integrate tools like Segment or Google Analytics for behavior insights.
- **Deployment**: Containerize services or deploy to providers (e.g., Vercel + Render) for production-like testing.

## License
This project is provided as-is for educational purposes. Customize and extend it to fit your commerce experimentation needs.
