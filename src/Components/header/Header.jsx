import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";

const StyleHeader = styled.header`
  width: 100%;
  position: fixed;
  transition: all.2s;
  align-items: center;
  padding-top: 20px;
  background-color: #ffffff;
  z-index: 10;
  box-shadow: 0 2px 10px 1px var(--gray-100);
   h1 {
    width: 209px;
    margin: 0 auto;
    padding-left: 25px;
    text-align: center;
    font-size: 50px;
    position: relative;
    z-index: 1;
  }
`;

export default function Header({ loginModalHandler, handleLogout }) {
  return (
    <StyleHeader>
      <h1>
        {" "}
        <Link to="/">NShop </Link>
      </h1>

      <Navbar />
      <UserActions handleLogout={handleLogout} loginModalHandler={loginModalHandler} />
    </StyleHeader>
  );
}
