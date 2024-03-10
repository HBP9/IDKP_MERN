const express = require("express");
const router = express.Router();
const Admin = require("../models/admins");
const Table = require("../models/tables");
const Category = require("../models/categories");
const Food = require("../models/food");
const adminCheck = require("../middlewares/isAdmin");
const QRCode = require("qrcode");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send({
      status: "error",
      message: "Please Enter Valid Fields",
    });
  }

  const user = await Admin.findOne({ username });
  if (!user) {
    return res.send({
      status: "error",
      message: "Invalid Username or password",
    });
  }
  await bcrypt
    .compare(password, user.password)
    .then((result) => {
      if (result) {
        return res.send({ msg: "success", user: username });
      } else {
        return res.send({
          status: "error",
          message: "Invalid Username or Password",
        });
      }
    })
    .catch((err) => {
      return res.send({
        status: "error",
        message: err,
      });
    });
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

router.post("/addCategory", adminCheck.isAdmin(), async (req, res) => {
  const { categoryName } = req.body;
  try {
    const existingCategory = await Category.findOne({
      categoryName,
      adminId: req.admin._id,
    });

    if (existingCategory) {
      return res.status(409).json({ error: "Category Already Created" });
    }
    const newCategory = new Category({ categoryName, adminId: req.admin._id });
    await newCategory.save();
    return res.status(201).send("Category Created");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getCategories", adminCheck.isAdminQuery(), async (req, res) => {
  try {
    const categories = await Category.find({ adminId: req.admin._id });
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/editCategory", async (req, res) => {
  const { _id, updatedData } = req.body;
  try {
    const category = await Category.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
    return res.status(200).json({
      message: "Category Updated Successfully",
      updatedCategory: category,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteCategory", async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.query._id });
    return res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addMenu", adminCheck.isAdmin(), async (req, res) => {
  const { itemName, price, categoryId } = req.body;
  try {
    const existingItem = await Food.findOne({
      itemName,
      price,
      categoryId,
      adminId: req.admin._id,
    });

    if (existingItem) {
      return res.status(409).json({ error: "Food Item Already Exist" });
    }
    const newItem = new Food({
      itemName,
      price,
      categoryId,
      adminId: req.admin._id,
    });
    await newItem.save();
    return res.status(201).send("Item Added");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getItems", adminCheck.isAdminQuery(), async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    const items = await Food.find({ categoryId });
    if (items.length > 0) {
      res.json({ items });
    } else {
      res.status(404).json({ error: "No items found for the given category" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/editItem", async (req, res) => {
  const { _id, updatedData } = req.body;
  try {
    const item = await Food.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
    return res.status(200).json({
      message: "Item Updated Successfully",
      updatedItem: item,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteItem", async (req, res) => {
  try {
    const item = await Food.findOneAndDelete({ _id: req.query._id });
    return res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteItemsByCategory", async (req, res) => {
  try {
    const items = await Food.deleteMany({ categoryId: req.query.categoryId });
    return res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
