import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return next(
        createError(400, "Username already exists")
      );
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(
      req.body.password,
      salt
    );

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const savedUser = await newUser.save();

    const token = JsonWebToken.sign(
      {
        id: savedUser._id.toString(),
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT
    );

    const {
      password,
      isAdmin,
      ...otherDetails
    } = savedUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        details: {
          ...otherDetails,
        },
        isAdmin,
      });

  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return next(createError(404, "user not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(
        createError(400, "incorrect password or username")
      );
    }

    const token = JsonWebToken.sign(
      {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        details: {
          ...otherDetails,
        },
        isAdmin,
      });
  } catch (err) {
    next(err);
  }
};