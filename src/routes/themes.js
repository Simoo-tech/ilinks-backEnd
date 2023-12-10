const express = require("express");
const { getTheme, getThemes } = require("../controllers/themesController");
const router = express.Router();

router.get("/:id", getTheme);
router.get("/", getThemes);

module.exports = router;
