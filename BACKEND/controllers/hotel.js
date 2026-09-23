import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import mongoose from "mongoose";

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(
      req.body.adminPassword,
      10
    );

    const newHotel = new Hotel({
      ...req.body,
      adminPassword: hashedPassword,
    });

    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};


// HOTEL ADMIN LOGIN
export const hotelAdminLogin = async (
  req,
  res,
  next
) => {
  try {
    const { hotel, password } = req.body;

    // Check login fields
    if (!hotel || !password) {
      return res.status(400).json({
        message:
          "Hotel ID/Name and password are required",
      });
    }

    let foundHotel;

    // Login using Hotel ID
    if (mongoose.isValidObjectId(hotel)) {
      foundHotel = await Hotel.findById(hotel).select(
        "+adminPassword"
      );
    }

    // Login using Hotel Name
    if (!foundHotel) {
      foundHotel = await Hotel.findOne({
        name: {
          $regex: `^${hotel.trim()}$`,
          $options: "i",
        },
      }).select("+adminPassword");
    }

    // Hotel not found
    if (!foundHotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    // Password check
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        foundHotel.adminPassword
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect hotel password",
      });
    }

    // Create hotel admin token
    const token = JsonWebToken.sign(
      {
        hotelId: foundHotel._id.toString(),
        role: "hotelAdmin",
        isAdmin: true,
      },
      process.env.JWT
    );

    const isProduction =
      process.env.NODE_ENV === "production";

    // Login cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction
          ? "none"
          : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        details: {
          hotelId: foundHotel._id,
          hotelName: foundHotel.name,
        },
        isAdmin: true,
      });
  } catch (err) {
    next(err);
  }
};


// UPDATE HOTEL
export const updateHotel = async (
  req,
  res,
  next
) => {
  try {
    const updateHotel =
      await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};


// DELETE HOTEL
export const deleteHotel = async (
  req,
  res,
  next
) => {
  try {
    await Hotel.findByIdAndDelete(
      req.params.id
    );

    res
      .status(200)
      .json("hotel has been deleted");
  } catch (err) {
    next(err);
  }
};


// GET HOTEL
export const getHotel = async (
  req,
  res,
  next
) => {
  try {
    const hotel = await Hotel.findById(
      req.params.id
    );

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};


// GET ALL HOTEL
export const getAllHotel = async (
  req,
  res,
  next
) => {
  try {
    const {
      featured,
      limit,
      min,
      max,
      city,
      ...others
    } = req.query;

    const filter = { ...others };

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (city) {
      filter.city = {
        $regex: `^${city.trim()}$`,
        $options: "i",
      };
    }

    const hotels = await Hotel.find({
      ...filter,
      cheapestPrice: {
        $gt: Number(min) || 1,
        $lt: Number(max) || 999999,
      },
    }).limit(Number(limit) || 0);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (
  req,
  res,
  next
) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) =>
        Hotel.countDocuments({
          city: {
            $regex: `^${city}$`,
            $options: "i",
          },
        })
      )
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


// COUNT BY TYPE
export const countByType = async (
  req,
  res,
  next
) => {
  try {
    const hotelCount =
      await Hotel.countDocuments({
        type: "hotel",
      });

    const apartmentCount =
      await Hotel.countDocuments({
        type: "apartment",
      });

    const resortCount =
      await Hotel.countDocuments({
        type: "resort",
      });

    const villaCount =
      await Hotel.countDocuments({
        type: "villa",
      });

    const cabinCount =
      await Hotel.countDocuments({
        type: "cabin",
      });

    const cottageCount =
      await Hotel.countDocuments({
        type: "cottage",
      });

    const hostelCount =
      await Hotel.countDocuments({
        type: "hostel",
      });

    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
      {
        type: "cottage",
        count: cottageCount,
      },
      {
        type: "hostel",
        count: hostelCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};


// GET HOTEL ROOMS
export const getHotelRooms = async (
  req,
  res,
  next
) => {
  try {
    const hotel = await Hotel.findById(
      req.params.id
    );

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};