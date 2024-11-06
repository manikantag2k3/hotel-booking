
## Getting Started

Deployed Application : Hotel Booking app(https://hotel-booking-frontend-x4z6.onrender.com)

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/<USERNAME>/<REPOSITORY>.git
cd hotel-booking-project
```

2.Install dependencies for both frontend and backend:
cd backend
npm install
cd ../frontend
npm install

3.Set up environment variables:
Create a .env file in both the backend and frontend directories with the following variables:

Backend .env:
```
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>
JWT_SECRET_KEY=<your-jwt-secret-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
STRIPE_API_KEY=<your-stripe-api-key>
FRONTEND_URL=http://localhost:5173
```
Frontend .env:
```
VITE_API_BASE_URL=http://localhost:4000
VITE_STRIPE_PUB_KEY=<your-stripe-public-key>
```

Running the Application
Start the backend server:
cd backend
npm run dev

Start the frontend development server:
cd frontend
npm run dev

The application should now be running at http://localhost:5173.
