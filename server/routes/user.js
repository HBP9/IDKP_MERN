const express = require("express");
const router = express.Router();
const Admin = require("../models/admins");

router.get("/getRestaurantName", async (req, res) => {
  const { adminID } = req.query;
  try {
    const restaurant = await Admin.findOne({ adminID });
    return res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
