import express from "express";
import {
  editProfile,
  getProfile,
  login,
  logout,
  register,
  searchUser,
  verifyToken,
} from "../controllers/authController.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { multerMidSingleImage } from "../middlewares/multerMiddleware.js";
/* import { protegerRuta } from "../middlewares/validateAuth.js"; */

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
// ruta para consultar si hay un token existente
authRoutes.get("/verifyToken", verifyToken);
authRoutes.put(
  "/edit-profile/:id",
  multerMidSingleImage,
  validateAuth,
  editProfile
);

authRoutes.get("/profile/:username", validateAuth, getProfile);
authRoutes.get("/user-search", validateAuth, searchUser);
