const bcrypt = require("bcryptjs");
const { UserSc, ValCreateUser, ValLoginUser } = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
const jwi = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4, v4 } = require("uuid");

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
  let newUserEmail = await UserSc.findOne({ email });
  let newUserUserName = await UserSc.findOne({ username });

  if (newUserEmail) {
    return res.status(400).json({ message: "Email already registered" });
  } else if (newUserUserName) {
    return res.status(400).json({ message: "username already choosen" });
  }
  // new code generator
  const newCode = Math.floor(Math.random() * 900000) + 100000;
  // hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const hashPasswordCon = await bcrypt.hash(passwordcon, 10);
  const newUser = new UserSc({
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
    return res.status(400).json({ message: " Email not exist register first" });
  }
  passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    res.status(400).json({ message: "Password not valid" });
  }
  const token = jwi.sign({ id: user._id }, process.env.TOKEN_KEY);
  res.status(200).json({ token, userID: user._id, formData: user.formData });
});

/**
 * @desc reset password
 * @route /auth/reset-password
 * @method POST
 * @access public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, passwordcon } = req.body;
  const user = await UserSc.findById(req.params.id).select("email username");
  const userCheck = await UserSc.findOne({ email }).select("email");
  if (!userCheck) {
    res.status(404).json({ message: "email not valid" });
  }
  if (user.email !== userCheck.email) {
    res.status(404).json({ message: "email not valid" });
  }

  const newID = uuidv4();
  // details message
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `
    <!DOCTYPE html>
    <html>  
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>ilinks reset Passord confirmation</title>
    </head>
    <body>
      <div style="background-color: #eee; padding:5px 10px; height: 300px;">
        <h1 style="text-align: center; color:black ;">Hello, ${user.username} </h1>
        <h2 style="color:black ;">you recently requested to a new password </h2>
        <h3 style="line-height: 1.2; color:black ;">Please click link below to complete your new password request,<br />
          if you don't want to reset your password you can forget this message:<br /> <a
            href="https://ilinks-api.onrender.com/resetpassword/${newID}" style="font-size: 17px;"> https://ilinks-api.onrender.com/resetpassword/${newID}</a>
        </h3>
        <h3 style="color:black ;">Thanks,<br />
          Ilinks</h3>
      </div>
    </body>  
    </html>
    `,
  };
  // sent email
  await transporter.sendMail(mailOptions, async (err) => {
    if (err) {
      return res.status(404).json({ message: err, newID, user, userCheck });
    } else {
      return res.status(201).json({
        message: "email has sent",
        newID,
        user,
        userCheck,
      });
    }
  });
});
module.exports = { register, login, resetPassword };
