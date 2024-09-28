import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// funcion para subir un solo archivo a cloudinary pero en streams
// esta funcion recibe un buffer
export const uploadStream = (buffer) => {
  return new Promise((resolve, reject) => {
    const config = { folder: process.env.NAME };

    const cloudinaryDone = (err, result) => {
      return err ? reject(err) : resolve(result);
    };

    cloudinary.uploader.upload_stream(config, cloudinaryDone).end(buffer);
  });
};

// funcion para subir un solo archivo a cloudinary
// esta recibe la ruta local en donde se encuentra la imagen

export const uploadImage = async (imagePath) => {
  const options = {
    // Establece el ID público en el nombre del archivo cargado
    // Un identificador de un activo almacenado en Cloudinary.
    use_filename: true,
    // si esta en false no aplica caracteres unicos a dicha imagen
    // si esta en true agrega caracteres unicos adicionales al nombre
    // que lo diferencien de otras imagenes que sean identicas
    unique_filename: true,
    // sobrescribe cualquier imagen con la misma ID pública al cargarla.
    // overwrite: true
    folder: process.env.NAME,
  };
  // el metodo upload de cloudinary recibe 2 parametros el primero es la ruta
  // de la imagen y el segundo es un objeto de configuracion que haga que por ejemplo
  // nuestro archivo tenga como id en cloudinary su nombre original
  return await cloudinary.uploader.upload(imagePath, options);
};

// funcion para eliminar un solo archivo de cloudinary
export const deleteOneImageCloud = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
// funcion para eliminar varios archivos de cloudinary
export const deleteAllImage = async (images) => {
  return await cloudinary.api.delete_resources(images);
};
