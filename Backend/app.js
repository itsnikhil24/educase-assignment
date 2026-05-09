require("dotenv").config();
const express = require("express");
const { initDB } = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

// ── Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes 
app.use("/api", schoolRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "School Management API is running 🚀" }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});


const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialise database:", err);
    process.exit(1);
  });