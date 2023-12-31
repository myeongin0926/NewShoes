import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import LoginModal from "./Components/login/LoginModal";
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import { adminUser } from "./api/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotifyContainer } from "./Components/toast/Notify.jsx";

const StyleApp = styled.main`
  & > main {
    margin: 0 auto;
    width: var(--inner);
    padding-top: 100px;
    height: 100vh;
    position: relative;
  }
`;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { setUser } = useAuthContext();
  const [loginModal, setLoginModal] = useState(false);
  const navigation = useNavigate();
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
  };

  const handleLogin = (user) => {
    adminUser(user).then((result) => {
      localStorage.setItem("user", JSON.stringify(result));
      setUser(result);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigation("/");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <StyleApp>
        <Header loginModalHandler={loginModalHandler} handleLogout={handleLogout} />
        <main>
          <Outlet />
        </main>
      </StyleApp>
      {loginModal && <LoginModal handleLogin={handleLogin} loginModalHandler={loginModalHandler} />}
      <NotifyContainer />
    </QueryClientProvider>
  );
}

export default App;
