import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Loading } from "../loading/Loading";

export const PublicRoutes = () => {
  const { user, loading, isAunthenticated } = useAuth();
  console.log("ruta publica");

  if (loading) {
    return <Loading />;
  }

  if (user && isAunthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
