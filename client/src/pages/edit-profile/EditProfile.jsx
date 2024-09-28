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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useFormFields } from "../../hooks/useFormFields";
import { useUploadPhoto } from "../../hooks/useUploadPhoto";
import { useState } from "react";
import { editprofile } from "../../api/auth";
import { UploadAvatar } from "../../components/UploadAvatar";

const initial = {
  email: "",
  password: "",
  username: "",
  fullname: "",
  bio: "",
};

export const EditProfile = () => {
  const { isAunthenticated, user, setUser } = useAuth();
  const { fields, handlerChange, setFields } = useFormFields(initial);
  const { image, uploadPhoto } = useUploadPhoto();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("/");
  useEffect(() => {
    if (!isAunthenticated || !user) {
      navigate("/");
      return;
    }
    if (id && isAunthenticated) {
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
    const newFormData = new FormData();
    image.file && newFormData.append("file", image.file);
    for (let key in fields) {
      newFormData.append(key, fields[key]);
    }
    try {
      setLoading(true);
      const { data } = await editprofile(newFormData, id);
      console.log(data);
      alert("editado correctamente");
      setLoading(false);
      setUser(data);
      navigate(`/profile/${data.username}`);
    } catch (error) {
      console.log(error);
    }
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

          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            borderRadius={"18"}
            value={fields.email}
            onChange={handlerChange}
          />

          <FormLabel>password</FormLabel>
          <Input
            name="password"
            type="text"
            placeholder="password"
            borderRadius={"18"}
            value={fields.password}
            onChange={handlerChange}
          />

          <FormLabel>username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="username"
            borderRadius={"18"}
            value={fields.username}
            onChange={handlerChange}
          />

          <FormLabel>fullname</FormLabel>
          <Input
            name="fullname"
            type="text"
            placeholder="fullname"
            borderRadius={"18"}
            value={fields.fullname}
            onChange={handlerChange}
          />
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
            isLoading={loading}
          >
            editar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
