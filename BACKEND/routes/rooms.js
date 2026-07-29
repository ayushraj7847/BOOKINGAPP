import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from "../controllers/room.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom);

// DELETE ROOM
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// GET SINGLE ROOM
router.get("/:id", getRoom);

// GET ALL ROOMS
router.get("/", getAllRooms);

export default router;