/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

export const ModalComment = ({
  isOpenModalComment,
  onCloseModalComment,
  commentSelect,
  deleteComent,
  editComment,
}) => {
  const { user } = useAuth();
  const [isEditComment, setIsEditComment] = useState(false);

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenModalComment}
        onClose={onCloseModalComment}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
            Comment
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!isEditComment &&
              (user._id == commentSelect?.ownerComment?._id ? (
                <Box display={"flex"} justifyContent={"space-around"}>
                  <Button
                    onClick={() => deleteComent(commentSelect?._id)}
                    colorScheme="red"
                  >
                    eliminar
                  </Button>
                  <Button
                    onClick={() => setIsEditComment(true)}
                    colorScheme="blue"
                  >
                    editar
                  </Button>
                </Box>
              ) : (
                <Button colorScheme="orange">reportar</Button>
              ))}

            {isEditComment && (
              <Box
                as="form"
                onSubmit={(e) =>
                  editComment(e, commentSelect._id, e.target.content.value)
                }
              >
                <Textarea
                  name="content"
                  placeholder="escribe un comentario"
                  defaultValue={commentSelect.content}
                />
                <Button marginLeft={"40%"} marginTop={2} type="submit">
                  editar
                </Button>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
