import express from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { addRemoveLike, getLikes } from "../controllers/likeController.js";

export const likeRoutes = express.Router();

likeRoutes.get("/", (req, res) => {
  res.send({ message: "welcome to home" });
});

// crear o remover un like para una publicacion
likeRoutes.post("/add-remove-like/:id", validateAuth, addRemoveLike);

// obtener likes de una determinada publicacion
likeRoutes.get("/get-likes/:id", validateAuth, getLikes);
