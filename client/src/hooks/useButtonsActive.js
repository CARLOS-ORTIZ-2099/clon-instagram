import { useState } from "react";

export const useButtonsActive = () => {
  const [buttonsActive, setButtonsActive] = useState({});

  const handlerComment = ({ target }) => {
    if (!buttonsActive[target.id] && target.value.trim().length > 0) {
      setButtonsActive({ ...buttonsActive, [target.id]: target.id });
    } else if (buttonsActive[target.id] && target.value.trim().length < 1) {
      const copy = { ...buttonsActive };
      delete copy[target.id];
      setButtonsActive(copy);
    }
  };

  const cleanButtons = () => setButtonsActive({});

  return {
    handlerComment,
    buttonsActive,
    cleanButtons,
  };
};
