/* eslint-disable react-hooks/exhaustive-deps */
import { CardPublication } from "../../components/card-publication/CardPublication";
import { Box, Spinner } from "@chakra-ui/react";
import { useShowPublications } from "../../hooks/useShowPublications";

export const Home = () => {
  const { publications, setPublications, hasMore, refButton } =
    useShowPublications();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {publications /* ?.slice(0,0)? */
        .map((publication) => (
          <CardPublication
            key={publication._id}
            publication={publication}
            setPublications={setPublications}
            publications={publications}
          />
        ))}
      {hasMore && (
        <Spinner
          ref={refButton}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </Box>
  );
};
