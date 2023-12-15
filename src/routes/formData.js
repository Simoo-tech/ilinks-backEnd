const express = require("express");
const {
  createFormData,
  updateFormData,
  getformuserId,
  deleteFormData,
  getFormDatabyId,
} = require("../controllers/formDataController");
const router = express.Router();

router.post("/createData", createFormData);
router.put("/updateData", updateFormData);
router.put("/", getformuserId);
router.get("/:id", getFormDatabyId);
router.delete("/:id", deleteFormData);
module.exports = router;
