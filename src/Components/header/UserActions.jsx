import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { logout } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { useMenuContext } from "../../context/MenuContext";
const StyleUserActions = styled.nav`
  display: flex;
  gap: 15px;
  right: 0;
  color: var(--gray-700);
  top: 0;
  .user-action {
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all.2s;
    position: relative;
    color: var(--gray-700);
    &:not(:last-child):after {
      content: "";
      width: 2px;
      height: 14px;
      background-color: var(--gray-500);
      position: absolute;
      right: -8px;
    }
    &:hover {
      color: var(--primary);
    }
  }
  .user-name {
    font-size: 13px;
    font-weight: bold;
  }
`;

export default function UserActions({ loginModalHandler, handleLogout }) {
  const { user } = useAuthContext();
  const { isOpen, menuOpenHandler } = useMenuContext();
  return (
    <StyleUserActions>
      {user ? (
        <Link className="user-action" onClick={() => logout().then(handleLogout)}>
          로그아웃
        </Link>
      ) : (
        <div className="user-action" onClick={() => loginModalHandler(true)}>
          로그인
        </div>
      )}
      {user && <span className="user-name">{user.displayName}</span>}
      <button onClick={() => menuOpenHandler(!isOpen)}>open</button>
    </StyleUserActions>
  );
}
