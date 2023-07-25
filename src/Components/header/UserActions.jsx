import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { logout } from "../../api/firebase";
const StyleUserActions = styled.div`
  right: 10px;
  display: flex;
  gap: 12px;
  margin-top: 7px;
  a {
    color: var(--primary);
    font-weight: 500;
    font-size: 25px;
    transition: all.2s;
    display: flex;
    align-items: center;
    gap: 2px;
    &:hover {
      color: var(--positive);
    }
  }
`;

export default function UserActions({ loginModalHandler, user, handleLogout }) {
  return (
    <StyleUserActions>
      <Link to="/cart">
        <FiShoppingCart />
      </Link>
      {user ? (
        <Link onClick={() => logout().then(handleLogout)}>
          <FiLogOut />
        </Link>
      ) : (
        <Link onClick={() => loginModalHandler(true)}>
          <FiUser />
        </Link>
      )}
    </StyleUserActions>
  );
}
