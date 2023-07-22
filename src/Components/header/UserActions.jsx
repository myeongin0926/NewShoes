import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const StyleUserActions = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
  display: flex;
  gap: 12px;
  a {
    color: var(--primary);
    font-weight: 500;
    font-size: 27px;
    transition: all.2s;
    display: flex;
    align-items: center;
    gap: 2px;
    &:hover {
      color: var(--positive);
    }
  }
`;

export default function UserActions() {
  return (
    <StyleUserActions>
      <Link to="/cart">
        <FiShoppingCart />
      </Link>
      <Link to="/login">
        <FiUser />
      </Link>
    </StyleUserActions>
  );
}
