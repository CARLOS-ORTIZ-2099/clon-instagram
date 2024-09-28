/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createfollower, unFollowUser } from "../../api/follower";
import { profileUser } from "../../api/auth";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { ModalFolloweds } from "../../components/modal-followeds/ModalFolloweds";
import { ModalFollowers } from "../../components/modal-followers.jsx/ModalFollowers";
import { ProfileCard } from "../../components/profile-card/ProfileCard";
import { ImagesContainer } from "../../components/grid-images-container/ImagesContainer";
import { PublicationImage } from "../../components/publication-image/PublicationImage";
import { Loading } from "../../components/Loading";

export const Profile = () => {
  const { username } = useParams();
  const [infoUser, setInfoUser] = useState({
    user: false,
    publications: [],
    followeds: [],
    followers: [],
  });

  const profilehandler = async () => {
    const { data } = await profileUser(username);
    console.log(data);
    setInfoUser({
      ...infoUser,
      user: data.user,
      publications: data.publications,
      followeds: data.followeds,
      followers: data.followers,
    });
  };

  useEffect(() => {
    profilehandler();
  }, [username]);

  const addFollower = async (id) => {
    try {
      const response = await createfollower({ followed: id });
      console.log(response);
      const updateFollewers = [...infoUser.followers, response.data];
      setInfoUser({ ...infoUser, followers: updateFollewers });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFollower = async (id) => {
    console.log(id);
    try {
      const response = await unFollowUser(id);
      console.log(response);
      const updateFollewers = infoUser.followers.filter(
        (follower) =>
          follower.followerUser !== response.data.followerDelete.followerUser
      );
      setInfoUser({ ...infoUser, followers: updateFollewers });
    } catch (error) {
      console.log(error);
    }
  };
  // estados para los modales de follower y followeds
  const {
    isOpen: isOpenModalFolloweds,
    onOpen: onOpenModalFolloweds,
    onClose: onCloseModalFolloweds,
  } = useDisclosure();
  const {
    isOpen: isOpenModalFollowers,
    onOpen: onOpenModalFollowers,
    onClose: onCloseModalFollowers,
  } = useDisclosure();

  if (!infoUser.user) return <Loading />;

  return (
    <Box>
      <ProfileCard
        infoUser={infoUser}
        deleteFollower={deleteFollower}
        addFollower={addFollower}
        onOpenModalFolloweds={onOpenModalFolloweds}
        onOpenModalFollowers={onOpenModalFollowers}
      />
      <ImagesContainer>
        {infoUser?.publications?.length > 0 ? (
          infoUser.publications.map((publication) => (
            <PublicationImage key={publication._id} publication={publication} />
          ))
        ) : (
          <Text> no hay nada para mostrar </Text>
        )}
      </ImagesContainer>

      {isOpenModalFollowers && (
        <ModalFollowers
          isOpen={isOpenModalFollowers}
          onClose={onCloseModalFollowers}
          idQuery={infoUser.user._id}
        />
      )}
      {isOpenModalFolloweds && (
        <ModalFolloweds
          isOpen={isOpenModalFolloweds}
          onClose={onCloseModalFolloweds}
          idQuery={infoUser.user._id}
        />
      )}
    </Box>
  );
};
