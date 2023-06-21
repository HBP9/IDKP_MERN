const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

//middlewares
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use("/", require("./routes/index.js"));

//DB Connection
//tip for me never use special character in password mongo does not connect with special character it is percent encoded for example @ will be written as %40 while connecting same for other check mongo docs
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Is Connected Successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
});

//Server Working
app.listen(process.env.PORT, () => {
  console.log(`Server Running At Port ${process.env.PORT}`);
});
