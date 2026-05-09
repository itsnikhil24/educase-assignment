const { pool } = require("../config/db");

const createSchool = async ({ name, address, latitude, longitude }) => {
  const [result] = await pool.query(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );
  return result;
};

const getAllSchools = async () => {
  const [rows] = await pool.query("SELECT * FROM schools");
  return rows;
};

module.exports = { createSchool, getAllSchools };