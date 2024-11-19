/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { likePublication } from "../api/likePublication";
import { debounce } from "../libs/debounce";

export const useLikes = (publication) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(publication.likes);

  const sendLike = async (id, boolean) => {
    if (boolean) {
      setLikes(likes.filter((like) => like !== user._id));
      handlerLike(id, { action: "eliminar" }); // ejecutar timer
      // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
    // crear like
    else {
      setLikes([...likes, user._id]);
      handlerLike(id, { action: "crear" }); // ejecutar timer
      // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
  };

  async function petition(id, action) {
    const response = await likePublication(id, action);
    console.log(response);
  }
  const handlerLike = useCallback(debounce(petition, 500), []);

  return {
    likes,
    sendLike,
  };
};
