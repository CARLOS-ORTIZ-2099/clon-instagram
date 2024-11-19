/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { deletePublication } from "../../api/publication";
import { useNavigate } from "react-router-dom";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import { useButtonsActive } from "../../hooks/useButtonsActive";
import { processFormdata } from "../../libs/processFormdata";

export const ModalPublication = ({
  isOpen,
  onClose,
  publication,
  editPublicationHandler,
}) => {
  const { user } = useAuth();
  const [isEditPublication, setIsEditPublication] = useState(false);
  const { image, uploadPhoto } = useUploadPhoto();
  const { loadingBtn, changeLoading } = useButtonsActive();
  const navigate = useNavigate();
  const toast = useToast();

  const setEditPublication = (e) => {
    e.preventDefault();
    const newFormaData = processFormdata(image, toast, {
      content: e.target.content.value,
    });

    if (newFormaData) {
      editPublicationHandler(publication._id, newFormaData, changeLoading);
    }
  };

  const deletePublicationHandler = async (id) => {
    changeLoading();
    try {
      const data = await deletePublication(id);
      console.log(data);
      changeLoading();
      navigate("/home");
    } catch (error) {
      changeLoading();
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
            Publication
          </ModalHeader>
          <ModalCloseButton isDisabled={loadingBtn} />
          <ModalBody pb={6}>
            <Box>
              {!isEditPublication &&
                (user._id == publication.ownerPublication._id ? (
                  <Box display={"flex"} justifyContent={"space-around"}>
                    <Button
                      onClick={() => deletePublicationHandler(publication._id)}
                      colorScheme="red"
                      isLoading={loadingBtn}
                    >
                      eliminar
                    </Button>
                    <Button
                      isLoading={loadingBtn}
                      onClick={() => setIsEditPublication(true)}
                      colorScheme="blue"
                    >
                      editar
                    </Button>
                  </Box>
                ) : (
                  <Button colorScheme="orange">reportar</Button>
                ))}

              {isEditPublication && (
                <Box as="form" onSubmit={setEditPublication}>
                  <Image
                    src={image?.result || publication.file.secure_url}
                    alt="image"
                  />

                  <FormControl>
                    <FormLabel cursor="pointer" textAlign={"center"}>
                      <Input
                        type="file"
                        name="file"
                        multiple
                        onChange={uploadPhoto}
                        display="none"
                      />
                      <Box>
                        <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" />
                      </Box>
                      editar imagen
                    </FormLabel>
                  </FormControl>

                  <Textarea
                    name="content"
                    placeholder="escribe una descripcion..."
                    defaultValue={publication.content}
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
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
