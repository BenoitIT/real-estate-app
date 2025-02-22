# Property Booking System

A full-stack application that enables property booking with host and renter roles, built with modern web technologies.

## 🌟 Features

### Authentication
- Google OAuth Sign-in integration
- Role-based access control (Hosts & Renters)
- Secure session management
- PostgreSQL database for user data storage

### Property Management
- **For Hosts:**
  - Create, update, and delete property listings
  - Manage booking requests
  - Track property availability

- **For Renters:**
  - Browse available properties
  - Search and filter options
  - Make booking requests
  - View booking history

### Booking System
- Date-range selection for bookings
- Double-booking prevention
- Booking status management (Pending/Confirmed/Canceled)
- Real-time availability updates

## 🛠 Tech Stack

### Backend
- PostgreSQL
- Google OAuth 2.0
- TypeScript
- Prisma ORM
- Next.js 14
- Tailwind CSS
- TypeScript
- shadcn/ui components

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Google Cloud Console account (for OAuth)
- npm or yarn

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/BenoitIT/real-estate-app/
cd real-estate-ap
```

2. **Install dependencies**
```bash
npm install

3. **Environment Setup**

Create `.env` files in both backend and frontend directories.
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
GOOGLE_CLIENT_ID="your_client_id"
GOOGLE_CLIENT_SECRET="your_client_secret"
JWT_SECRET="your_jwt_secret"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_client_id"
```

4. **Database Setup**
```bash
cd Real-estate-app
npx prisma migrate dev
```

5. **Run the Application**

Backend:
```bash
cd Real-estate-app
npm run dev
```
## 🔐 Security Features

- JWT Authentication
- Input Validation

## 🚀 Deployment

The application can be deployed using platforms on Vercel




