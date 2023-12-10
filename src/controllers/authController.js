const bcrypt = require("bcryptjs");
const { UserSc, ValCreateUser, ValLoginUser } = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
const jwi = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// NODEMAILER STUFF
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

/**
 * @desc create a new user
 * @route /auth/register
 * @method POST
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  const { username, email, password, passwordcon, avatar, verifed } = req.body;
  const { error } = ValCreateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // check email
  let newUser = await UserSc.findOne({ email });
  if (newUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const newCode = Math.floor(Math.random() * 900000) + 100000;

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const hashPasswordCon = await bcrypt.hash(passwordcon, 10);
  newUser = new UserSc({
    username,
    email,
    password: hashPassword,
    passwordcon: hashPasswordCon,
    avatar,
    verifed,
    code: newCode,
  });
  const token = jwi.sign({ id: newUser._id }, process.env.TOKEN_KEY);

  // details message
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h3>Verify Your Email</h3>
      <p>your code is ${newCode}</p>`,
  };
  // sent email
  await transporter.sendMail(mailOptions, async (err) => {
    if (err) {
      return res.status(404).json({ message: err });
    } else {
      await newUser.save();
      return res.status(201).json({
        message: "email has sent",
        newUser,
        userId: newUser._id,
        token,
      });
    }
  });
});

/**
 * @desc login
 * @route /auth/login
 * @method POST
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = ValLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // check email is exist
  let user = await UserSc.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Email not existed register first" });
  }
  passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    res.status(400).json({ message: "Password not valid" });
  }
  const token = jwi.sign({ id: user._id }, process.env.TOKEN_KEY);
  res.status(200).json({ token, userID: user._id, formData: user.formData });
});

module.exports = { register, login };
