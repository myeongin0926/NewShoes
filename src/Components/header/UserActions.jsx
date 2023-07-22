import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const StyleUserActions = styled.div`
  position: absolute;
  top: ${(props) => (props.simple ? "13px" : "35px")};
  right: 0;
  display: flex;
  gap: 12px;
  a {
    color: var(--primary);
    font-weight: 500;
    font-size: 30px;
    transition: all.2s;
    display: flex;
    align-items: center;
    gap: 2px;
    &:hover {
      color: var(--gray-900);
    }
  }
`;

export default function UserActions({ simple }) {
  return (
    <StyleUserActions simple={simple ? 1 : 0}>
      <Link to="/cart">
        <FiShoppingCart />
      </Link>
      <Link to="/login">
        <FiUser />
      </Link>
    </StyleUserActions>
  );
}
