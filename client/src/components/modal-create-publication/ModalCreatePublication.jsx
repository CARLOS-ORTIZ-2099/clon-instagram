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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { createPublication } from "../../api/publication";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import { useState } from "react";
import { processFormdata } from "../../libs/processFormdata";

export const ModalCreatePublication = ({ isOpenCreate, onCloseCreate }) => {
  const { image, uploadPhoto } = useUploadPhoto();
  const [loading, setLoading] = useState(false);
  // este  hook de chakra UI retorna una funcion
  const toast = useToast();

  const sendData = async (e) => {
    e.preventDefault();
    if (!image.file) {
      return toast({
        title: "Falta Imagen",
        description: "la imagen es obligatoria",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    // en este punto la imagen si existira
    // antes de hacer solicitud al servidor verificar que la imagen sea del tipo y tamaño correcto
    const formData = processFormdata(image, toast, {
      content: e.target.content.value,
    });
    if (formData) {
      createPublicationHandler(formData);
    }
  };
  const createPublicationHandler = async (formData) => {
    setLoading(true);
    try {
      const response = await createPublication(formData);
      //console.log(response);
      toast({
        title: "publicacion creada",
        description: "la publicacion se creo correctamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onCloseCreate();
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.response.data.image,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
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
