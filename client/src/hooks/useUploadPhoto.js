import { useState } from "react";

export const useUploadPhoto = () => {
  const [image, setImage] = useState({ file: "", result: "" });
  const uploadPhoto = (e) => {
    // creando la instancia del lector
    const reader = new FileReader();
    // capturando el archivo
    const file = e.target.files[0];
    console.log(file);

    // leyendo el archivo
    reader.readAsDataURL(file);
    // evento que se ejecuta cuando se termine de leer dicho archivo
    reader.addEventListener("load", (evt) => {
      //console.log(evt.target.result);
      setImage({ file, result: evt.target.result });
    });
  };

  return { image, uploadPhoto };
};
