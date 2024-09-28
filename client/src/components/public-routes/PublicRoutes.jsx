import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Loading } from "../Loading";

export const PublicRoutes = () => {
  const { user, loading, isAunthenticated } = useAuth();

  //console.log(user, loading, isAunthenticated);
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
