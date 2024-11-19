/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useFormFields } from "../../hooks/useFormFields";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import { UploadAvatar } from "../../components/upload-avatar/UploadAvatar";
import { processFormdata } from "../../libs/processFormdata";

const initial = {
  email: "",
  password: "",
  username: "",
  fullname: "",
  bio: "",
};

export const EditProfile = () => {
  const {
    isAunthenticated,
    user,
    editProfile,
    errorsRegister,
    loadingRegister,
  } = useAuth();
  const { fields, handlerChange, setFields } = useFormFields(initial);
  const { image, uploadPhoto } = useUploadPhoto();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isAunthenticated || !user) {
      navigate("/");
      return;
    }
    if (isAunthenticated && user && id) {
      setFields({
        email: user.email,
        fullname: user.fullname,
        username: user.username,
        password: "",
        bio: user.bio || "",
      });
    }
  }, []);

  const sendData = async (e) => {
    e.preventDefault();
    const newFormData = processFormdata(image, toast, fields);
    if (!newFormData) return;
    const response = await editProfile(newFormData, id);
    console.log(response);
    if (response) navigate(`/profile/${response}`);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"70vh"}
    >
      <Box w={{ base: "90%", sm: "450px" }}>
        <Text fontSize={{ base: "3xl", lg: "5xl" }}>
          {id ? "editar" : "Registro"}
        </Text>

        <Box as="form" onSubmit={sendData} noValidate>
          <FormControl>
            <UploadAvatar uploadPhoto={uploadPhoto} image={image} user={user} />
          </FormControl>
          {errorsRegister?.image && (
            <Text color={"tomato"}>{errorsRegister.image}</Text>
          )}

          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            borderRadius={"18"}
            value={fields.email}
            onChange={handlerChange}
          />
          {errorsRegister?.email && (
            <Text color={"tomato"}>{errorsRegister.email}</Text>
          )}

          <FormLabel>password</FormLabel>
          <Input
            name="password"
            type="text"
            placeholder="password"
            borderRadius={"18"}
            value={fields.password}
            onChange={handlerChange}
          />
          {errorsRegister?.password && (
            <Text color={"tomato"}>{errorsRegister.password}</Text>
          )}

          <FormLabel>username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="username"
            borderRadius={"18"}
            value={fields.username}
            onChange={handlerChange}
          />

          {errorsRegister?.username && (
            <Text color={"tomato"}>{errorsRegister.username}</Text>
          )}

          <FormLabel>fullname</FormLabel>
          <Input
            name="fullname"
            type="text"
            placeholder="fullname"
            borderRadius={"18"}
            value={fields.fullname}
            onChange={handlerChange}
          />
          {errorsRegister?.fullname && (
            <Text color={"tomato"}>{errorsRegister.fullname}</Text>
          )}

          <>
            <FormLabel>bio</FormLabel>
            <Textarea
              name="bio"
              placeholder="bio"
              resize={"none"}
              borderRadius={"18"}
              value={fields.bio}
              onChange={handlerChange}
            />
          </>

          <Button
            type="submit"
            bg={"#4cb5f9"}
            my={"5"}
            width={"100%"}
            borderRadius={"18"}
            fontWeight={"bolder"}
            color={"aliceblue"}
            lineHeight={"4px"}
            isLoading={loadingRegister}
          >
            editar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
