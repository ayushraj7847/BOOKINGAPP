import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//AUTHENTICATION
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//   res.send("hello user,you are logged in")
// });

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//   res.send("hello user,you are logged in and you can delete your account ")
// });

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//   res.send("hello admin ,you are logged in and you can delete all account ")
// });

// UPDATE USER
router.put("/:id",verifyUser, updateUser);

// DELETE USER
router.delete("/:id",verifyUser,deleteUser);

// GET SINGLE USER
router.get("/:id",verifyUser, getUser);

// GET ALL USERS
router.get("/",verifyAdmin, getAllUsers);

export default router;