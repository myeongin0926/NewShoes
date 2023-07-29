import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import LoginModal from "./Components/login/LoginModal";
import { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import SideMenu from "./Components/Menu";
import { adminUser } from "./api/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const StyleApp = styled.main`
  & > main {
    margin: 0 auto;
    width: var(--inner);
    padding-top: 150px;
    height: 100vh;
    position: relative;
  }
`;
const queryClient = new QueryClient();

function App() {
  const { user, setUser } = useAuthContext();
  const [loginModal, setLoginModal] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const navigation = useNavigate();
  const {category} = useParams()
  useEffect(() => scrollTo(0,0), [category])
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
  };
  const sideBarHandler = (boo) => {
    setSideBar(boo);
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
      <SideMenu sideBar={sideBar} sideBarHandler={sideBarHandler} user={user} />
    </QueryClientProvider>
  );
}

export default App;
