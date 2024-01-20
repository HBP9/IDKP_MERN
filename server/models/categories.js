const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Categories", CategoriesSchema);
