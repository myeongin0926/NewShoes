import { Outlet } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";

const StyleApp = styled.main`
  width: var(--inner);
  margin: 0 auto;
`;

function App() {
  return (
    <StyleApp>
      <Header />
      <Outlet />
    </StyleApp>
  );
}

export default App;
