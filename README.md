# Food Delivery Website (MERN Stack)

Welcome to the Food Delivery Website project! This is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse menus, order food, and manages the delivery process.

## 🚀 Features

-   **User Authentication**: Secure login and registration for users.
-   **Browse Menu**: View a variety of food items with images and descriptions.
-   **Shopping Cart**: Add items to the cart and manage orders.
-   **Order Placement**: Seamless checkout process.
-   **Admin Panel**: (If applicable) Manage food items and orders.
-   **Responsive Design**: optimized for both desktop and mobile devices.

## 🛠 Tech Stack

### Frontend
-   **React**: JavaScript library for building user interfaces.
-   **Vite**: Fast build tool and development server.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Context API**: State management for global application state (e.g., cart).

### Backend
-   **Node.js**: JavaScript runtime environment.
-   **Express**: Web application framework for Node.js.
-   **MongoDB**: NoSQL database for storing data.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JWT (JSON Web Tokens)**: Securely handling authentication.

## 📂 Project Structure

-   `frontend/`: Client-side React application.
-   `backend/`: Server-side Node.js/Express application.

## 🔧 Installation & Setup

### Prerequisites
-   Node.js installed on your machine.
-   MongoDB installed or a MongoDB Atlas account.

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "Food Delivery Website"
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your environment variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
(Add any other necessary variables)

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 📝 Usage

1.  Open your browser and navigate to `http://localhost:5173` (or the port Vite displays).
2.  Register a new account or log in.
3.  Browse the menu and add items to your cart.
4.  Proceed to checkout to place an order.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
