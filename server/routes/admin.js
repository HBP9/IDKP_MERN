const express = require("express");
const router = express.Router();
const Admin = require("../models/admins");
const Table = require("../models/tables");
const adminCheck = require("../middlewares/isAdmin");
const QRCode = require("qrcode");

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
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTables", adminCheck.isAdminQuery(), async (req, res) => {
  try {
    const tables = await Table.find({ adminId: req.admin._id });
    return res.status(200).json({ tables });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteTable", async (req, res) => {
  try {
    const table = await Table.findOneAndDelete({ _id: req.query._id });
    return res.status(200).json({ message: "Table Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/editTable", async (req, res) => {
  const { _id, updatedData } = req.body;
  try {
    const table = await Table.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Table Updated Successfully", updatedTable: table });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/generateQR", async (req, res) => {
  const { tableName, adminID } = req.query;
  // const qrData = { tableName, adminID };
  const qrOptions = {
    errorCorrectionLevel: "H",
    type: "png",
    quality: 0.95,
    margin: 1,
    color: {
      dark: "#000",
      light: "#FFF",
    },
  };

  try {
    const qrImage = await QRCode.toDataURL(
      `http://localhost:4000/getMenu?tableName=${tableName}&adminId=${adminID}`,
      qrOptions
    );
    return res.send({ qrImage }).status(200);
  } catch (error) {
    console.error("Error generating QR code:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
