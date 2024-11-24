import express from "express";
import {
  Login,
  Logout,
  Register,
  GetMyProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth,middleware.js";

const router = express.Router();

router.get("/me", protectedRoute, GetMyProfile);

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/updateProfile", protectedRoute, updateProfile);

export default router;
