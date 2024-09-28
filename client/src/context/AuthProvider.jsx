/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser, verifyToken } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isAunthenticated, setIsAunthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  // este useEffect servira para que cada que se cargue la pagina hacer una consulta al servidor con token actual, esto para verificar si hay un usuario autenticado

  useEffect(() => {
    async function checkLogin() {
      const cookieAuth = Cookies.get("_token") || false;
      if (cookieAuth) {
        try {
          const response = await verifyToken(cookieAuth);
          if (!response.data) {
            setLoading(false);
            return;
          }
          setUser(response.data);
          setIsAunthenticated(true);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const registerHandler = async (fields) => {
    try {
      const response = await registerUser(fields);
      if (response.statusText === "OK") {
        navigate("/login");
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const loginHandler = async (fields) => {
    try {
      const { data } = await loginUser(fields);
      setUser(data);
      setLoading(false);
      setIsAunthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
      setTimeout(() => {
        setErrors(null);
      }, 2000);
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

  const data = {
    user,
    isAunthenticated,
    loading,
    errors,
    setUser,
    setIsAunthenticated,
    setLoading,
    setErrors,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const contextShare = useContext(AuthContext);
  if (!contextShare) {
    throw new Error("no existe el hook");
  }
  return contextShare;
};
