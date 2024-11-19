import { Publication } from "../models/Publication.js";
import { MyError } from "../error/MyError.js";

export const addRemoveLike = async (req, res, next) => {
  try {
    // obtener el id guardado en el token del usuario autenticado actualmente
    const { id: idUser } = req.user;

    // capturar el id de la publicacion a la que se le va a dar el like
    const { id } = req.params;

    const { body } = req;
    console.log(body);

    // buscar la publicacion
    const publicationFound = await Publication.findById({ _id: id });

    let statusCode;

    // luego en el arreglo de likes de la publicacion ver si el id del usuario
    // que le sat dando like ya esta incluido o no
    const indexfound = publicationFound.likes.findIndex(
      (like) => like.toString() === idUser
    );
    if (indexfound < 0 && body.action === "crear") {
      // no existe like => crear
      // no existe el like debemos crearlo
      console.log(`entro a ${body.action}`);
      publicationFound.likes.push(idUser);
      statusCode = 201;
    } else if (indexfound >= 0 && body.action === "eliminar") {
      // existe like => eliminar
      // existe el like lo eliminamos
      console.log(`entro a ${body.action}`);
      publicationFound.likes.splice(indexfound, 1);
      statusCode = 204;
    }
    await publicationFound.save();

    res.status((statusCode = statusCode || 200)).send({ like: idUser });
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const getLikes = async (req, res, next) => {
  try {
    // capturar el id de la publicacion , esto para hacer una consulta relacionada a la catidad de likes relacionados a una publicacion
    const { id } = req.params;

    // hacer una consulta a la publicacion cuyos likes quiero obtener
    const publicationFound = await Publication.findById({ _id: id })
      .select("likes")
      .populate("likes", "-password");
    res.send(publicationFound);
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};
