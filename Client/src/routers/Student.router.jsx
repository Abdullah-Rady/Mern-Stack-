import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../hooks/CurrentUserContext";

const StudentRouter = () => {
  const [user] = useContext(CurrentUserContext);

  return (
    <>
      {user.role === "Trainee" || user.role === "Corporate Trainee" ? <Outlet /> : <Navigate to="/not-authorized" />}
    </>
  );
};

export default StudentRouter;
