import { useState } from "react";

export const useFormFields = (data = {}) => {
  const [fields, setFields] = useState(data);

  const handlerChange = ({ target }) => {
    setFields((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };

  return { fields, setFields, handlerChange };
};
