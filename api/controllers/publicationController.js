import { Publication } from "../models/Publication.js";
import { MyError } from "../error/MyError.js";
import { processImage } from "../libs/processImage.js";
import { deleteOneImageCloud, uploadStream } from "../libs/cloudinary.js";
import { Follower } from "../models/Follower.js";
import mongoose from "mongoose";

export const createPublication = async (req, res, next) => {
  try {
    // primero obtenemos el id el objeto user que se creo en el middleware de validacion,
    // este id sera el del usuario autenticado, servira para crear la propiedad dueño de publicacion
    const { id } = req.user;
    const { body } = req;
    const { file } = req;

    console.log(file);
    // corroboramos si el id no existe
    if (!id) {
      return next(new MyError(`no hay un id en la cookie ${id}`));
    }

    if (!file) return next(new MyError("el archivo es obligatorio"));

    // prosesar y guardar la imagen en cloudinary
    const processedImage = await processImage(file.buffer);
    const { secure_url, public_id } = await uploadStream(processedImage);

    // instanciamos el modelo Publication
    const newPublication = new Publication({
      ...body,
      ownerPublication: id,
      file: { secure_url, public_id },
    });

    await newPublication.save();
    res.send({ publicationCreated: newPublication });
  } catch (error) {
    console.log("entro aqui".red);
    next(error);
  }
};

export const deletePublication = async (req, res, next) => {
  try {
    // obtener el id de la publicacion que se quiere eliminar
    const { id } = req.params;

    // id de usuario autenticado
    const { id: idUser } = req.user;

    const publicationFound = await Publication.findById({ _id: id });
    if (!publicationFound) return next(new MyError("la publicacion no existe"));

    if (publicationFound.ownerPublication.toString() !== idUser) {
      return next(new MyError("usuario no autorizado"));
    }

    const resp = await Publication.findByIdAndDelete({ _id: id });

    // finalmente borra de cloudinary
    await deleteOneImageCloud(resp.file.public_id);

    res.sendStatus(204);
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const updatePublication = async (req, res, next) => {
  try {
    // capturar id de la publicacion que se quiere editar
    const { id } = req.params;
    const { file } = req;
    const { id: idUser } = req.user;
    let { body } = req;
    console.log(body);
    // buscar la publicacion
    const updatePublication = await Publication.findOne({ _id: id });

    if (!updatePublication) {
      return next(new MyError("la publicacion no existe"));
    }

    // comprobar que el que esta intentando editar la publicacion
    // sea el dueño de dicha publicacion
    if (updatePublication.ownerPublication.toString() !== idUser) {
      return next(new MyError("usuario no autorizado para actualizar"));
    }

    // luego comprobar si el usuario esta mandando una imagen para remplazar la actual
    if (file) {
      // procesar imagen y eliminar la imagen anterior de cloudinary
      const [processedImage] = await Promise.all([
        processImage(file.buffer),
        deleteOneImageCloud(updatePublication.file.public_id),
      ]);
      // guardar  en cloudinary
      const { secure_url, public_id } = await uploadStream(processedImage);

      // antes de nada debemos saber que el documento de publicacion se va a conformar por muchas propieddaes, pero las unicas que pueden cambiar seran la imagen y/o el contenido

      // luego remplazar la imagen anterior por la nueva imagen
      body = { ...body, file: { secure_url, public_id } };
    }

    await Publication.updateOne({ _id: id, ownerPublication: idUser }, body);

    !req.file ? (body = { ...body, file: updatePublication.file }) : "";

    res.send({ body });
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const getPublication = async (req, res, next) => {
  try {
    const { id } = req.params;
    // buscar en la db el id de la publicacion que se pase como parametro en la url
    const publicationFound = await Publication.findById({ _id: id })
      .populate({ path: "ownerPublication", select: "username" })
      .populate({
        path: "comments",
        populate: { path: "ownerComment", select: "username avatar" },
      });
    //.populate({ path: "likes", select: "-password" });

    if (!publicationFound) {
      return next(new MyError("la publicacion no existe intenta luego"));
    }
    res.send({ response: publicationFound });
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const getPublications = async (req, res, next) => {
  try {
    console.log(`documentos a saltar ${req.query.page}`);

    const { id } = req.user;
    // Aqui solo deberia obtener las publicaciones de las personas que sigo y las mias

    // primero obtener todos los usuarios que sigo(es decir donde yo sea el seguidor)
    const followeds = await Follower.find({ followerUser: id });
    // en este arreglo tendre los ids de los usuarios que sigo y de los cuales quiero obtner sus publicaciones
    const idsFolloweds = [];

    for (let element of followeds) {
      idsFolloweds.push(element.followedUser);
    }

    let _id = new mongoose.Types.ObjectId(id);

    idsFolloweds.push(_id);

    const skip = req.query.page || 0;
    const limit = 3;
    console.log(skip, limit);
    let getPublications = await Publication.find({
      ownerPublication: { $in: idsFolloweds },
    })
      .skip(skip)
      .limit(limit)
      .populate("ownerPublication", "username bio avatar");
    //.populate("likes", "-password");

    res.send({ publications: getPublications });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const explore = async (req, res, next) => {
  try {
    const { id } = req.user;
    // obtener todas las publicaciones exepto las mias
    let publications = await Publication.find({
      ownerPublication: { $ne: id },
    }).select("file comments likes");

    res.send({ publications, long: publications.length });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
