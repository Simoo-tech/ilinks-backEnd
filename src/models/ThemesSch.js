const mongoose = require("mongoose");

const Themes = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    likes: { type: Number },
  },
  { timestamps: true }
);

const ThemesSch = mongoose.model("themes", Themes);

module.exports = { ThemesSch };
