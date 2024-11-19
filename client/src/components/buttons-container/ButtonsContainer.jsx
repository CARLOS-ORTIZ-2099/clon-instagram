/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Text } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/AuthProvider";
import {
  faHeart as whiteHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { useLikes } from "../../hooks/useLikes";

export const ButtonsContainer = ({ publication, showModalLikes }) => {
  const { likes, sendLike } = useLikes(publication);
  const { user } = useAuth();
  function buttonLike() {
    return likes?.find((lk) => lk === user._id) ? (
      <Button
        variant="ghost"
        mt={"10"}
        onClick={() => sendLike(publication._id, true)}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "#ef1f1f" }}
          size="xl"
        />
      </Button>
    ) : (
      <Button
        variant="ghost"
        mt={"10"}
        onClick={() => sendLike(publication._id, false)}
      >
        <FontAwesomeIcon icon={whiteHeart} size="xl" />
      </Button>
    );
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        {buttonLike()}
        <Button mt={"10"} variant="ghost">
          <FontAwesomeIcon icon={faComment} size="xl" />
        </Button>
      </Box>

      <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
        <Text onClick={showModalLikes} cursor={"pointer"}>
          {likes?.length + " " + "me gusta"}
        </Text>
        <Text>{publication?.comments?.length + " " + "comentarios"}</Text>
      </Box>
    </>
  );
};
