import { Outlet } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import Login from "./pages/Login";
import { useState } from "react";
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
  const [loginModal, setLoginModal] = useState(false);
  const loginModalHandler = (boo) => {
    setLoginModal(boo);
  };

  return (
    <>
      <StyleApp>
        <Header loginModalHandler={loginModalHandler} />
        <main>
          <Outlet />
        </main>
      </StyleApp>
      {loginModal && <Login loginModalHandler={loginModalHandler} />}
    </>
  );
}

export default App;
