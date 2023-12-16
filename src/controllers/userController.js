const { UserSc, ValUpdateUser } = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
/**
 * @desc get user by id
 * @route /user/:id
 * @method get
 * @access public
 */

const getUserById = asyncHandler(async (req, res) => {
  const user = await UserSc.findById(req.params.id).select(
    "-password -passwordcon "
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

/**
 * @desc update user
 * @route /user/:id
 * @method put
 * @access public
 */

const updateUserData = asyncHandler(async (req, res) => {
  const { error } = ValUpdateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0] });
  }

  const user = await UserSc.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        age: req.body.age,
        fname: req.body.fname,
        lname: req.body.lname,
        verifed: req.body.verifed,
        state: req.body.state,
        country: req.body.country,
        password: req.body.password,
        passwordcon: req.body.passwordcon,
      },
    },
    { new: true, runValidators: true }
  ).select("-password");

  res.status(201).json({ message: "data updated successfully", user });
});

/**
 * @desc delete user
 * @route /user/:id
 * @method delete
 * @access public
 */
const deleteUser = asyncHandler(async (req, res) => {
  let user = await UserSc.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user = await UserSc.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "account deleted" });
});
module.exports = { getUserById, updateUserData, deleteUser };
