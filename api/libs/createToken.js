import jwt from "jsonwebtoken";

export const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRETWORD, {
    expiresIn: "7d",
  });
  return token;
};
