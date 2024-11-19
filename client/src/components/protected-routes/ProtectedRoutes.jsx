/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Sidebar } from "../sidebar/Sidebar";
import { ModalSearch } from "../modal-search/ModalSearch";
import { ModalCreatePublication } from "../modal-create-publication/ModalCreatePublication";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { Loading } from "../loading/Loading";

export const ProtectedRoutes = () => {
  console.log("ruta protegida");
  const { user, loading, isAunthenticated } = useAuth();
  // hook de react router dom que devuelve un objeto con la informacion de la url actual
  const location = useLocation();

  // modal para buscar usuarios
  const { isOpen, onOpen, onClose } = useDisclosure();
  // modal para crear publicaciones
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  // este efecto se ejecutara cuando location(hook con info de la navegacion) cambie
  // este hook detecta los cambio que surgen a nivel de url
  useEffect(() => {
    // aqui comprobamos si el modal del busqueda esta abierto esto con el find e que cunado el usuario se diriga al perfil de algun usuario buscado el modal se cierre
    if (isOpen) {
      onClose();
    }
  }, [location]);

  if (loading) return <Loading />;

  if (!user && !isAunthenticated) return <Navigate to="/login" replace />;

  return (
    <Grid
      bg={"#FAFAFA"}
      templateColumns={{ base: "1fr", lg: "350px 1fr" }}
      minHeight={"100vh"}
    >
      <Sidebar onOpen={onOpen} onOpenCreate={onOpenCreate} />

      {isOpen && <ModalSearch isOpen={isOpen} onClose={onClose} />}

      {isOpenCreate && (
        <ModalCreatePublication
          isOpenCreate={isOpenCreate}
          onCloseCreate={onCloseCreate}
        />
      )}
      <Outlet />
    </Grid>
  );
};
