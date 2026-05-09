# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. Supports adding schools and listing them sorted by proximity to a user-specified location using the Haversine formula.

---
# API Base URL (deployed): https://educase-assignment-97yg.onrender.com/

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
├── .env                    # Environment variable template
├── .gitignore
├── app.js                  # App entry point
├── package.json
└── package-lock.json
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

## ⚙️ Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [MySQL](https://www.mysql.com/) 

### 1. Clone the repository

```bash
git clone https://github.com/itsnikhil24/educase-assignment
cd educase-assignment
cd Backend
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
http://localhost:3000/
```

---

### `POST /api/addSchool`

Adds a new school to the database.

**Request Body** (`application/json`)

```json
{
  "name": "St Xavier School",
  "address": "Mohali",
  "latitude": 30.7046,
  "longitude": 76.7179
}
```

**Field Validation**

| Field | Type | Rules |
|---|---|---|
| `name` | String | Required, max 255 characters |
| `address` | String | Required, max 500 characters |
| `latitude` | Float | Required, between -90 and 90 |
| `longitude` | Float | Required, between -180 and 180 |

**Example POST Request**

```
   api/addSchool
```

**Success Response** `201 Created`

```json
{
    "success": true,
    "message": "School added successfully",
    "data": {
        "id": 3,
        "name": "St Xavier School",
        "address": "Mohali",
        "latitude": 30.7046,
        "longitude": 76.7179
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

**Example GET Request**

```
  api/listSchools?latitude=30.7333&longitude=76.7794
```

**Success Response** `200 OK`

```json
{
    "success": true,
    "count": 2,
    "user_location": {
        "latitude": 30.7333,
        "longitude": 76.7794
    },
    "data": [
        {
            "id": 1,
            "name": "Delhi Public School",
            "address": "Sector 45 Chandigarh",
            "latitude": 30.733299,
            "longitude": 76.779404,
            "created_at": "2026-05-08T03:53:26.000Z",
            "distance_km": 0
        },
        {
            "id": 2,
            "name": "St Xavier School",
            "address": "Mohali",
            "latitude": 30.704599,
            "longitude": 76.717903,
            "created_at": "2026-05-08T03:53:43.000Z",
            "distance_km": 6.69
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



## 🔒 Security Practices

- All database queries use **parameterised placeholders** (`?`) to prevent SQL injection.
- Input is validated and sanitised via `express-validator` before reaching the database.
- Sensitive credentials are stored in `.env` and never committed to the repository.

