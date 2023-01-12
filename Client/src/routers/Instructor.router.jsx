import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../hooks/CurrentUserContext";

const InstructorRouter = () => {
  const [user] = useContext(CurrentUserContext);

  return (
    <>
      {user.role === "Instructor" ? <Outlet /> : <Navigate to="/not-authorized" />}
    </>
  );
};

export default InstructorRouter;
