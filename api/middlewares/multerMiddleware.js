import { findRoutes } from "../libs/findRoutes.js";
import multer from "multer";
import ShortUniqueId from "short-unique-id";
import path from "path";

const uid = new ShortUniqueId({ length: 10 });

const location = findRoutes("/uploads");

let fileStorage;

// con esta configuracion le decimos a multer que suba el archivo
// en alguna parte de nuestra computadora
const configMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      cb(null, location);
    },

    filename: function (req, file, cb) {
      //console.log(file);
      cb(null, uid.rnd() + "-" + file.originalname);
    },
  })),

  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // aqui podemos poner todo tipo de logica para generar errores personalizados
    // y luego llamar a cb con un parametro de error
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("este no es un formato valido"));
  },
};

// con esta configuracion le decimos a multer que guarde los archivos en memoria
// de esta manera no almacenaremos nada en el local, pero esta vez ya no
// obtendremos una ruta para darsela a cloudinary
// en cambio obtendremos un buffer con los datos binarios del archivo
const storage = multer.memoryStorage();

// varios archivos
const upload = multer({ storage }).array("files", 10);
export const multerMid = function (req, res, next) {
  upload(req, res, function (err) {
    // errores de la instancia de multer
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(`${err}`.bgRed);
      return next("error de multer" /* new MyError(err) */);
    }
    // estos de aqui se ejecutaran para errores personalizados
    else if (err) {
      // An unknown error occurred when uploading.
      console.log(`${err}`.bgBlue);
      return next(err /* new MyError(err) */);
    }
    // res.status(201).send('received')
    // Everything went fine.
    next();
  });
};

// funcion filefilter
function fileFilter(req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // aqui podemos poner todo tipo de logica para generar errores personalizados
  // y luego llamar a cb con un parametro de error
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("este no es un formato valido"));
}

// un solo archivo
// aqui solo debemos permitir imagenes de maximo 1mb
const uploadSingleImage = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter,
}).single("file");

export const multerMidSingleImage = function (req, res, next) {
  uploadSingleImage(req, res, function (err) {
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .send({ image: "la imagen debe ser de maximo 1mb" });
    } else if (err instanceof multer.MulterError) {
      console.log(`${err}`.bgRed);
      return next("error de multer");
    } else if (err) {
      console.log(`${err}`.bgBlue);
      return res.status(400).send({ image: err.message });
    }
    next();
  });
};
