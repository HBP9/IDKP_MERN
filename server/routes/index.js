const express = require("express");
const router = express.Router();
const Admins = require("../models/admins");
const data = require("../adminList.js");

router.use("/user", require("./user.js"));
router.use("/admin", require("./admin.js"));

router.post("/seed", async (req, res) => {
  try {
    await Admins.deleteMany({});
    const newAdmins = await Admins.insertMany(data.Admins);
    return res.status(201).send({ newAdmins });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
