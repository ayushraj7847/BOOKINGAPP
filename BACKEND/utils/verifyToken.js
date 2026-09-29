import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// ===============================
// VERIFY NORMAL USER TOKEN
// ===============================

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log("TOKEN:", token);

  if (!token) {
    return next(
      createError(401, "You are not authenticated!")
    );
  }

  jwt.verify(
    token,
    process.env.JWT,
    (err, user) => {
      if (err) {
        return next(
          createError(403, "Token is not valid!")
        );
      }

      req.user = user;

      console.log(
        "USER FROM JWT:",
        req.user
      );

      next();
    }
  );
};


// ===============================
// VERIFY USER
// ===============================

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {

    if (
      req.user.id === req.params.id ||
      req.user.isAdmin === true
    ) {
      return next();
    }

    return next(
      createError(
        403,
        "You are not authorized!"
      )
    );
  });
};


// ===============================
// VERIFY NORMAL ADMIN
// ===============================

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {

    if (req.user.isAdmin === true) {
      return next();
    }

    return next(
      createError(
        403,
        "You are not authorized!"
      )
    );
  });
};


// ===============================
// VERIFY HOTEL ADMIN
// ===============================

export const verifyHotelAdmin = (
  req,
  res,
  next
) => {
  const token =
    req.cookies.hotel_admin_token;

  console.log(
    "HOTEL ADMIN TOKEN:",
    token
  );

  if (!token) {
    return next(
      createError(
        401,
        "Hotel admin is not authenticated!"
      )
    );
  }

  jwt.verify(
    token,
    process.env.JWT,
    (err, user) => {
      if (err) {
        return next(
          createError(
            403,
            "Hotel admin token is not valid!"
          )
        );
      }

      if (
        user.role !== "hotelAdmin" ||
        !user.hotelId ||
        user.isAdmin !== true
      ) {
        return next(
          createError(
            403,
            "Hotel admin access required!"
          )
        );
      }

      req.user = user;

      console.log(
        "HOTEL ADMIN FROM JWT:",
        req.user
      );

      next();
    }
  );
};