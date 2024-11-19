import { instance } from "../libs/axiosConfig";

export const likePublication = (idpublication, action) =>
  instance.post("/like/add-remove-like/" + idpublication, action);

export const getLikePublication = (idpublication) =>
  instance.get("/like/get-likes/" + idpublication);
