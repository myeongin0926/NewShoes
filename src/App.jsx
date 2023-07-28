import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import LoginModal from "./Components/login/LoginModal";
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import SideMenu from "./Components/Menu";
import { adminUser, productList } from "./api/firebase";
const StyleApp = styled.main`
  & > main {
    margin: 0 auto;
    width: var(--inner);
    padding-top: 150px;
    height: 100vh;
    position: relative;
  }
`;

function App() {
  const { user, setUser } = useAuthContext();
  const [loginModal, setLoginModal] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const navigation = useNavigate();

  console.log(productList().then(res => console.log(res)));
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
  };
  const sideBarHandler = (boo) => {
    setSideBar(boo);
  };
  const handleLogin = (user) => {
    adminUser(user).then((result) => {
      console.log(result)
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
    <>
      <StyleApp>
        <Header loginModalHandler={loginModalHandler} handleLogout={handleLogout} />
        <main>
          <Outlet />
        </main>
      </StyleApp>
      {loginModal && <LoginModal handleLogin={handleLogin} loginModalHandler={loginModalHandler} />}
      <SideMenu sideBar={sideBar} sideBarHandler={sideBarHandler} user={user} />
    </>
  );
}

export default App;
