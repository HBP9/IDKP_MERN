const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Food", FoodSchema);
