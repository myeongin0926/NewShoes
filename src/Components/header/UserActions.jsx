import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { logout } from "../../api/firebase";
import { useAuthContext } from "../../context/AuthContext";
const StyleUserActions = styled.nav`
  width: var(--inner);
  display: flex;
  justify-content: end;
  gap: 20px;
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

export default function UserActions({ loginModalHandler, handleLogout }) {
  const { user } = useAuthContext();
  return (
    <StyleUserActions>
      {user ? (
        <>
          {user.isAdmin && (
            <Link to="/products/new" className="user-action">
              제품추가
            </Link>
          )}
          <Link to="/cart" className="user-action">
            장바구니
          </Link>
          <Link className="user-action" onClick={() => logout().then(handleLogout)}>
            로그아웃
          </Link>
        </>
      ) : (
        <div className="user-action" onClick={() => loginModalHandler(true)}>
          로그인
        </div>
      )}
    </StyleUserActions>
  );
}
