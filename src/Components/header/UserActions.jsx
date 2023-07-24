import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

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

export default function UserActions({ loginModalHandler }) {
  return (
    <StyleUserActions>
      <Link to="/cart">
        <FiShoppingCart />
      </Link>
      <Link onClick={() => loginModalHandler(true)}>
        <FiUser />
      </Link>
    </StyleUserActions>
  );
}
