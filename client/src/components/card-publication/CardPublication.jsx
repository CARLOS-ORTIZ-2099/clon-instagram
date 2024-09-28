/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Image,
  Text,
  Flex,
  Avatar,
  Box,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { likePublication } from "../../api/likePublication";
import { createComment } from "../../api/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as whiteHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { useCallback } from "react";
import { useButtonsActive } from "../../hooks/useButtonsActive.js";
import { debounce } from "../../libs/debounce.js";

export const CardPublication = ({
  publication,
  setPublications,
  publications,
}) => {
  const { user } = useAuth();
  const { cleanButtons, handlerComment, buttonsActive } = useButtonsActive();

  const createCommentHandler = async (e, id) => {
    e.preventDefault();
    try {
      const comments = await createComment(id, {
        content: e.target.content.value,
      });
      cleanButtons();
      const updateComment = publications.map((publication) =>
        publication._id === id
          ? {
              ...publication,
              comments: [...publication.comments, comments.data],
            }
          : publication
      );
      setPublications(updateComment);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // aqui el servidor no va hacer nada hasta que no reciba una solicitud del cliente
  const sendLike = async (id, boolean) => {
    //console.log(id, boolean);
    // eliminar like
    if (boolean) {
      const updateLikes = publications.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: p.likes.filter((like) => like != user._id),
            }
          : p
      );
      handlerLike(id, { action: "eliminar" }); // ejecutar timer
      setPublications(updateLikes); // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
    // crear like
    else {
      const updateLikes = publications.map((p) =>
        p._id === id
          ? {
              ...p,
              likes: [...p.likes, user._id],
            }
          : p
      );
      handlerLike(id, { action: "crear" }); // ejecutar timer
      setPublications(updateLikes); // => pero mientras se ejecuta el estado local ya se habra actualizado
    }
  };

  async function petition(id, action) {
    const response = await likePublication(id, action);
    console.log(response);
  }
  const handlerLike = useCallback(debounce(petition, 500), []);
  // console.log(publication);
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={`${publication?.ownerPublication?.username}`}
              src={publication?.ownerPublication?.avatar?.secure_url}
            />
            <Box>
              <Heading size="sm">
                <Link to={`/profile/${publication.ownerPublication.username}`}>
                  {publication.ownerPublication.username}
                </Link>
              </Heading>
              <Text>{publication.ownerPublication.bio}</Text>
            </Box>
          </Flex>

          <IconButton variant="ghost" colorScheme="gray" aria-label="See menu">
            <FontAwesomeIcon icon={faEllipsis} />
          </IconButton>
        </Flex>
      </CardHeader>

      <Image
        objectFit="cover"
        height={"400px"}
        src={publication.file.secure_url}
        alt="image-post"
      />

      <CardBody p={0}>
        <Box>
          <Button
            variant="ghost"
            leftIcon={
              publication.likes.find((like) => like === user._id) ? (
                <FontAwesomeIcon
                  onClick={() => sendLike(publication._id, true)}
                  icon={faHeart}
                  style={{ color: "#ef1f1f" }}
                  size="xl"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => sendLike(publication._id, false)}
                  icon={whiteHeart}
                  size="xl"
                />
              )
            }
          ></Button>

          <Button variant="ghost">
            <Link to={"/p/" + publication._id}>
              <FontAwesomeIcon icon={faComment} size="xl" />{" "}
            </Link>
          </Button>

          <Button
            variant="ghost"
            leftIcon={
              <FontAwesomeIcon icon={faPaperPlane} rotation={270} size="xl" />
            }
          ></Button>
        </Box>

        <Text ml={"16px"}>{publication.likes.length} Me gusta </Text>
      </CardBody>

      <CardFooter display={"flex"} flexDirection={"column"}>
        <Text>
          <Text as="b">{publication.ownerPublication.username}</Text>
          {publication.content}
        </Text>
        <Box>
          {publication.comments.length < 1 ? (
            <Text>se el primero en comentar</Text>
          ) : (
            <Link to={"/p/" + publication._id}>
              ver los {publication.comments.length} comentarios
            </Link>
          )}
        </Box>
        <form onSubmit={(e) => createCommentHandler(e, publication._id)}>
          <Box display={"flex"}>
            <Input
              variant="flushed"
              id={publication._id}
              placeholder="agregar un comentario"
              onChange={handlerComment}
              name="content"
            />
            {buttonsActive[publication._id] && (
              <Button type="submit" color={"blue"} bg={"none"}>
                publicar
              </Button>
            )}
          </Box>
        </form>
      </CardFooter>
    </Card>
  );
};
