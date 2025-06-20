# Military Asset Management System

The Military Asset Management System is a secure, role-based platform designed to manage the movement, assignment, and expenditure of critical assets—such as vehicles, weapons, and ammunition—across multiple military bases. It improves logistical efficiency by providing a centralized interface for base commanders and logistics officers to monitor and control asset distribution. The system ensures operational transparency, accountability, and streamlined decision-making by enforcing strict role-based access and audit-friendly data handling.

---

## 🚀 Features & Roles

### 👤 Role-Based Access Control

- **Admin**
  - Create and manage military bases
  - Add and monitor assets across all bases
  - Full access to all system data

- **Base Commander**
  - Restricted to viewing assets of their assigned base only
  - Read-only access to asset assignments and inventory

- **Logistics Officer**
  - Purchase new assets
  - Transfer assets between different bases

---

## 🛠️ Technologies Used

### Backend:
- Node.js with Express for building RESTful APIs
- MongoDB with Mongoose for data storage
- JWT (JSON Web Token) for authentication
- CORS to enable frontend-backend communication
- MVC Architecture for separation of concerns

### Frontend:
- React for building a dynamic single-page interface
- Tailwind CSS for responsive design
- React Router for navigation
- Axios for handling API requests
- React Context API for global authentication state
- React Icons for UI enhancement
- HTML and CSS for structure and styling

---

## 📁 Project Structure

### Backend (`server/`)
```
server/
├── config/             # Mongoose DB connection
    ├── db.js             
├── controllers/        # Business logic per feature
    ├── AuthController.js
│   ├── BaseController.js
│   ├── PurchaseController.js
│   └── TransferController.js        
├── middleware/         # JWT & role-based access
    ├── AuthMiddleware.js         
├── models/             # Data models
│   ├── AuthModel.js
│   ├── BaseModel.js
│   ├── PurchaseModel.js
│   └── TransferModel.js
├── routes/             # Express Router-based APIs
    ├── AuthRoutes.js
│   ├── BaseRoutes.js
│   ├── PurchaseRoutes.js
│   └── TransferRoutes.js             
├── .env                # Secret keys and DB URI
└── server.js           # App entry point
```

### Frontend (`client/`)

```
client/
├── src/
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   └── Login.js
│   ├── components/
│   │   ├── Admin/
│   │   │   └── AdminDashboard.js
        │   └── BaseDetails.js
        │   └── BaseOfficer.js
│   │   ├── LogisticsOfficer/
│   │   │   └── LogisticsOfficerDashboard.js
│   │   │   └── transfer.js
│   │   │   └── Asset.js
│   │   │   └── Purchase.js
│   │   └── BaseCommander/
│   │       └── BaseCommanderDashboard.js
│   │       └── BaseAsset.js
│   ├── routes/      # Protected routes by role
│       └── ProtectedRoute.js     
│   ├── App.js
    └── index.css
│   └── index.js
├── public/
└── tailwind.config.js

```

---

## ⚙️ How It Works

- **Backend**
  - Connects to MongoDB using Mongoose
  - Builds APIs using Express and organizes them using Express Router
  - Protects routes using JWT-based authentication
  - Enforces role-based access with middleware
  - Follows the MVC pattern for scalability
  - Sends and receives data in JSON format

- **Frontend**
  - Built with React and styled using Tailwind CSS
  - Manages user sessions with JWTs stored in `localStorage`
  - Uses Context API for global state management (auth)
  - Protects routes based on user roles
  - Axios handles all communication with the backend
  - Responsive, single-page UI for seamless user experience

---

## ⚙️ Setup Instructions

### Backend
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=<your_mongo_uri>
# JWT_SECRET=<your_secret_key>
npm run dev

```

### Frontend

```
cd client
npm install
npm start      # Launches React app at http://localhost:3000

```


