/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useFormFields } from "../../hooks/useFormFields";
import { useState } from "react";
import { searchUser } from "../../api/auth";
import { Link } from "react-router-dom";

export const ModalSearch = ({ isOpen, onClose }) => {
  const { fields, handlerChange } = useFormFields({ username: "" });
  const [usersMatches, setUsersMatches] = useState([]);
  const [thereIsOneSearch, setThereIsOneSearch] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setThereIsOneSearch(true);
    try {
      const { data } = await searchUser(fields.username);
      console.log(data);
      setUsersMatches(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} borderBottom={"solid black 1px"}>
            Search user
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handlerSubmit}>
              <FormControl marginBottom={2}>
                <FormLabel>user name</FormLabel>
                <Input
                  onChange={handlerChange}
                  type="text"
                  placeholder="search user"
                  name="username"
                />
              </FormControl>
              <Button
                type="submit"
                isDisabled={fields.username.length < 1 ? true : false}
                size={"sm"}
                colorScheme="blue"
              >
                Button
              </Button>
            </form>
            <Box marginTop={6}>
              {!thereIsOneSearch ? (
                <Text>no hay busqueda reciente</Text>
              ) : usersMatches.length > 0 && fields.username ? (
                usersMatches.map((user) => (
                  <Box key={user._id} display={"flex"} marginTop={2}>
                    <Box marginRight={2}>
                      <Link to={"/profile/" + user.username}>
                        <Avatar
                          name={`${user.username}`}
                          src={user?.avatar?.secure_url}
                        />
                      </Link>
                    </Box>
                    <Box>
                      <Text fontWeight={"bold"}>
                        <Link to={"/profile/" + user.username}>
                          {user.username}
                        </Link>
                      </Text>
                      <span>{user.fullname} </span>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text>no hay resultados</Text>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
