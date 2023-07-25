import { Outlet } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import LoginModal from "./Components/login/LoginModal";
import { useEffect, useState } from "react";
import { onUserStateChange } from "./api/firebase";
const StyleApp = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > main {
    margin: 0 auto;
    width: var(--inner);
    flex: 1;
    padding-top: 60px;
    position: relative;
  }
`;

function App() {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
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
        <Header loginModalHandler={loginModalHandler} user={user} handleLogout={handleLogout} />
        <main>
          <Outlet />
        </main>
      </StyleApp>
      {loginModal && <LoginModal handleLogin={handleLogin} loginModalHandler={loginModalHandler} />}
    </>
  );
}

export default App;
