import { instance } from "../libs/axiosConfig";

// recalcar que al igual que fetch en axios no hace falta establecer los encabezados indicando el
// tipo de dato que se enviara si este es un FormData
// axios tiene el beneficio que tampoco hace falta indicar el tipo de dato si lo que le enviamos
// es un json, axios lo detecta automaticamente

// el parametro page indica cuantas paginas(documentos) tendra que saltarse la consulta
export const getPublications = (page = 0) =>
  instance.get("/publication/get-publications?page=" + page);

export const createPublication = (data) =>
  instance.post("/publication/create-publication", data);

export const deletePublication = (id) =>
  instance.delete("/publication/delete-publication/" + id);

export const getPublication = (id) =>
  instance.get("/publication/get-publication/" + id);

export const editPublication = (id, body) =>
  instance.put("/publication/update-publication/" + id, body);

export const getPublicationsRandom = () => instance.get("/publication/explore");
