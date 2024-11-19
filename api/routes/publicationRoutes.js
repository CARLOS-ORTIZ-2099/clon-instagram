import express from "express";
import {
  createPublication,
  deletePublication,
  explore,
  getPublication,
  getPublications,
  updatePublication,
} from "../controllers/publicationController.js";
import { multerMidSingleImage } from "../middlewares/multerMiddleware.js";
import { validateAuth } from "../middlewares/validateAuth.js";

export const publicationRoutes = express.Router();

publicationRoutes.get("/", (req, res) => {
  res.status(200).send({ message: "welcome to publication page" });
});

// crear publicacion
publicationRoutes.post(
  "/create-publication",
  validateAuth,
  multerMidSingleImage,
  createPublication
);

// eliminar publicacion
publicationRoutes.delete(
  "/delete-publication/:id",
  validateAuth,
  deletePublication
);

// editar publicacion
publicationRoutes.put(
  "/update-publication/:id",
  validateAuth,
  multerMidSingleImage,
  updatePublication
);

// obtener una publicacion en especifico
publicationRoutes.get("/get-publication/:id", validateAuth, getPublication);

// obtener todas las publicaciones
publicationRoutes.get("/get-publications", validateAuth, getPublications);

// encontrar publicaciones exepto las mias
publicationRoutes.get("/explore", validateAuth, explore);
