/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { editPublication, getPublication } from "../api/publication";
import { createComment, deletecomment, editComment } from "../api/comment";
import { useAuth } from "../context/AuthProvider";

export const usePublication = (
  idpublication,
  onClosePublication,
  onCloseComment
) => {
  const { user } = useAuth();
  const [publication, setPublication] = useState(null);
  useEffect(() => {
    getPublicationHandler(idpublication);
  }, []);
  // funcion para obtener la informacion de una publicacion en especifico
  const getPublicationHandler = async (id) => {
    try {
      const response = await getPublication(id);
      console.log(response);
      setPublication(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  // funcion para crear comentario
  // change y clean son funciones de un custom hook que se pasan como parametro a esta funcion estas se encargan de cambiar el estado
  // de loading a su valor opuesto y clean se encarga de resetear el estado de visibilidad
  // del boton de publicar
  const createCommentHandler = async (e, comment, change, clean) => {
    e.preventDefault();
    change(); // aqui
    try {
      const response = await createComment(idpublication, {
        content: comment,
        username: user.username,
      });
      change();
      clean();
      response.data.ownerComment.avatar = user.avatar;
      setPublication((previous) => ({
        ...previous,
        comments: [...previous.comments, response.data],
      }));
      e.target.reset();
    } catch (error) {
      change();
      console.log(error);
    }
  };

  const deleteCommentHandler = async (idComment, change) => {
    console.log(idComment, publication._id);
    change();
    try {
      const response = await deletecomment(publication._id, idComment);
      console.log(response);

      const updateComments = publication.comments.filter(
        (comment) => comment._id != response.data
      );
      change();
      setPublication({ ...publication, comments: updateComments });

      onCloseComment();
    } catch (error) {
      change();
      console.log(error);
    }
  };

  const editCommentHandler = async (e, idComment, data, change) => {
    e.preventDefault();
    change();
    try {
      // recibe el id de la publicacion, el id del comentario a editar y el valor a editar
      const response = await editComment(publication._id, idComment, {
        content: data,
      });
      console.log(response);
      console.log(publication);
      const editComments = publication.comments.map((comment) =>
        comment._id === idComment
          ? { ...comment, content: response.data.comment.content }
          : comment
      );
      change();
      setPublication({ ...publication, comments: editComments });
      onCloseComment();
    } catch (error) {
      change();
      console.log(error);
    }
  };

  const editPublicationHandler = async (id, fields, change) => {
    change();
    try {
      const {
        data: { body },
      } = await editPublication(id, fields);
      console.log(body);
      change();
      // modificar la publicacion que se edito
      setPublication((pr) => ({
        ...pr,
        content: body.content,
        file: body.file,
      }));
      alert("se edito correctamente");
      onClosePublication();
    } catch (error) {
      change();
      console.log(error);
      // aqui si se detecta un error como por ejemplo de que la imagen sea mas de 1mb
      // sacar un mensaje que indique dicho error
    }
  };

  return {
    publication,
    createCommentHandler,
    deleteCommentHandler,
    editCommentHandler,
    editPublicationHandler,
  };
};
