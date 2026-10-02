import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  // Check logged-in hotel admin
  if (!req.user?.hotelId) {
    return next(
      createError(
        401,
        "Hotel admin is not authenticated!"
      )
    );
  }

  // Prevent creating room for another hotel
  if (
    req.user.hotelId.toString() !==
    hotelId.toString()
  ) {
    return next(
      createError(
        403,
        "You can only create rooms for your own property!"
      )
    );
  }

  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};


// UPDATE ROOM
export const updateRoom = async (req, res, next) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return next(
        createError(
          401,
          "Hotel admin is not authenticated!"
        )
      );
    }

    // Check room belongs to logged-in hotel
    const hotel = await Hotel.findOne({
      _id: hotelId,
      rooms: req.params.id,
    });

    if (!hotel) {
      return next(
        createError(
          403,
          "You can only update rooms of your own property!"
        )
      );
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};


// UPDATE ROOM AVAILABILITY
export const updateRoomAvailablity = async (
  req,
  res,
  next
) => {
  try {
    const updatedRoom = await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates": {
            $each: req.body.dates,
          },
        },
      }
    );

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};


// DELETE ROOM
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    // Check logged-in hotel admin
    if (!req.user?.hotelId) {
      return next(
        createError(
          401,
          "Hotel admin is not authenticated!"
        )
      );
    }

    // Prevent deleting another hotel's room
    if (
      req.user.hotelId.toString() !==
      hotelId.toString()
    ) {
      return next(
        createError(
          403,
          "You can only delete rooms from your own property!"
        )
      );
    }

    // Check room belongs to this hotel
    const hotel = await Hotel.findOne({
      _id: hotelId,
      rooms: req.params.id,
    });

    if (!hotel) {
      return next(
        createError(
          403,
          "This room does not belong to your property!"
        )
      );
    }

    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};


// GET ROOM
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};


// GET ALL ROOMS
export const getAllRooms = async (req, res, next) => {
  try {
    const hotelId = req.user?.hotelId;

    // Hotel ID is required for hotel admin
    if (!hotelId) {
      return res.status(403).json({
        success: false,
        message: "Hotel information not found",
      });
    }

    // Get logged-in hotel's room IDs
    const hotel = await Hotel.findById(hotelId).select(
      "rooms"
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Get only rooms belonging to this hotel
    const rooms = await Room.find({
      _id: { $in: hotel.rooms || [] },
    });

    res.status(200).json(rooms);
  } catch (err) {
    console.log(
      "GET HOTEL ROOMS ERROR:",
      err
    );

    next(err);
  }
};