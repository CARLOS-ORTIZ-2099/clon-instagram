import { useState } from "react";

export const useButtonsActive = () => {
  console.log("entroooo");

  const [buttonsActive, setButtonsActive] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handlerComment = ({ target }) => {
    if (!buttonsActive && target.value.trim().length > 0) {
      setButtonsActive(target.id);
    } else if (buttonsActive && target.value.trim().length < 1) {
      setButtonsActive(null);
    }
  };

  const cleanButtons = () => setButtonsActive(null);
  const changeLoading = () => setLoadingBtn((previous) => !previous);

  return {
    handlerComment,
    buttonsActive,
    cleanButtons,
    loadingBtn,
    changeLoading,
  };
};
