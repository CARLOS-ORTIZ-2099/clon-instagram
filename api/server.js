import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// importacion conexion a db
import { connectionToDb } from "./database/connectionToDb.js";
// importacion rutas
import { authRoutes } from "./routes/authRoutes.js";
import { publicationRoutes } from "./routes/publicationRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";
import { likeRoutes } from "./routes/likeRoutes.js";
import { followerRoutes } from "./routes/followerRoutes.js";
// importacion configuraciones
import { notFound } from "./middlewares/notFound.js";
import { MyError } from "./error/MyError.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// metodo que construye una ruta absoluta dada una serie de rutas
const __dirname = path.resolve();
console.log(__dirname);
console.log(path.join(__dirname, "/client/dist"));

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/follower", followerRoutes);

if (process.env.NODE_ENV === "production") {
  // si estamos en produccion se servira un archivo estatico que sera
  //el build que se haga de la carpeta client
  app.use(express.static(path.join(__dirname, "/client/dist")));
  // sirviendo desde cualquier ruta un archivo
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

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
    console.log(err);
    res.status(500).send({ message: [err.message] });
  }
});

// middleware thah handle the error when one route not exists
app.use(notFound);
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  // executing db
  connectionToDb();
});
