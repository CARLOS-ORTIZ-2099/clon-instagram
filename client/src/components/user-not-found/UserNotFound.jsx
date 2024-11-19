/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";

export const UserNotFound = ({ message }) => {
  return (
    <Box
      /* border={"solid blue"} */
      minH={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text /* border={"solid red"} */ color="#63b3ed" fontSize={"x-large"}>
        {message} : (
      </Text>
    </Box>
  );
};
