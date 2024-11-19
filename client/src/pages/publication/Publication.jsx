/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ModalPublication } from "../../components/modal-publication/ModalPublication";
import { ModalLikes } from "../../components/modal-likes/ModalLikes";
import { useDisclosure } from "@chakra-ui/react";
import { ModalComment } from "../../components/modal-comment/ModalComment";
import { PublicationMain } from "../../components/Publication-main/PublicationMain";
import { usePublication } from "../../hooks/usePublication";

export const Publication = () => {
  const { idpublication } = useParams();
  // hook para controlar los estados del modal de editar/eliminar publicacion
  const {
    isOpen: isOpenModalOptions,
    onOpen: onOpenModalOptions,
    onClose: onCloseModalOptions,
  } = useDisclosure();
  const showModalOptionsPublication = () => onOpenModalOptions();

  // hooks para controlar los estados del modal de editar/eliminar comentario
  const [commentSelect, setCommentSelect] = useState();
  const {
    isOpen: isOpenModalComment,
    onOpen: onOpenModalComment,
    onClose: onCloseModalComment,
  } = useDisclosure();

  const showModalComment = (comment) => {
    onOpenModalComment();
    setCommentSelect(comment);
  };

  // hook para controlar el estado del modal de los likes
  const {
    isOpen: isOpenModalLike,
    onOpen: onOpenModalLike,
    onClose: onCloseModalLike,
  } = useDisclosure();

  const showModalLikes = () => onOpenModalLike();

  const {
    publication,
    createCommentHandler,
    deleteCommentHandler,
    editCommentHandler,
    editPublicationHandler,
  } = usePublication(idpublication, onCloseModalOptions, onCloseModalComment);

  return (
    <>
      {publication && (
        <PublicationMain
          publication={publication}
          createComment={createCommentHandler}
          showModalOptionsPublication={showModalOptionsPublication}
          showModalComment={showModalComment}
          showModalLikes={showModalLikes}
        />
      )}
      {isOpenModalOptions && (
        <ModalPublication
          isOpen={isOpenModalOptions}
          onClose={onCloseModalOptions}
          publication={publication}
          editPublicationHandler={editPublicationHandler}
        />
      )}

      {isOpenModalComment && (
        <ModalComment
          isOpenModalComment={isOpenModalComment}
          onCloseModalComment={onCloseModalComment}
          commentSelect={commentSelect}
          deleteComent={deleteCommentHandler}
          editComment={editCommentHandler}
        />
      )}

      {isOpenModalLike && (
        <ModalLikes
          isOpen={isOpenModalLike}
          onClose={onCloseModalLike}
          idPublication={idpublication}
        />
      )}
    </>
  );
};
