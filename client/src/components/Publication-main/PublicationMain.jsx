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
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as whiteHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export const PublicationMain = ({
  publication,
  createComment,
  sendLike,
  showModalOptionsPublication,
  showModalComment,
  showModalLikes,
}) => {
  const { user } = useAuth();
  console.log(publication);

  function buttonLike() {
    return publication?.likes?.find((lk) => lk?._id === user._id) ? (
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
              <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
                {buttonLike()}
                <Button mt={"10"} variant="ghost">
                  <FontAwesomeIcon icon={faComment} size="xl" />
                </Button>
              </Box>

              <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
                <Text onClick={showModalLikes} cursor={"pointer"}>
                  {publication?.likes?.length > 0
                    ? `${publication.likes.length} me gusta`
                    : "Sé el primero en indicar que te gusta"}
                </Text>
                <Text>
                  {publication?.comments?.length > 0
                    ? `${publication.comments.length} comentarios`
                    : "se el primero en comentar"}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
                as="form"
                onSubmit={(e) => createComment(e, e.target.content.value)}
              >
                <Input
                  w={"auto"}
                  variant="flushed"
                  placeholder="agrega un comentario"
                  name="content"
                ></Input>
                <Button size={"sm"} type="submit">
                  publicar
                </Button>
              </Box>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </>
  );
};
