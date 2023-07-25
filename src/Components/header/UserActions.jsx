import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { logout } from "../../api/firebase";
const StyleUserActions = styled.div`
  right: 0px;
  display: flex;
  gap: 15px;
  position: absolute;
  top: 47px;

  .user-action {
    cursor: pointer;
    color: var(--gray-700);
    font-size: 16px;
    font-weight: 600;

    transition: all.2s;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover {
      color: var(--black);
    }
  }
`;

export default function UserActions({ loginModalHandler, user, handleLogout }) {
  return (
    <StyleUserActions>
      {user ? (
        <Link className="user-action" onClick={() => logout().then(handleLogout)}>
          <FiLogOut size={20} />
          Logout
        </Link>
      ) : (
        <div className="user-action" onClick={() => loginModalHandler(true)}>
          <FiUser size={20} />
          Login
        </div>
      )}
    </StyleUserActions>
  );
}
