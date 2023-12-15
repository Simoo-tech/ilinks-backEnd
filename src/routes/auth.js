const express = require("express");
const {
  register,
  login,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.post("/resetpassword/:id", resetPassword);

module.exports = router;
