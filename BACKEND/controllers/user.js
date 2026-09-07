import User from "../models/User.js";

// ===============================
// UPDATE USER
// ===============================

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};


// ===============================
// DELETE USER
// ===============================



export const deleteUser = async (req, res, next) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User has been deleted",
    });

  } catch (err) {
    console.log("DELETE CONTROLLER ERROR:", err);
    next(err);
  }
};

// ===============================
// GET SINGLE USER
// ===============================

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// ===============================
// GET ALL USERS
// ===============================

export const getAllUsers = async (req, res, next) => {
  try {

    const users = await User.find();


    res.status(200).json(users);
  } catch (err) {
    console.log("GET USERS ERROR:", err);
    next(err);
  }
};