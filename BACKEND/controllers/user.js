import User from "../models/User.js";
import Booking from "../models/Booking.js";

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

    // Get logged-in hotel's ID
    const hotelId = req.user?.hotelId;

    // If hotel admin is not available
    if (!hotelId) {
      return res.status(403).json({
        success: false,
        message: "Hotel information not found",
      });
    }

    // Get users who have bookings in this hotel
    const userIds = await Booking.distinct("user", {
      hotel: hotelId,
    });

    // Get only those users
    const users = await User.find({
      _id: { $in: userIds },
    });

    res.status(200).json(users);

  } catch (err) {
    console.log("GET HOTEL USERS ERROR:", err);
    next(err);
  }
};