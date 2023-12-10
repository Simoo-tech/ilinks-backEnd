const express = require("express");
const {
  getUserById,
  updateUserData,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/userprofile/:id")
  .get(getUserById)
  .put(updateUserData)
  .delete(deleteUser);

module.exports = router;
