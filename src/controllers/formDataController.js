const { FormDataSc } = require("../models/formDataSchema");
const asyncHandler = require("express-async-handler");
const { UserSc } = require("../models/UserSchema");

/**
 * @desc create form data
 * @route /formdata/createData
 * @method POST
 * @access public
 */
const createFormData = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const user = await FormDataSc.findOne({ userID });
  if (user) {
    res.status(400).json({ message: "data already exists" });
  }
  const newFromData = new FormDataSc(req.body);
  await newFromData.save();
  res.status(200).json(newFromData);
});

/**
 * @desc get data by id
 * @route /formdata/:id
 * @method GET
 * @access public
 */
const getFormDatabyId = asyncHandler(async (req, res) => {
  const userFormData = await FormDataSc.findById(req.params.id).populate(
    "userID",
    ["username", "email", "lname", "fname"]
  );

  if (userFormData) {
    res.status(200).json(userFormData);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

/**
 * @desc update form data
 * @route /formdata/:id
 * @method PUT
 * @access public
 */
const updateFormData = asyncHandler(async (req, res) => {
  const formData = await FormDataSc.findByIdAndUpdate(
    req.body.formID,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ message: "data updated", formData });
});

/**
 * @desc delete form data
 * @route /formdata/:id
 * @method DELETE
 * @access public
 */
const deleteFormData = asyncHandler(async (req, res) => {
  const formData = await FormDataSc.findByIdAndDelete(req.params.id);
  if (!formData) {
    res.status(404).json({ message: "Form data not found" });
  }
  //  await FormDataSc.findByIdAndDelete(req.body.formData);
  res.status(200).json({ message: "form data deleted successfully" });
});

// get user and form data id
const getformuserId = asyncHandler(async (req, res) => {
  const formDataId = await FormDataSc.findById(req.body.formID);
  const user = await UserSc.findById(req.body.userID);
  user.formData = formDataId;
  await user.save();
  res.json({ formData: user.formData });
});

module.exports = {
  createFormData,
  updateFormData,
  getformuserId,
  deleteFormData,
  getFormDatabyId,
};
