const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = 4000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extened: true }));
// app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/", (req, res) => {
  res.status(201).send("Backend Working");
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
// });

//Server Working
app.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});
