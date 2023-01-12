import { Fragment } from "react";
import SearchBar from "./SearchBar";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom";
import { isAuthenticated, clearJWT } from "../apis/auth/auth-helper";
import { signout } from "../apis/auth/auth-api";
import useLocalStorageStore from "../hooks/useLocalStorage";
import { useState } from "react";
import SelectCountry from "./SelectCountry";
import { useContext } from "react";
import { CurrentUserContext } from "../hooks/CurrentUserContext";

const classNames = {
  nav: "flex flex-row justify-between items-center border-b-2 px-4 py-2",
  left: " flex flex-row align-center",
  logo: "inline-block flex flex-row align-center items-center nav-item text-3xl mr-8",
  hoverButton:
    "inline-block flex flex-row align-center items-center nav-item word text-gray-700 hover:text-blue-400",
  right: "flex flex-row align-center",
  login:
    "mr-4 border-2 inline-block py-1 px-4 flex flex-row align-center items-center rounded-md hover:bg-gray-100",
  signup:
    "mr-4 border-2 inline-block py-1 px-4 flex flex-row align-center items-center rounded-md hover:bg-gray-100",
  button:
    "inline-block py-1 px-2 flex flex-row align-center items-center rounded-md hover:bg-gray-100 text-xl ml-2",
};

const logout = async (storage) => {
  try {
    clearJWT(signout);
    storage.remove("user");
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const Nav = ({ changeKeyword, search }) => {
  const storage = useLocalStorageStore();
  const [user] = useContext(CurrentUserContext)
  const [open, setOpen] = useState(false);

  return (
    <nav className={classNames.nav}>
      <div className={classNames.left}>
        <Link to="/" className={classNames.logo}>
          <GrTechnology />
        </Link>
        <a href="" className={classNames.hoverButton}>
          Catergories
        </a>
      </div>
      <SearchBar changeKeyword={changeKeyword} search={search} />
      <div className={classNames.right}>
        {!isAuthenticated() && (
          <>
            <Link to="/signin" className={classNames.login}>
              Login
            </Link>
            <Link to="/signup" className={classNames.signup}>
              Sign Up
            </Link>
          </>
        )}

        {isAuthenticated() && (
          <>
            <button className={classNames.button}>
              <BsCart3 />
            </button>
            <Link to={user.role === "Admin" ? `/admin/${user._id}` : user.role === "Instructor" ? `/instructor/${user._id}/dashboard` : `/student/${user._id}/mycourses` } className={classNames.button}>
              <CgProfile />
            </Link>
            <button
              className={classNames.button}
              onClick={() => logout(storage)}
            >
              <FiLogOut />
            </button>
          </>
        )}
        <button className={classNames.button} onClick={() => setOpen(true)}>
          <AiOutlineGlobal />
        </button>
        {open && <SelectCountry open={open} onClose={() => setOpen(false)} />}
      </div>
    </nav>
  );
};

export default Nav;
