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
  verifyAdmin,
} from "../utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM

router.post("/:hotelId", verifyToken, verifyAdmin, createRoom);

// UPDATE ROOM

router.put("/:id", verifyToken, verifyAdmin, updateRoom);

// UPDATE ROOM AVAILABILITY

router.put("/availability/:id", updateRoomAvailablity);

// DELETE ROOM

router.delete("/:id/:hotelId", verifyToken, verifyAdmin, deleteRoom);

// GET SINGLE ROOM

router.get("/:id", getRoom);

// GET ALL ROOMS

router.get("/", getAllRooms);

export default router;