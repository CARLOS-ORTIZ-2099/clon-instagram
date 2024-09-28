/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFollowers } from "../../api/follower";

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

export const ModalFollowers = ({ isOpen, onClose, idQuery }) => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    petitionFollowers();
  }, []);

  const petitionFollowers = async () => {
    setLoading(true);
    try {
      const { data } = await getFollowers(idQuery);
      console.log(data);
      setFollowers(data);
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
            seguidores
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {loading ? (
              <Text>cargando...</Text>
            ) : (
              <Box as="ul">
                {followers.map((follower) => (
                  <Box
                    key={follower._id}
                    display={"flex"}
                    marginTop={2}
                    gap={"1rem"}
                    alignItems={"center"}
                  >
                    <Box marginRight={2}>
                      <Link to={`/profile/${follower.followerUser.username}`}>
                        <Avatar
                          name={`${follower.followerUser.fullname}`}
                          src={follower.followerUser?.avatar?.secure_url}
                        />
                      </Link>
                    </Box>

                    <Box>
                      <Text fontWeight={"bold"}>
                        <Link to={`/profile/${follower.followerUser.username}`}>
                          {follower.followerUser.username}
                        </Link>
                      </Text>
                      <Text>{follower.followerUser.fullname}</Text>
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
