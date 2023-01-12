import { Outlet } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { CurrentUserContext } from "../hooks/CurrentUserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

const UserContextLayout = () => {
  const [currentUserContext, setCurrentUserContext] = useState(null);
  const storage = useLocalStorage();

  if (storage.get("user") && !currentUserContext) {
    setCurrentUserContext(JSON.parse(storage.get("user")));
  }

  const login = useCallback((user) => {
    setCurrentUserContext(user);
    storage.set("user", user);
  }, []);

  const UserProvider = useMemo(
    () => [currentUserContext, login],
    [currentUserContext]);
  

  return (
    <CurrentUserContext.Provider value={UserProvider}>
      <Outlet />
    </CurrentUserContext.Provider>
  );
};

export default UserContextLayout;
