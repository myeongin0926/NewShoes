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
       text-align: center;
    font-size: 50px;
  }
`;

export default function Header({ loginModalHandler, handleLogout }) {
  return (
    <StyleHeader>
      <Link to="/">
        <h1>NShop</h1>
      </Link>
      <Navbar />
      <UserActions handleLogout={handleLogout} loginModalHandler={loginModalHandler} />
    </StyleHeader>
  );
}
