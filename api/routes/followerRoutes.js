import express from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  deleteFollowed,
  followToUser,
  getFolloweds,
  getFollowers,
} from "../controllers/followerController.js";

export const followerRoutes = express.Router();

followerRoutes.get("/", (req, res) => {
  res.send({ message: "welcome" });
});

// seguir a un usuario
followerRoutes.post("/followToUser", validateAuth, followToUser);

// dejar de seguir a un usuario
followerRoutes.delete("/delete-followed/:id", validateAuth, deleteFollowed);

// obtener los seguidos de un usuario
followerRoutes.get("/get-followeds/:id?", validateAuth, getFolloweds);

// obtener los seguidores de un usuario
followerRoutes.get("/get-followers/:id?", validateAuth, getFollowers);
