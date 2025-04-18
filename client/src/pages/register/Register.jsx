import { Link } from "react-router-dom";
import { useFormFields } from "../../hooks/useFormFields";
import { useAuth } from "../../context/AuthProvider";
import imgGoogle from "../../assets/images/googlePlay.png";
import imgMicrosoft from "../../assets/images/microsoft.png";
import imgInstagram from "../../assets/images/logo.png";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Image,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

const initial = { email: "", username: "", password: "", fullname: "" };

export const Register = () => {
  const { fields, handlerChange, cleanFields } = useFormFields(initial);
  const { registerHandler, errorsRegister, loadingRegister } = useAuth();

  const sendData = async (e) => {
    e.preventDefault();
    const res = await registerHandler(fields);
    if (res) cleanFields(initial);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      minH={"100vh"}
      alignItems={"center"}
      textTransform={"capitalize"}
    >
      <Box /* border={'solid blue 2px'} */ display={"flex"} h={"800px"}>
        <VStack /* boxShadow={'0px 4px 8px rgba(0, 0, 0, 0.2)'} */
          textAlign={"center"}
          justifyContent={"space-evenly"}
        >
          <Box
            p={"1.2rem"}
            /* border={'solid red 1px'} */ boxShadow={{
              base: "none",
              sm: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            w={"100%"}
          >
            <Img w={"200px"} src={imgInstagram} m={"0 auto"} />
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Regístrate para ver fotos y vídeos de{" "}
            </Text>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              tus amigos.
            </Text>
            <Box position="relative" padding="5">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                o
              </AbsoluteCenter>
            </Box>
            <Box
              w={"100%"}
              mb={"20px"}
              as="form"
              onSubmit={sendData}
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              p={"1rem 1rem 0"}
              noValidate
            >
              <Input
                value={fields.fullname}
                h={"38px"}
                onChange={handlerChange}
                name="fullname"
                type="text"
                placeholder="fullname"
              />
              {errorsRegister?.fullname && (
                <Text color={"tomato"}>{errorsRegister.fullname}</Text>
              )}
              <Input
                value={fields.username}
                h={"38px"}
                onChange={handlerChange}
                name="username"
                type="text"
                placeholder="username"
              />
              {errorsRegister?.username && (
                <Text color={"tomato"}>{errorsRegister.username}</Text>
              )}
              <Input
                value={fields.email}
                h={"38px"}
                onChange={handlerChange}
                name="email"
                type="email"
                placeholder="email"
              />
              {errorsRegister?.email && (
                <Text color={"tomato"}>{errorsRegister.email}</Text>
              )}
              <Input
                value={fields.password}
                h={"38px"}
                onChange={handlerChange}
                name="password"
                type="password"
                placeholder="password"
              />
              {errorsRegister?.password && (
                <Text color={"tomato"}>{errorsRegister.password}</Text>
              )}
              <Box>
                <Text fontSize={"xs"}>
                  Es posible que las personas que usan nuestro
                </Text>
                <Text fontSize={"xs"}>
                  servicio hayan subido tu información de contacto
                </Text>
                <Text fontSize={"xs"}>a Instagram. Más información</Text>
              </Box>
              <Box>
                <Text fontSize={"xs"}>
                  Al registrarte, aceptas nuestras Condiciones, la
                </Text>
                <Text fontSize={"xs"}>
                  Política de privacidad y la Política de cookies.
                </Text>
              </Box>
              <Button
                isLoading={loadingRegister}
                type="submit"
                h={"35px"}
                borderRadius={"7px"}
                bg={"#4cb5f9"}
                p={".9rem"}
                fontWeight={"bolder"}
                color={"aliceblue"}
              >
                registrarte
              </Button>
            </Box>
          </Box>
          <Box
            /* border={'solid green 2px'} */ boxShadow={{
              base: "none",
              sm: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            w={"100%"}
            p={"1.2rem"}
          >
            <Box as="span">¿Tienes una cuenta? </Box>
            <Link
              style={{ textDecoration: "none", color: "#0095f6" }}
              to="/login"
            >
              {" "}
              Inicia sesión
            </Link>
          </Box>

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
