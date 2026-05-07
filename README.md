# Food Delivery App

A Zomato-style food delivery web app built with React, Express, MongoDB, and JWT authentication. This first version supports browsing restaurants, viewing menus, managing a cart, and placing cash-on-delivery orders.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Images: image URL fields now, Cloudinary can be added later
- Payment: not included yet

## Project Structure

```txt
client/   React app
server/   Express API
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/food-delivery
JWT_SECRET=replace-with-a-long-secret
CLIENT_URL=http://localhost:5173
AUTO_SEED=true
```

3. Start the app:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

If VS Code says the backend crashed with `EADDRINUSE` or `port: 5000`, another server is already running on port `5000`. Stop the old terminal/process first, or change `PORT` in `server/.env` and `VITE_API_URL` in `client/.env`.

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `GET /api/restaurants/:id/menu`
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:menuItemId`
- `DELETE /api/cart/items/:menuItemId`
- `POST /api/orders`
- `GET /api/orders/my-orders`
