const express = require("express");
const router = express.Router();
const Admin = require("../models/admins");
const Table = require("../models/tables");
const adminCheck = require("../middlewares/isAdmin");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({
      status: "error",
      message: "Please Enter Valid Fields",
    });
  }

  const checkUsername = await Admin.findOne({ username });
  if (!checkUsername) {
    return res.send({ status: "error", message: "Invalid Username" });
  }

  const checkPassword = await Admin.findOne({ password });
  if (!checkPassword) {
    return res.send({ status: "error", message: "Invalid Password" });
  }

  return res.send({ msg: "success", user: username });
});

router.post("/addTable", adminCheck.isAdmin(), async (req, res) => {
  const { tableName } = req.body;
  try {
    const existingTable = await Table.findOne({
      tableName,
      adminId: req.admin._id,
    });

    if (existingTable) {
      return res.status(409).json({ error: "Table Already Created" });
    }
    const newTable = new Table({ tableName, adminId: req.admin._id });
    await newTable.save();
    return res.status(201).send("Table Added");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/getTables", adminCheck.isAdmin(), async (req, res) => {
//   try {
//     const tables = await Table.find({ adminId: req.admin._id });
//     return res.status(200).json({ tables });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
