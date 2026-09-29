import express from "express";

import {
  createBooking,
  getAllBookings,
  getUserBookings,
} from "../controllers/booking.js";

import {
  verifyToken,
  verifyAdmin,
  verifyHotelAdmin,
} from "../utils/verifyToken.js";

const router = express.Router();

// CREATE BOOKING

router.post(
  "/",
  verifyToken,
  createBooking
);

// GET ALL BOOKINGS - HOTEL ADMIN

router.get(
  "/",
  verifyHotelAdmin,
  getAllBookings
);

// GET LOGGED-IN USER BOOKINGS

router.get(
  "/user",
  verifyToken,
  getUserBookings
);

export default router;