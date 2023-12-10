const express = require("express");
const {
  createFormData,
  getFormData,
  updateFormData,
  getformuserId,
  deleteFormData,
  getFormDatabyId,
} = require("../controllers/formDataController");
const router = express.Router();

router.post("/createData", createFormData);
router.put("/updateData/:id", updateFormData);
router.put("/", getformuserId);
router.get("/:id", getFormDatabyId);
router.delete("/:id", deleteFormData);
module.exports = router;
