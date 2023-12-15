const mongoose = require("mongoose");
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
    githubUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    whatsappUrl: {
      type: Number,
    },
    youtubeUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    tiktokUrl: { type: String },
    morelinks: [
      {
        iconlink: { type: String, default: "null" },
        linkurl: { type: String, default: "null" },
        linkval: { type: String, default: "null" },
      },
    ],
    portfolio: [
      {
        imgformat: { type: String },
        imgname: { type: String },
        imgurl: { type: String },
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
    rate: {
      bad: { type: Boolean, default: false },
      middle: { type: Boolean, default: false },
      good: { type: Boolean, default: false },
    },
    message: { type: String },
  },
  { timestamps: true }
);

const FormDataSc = mongoose.model("formData", formData);

module.exports = {
  FormDataSc,
};
