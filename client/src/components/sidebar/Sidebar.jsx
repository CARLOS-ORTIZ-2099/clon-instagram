/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import img from "../../assets/images/logo.png";
import { Box, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

export const Sidebar = ({ onOpen, onOpenCreate }) => {
  const { logoutHandler, user } = useAuth();

  return (
    <Box
      as="nav"
      display={"flex"}
      position={{ base: "fixed", lg: "relative" }}
      zIndex={{ base: "10", lg: "0" }}
      flexDirection={"column"}
      bg={"#FAFAFA"}
      /* border={'solid red 3px'} */
      boxShadow={{ base: "none", sm: "3px 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Box
        /* border={'solid red 2px'} */ position={"fixed"}
        display={{ base: "none", lg: "block" }}
      >
        <Image w={"50%"} src={img} />
      </Box>

      <Box
        as="ul"
        /* border={'solid green 3px'} */ mt={"7rem"}
        h={{ base: "6vh", lg: "60vh" }}
        display={"flex"}
        flexDirection={{ base: "row", lg: "column" }}
        justifyContent={"space-around"}
        position={"fixed"}
        w={{ base: "100%", lg: "340px" }}
        listStyleType={"none"}
        bg={{ base: "#FAFAFA" }}
        bottom={{ base: "0", lg: "auto" }}
        alignItems={{ base: "center", lg: "start" }}
      >
        <Box as="li" /* border={'solid red 1px'} */ ml={"10px"}>
          <Link to={"/home"}>
            <FontAwesomeIcon icon={faHouse} size="xl" />
            <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
              {" "}
              incio
            </Box>
          </Link>
        </Box>

        <Box as="li" onClick={onOpen} ml={"10px"}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
          <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
            {" "}
            buscar
          </Box>
        </Box>

        <Box as="li" ml={"10px"}>
          <Link to={"/explore"}>
            <FontAwesomeIcon icon={faCompass} size="xl" />
            <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
              {" "}
              explorar
            </Box>
          </Link>
        </Box>

        <Box as="li" ml={"10px"} onClick={onOpenCreate}>
          <FontAwesomeIcon icon={faSquarePlus} size="xl" />
          <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
            {" "}
            crear
          </Box>
        </Box>

        <Box as="li" ml={"10px"}>
          <Link to={`/profile/${user.username}`}>
            <FontAwesomeIcon icon={faUser} size="xl" />
            <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
              {" "}
              perfil
            </Box>
          </Link>
        </Box>

        <Box as="li" ml={"10px"}>
          <Link onClick={logoutHandler}>
            <FontAwesomeIcon icon={faDoorOpen} size="xl" />
            <Box as="span" display={{ base: "none", lg: "inline" }} ml={"10px"}>
              cerrar sesion
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
