import { Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Spinner
      m={"0 auto"}
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};
