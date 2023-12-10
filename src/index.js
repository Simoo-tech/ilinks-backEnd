const express = require("express");
const cors = require("cors");
const connectDB = require("../config/connetDB");
const path = require("path");
require("dotenv").config();
const app = express();

// connect to Database
connectDB();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.use(cors());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));
app.use("/formdata", require("./routes/formData"));
app.use("/themes", require("./routes/themes"));

app.listen(process.env.PORT, () => {
  console.log("server started", process.env.PORT);
});
