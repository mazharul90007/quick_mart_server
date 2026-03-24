<p align="center">
  <a href="https://res.cloudinary.com/dp6urj3gj/image/upload/v1771919199/chemistBD_ltbdsg.png" target="blank"><img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1771919199/chemistBD_ltbdsg.png" width="240" alt="Express Logo" /></a>
</p>

  <p align="center">A professional pharmacy and medicine e-commerce scalable server-side application.</p>

# CHEMIST BD SERVER

**CHEMIST BD SERVER** is a full-featured backend API for a pharmacy e-commerce platform. The platform supports seamless medicine browsing, cart management, and order processing using modern backend technologies.

🌐 **Frontend Live URL:** [https://chemistbd-client.vercel.app](https://chemistbd-client.vercel.app)  
🌐 **Backend Live URL:** [https://chemist-bd-server.onrender.com](https://chemist-bd-server.onrender.com)  
🌐 **Frontend Github URL:** [https://github.com/mazharul90007/chemist-bd](https://github.com/mazharul90007/chemist-bd)  
📚 **API Documentation:** [Postman Documentation](https://documenter.getpostman.com/view/40157327/2sBXcGDKC2)

---

## 🚀 Features

### Role Based Authorization

[CUSTOMER, SELLER, ADMIN]

### Authentication with Better-Auth & JWT

- **Signup & Login** (PUBLIC)
- **Session Management** (AUTHENTICATED USER)
- **Email Verification** (CUSTOMER, SELLER)
- **Update Profile** (ALL LOGGEDIN USER)

### Medicine Management

- **Create Medicine** (SELLER, ADMIN)
- **Get all Medicines** (PUBLIC)
- **Get a Specific Medicine by Id** (PUBLIC)
- **Update a Specific Medicine** (SELLER)
- **Delete Medicine** (SELLER, ADMIN)

### Category Management

- **Create Category** (ADMIN)
- **Get All Categories** (PUBLIC)

### Cart Management

- **Add Item to Cart** (CUSTOMER)
- **Get My Cart** (CUSTOMER)
- **Update Cart Item Quantity** (CUSTOMER)
- **Remove Item from Cart** (CUSTOMER)

### Order Management

- **Create Order from Cart** (CUSTOMER)
- **Get My Orders** (CUSTOMER)
- **Get Seller-Specific Orders** (SELLER)
- **Update Order Status** (SELLER, ADMIN)
- **Cancel Order** (CUSTOMER)

---

## 🗂️ Entity Relationship Diagram (ERD)

<p align="center">
  <img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1771921155/chemistBd-erd_vgpt8y.png" alt="ChemistBD ER Diagram" width="700"/>
</p>

---

## 🛠 Technology Stack

### Backend Framework

- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **TypeScript** - Type-safe JavaScript

### Database

- **PostgreSQL** (Neon) - Relational database
- **Prisma** (v7.4.0) - ORM (Object–Relational Mapping) tool

### Authentication

- **Better-Auth** - Secure authentication and session management
- **JWT** - Secure token-based access

### Utilities & Security

- **Nodemailer** - Email service for notifications
- **Http-status** - Utility for HTTP status codes
- **Cors & Cookie-parser** - Middleware for security and cookie handling
- **Dotenv** - Environment variable management

### Deployment

- **Vercel** - Cloud deployment platform

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **PostgreSQL** database (local or remote/Neon)
- **Git**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mazharul90007/chemist-bd-server.git
cd chemist-bd-server
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with your variables (refer to `.env.example` if available):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/chemistbd"
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="http://localhost:4000"
APP_URL="http://localhost:3000"
APP_USER="your-email@gmail.com"
APP_PASS="your-app-password"
```

### 4. Database Setup

**Generate Prisma Client**

```bash
npx prisma generate
```

**Run Migrations**

```bash
npx prisma migrate dev --name init
```

### 5. Build the Project

```bash
npm run build
```

---

## 🎯 Usage Instructions

### Development Mode

Run the server in development mode with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or your configured PORT).

### Production Mode

1. Build the project:

```bash
npm run build
```

2. Start the server:

```bash
npm run start
```

---

## 🛣️ API Endpoints

### 🔑 Authentication (`/api/auth`)

- `POST /sign-up` - Register a new user.
- `POST /sign-in` - Authenticate and receive session.
- `GET /me` - Get current user profile (Authenticated).
- `GET /user/:id` - Get specific user details (Admin).

### 🏷️ Categories (`/api/v1/category`)

- `GET /` - List all categories (Public).
- `POST /` - Create a new category (Admin).

### 💊 Medicines (`/api/v1/medicine`)

- `GET /` - List all medicines with filters (Public).
- `GET /:id` - Get specific medicine details (Public).
- `POST /` - Create a new medicine listing (Seller/Admin).
- `GET /seller-medicines` - View my medicine listings (Seller).
- `PATCH /:id` - Update medicine data (Seller).
- `DELETE /:id` - Remove a medicine (Seller/Admin).

### 🛒 Cart (`/api/v1/cart`)

- `GET /` - View my persistent cart (Customer).
- `POST /add/:id` - Add medicine to cart (Customer).
- `PATCH /update-quantity/:id` - Change quantity (Customer).
- `DELETE /remove/:id` - Remove item from cart (Customer).

### 📦 Orders (`/api/v1/order`)

- `POST /create` - Place an order from cart (Customer).
- `GET /` - View my order history (Customer).
- `GET /all` - View all orders in system (Admin).
- `GET /seller-orders` - View orders for products I'm selling (Seller).
- `GET /:id` - Get specific order details (Customer).
- `PATCH /:id` - Update order status (Seller/Admin).
- `PATCH /cancel/:id` - Cancel an order (Customer).

### 🛡️ Admin (`/api/v1/admin`)

- `GET /users` - List all users (Admin).
- `PATCH /users/:id` - Update user status/block user (Admin).

---

## 📖 API Documentation

For detailed API documentation, request/response examples, and testing, visit:
**[Postman Documentation](https://documenter.getpostman.com/view/40157327/2sBXcGDKC2)**

---

## 📝 License

ISC

---

## 👤 Author

Mazharul Islam Sourabh

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## 📞 Support

For support, please contact the development team.
