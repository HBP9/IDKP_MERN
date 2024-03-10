const express = require("express");
const router = express.Router();
const Admins = require("../models/admins");
const data = require("../adminList.js");
const bcrypt = require("bcrypt");

router.use("/user", require("./user.js"));
router.use("/admin", require("./admin.js"));

// router.post("/seed", async (req, res) => {
//   try {
//     await Admins.deleteMany({});
//     const newAdmins = await Admins.insertMany(data.Admins);
//     return res.status(201).send({ newAdmins });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

router.post("/superadmin", async (req, res) => {
  const { username, password, restaurantName } = req.body;

  try {
    const existingUser = await Admins.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admins({
      username,
      password: hashedPassword,
      restaurantName,
    });
    await newAdmin.save();
    return res.status(201).send("Admin Added");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
