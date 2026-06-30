
# Book A Doctor

A production-ready MERN stack healthcare appointment booking platform for patients and administrators.

## Features

- Patient registration and login with JWT authentication
- Doctor listing, search, profile details, and appointment booking
- Patient appointment history and cancellation
- Admin dashboard statistics
- Admin doctor CRUD with Multer profile image upload
- Admin appointment status management
- Dark, responsive healthcare UI

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router DOM, React Toastify, React Icons
- Backend: Node.js, Express.js, Mongoose, JWT, bcryptjs, Multer
- Database: MongoDB Atlas

## Project Structure

```text
client/     React application
server/     Express REST API
```

## Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Required backend environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
```

Create or update the first admin account:

```bash
npm run seed:admin
```

## Frontend Setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Required frontend environment variables:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `POST /api/doctors`
- `PUT /api/doctors/:id`
- `DELETE /api/doctors/:id`
- `POST /api/appointments`
- `GET /api/appointments/my`
- `GET /api/appointments`
- `GET /api/appointments/:id`
- `PUT /api/appointments/:id/status`
- `DELETE /api/appointments/:id`
- `GET /api/search/doctors`
- `GET /api/dashboard/admin`

## Upload Note

Doctor profile images are stored in `server/uploads` through Multer

## Testing Checklist

- Register, login, logout, and protected profile access
- Admin seed script and admin-only route protection
- Doctor CRUD and image upload validation
- Doctor listing, search, and details
- Appointment booking, history, cancellation, and admin status updates
- Dashboard aggregate statistics
- Mobile, tablet, and desktop layouts

## Deployment

Deploy `client/` to Vercel
- Deploy `backend/` to Render with the backend environment variables.
- Use MongoDB Atlas for the production database.
=======
# VIP-C2-N-MANISH

