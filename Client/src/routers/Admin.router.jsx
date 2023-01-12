import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../hooks/CurrentUserContext";

const AdminRouter = () => {
  const [user] = useContext(CurrentUserContext);

  return (
    <>
      {user.role === "Admin" ? <Outlet /> : <Navigate to="/not-authorized" />}
    </>
  );
};

export default AdminRouter;
