import { validateImage } from "./validateImage";

export const processFormdata = (image, toast, objectData) => {
  const newFormData = new FormData();
  // console.log(image.file);
  if (image.file) {
    let response = validateImage(image.file);
    if (response) {
      toast({
        title: "error",
        description: response,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    // insertar imagen si existe y si es correcta
    newFormData.append("file", image.file);
  }
  // solo insertar el texto(que puede tern algo o nada)
  // aqui en vez de ponerle un valor quemado recibiremos como parametro un objeto
  // con propiedades a iterar para insertar en el formdata
  //newFormaData.append("content", value);
  for (let key in objectData) {
    newFormData.append(key, objectData[key]);
  }
  console.log(Object.fromEntries(newFormData));
  return newFormData;
};
