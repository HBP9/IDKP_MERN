const mongoose = require("mongoose");

const TableSchema = mongoose.Schema({
  tableName: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Tables", TableSchema);
