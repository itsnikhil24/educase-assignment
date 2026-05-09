# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. Supports adding schools and listing them sorted by proximity to a user-specified location using the Haversine formula.

---

## 📁 Project Structure

```
school-management-api/
├── config/
│   └── db.js               # MySQL connection pool & DB initialisation
├── controllers/
│   └── schoolController.js # Request handlers (business logic)
├── middlewares/
│   └── validate.js         # Input validation rules (express-validator)
├── models/
│   └── schoolModel.js      # Database queries
├── routes/
│   └── schoolRoutes.js     # API route definitions
├── utils/
│   └── distance.js         # Haversine distance calculator
├── .env.example            # Environment variable template
├── .gitignore
├── app.js                  # App entry point
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL (mysql2/promise) |
| Validation | express-validator |
| Environment | dotenv |
| Dev Server | nodemon |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables


Open `.env` and fill in your MySQL credentials:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

### 4. Create the database

Log into MySQL and run:

```sql
CREATE DATABASE school_management;
```

> **Note:** The `schools` table is created **automatically** when the server starts. No separate migration needed.

### 5. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`.

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### `POST /api/addSchool`

Adds a new school to the database.

**Request Body** (`application/json`)

```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram, Haryana",
  "latitude": 28.4089,
  "longitude": 77.0325
}
```

**Field Validation**

| Field | Type | Rules |
|---|---|---|
| `name` | String | Required, max 255 characters |
| `address` | String | Required, max 500 characters |
| `latitude` | Float | Required, between -90 and 90 |
| `longitude` | Float | Required, between -180 and 180 |

**Success Response** `201 Created`

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Gurugram, Haryana",
    "latitude": 28.4089,
    "longitude": 77.0325
  }
}
```

**Validation Error Response** `422 Unprocessable Entity`

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

---

### `GET /api/listSchools`

Fetches all schools sorted by distance from the user's location.

**Query Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `latitude` | Float | ✅ | User's latitude (-90 to 90) |
| `longitude` | Float | ✅ | User's longitude (-180 to 180) |

**Example Request**

```
GET /api/listSchools?latitude=28.6139&longitude=77.2090
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "count": 2,
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "data": [
    {
      "id": 2,
      "name": "Closest School",
      "address": "MG Road, New Delhi",
      "latitude": 28.6200,
      "longitude": 77.2100,
      "distance_km": 0.87
    },
    {
      "id": 1,
      "name": "Farther School",
      "address": "Sector 45, Gurugram, Haryana",
      "latitude": 28.4089,
      "longitude": 77.0325,
      "distance_km": 24.13
    }
  ]
}
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE IF NOT EXISTS schools (
  id          INT           AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT(10, 6)  NOT NULL,
  longitude   FLOAT(10, 6)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📐 Distance Calculation

Proximity sorting uses the **Haversine formula**, which calculates the great-circle distance between two points on Earth's surface given their latitude and longitude. This accounts for the curvature of the Earth and gives accurate real-world distances in kilometres.

---

## 🧪 Testing with Postman

1. Import the `postman_collection.json` file from the repository into Postman.
2. Set the `base_url` collection variable to your server URL (default: `http://localhost:3000/api`).
3. The collection includes the following requests:
   - ✅ Add School (valid payload)
   - ❌ Add School — Validation Error
   - ✅ List Schools by Proximity
   - ❌ List Schools — Missing Params

---

## 🚀 Deployment

This API can be deployed to any Node.js hosting provider. Recommended options:

| Platform | Database |
|---|---|
| [Railway](https://railway.app) | Built-in MySQL plugin |
| [Render](https://render.com) | [Aiven](https://aiven.io) (free MySQL) |
| [Cyclic](https://cyclic.sh) | [PlanetScale](https://planetscale.com) (free MySQL) |

After deploying, update the `base_url` variable in your Postman collection to your live URL.

---

## 🔒 Security Practices

- All database queries use **parameterised placeholders** (`?`) to prevent SQL injection.
- Input is validated and sanitised via `express-validator` before reaching the database.
- Sensitive credentials are stored in `.env` and never committed to the repository.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).