const mongoose = require("mongoose");
const joi = require("joi");
const formData = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    about: {
      type: String,
      maxLength: 400,
    },
    image: {
      type: String,
    },
    imgname: { type: String },
    imgurl: { type: String },
    facebookUrl: {
      type: String,
    },
    GithubUrl: {
      type: String,
    },
    TwitterUrl: {
      type: String,
    },
    InstagramUrl: {
      type: String,
    },
    TelegramUrl: {
      type: String,
    },
    WhatsappUrl: {
      type: Number,
    },
    YoutubeUrl: {
      type: String,
    },
    LinkedinUrl: {
      type: String,
    },
    morelinks: [
      {
        iconlink: { type: String, default: "null" },
        linkurl: { type: String, default: "null" },
        linkval: { type: String, default: "null" },
      },
    ],
    portfolio: [
      {
        img: { type: String, default: "null" },
        porname: { type: String, default: "null" },
        prodesc: { type: String, default: "null" },
        porurl: { type: String, default: "null" },
      },
    ],
    skills: [
      {
        skillname: { type: String, default: "null" },
        skillperc: { type: String, default: "null" },
      },
    ],
  },
  { timestamps: true }
);

const FormDataSc = mongoose.model("formData", formData);

module.exports = {
  FormDataSc,
};
