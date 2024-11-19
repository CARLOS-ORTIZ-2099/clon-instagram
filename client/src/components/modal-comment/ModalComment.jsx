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
import { useButtonsActive } from "../../hooks/useButtonsActive";

export const ModalComment = ({
  isOpenModalComment,
  onCloseModalComment,
  commentSelect,
  deleteComent,
  editComment,
}) => {
  const { user } = useAuth();
  const [isEditComment, setIsEditComment] = useState(false);
  const { loadingBtn, changeLoading } = useButtonsActive();
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
          <ModalCloseButton isDisabled={loadingBtn} />
          <ModalBody pb={6}>
            {!isEditComment &&
              (user._id == commentSelect?.ownerComment?._id ? (
                <Box display={"flex"} justifyContent={"space-around"}>
                  <Button
                    isLoading={loadingBtn}
                    onClick={() =>
                      deleteComent(commentSelect?._id, changeLoading)
                    }
                    colorScheme="red"
                  >
                    eliminar
                  </Button>
                  <Button
                    isLoading={loadingBtn}
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
                  editComment(
                    e,
                    commentSelect._id,
                    e.target.content.value,
                    changeLoading
                  )
                }
              >
                <Textarea
                  name="content"
                  placeholder="escribe un comentario"
                  defaultValue={commentSelect.content}
                />
                <Button
                  isLoading={loadingBtn}
                  marginLeft={"40%"}
                  marginTop={2}
                  type="submit"
                >
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
