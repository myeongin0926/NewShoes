import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";
import Navigation from "./Navigation";
import Search from "./Search";

const StyleHeader = styled.header`
  padding-top: 5px;
  width: 100%;
  position: fixed;
  z-index: 8;
  height: 60px;
  background-color: var(--white);
  box-shadow: 0 2px 8px 2px var(--gray-100);
  overflow: hidden;
  .inner {
    display: flex;
    width: var(--inner);
    margin: 0 auto;
    align-items: center;
  }
  h1 {
    img {
      margin-left: -7px;
      width: 50px;
    }
  }
`;

export default function Header({ loginModalHandler, handleLogout }) {
  return (
    <StyleHeader>
      <div className="inner">
        <h1>
          <Link to="/">
            <img src="/images/NsLogo.png" alt="page-logo" />
          </Link>
        </h1>
        <Navigation />
        <Search />
        <UserActions handleLogout={handleLogout} loginModalHandler={loginModalHandler} />
      </div>
    </StyleHeader>
  );
}
