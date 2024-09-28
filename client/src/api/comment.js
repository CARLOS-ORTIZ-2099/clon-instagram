import { instance } from "../libs/axiosConfig";

export const createComment = (id, data) =>
  instance.post("/comment/create-comment/" + id, data);

export const deletecomment = (idPublication, idComment) =>
  instance.delete("/comment/delete-comment/" + idPublication + "/" + idComment);

export const editComment = (idPublication, idComment, data) =>
  instance.put(
    "/comment/edit-comment/" + idPublication + "/" + idComment,
    data
  );
