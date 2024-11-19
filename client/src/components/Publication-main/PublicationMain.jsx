/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { useButtonsActive } from "../../hooks/useButtonsActive";
import { ButtonsContainer } from "../buttons-container/ButtonsContainer";
export const PublicationMain = ({
  publication,
  createComment,
  showModalOptionsPublication,
  showModalComment,
  showModalLikes,
}) => {
  const {
    handlerComment,
    buttonsActive,
    loadingBtn,
    cleanButtons,
    changeLoading,
  } = useButtonsActive();
  const { user } = useAuth();
  //console.log(publication);

  return (
    <>
      <Box
        /* border={'solid red 5px'} */ display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card
          direction={{ base: "column", md: "row" }}
          overflow="hidden"
          variant="outline"
          minH={"70vh"}
          width={{ base: "100%", lg: "60%" }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", md: "60%" }}
            src={publication?.file?.secure_url}
            alt="Caffe Latte"
            height={{ lg: "70vh" }}
          />
          <Stack
            /* border={'solid green 2px'} */ maxHeight={"70vh"}
            overflowY={"auto"}
            width={{ base: "100%", md: "60%" }}
          >
            <CardBody /* border={'solid red 2px'} */>
              <Heading
                size="md"
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Link
                  to={`/profile/${publication?.ownerPublication?.username}`}
                >
                  <Text>{publication?.ownerPublication?.username}</Text>
                </Link>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  onClick={showModalOptionsPublication}
                />
              </Heading>
              <Text py="2">
                {publication?.ownerPublication?.username}: {publication.content}
              </Text>
              {publication?.comments?.length > 0 ? (
                publication.comments.map((comment) => (
                  <Box
                    /* border={'solid blue 2px'} */ fontSize={"small"}
                    key={comment._id}
                  >
                    <Avatar
                      size={"sm"}
                      name={comment.ownerComment.username || user.username}
                      src={comment.ownerComment?.avatar?.secure_url}
                    />
                    <Link
                      to={`/profile/${
                        comment.ownerComment.username || user.username
                      }`}
                    >
                      <Box as="span" fontWeight={"bold"}>
                        {comment.ownerComment.username || user.username}
                      </Box>
                    </Link>
                    <Text>{comment.content}</Text>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      onClick={() => showModalComment(comment)}
                    />
                  </Box>
                ))
              ) : (
                <Text>no hay comentarios</Text>
              )}
            </CardBody>
            <CardFooter
              display={"flex"}
              flexDirection={"column"}
              gap={"8px"}
              marginBottom={"30px"}
            >
              <ButtonsContainer
                publication={publication}
                showModalLikes={showModalLikes}
              />

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                as="form"
                onSubmit={(e) =>
                  createComment(
                    e,
                    e.target.content.value,
                    changeLoading,
                    cleanButtons
                  )
                }
              >
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
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </>
  );
};
