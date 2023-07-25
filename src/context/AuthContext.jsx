import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { onUserStateChange } from "../api/firebase";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) setUser(localUser);
    else {
      onUserStateChange(setUser);
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
