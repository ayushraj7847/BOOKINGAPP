import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import userRoute from "./routes/user.js";
import bookingRoute from "./routes/bookings.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(
  process.env.PORT || 8800,
  "0.0.0.0",
  () => {
    connect();
    console.log("Connected to backend");
  }
);