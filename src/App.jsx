import { Outlet } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import LoginModal from "./Components/login/LoginModal";
import { useEffect, useState } from "react";
import { onUserStateChange } from "./api/firebase";
import SideMenu from "./Components/Menu";

const StyleApp = styled.main`
  & > main {
    margin: 0 auto;
    width: var(--inner);
    flex: 1;
    position: relative;
    background-color: black;
  }
`;

function App() {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
  };
  const sideBarHandler = (boo) => {
    setSideBar(boo);
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) setUser(localUser);
    else {
      onUserStateChange(setUser);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <StyleApp>
        <Header loginModalHandler={loginModalHandler} user={user} handleLogout={handleLogout} sideBar={sideBar} />
        <main>
          <Outlet />
        </main>
      </StyleApp>
      {loginModal && <LoginModal handleLogin={handleLogin} loginModalHandler={loginModalHandler} />}
      <SideMenu sideBar={sideBar} sideBarHandler={sideBarHandler} user={user} loginModalHandler={loginModalHandler} />
    </>
  );
}

export default App;
