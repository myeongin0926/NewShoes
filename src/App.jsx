import { Outlet } from "react-router-dom";
import Header from "./Components/header/Header";
import { styled } from "styled-components";
import Footer from "./Components/Footer";
const StyleApp = styled.main`
  min-height: 100vh;
  width: var(--inner);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
  }
`;

function App() {
  return (
    <>
      <StyleApp>
        <Header />
        <div>
          <Outlet />
        </div>
      </StyleApp>
      <Footer />
    </>
  );
}

export default App;
