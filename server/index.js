import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectionToDb } from "./database/connectionToDb.js";
import { notFound } from "./middlewares/notFound.js";
import { MyError } from "./error/MyError.js";
import { authRoutes } from "./routes/authRoutes.js";
import { publicationRoutes } from "./routes/publicationRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";
import { likeRoutes } from "./routes/likeRoutes.js";
import { followerRoutes } from "./routes/followerRoutes.js";

import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
// executing db
connectionToDb().catch((err) => console.log(err));

const app = express();

// middlewares that executing functionalities general

app.use(
  cors({ origin: "https://clon-instagram-1.onrender.com", credentials: true })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/uploads", express.static(findRoutes("uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/follower", followerRoutes);

// middleware thah handle the error when one route not exists

app.use(notFound);

// middleware thah handle errors in time execution of each route

app.use((err, req, res, next) => {
  // campo duplicado validado por mongo db
  if (err.code == "11000") {
    const keyData = Object.keys(err.keyValue)[0];
    res.status(500).send({ [keyData]: `${keyData} no valido` });
  }
  // errores personalizados mios
  else if (err instanceof MyError) {
    res.status(500).send({ message: err.message });
  }
  // errores de validacion de mongoose
  else if (err.errors) {
    const data = {};
    for (let key in err.errors) {
      console.log(key);
      data[key] = err.errors[key].message;
    }
    console.log(data);
    res.status(500).send(data);
  }
  // errores de validacion de mongoose
  else {
    res.send({ message: [err.message] });
  }
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
