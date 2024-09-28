import express from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/commentController.js";

export const commentRoutes = express.Router();

commentRoutes.get("/", (req, res) => {
  res.send({ message: "welcome to home" });
});

// crear un comentario
commentRoutes.post("/create-comment/:id", validateAuth, createComment);

// eliminar un comentario
commentRoutes.delete(
  "/delete-comment/:idPublication/:idComment",
  validateAuth,
  deleteComment
);

// editar un comentario
commentRoutes.put(
  "/edit-comment/:idPublication/:idComment",
  validateAuth,
  editComment
);
