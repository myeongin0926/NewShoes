import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";

const StyleHeader = styled.header`
  width: var(--inner);
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 10px;
`;

const StyleLogo = styled.h1`
  margin-left: 20px;
  img {
    width: 80px;
  }
`;

export default function Header() {
  return (
    <StyleHeader>
      <Link to="/">
        <StyleLogo>
          <img src="/images/NsLogo.png" alt="logo" />
        </StyleLogo>
      </Link>
      <UserActions />
      <Navbar />
    </StyleHeader>
  );
}
