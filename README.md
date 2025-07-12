<h1 align="center">
     🍔 QuickBite
  <br />
</h1>

<h4 align="center">A food delivery platform connecting customers, restaurants, and delivery riders in a seamless and efficient way.</h4>

---

## ✨ Features

### 🔐 Authentication

- Secure login for Customers, Partners, and Riders.
- Role-based access and permissions.

### 🛒 Customer

- Browse and search restaurants and menus with filters (cuisine type, ratings, price).
- Add multiple restaurant items to the cart.
- Place orders.
- View order history and reorder previous orders.
- Ratings and reviews for restaurants.

### 📦 Multi-Restaurant Cart

- Support for orders from multiple restaurants simultaneously.
- Efficient management of cart items and checkout process.

### ⚙️ Other Features

- Responsive design for mobile and desktop.

---

## Tech Stack

### Frontend

- [React](https://reactjs.org/) for building the user interface.
- [TypeScript](https://www.typescriptlang.org/) for type safety.
- [Material UI](https://mui.com/material-ui/getting-started/) for UI components.

### Backend

- [PHP](https://www.php.net/) for server-side programming.
- [Laravel](https://laravel.com/) for building a robust and powerful web application.
- [Laravel Sanctum](https://laravel.com/docs/sanctum) for authentication.
- [giggsey/libphonenumber-for-php](https://github.com/giggsey/libphonenumber-for-php) for phone number validation.
- [spatie/laravel-permission](https://github.com/spatie/laravel-permission) for role-based access control.

### Database

- [PostgreSQL](https://www.postgresql.org/) for data management.

### Other Libraries

- [React Router](https://reactrouter.com/) for routing.
- [React Query](https://tanstack.com/query/v4) for data fetching.
- [Swiper](https://swiperjs.com/) for carousel components.
- [React Hook Form](https://react-hook-form.com/) for form handling.
- [Zod](https://zod.dev/) for schema validation.
- [Axios](https://axios-http.com/) for API requests.
- [date-fns](https://date-fns.org/) for date formatting.
- [React Leaflet](https://react-leaflet.js.org/) for interactive maps.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js (24+)](https://nodejs.org/en/)
- [PHP, Composer and Laravel](https://laravel.com/docs/11.x#installing-php)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lucchesilorenzo/quickbite
   cd quickbite
   code .
   ```

2. **Install dependencies**:

   ```bash
   npm install && npm run install-all
   ```

3. **Configure frontend environment variables**:

   ```bash
   cd frontend
   ```

   Create a `.env` file at the root of the frontend project and copy what's in the `.env.example` file:

   ```bash
   VITE_APP_NAME="Order food from your favorite local restaurants | QuickBite"
   VITE_APP_DESCRIPTION="QuickBite lets you order food online from your favorite local restaurants with fast delivery and no hassle."
   VITE_BASE_URL="http://localhost:8000"
   VITE_LOCATIONIQ_API_KEY=your-api-key
   ```

4. **Create a PostgreSQL database with the name "quickbite"**.

5. **Configure backend environment variables**:

   ```bash
   cd ../backend
   ```

   Create a `.env` file at the root of the backend project and copy what's in the `.env.example` file. Then, configure your database connection details:

   ```bash
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=quickbite
   DB_USERNAME=quickbite
   DB_PASSWORD=quickbite
   ```

6. **Generate Laravel application key**:

   ```bash
   php artisan key:generate
   ```

7. **Create symlink for public folder**:

   ```bash
   php artisan storage:link
   ```

8. **Run database migrations and seed data**:

   ```bash
   php artisan migrate --seed
   ```

9. **Start both the frontend and backend**:

   ```bash
   cd .. && npm start
   ```

   The frontend will be running at [http://localhost:5173](http://localhost:5173).

## Roadmap

- Integrate Stripe for payment processing.
- Improve user experience and design.
- 🍽️ Partner
  - Manage restaurant profiles and menus.
  - Receive and update order statuses.
  - Track sales and manage availability.
- 🛵 Rider
  - View assigned delivery orders.
  - Update order pickup and delivery status.
  - Real-time notifications for new deliveries.

## Installation with Docker

### Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started/)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lucchesilorenzo/quickbite
   cd quickbite
   code .
   ```

2. **Install dependencies**:

   ```bash
   npm install && npm run install-all
   ```

3. **Configure frontend environment variables**:

   ```bash
   cd frontend
   ```

   Create a `.env` file at the root of the frontend project and copy what's in the `.env.example` file:

   ```bash
   VITE_APP_NAME="Order food from your favorite local restaurants | QuickBite"
   VITE_APP_DESCRIPTION="QuickBite lets you order food online from your favorite local restaurants with fast delivery and no hassle."
   VITE_BASE_URL="http://localhost:8000"
   VITE_LOCATIONIQ_API_KEY=your-api-key
   ```

4. **Configure backend environment variables**:

   ```bash
   cd ../backend
   ```

   Create a `.env` file at the root of the backend project and copy what's in the `.env.example` file. Then, configure your database connection details:

   ```bash
   DB_CONNECTION=pgsql
   DB_HOST=db
   DB_PORT=5432
   DB_DATABASE=quickbite
   DB_USERNAME=quickbite
   DB_PASSWORD=quickbite
   ```

5. **Generate the Laravel application key by running:**

   ```bash
   php artisan key:generate
   ```

6. **Start the containers with:**

   ```bash
   docker compose up
   ```

7. **Make migrations and seed data:**

   ```bash
   docker compose exec api php artisan migrate --seed
   ```

8. **Create symlink for public folder**:

   ```bash
   docker compose exec api php artisan storage:link
   ```

   If you've already created the symlink in the host machine, we first need to remove it and then create a new one:

   ```bash
   docker compose exec api rm public/storage && docker compose exec api php artisan storage:link
   ```

9. **Access the frontend at [http://localhost:5173](http://localhost:5173).**

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
