/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFolloweds } from "../../api/follower";
import {
  Avatar,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export const ModalFolloweds = ({ isOpen, onClose, idQuery }) => {
  const [loading, setLoading] = useState(false);
  const [followeds, setFolloweds] = useState([]);

  useEffect(() => {
    petitionFolloweds();
  }, []);

  const petitionFolloweds = async () => {
    setLoading(true);
    try {
      const { data } = await getFolloweds(idQuery);
      console.log(data);
      setFolloweds(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
            seguidos
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {loading ? (
              <Text>cargando...</Text>
            ) : (
              <Box as="ul">
                {followeds.map((followed) => (
                  <Box
                    key={followed._id}
                    display={"flex"}
                    marginTop={2}
                    gap={"1rem"}
                    alignItems={"center"}
                  >
                    <Box marginRight={2}>
                      <Link to={`/profile/${followed.followedUser.username}`}>
                        <Avatar
                          name={`${followed.followedUser.fullname}`}
                          src={followed.followedUser?.avatar?.secure_url}
                        />
                      </Link>
                    </Box>

                    <Box>
                      <Text fontWeight={"bold"}>
                        <Link to={`/profile/${followed.followedUser.username}`}>
                          {followed.followedUser.username}
                        </Link>
                      </Text>
                      <Text>{followed.followedUser.fullname}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
