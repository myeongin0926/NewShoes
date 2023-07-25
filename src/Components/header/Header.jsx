import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";

const StyleHeader = styled.header`
  display: flex;
  width: var(--inner);
  height: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: fixed;
  align-items: center;
  background-color: #ffffff;
  z-index: 10;
  justify-content: center;
`;

export default function Header({ loginModalHandler, user, handleLogout }) {
  return (
    <StyleHeader>
      <Link to="/">
        <h1>NShop</h1>
      </Link>
      <Navbar />
      <UserActions user={user} handleLogout={handleLogout} loginModalHandler={loginModalHandler} />
    </StyleHeader>
  );
}
