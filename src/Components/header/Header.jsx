import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";

const StyleHeader = styled.header`
  width: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  z-index: 10;
  height: 80px;
  background-color: var(--white);
  box-shadow: 0 2px 5px 2px var(--gray-100);
  .inner {
    display: flex;
    width: var(--inner);
    margin: 0 auto;
  }
  h1 {
    margin-left: -7px;
    width: var(--inner);
    display: flex;
    padding-top: 13px;
    img {
      width: 60px;
    }
  }
`;

export default function Header({ loginModalHandler, handleLogout }) {
  return (
    <StyleHeader>
      <div className="inner">
        <h1>
          <Link to="/">
            <img src="/images/NsLogo.png" alt="" />{" "}
          </Link>
        </h1>
        <UserActions handleLogout={handleLogout} loginModalHandler={loginModalHandler} />
      </div>
    </StyleHeader>
  );
}
