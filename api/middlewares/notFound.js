export const notFound = (req, res) => {
  res.status(404).send({ message: "page not found" });
};
