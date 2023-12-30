const Admin = require("../models/admins");

module.exports.isAdmin = () => async (req, res, next) => {
  const checkAdmin = await Admin.findOne({ username: req.body.username });
  if (checkAdmin) {
    req.admin = checkAdmin;
    next();
  } else {
    return res.status(404).json({ error: "Admin not found" });
  }
};

module.exports.isAdminQuery = () => async (req, res, next) => {
  const checkAdmin = await Admin.findOne({ username: req.query.username });
  if (checkAdmin) {
    req.admin = checkAdmin;
    next();
  } else {
    return res.status(404).json({ error: "Admin not found" });
  }
};
