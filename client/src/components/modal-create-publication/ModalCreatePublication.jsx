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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { createPublication } from "../../api/publication";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import { useState } from "react";

export const ModalCreatePublication = ({ isOpenCreate, onCloseCreate }) => {
  const { image, uploadPhoto } = useUploadPhoto();
  const [loading, setLoading] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    if (!image.file) {
      return alert("la imagen es obligatoria");
    }
    const formData = new FormData();
    formData.append("content", e.target.content.value);
    formData.append("file", image.file);
    //console.log(Object.fromEntries(formData));
    createPublicationHandler(formData);
  };
  const createPublicationHandler = async (formData) => {
    setLoading(true);
    try {
      const response = await createPublication(formData);
      console.log(response);
      alert("se creo correctamente");
      onCloseCreate();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpenCreate}
      onClose={onCloseCreate}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
          Crea una nueva publicación
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody pb={6}>
          <Box>
            <Box as="form" onSubmit={sendData}>
              {image?.result && <Image src={image.result} alt="image" />}

              <FormControl>
                <FormLabel cursor="pointer" textAlign={"center"}>
                  <Input
                    type="file"
                    name="file"
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
              />
              <Button
                isLoading={loading}
                marginLeft={"40%"}
                marginTop={2}
                type="submit"
              >
                crear
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
