import express from "express";

import {
  createBooking,
  getAllBookings,
  getUserBookings,
} from "../controllers/booking.js";

import {
  verifyToken,
  verifyAdmin,
} from "../utils/verifyToken.js";

const router = express.Router();

// CREATE BOOKING
router.post("/", verifyToken, createBooking);

// GET ALL BOOKINGS - ADMIN
router.get("/", verifyToken, verifyAdmin, getAllBookings);

// GET LOGGED-IN USER BOOKINGS
router.get("/user", verifyToken, getUserBookings);

export default router;