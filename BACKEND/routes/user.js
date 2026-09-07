import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();


// AUTH CHECK
router.get(
  "/checkauthentication",
  verifyToken,
  (req, res) => {
    res.send("Hello user, you are logged in");
  }
);


// USER CHECK
router.get(
  "/checkuser/:id",
  verifyToken,
  verifyUser,
  (req, res) => {
    res.send("Hello user");
  }
);


// ADMIN CHECK
router.get(
  "/checkadmin",
  verifyToken,
  verifyAdmin,
  (req, res) => {
    res.send("Hello admin");
  }
);


// GET ALL USERS
router.get("/", getAllUsers);


// UPDATE USER
router.put(
  "/:id",
  verifyToken,
  verifyUser,
  updateUser
);


// DELETE USER
router.delete("/:id", verifyUser, deleteUser);


// GET SINGLE USER
router.get(
  "/:id",
  verifyToken,
  verifyUser,
  getUser
);


export default router;