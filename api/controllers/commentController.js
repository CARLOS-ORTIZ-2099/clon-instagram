import { MyError } from "../error/MyError.js";
import { Publication } from "../models/Publication.js";

export const createComment = async (req, res, next) => {
  try {
    //id de usuario que crea comentario
    const { id: idUser } = req.user;
    // id de la publicacion a comentar
    const { id } = req.params;
    const { body } = req;

    console.log(body);

    // antes corroboramos en la db si existe la publicacion a comentar
    const publicationFound = await Publication.findById({ _id: id });
    if (!publicationFound) {
      return next(
        new MyError("no existe la publicacion que intentas comentar")
      );
    }
    publicationFound.comments.push({ ...body, ownerComment: idUser });
    await publicationFound.save();
    const lastComment =
      publicationFound.comments[publicationFound.comments.length - 1];
    res.send({
      ...lastComment._doc,
      ownerComment: { _id: idUser, username: body.username },
    });
    ///res.send(publicationFound.comments);
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    // id del usuario
    const { id: idUser } = req.user;
    // obtenemos el id del comentario a eliminar de los parametros
    const { idPublication, idComment } = req.params;

    // busco la publicacion donde esta el comentario a eliminar

    const publicationFound = await Publication.findById({ _id: idPublication });

    // luego eliminar del arreglo de comentarios aquel que coincida con el idComment

    publicationFound.comments = publicationFound.comments.filter(
      (comment) => comment._id.toString() !== idComment
    );
    await publicationFound.save();
    res.send(idComment);
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const { id: idUser } = req.user;
    // obtenemos el id del comentario de los parametros
    const { idPublication, idComment } = req.params;
    const { body } = req;

    // busco la publicacion donde esta el comentario a editar

    const publicationFound = await Publication.findById({ _id: idPublication });

    const commentFound = publicationFound.comments.find(
      (comment) => comment._id.toString() === idComment
    );
    if (!commentFound) {
      return next(new MyError("no existe el comentario", "not found", 404));
    }

    commentFound.content = body.content;
    await publicationFound.save();
    res.send({ comment: commentFound });
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};
