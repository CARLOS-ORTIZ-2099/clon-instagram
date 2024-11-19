export function validateImage(image) {
  // aqui validamos el tipo
  let error = false;
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!validTypes.includes(image.type.toLowerCase())) {
    //console.log("inserta una imagen del tipo correcto");
    return (error = "inserta una imagen del tipo correcto");
  }

  // aqui validamos el tamaño
  else if (image.size > 1 * 1024 * 1024) {
    //console.log("inserta una imagen de maximo 1mb");
    return (error = "inserta una imagen de maximo 1mb");
  }

  return error;
}
