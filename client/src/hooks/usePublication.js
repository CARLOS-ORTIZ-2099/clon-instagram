/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { editPublication, getPublication } from "../api/publication";
import { createComment, deletecomment, editComment } from "../api/comment";
import { useAuth } from "../context/AuthProvider";
import { debounce } from "../libs/debounce";
import { likePublication } from "../api/likePublication";

export const usePublication = (
  idpublication,
  onClosePublication,
  onCloseComment
) => {
  const { user } = useAuth();
  const [publication, setPublication] = useState({});
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
  const createCommentHandler = async (e, comment) => {
    e.preventDefault();
    if (comment.trim().length < 1) {
      alert("inserta un comentario");
      return;
    }
    try {
      const response = await createComment(idpublication, {
        content: comment,
        username: user.username,
      });
      //console.log(response);
      //console.log(publication);
      response.data.ownerComment.avatar = user.avatar;
      setPublication((previous) => ({
        ...previous,
        comments: [...previous.comments, response.data],
      }));
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // funcion para dar like o deslike
  const sendLikeHandler = async (id, boolean) => {
    console.log(id, boolean);
    // eliminar like
    if (boolean) {
      setPublication((previous) => {
        const data = previous.likes.filter((like) => like._id !== user._id);
        handlerLike(id, { action: "eliminar" });
        return { ...previous, likes: data };
      });
    }
    // crear like
    else {
      setPublication((previous) => {
        const data = { ...previous, likes: [...previous.likes, { ...user }] };
        handlerLike(id, { action: "crear" });
        return data;
      });
    }
  };
  async function petition(id, action) {
    const response = await likePublication(id, action);
    console.log(response);
  }
  const handlerLike = useCallback(debounce(petition, 500), []);

  // funcion para eliminar comentario
  const deleteCommentHandler = async (idComment) => {
    console.log(idComment, publication._id);
    try {
      const response = await deletecomment(publication._id, idComment);
      console.log(response);

      const updateComments = publication.comments.filter(
        (comment) => comment._id != response.data
      );
      setPublication({ ...publication, comments: updateComments });

      onCloseComment();
    } catch (error) {
      console.log(error);
    }
  };

  const editCommentHandler = async (e, idComment, data) => {
    e.preventDefault();
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
      setPublication({ ...publication, comments: editComments });
      onCloseComment();
    } catch (error) {
      console.log(error);
    }
  };

  const editPublicationHandler = async (id, fields) => {
    try {
      const {
        data: { body },
      } = await editPublication(id, fields);
      console.log(body);
      // modificar la publicacion que se edito
      setPublication((pr) => ({
        ...pr,
        content: body.content,
        file: body.file,
      }));
      alert("se edito correctamente");
      onClosePublication();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    publication,
    createCommentHandler,
    sendLikeHandler,
    deleteCommentHandler,
    editCommentHandler,
    editPublicationHandler,
  };
};
