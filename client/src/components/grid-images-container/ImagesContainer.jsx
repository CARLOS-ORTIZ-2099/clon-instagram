/* eslint-disable react/prop-types */

import { Box } from "@chakra-ui/react";

export const ImagesContainer = ({ children }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      flexWrap={"wrap"}
      w={{ base: "98%", md: "90%", lg: "60%" }}
      m={"auto"}
    >
      {children}
    </Box>
  );
};
