import express from "express";

import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailablity,
} from "../controllers/room.js";

import {
  verifyToken,
  verifyHotelAdmin,
} from "../utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM

router.post(
  "/:hotelId",
  verifyHotelAdmin,
  createRoom
);

// UPDATE ROOM

router.put(
  "/:id",
  verifyHotelAdmin,
  updateRoom
);

// UPDATE ROOM AVAILABILITY

router.put(
  "/availability/:id",
  updateRoomAvailablity
);

// DELETE ROOM

router.delete(
  "/:id/:hotelId",
  verifyHotelAdmin,
  deleteRoom
);

// GET SINGLE ROOM

router.get(
  "/:id",
  getRoom
);

// GET ALL ROOMS

router.get(
  "/",
  verifyHotelAdmin,
  getAllRooms
);

export default router;