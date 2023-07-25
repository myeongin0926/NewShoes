import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";

const StyleHeader = styled.header`
  display: flex;
  width: var(--inner);
  left: 0;
  margin: 0 auto;
  position: fixed;
  right: 0;
  transition: all.2s;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  background-color: #ffffff;
  z-index: 10;
  justify-content: center;

  h1 {
    font-size: 50px;
  }
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
