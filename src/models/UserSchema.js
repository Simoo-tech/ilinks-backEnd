const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 15,
      trim: true,
      match: /^[a-zA-Z0-9\_-]{3,15}$/,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minLenght: 8,
      maxLenght: 16,
      trim: true,
    },
    passwordcon: {
      type: String,
      required: true,
      minLenght: 8,
      maxLenght: 16,
      trim: true,
    },
    avatar: {
      type: String,
    },
    age: { type: Number },
    country: { type: String },
    state: { type: String },
    fname: { type: String, maxLenght: 30, trim: true },
    lname: { type: String, maxLenght: 30, trim: true },
    verifed: { type: Boolean, default: false },
    code: { type: Number, length: 6 },
    formData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "formData",
    },
  },

  { timestamps: true }
);

const UserSc = mongoose.model("user", userSchema);

function ValCreateUser(obj) {
  const schema = joi.object({
    username: joi
      .string()
      .trim()
      .min(3)
      .max(15)
      .required()
      .regex(/^[a-zA-Z0-9\_-]{3,15}$/)
      .messages({
        "string.min": `username must be at least 3 char`,
        "string.pattern.base":
          "username must be without spaces you can use (-,_)",
      }),
    email: joi
      .string()
      .trim()
      .required()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .message("email not valid"),
    password: joi
      .string()
      .trim()
      .min(8)
      .max(16)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]{8,30}$/
      )
      .messages({
        "string.min": `password must be at least 8 char`,
        "any.required": " is a required field",
        "object.regex": "invalid password",
        "string.pattern.base": "invalid password",
      }),
    passwordcon: joi.string().required().valid(joi.ref("password")).messages({
      "any.only": "Password not match",
    }),
  });
  return schema.validate(obj);
}
function ValLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().trim().min(8).max(16).required().messages({
      "string.min": `password must be at least 8 char`,
      "any.required": " is a required field",
      "object.regex": "invalid password",
      "string.pattern.base": "invalid password",
    }),
    formData: joi.string().trim(),
  });
  return schema.validate(obj);
}
function ValUpdateUser(obj) {
  const schema = joi.object({
    username: joi
      .string()
      .trim()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z0-9\_-]{3,15}$/)
      .messages({
        "string.min": `username must be at least 3 char`,
        "string.pattern.base":
          "username must be without spaces you can use (-,_)",
      })
      .required(),
    email: joi
      .string()
      .trim()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .message("email not valid"),
    avatar: joi.string().optional(),
    fname: joi.string().max(30).allow("").trim(),
    lname: joi.string().max(30).allow("").trim(),
    verifed: joi.bool().default(false),
    age: joi.number().integer(),
    state: joi.string().trim(),
    country: joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  UserSc,
  ValCreateUser,
  ValLoginUser,
  ValUpdateUser,
};
