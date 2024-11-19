/* eslint-disable react/prop-types */
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link as reactRouterLink } from "react-router-dom";
import { Box, Link as ChakraLink, Image } from "@chakra-ui/react";

export const PublicationImage = ({ publication }) => {
  return (
    <ChakraLink
      as={reactRouterLink}
      to={"/p/" + publication._id}
      position={"relative"}
      h={"250px"}
      mt={"5px"}
      w={{ base: "80%", sm: "48%", md: "32%" }}
      _hover={{
        "& .overlay": {
          height: "100%",
          cursor: "pointer",
        },
      }}
    >
      <Image
        src={publication.file.secure_url}
        w={"100%"}
        h={"100%"}
        objectFit={"cover"}
      />
      <Box
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        bg={"rgba(77, 76, 76, 0.5)"}
        w={"100%"}
        overflow={"hidden"}
        transition={"1s ease"}
        display={"flex"}
        justifyContent={"space-around"}
        className="overlay"
      >
        <Box as="span" height={"0"} color={"white"} alignSelf={"center"}>
          <FontAwesomeIcon icon={faHeart} size="lg" />
          {publication.likes.length}
        </Box>
        <Box as="span" height={"0"} color={"white"} alignSelf={"center"}>
          <FontAwesomeIcon icon={faComment} size="lg" />
          {publication.comments.length}
        </Box>
      </Box>
    </ChakraLink>
  );
};
