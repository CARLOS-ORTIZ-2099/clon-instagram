/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import {
  editprofile,
  loginUser,
  logoutUser,
  registerUser,
  verifyToken,
} from "../api/auth";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isAunthenticated, setIsAunthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errorsRegister, setErrorsRegister] = useState(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [errorsLogin, setErrorsLogin] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const toast = useToast();

  // este useEffect servira para que cada que se cargue la pagina hacer una consulta al servidor con token actual, esto para verificar si hay un usuario autenticado

  useEffect(() => {
    console.log("hola");
    async function checkLogin() {
      const cookieAuth = Cookies.get("_token") || false;
      //console.log(cookieAuth);
      if (cookieAuth) {
        try {
          const response = await verifyToken();
          setUser(response.data);
          setIsAunthenticated(true);
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("no hay cookie");
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  // efecto que limpia los temporizadores
  useEffect(() => {
    console.log("errores");

    let timeRegister;
    if (errorsRegister) {
      timeRegister = setTimeout(() => {
        setErrorsRegister(null);
      }, 2000);
    }
    let timeLogin;
    if (errorsLogin) {
      timeLogin = setTimeout(() => {
        setErrorsLogin(null);
      }, 2000);
    }
    // esta funcion de limpieza es recomendable ya que si el componente se desmonta
    // antes de que el temporizador acabe podria haber problemas al actualizar un estado de un componente que ya no existe
    return () => {
      clearTimeout(timeRegister);
      clearTimeout(timeLogin);
    };
  }, [errorsRegister, errorsLogin]);

  const registerHandler = async (fields) => {
    setLoadingRegister(true);
    try {
      const response = await registerUser(fields);
      if (response.statusText === "OK") {
        toast({
          title: "Cuenta Creada",
          description: "cuenta creada satisfactoriamente",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return true;
      }
    } catch (error) {
      setErrorsRegister(error.response.data);
    } finally {
      setLoadingRegister(false);
    }
  };

  const loginHandler = async (fields) => {
    setLoadingLogin(true);
    try {
      const { data } = await loginUser(fields);
      setUser(data);
      setIsAunthenticated(true);
    } catch (error) {
      setErrorsLogin(error.response.data);
    } finally {
      setLoadingLogin(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.statusText === "OK") {
        setUser(false);
        setIsAunthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = async (newFormData, id) => {
    try {
      setLoadingRegister(true);
      const { data } = await editprofile(newFormData, id);
      console.log(data);
      toast({
        title: "cuenta modificada",
        description: "cuenta actualizada satisfactoriamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUser(data);
      return data.username;
    } catch (error) {
      console.log(error);
      setErrorsRegister(error.response.data);
    } finally {
      setLoadingRegister(false);
    }
  };

  const data = {
    user,
    isAunthenticated,
    loading,
    loadingRegister,
    errorsRegister,
    errorsLogin,
    loadingLogin,
    editProfile,
    setIsAunthenticated,
    setLoading,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const contextShare = useContext(AuthContext);
  try {
    if (!contextShare) {
      throw new Error("no existe el hook");
    }
    return contextShare;
  } catch (error) {
    console.log(error);
  }
};
