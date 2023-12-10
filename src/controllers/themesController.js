const asyncHandler = require("express-async-handler");
const { ThemesSch } = require("../models/ThemesSch");

/**
 * @desc get themes
 * @route /themes
 * @method get
 * @access public
 */
const getThemes = asyncHandler(async (req, res) => {
  const Themes = await ThemesSch.find();
  res.status(200).json({ message: "find all", Themes });
});
/**
 * @desc get theme by id
 * @route /themes/:id
 * @method get
 * @access public
 */
const getTheme = asyncHandler(async (req, res) => {
  const Theme = await ThemesSch.findById(req.params.id);

  res.status(200).json({ message: "find by id", Theme });
});

module.exports = { getTheme, getThemes };
