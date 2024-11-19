import { useState } from "react";

export const useFormFields = (data = {}) => {
  const [fields, setFields] = useState(data);

  const handlerChange = ({ target }) => {
    setFields((previous) => ({
      ...previous,
      [target.name]: target.value,
    }));
  };

  const cleanFields = (initial) => {
    setFields(initial);
  };

  return { fields, setFields, handlerChange, cleanFields };
};
