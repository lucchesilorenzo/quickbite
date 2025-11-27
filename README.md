<h1 align="center">
 <br />
   <img src="screenshots/quickbite-logo.png" alt="QuickBite Logo"  />
  <br />
     🍔 QuickBite
  <br />
</h1>

<h4 align="center">A food delivery platform connecting customers, restaurants, and delivery riders in a seamless and efficient way.</h4>

---

## ✨ Features

### 🔐 Authentication

- Secure login for customers, partners, and riders.
- Role-based access and permissions.

### 👤 Guest

- Search restaurants by location.
- Filter by ratings, offers, minimum order amount, and open status.
- Search by restaurant name, menu items, or categories.
- Sort by reviews, distance, delivery time, and costs.
- Explore an interactive map of nearby restaurants with markers and popups.
- View detailed restaurant profiles (contact info, ratings, delivery times/fees, menu).
- Add multiple items to the cart.

### 🛒 Customer

- All Guest features.
- Checkout and place orders.
- View order history and track status.

### 🍽️ Partner

- Update profile settings and notification preferences.
- Manage restaurant profile and settings.
- Dashboard with quick stats and reviews.
- Update contact info, delivery times, and fees.
- Add and manage menu categories and items.
- Manage offers and promotions.
- View and update order history and statuses.
- Access customer reviews and overall ratings.
- Gain insights with detailed analytics.
- Receive real-time notifications for new orders and reviews.
- Job post management system for hiring riders

### 🛵 Rider (coming soon)

- View assigned delivery orders.
- Update pickup and delivery status.
- Get real-time notifications for new deliveries.

### 🧩 Platform

- Multi-restaurant cart with efficient checkout.
- Responsive design for mobile and desktop.
- Real-time interactions.

---

## Tech Stack

### Frontend

- [TypeScript](https://www.typescriptlang.org/) for type safety.
- [React](https://reactjs.org/) for building the user interface.
- [Material UI](https://mui.com/material-ui/getting-started/) for UI components.

### Backend

- [PHP](https://www.php.net/) for server-side programming.
- [Laravel](https://laravel.com/) for building a robust and powerful web application.
- [Laravel Sanctum](https://laravel.com/docs/sanctum) for authentication.
- [Laravel Reverb](https://reverb.laravel.com/) for real-time interactions.
- [Laravel Telescope](https://laravel.com/docs/telescope) for monitoring and debugging.
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
- [React PDF](https://react-pdf.org/) for PDF generation.
- [dnd kit](https://dndkit.com/) for drag and drop functionality.
- [MUI TipTap](https://github.com/sjdemartini/mui-tiptap) for rich text editor.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js (24+)](https://nodejs.org/en/)
- [PHP, Composer and Laravel](https://laravel.com/docs/11.x#installing-php)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/get-started/) (optional)

### Environment Variables

Copy `.env.example` to `.env` in both `frontend` and `backend` and update the values.

Frontend (`frontend/.env`)

```bash
VITE_APP_NAME="Order food from your favorite local restaurants | QuickBite"
VITE_APP_DESCRIPTION="QuickBite lets you order food online from your favorite local restaurants with fast delivery and no hassle."
VITE_BASE_URL="http://localhost:8000"

VITE_LOCATIONIQ_API_KEY=

VITE_REVERB_APP_KEY=
VITE_REVERB_HOST="localhost"
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

Backend (`backend/.env`)

```bash
# Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1    # use 'db' when running inside Docker
DB_PORT=5432
DB_DATABASE=quickbite
DB_USERNAME=quickbite
DB_PASSWORD=quickbite

# Reverb
REVERB_APP_ID=
REVERB_APP_KEY=
REVERB_APP_SECRET=
REVERB_HOST="localhost"   # use 'reverb' when running inside Docker
REVERB_PORT=8080
REVERB_SCHEME=http
```

### Installation (Local)

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

3. **Create a PostgreSQL database with the name 'quickbite', or update the .env file to use an existing one**.

4. **Backend setup:**

   ```bash
   # Change directory to backend
   cd backend

   # Generate Laravel application key
   php artisan key:generate

   # Create symlink for public folder
   php artisan storage:link

   # Run migrations with seed data
   php artisan migrate --seed
   ```

5. **Start frontend and backend**:

   ```bash
   cd .. && npm start
   ```

The frontend will be running at [http://localhost:5173](http://localhost:5173).

## Installation with Docker

1. **Clone repository (if not already cloned)**:

   ```bash
   git clone https://github.com/lucchesilorenzo/quickbite
   cd quickbite
   code .
   ```

2. **Start containers:**

   ```bash
   docker compose up
   ```

3. **Run migrations with seed data:**

   ```bash
   docker compose exec api php artisan migrate --seed
   ```

The frontend will be running at [http://localhost:5173](http://localhost:5173).

## 📊 Data Models and Relationships

For detailed information about the database schema, models, and relationships, see the [Entity Relationship Diagram and Models](./docs/ERD.md).

## Roadmap

- OAuth integration for social media login.
- Reset password functionality.
- Integrate Stripe for payment processing.
- Add more tests.
- Improve user experience and design.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
