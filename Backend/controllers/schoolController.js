const { createSchool, getAllSchools } = require("../models/schoolModel");
const { getDistance } = require("../utils/distance");

// POST /addSchool
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const result = await createSchool({ name, address, latitude, longitude });

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: { id: result.insertId, name, address, latitude, longitude },
    });
  } catch (err) {
    console.error("addSchool error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const schools = await getAllSchools();

    const sorted = schools
      .map((s) => ({
        ...s,
        distance_km: parseFloat(
          getDistance(userLat, userLon, s.latitude, s.longitude).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count: sorted.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: sorted,
    });
  } catch (err) {
    console.error("listSchools error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addSchool, listSchools };