const express = require("express");
const router = express.Router();
const Admin = require("../models/admins");

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

module.exports = router;
