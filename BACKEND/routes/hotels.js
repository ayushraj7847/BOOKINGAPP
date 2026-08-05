import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";

const router = express.Router();

// CREATE
router.post("/", createHotel);

// UPDATE
router.put("/:id", updateHotel);

// DELETE
router.delete("/:id", deleteHotel);

// GET ONE HOTEL
router.get("/find/:id", getHotel);

// COUNT BY CITY
router.get("/countByCity", countByCity);

// COUNT BY TYPE
router.get("/countByType", countByType);

// GET ALL HOTELS
router.get("/", getAllHotel);

//GET ROOMS
router.get("/room/:id",getHotelRooms)

export default router;