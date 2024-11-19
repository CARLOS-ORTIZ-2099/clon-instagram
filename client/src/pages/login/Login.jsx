/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { useFormFields } from "../../hooks/useFormFields";
import img from "../../assets/images/auth.png";
import imgGoogle from "../../assets/images/googlePlay.png";
import imgMicrosoft from "../../assets/images/microsoft.png";
import imgInstagram from "../../assets/images/logo.png";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

export const Login = () => {
  const { fields, handlerChange } = useFormFields();
  const { loginHandler, errorsLogin, loadingLogin } = useAuth();

  const sendData = (e) => {
    e.preventDefault();
    loginHandler(fields);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={"100vh"}
      textTransform={"capitalize"}
      /* border={'solid magenta 3px'} */
    >
      <Box
        display={"flex"}
        gap={"2rem"}
        width={{ base: "100%", sm: "auto" }}
        height={{ base: "100vh", sm: "auto" }}
      >
        <Box
          flex={"1 1 0"}
          display={{ base: "none", md: "block" }} /* border={'solid red 3px'} */
        >
          <Image src={img} boxSize={"100%"} /* objectFit={'contain'} */ />
        </Box>

        <VStack
          justifyContent={"space-around"}
          flex={"1 1 0"} /* border={'solid blue 3px'} */
        >
          <Box
            width={"100%"}
            p={"1.2rem"}
            textAlign={"center"}
            boxShadow={{ base: "none", sm: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
          >
            <Image src={imgInstagram} w={"200px"} m={"0 auto"} />

            <Box
              as="form"
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              p={"1rem 1rem 0"}
              onSubmit={sendData}
              noValidate
            >
              <Input
                h={"38px"}
                onChange={handlerChange}
                name="email"
                type="email"
                placeholder="email"
              />
              <Input
                h={"38px"}
                onChange={handlerChange}
                name="password"
                type="text"
                placeholder="password"
              />
              <Button
                isLoading={loadingLogin}
                h={"35px"}
                borderRadius={"7px"}
                bg={"#4cb5f9"}
                p={".9rem"}
                fontWeight={"bolder"}
                color={"aliceblue"}
                lineHeight={"4px"}
                type="submit"
              >
                iniciar sesion
              </Button>
              <Box position="relative" padding="5">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  o
                </AbsoluteCenter>
              </Box>
            </Box>
            <Text fontSize={"small"} fontWeight={"bold"}>
              iniciar sesion con facebook
            </Text>
            {errorsLogin && (
              <Text color={"tomato"}>{errorsLogin?.message}</Text>
            )}
          </Box>

          <Center
            p={"1rem"}
            mt={"10px"}
            fontSize={"small"}
            width={"100%"}
            boxShadow={{ base: "none", sm: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
          >
            <Box as="span">¿no tienes una cuenta? </Box>
            <Link style={{ textDecoration: "none", color: "#0095f6" }} to="/">
              registrate
            </Link>
          </Center>

          <Box
            fontSize={"small"}
            p={"1rem"}
            width={"100%"}
            textAlign={"center"}
            /* border={'solid coral 2px'} */
          >
            <Text mb={"10px"}>descarga la aplicacion</Text>
            <Box display={"flex"} justifyContent={"center"} gap={"10px"}>
              <Image width={"100px"} height={"32px"} src={imgGoogle} alt="" />
              <Image width={"100px"} height={"32px"} src={imgMicrosoft} />
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
