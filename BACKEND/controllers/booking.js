import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const createBooking = async (req, res, next) => {
  try {
    const { hotelId, selectedRooms, dates } = req.body;

    if (!hotelId) {
      return res.status(400).json({
        message: "Hotel ID is required",
      });
    }

    if (!selectedRooms || selectedRooms.length === 0) {
      return res.status(400).json({
        message: "Please select at least one room",
      });
    }

    if (!dates || dates.length === 0) {
      return res.status(400).json({
        message: "Booking dates are required",
      });
    }

    const bookingRooms = [];
    let totalPrice = 0;

    for (const roomNumberId of selectedRooms) {
      const room = await Room.findOne({
        "roomNumbers._id": roomNumberId,
      });

      if (!room) {
        return res.status(404).json({
          message: "Room not found",
        });
      }

      const roomNumber = room.roomNumbers.id(roomNumberId);

      if (!roomNumber) {
        return res.status(404).json({
          message: "Room number not found",
        });
      }

      bookingRooms.push({
        roomId: room._id,
        roomNumber: roomNumber.number,
        price: room.price,
      });

      totalPrice += room.price * dates.length;
    }

    const booking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      rooms: bookingRooms,
      checkIn: new Date(dates[0]),
      checkOut: new Date(dates[dates.length - 1]),
      totalPrice,
    });

    const savedBooking = await booking.save();

    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email")
      .populate("hotel", "name city")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("hotel", "name city")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};