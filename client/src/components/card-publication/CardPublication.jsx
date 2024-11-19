/* eslint-disable react/display-name */
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
import { createComment } from "../../api/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as whiteHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { useButtonsActive } from "../../hooks/useButtonsActive.js";
import { useState } from "react";
import { useLikes } from "../../hooks/useLikes.js";

export const CardPublication = ({ publication }) => {
  console.log("hi");
  const { user } = useAuth();
  const {
    cleanButtons,
    handlerComment,
    buttonsActive,
    loadingBtn,
    changeLoading,
  } = useButtonsActive();

  // recalcar que aunque el estado de publicaciones cambie cuando se haga scroll y la publicacion se vuelva a renderizar nuestro estado de likes y comentarios no se vuelve a reinicializar con ese mismo valor, ya que cuando usamos una prop para inicializar un estado, aunque el estado cambie la inicializacion solo ocurre una vez
  const { likes, sendLike } = useLikes(publication);
  const [comments, setComments] = useState(publication.comments);

  const createCommentHandler = async (e, id) => {
    e.preventDefault();
    changeLoading();
    try {
      const comment = await createComment(id, {
        content: e.target.content.value,
      });
      changeLoading();
      cleanButtons();
      setComments([...comments, comment.data]);
      e.target.reset();
    } catch (error) {
      console.log(error);
      changeLoading();
    }
  };
  function buttonLike() {
    return likes?.find((lk) => lk === user._id) ? (
      <Button variant="ghost" onClick={() => sendLike(publication._id, true)}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "#ef1f1f" }}
          size="xl"
        />
      </Button>
    ) : (
      <Button variant="ghost" onClick={() => sendLike(publication._id, false)}>
        <FontAwesomeIcon icon={whiteHeart} size="xl" />
      </Button>
    );
  }

  return (
    <Card maxW="md" mb={5}>
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
        width={"md"}
        src={publication.file.secure_url}
        alt="image-post"
      />

      <CardBody p={0}>
        <Box>
          {buttonLike()}
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

        <Text ml={"16px"}>{likes.length} Me gusta </Text>
      </CardBody>

      <CardFooter display={"flex"} flexDirection={"column"}>
        <Text>
          <Text as="b">{publication.ownerPublication.username}</Text>
          {publication.content}
        </Text>
        <Box>
          {comments.length < 1 ? (
            <Text>se el primero en comentar</Text>
          ) : (
            <Link to={"/p/" + publication._id}>
              ver los {comments.length} comentarios
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
            {buttonsActive && (
              <Button
                isLoading={loadingBtn}
                type="submit"
                color={"blue"}
                bg={"none"}
              >
                publicar
              </Button>
            )}
          </Box>
        </form>
      </CardFooter>
    </Card>
  );
};
