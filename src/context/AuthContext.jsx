import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { onUserStateChange } from "../api/firebase";
import LoadingModal from "../Components/loading/LoadingModal";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
      setIsLoading(false);
    } else {
      onUserStateChange((userData) => {
        setUser(userData);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <AuthContext.Provider value={{ uid: user?.uid, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
