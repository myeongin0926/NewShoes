import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { BiUser, BiCart } from "react-icons/bi";
const StyleUserActions = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  gap: 10px;
  a {
    color: var(--gray-700);
    font-weight: 500;
    font-size: 15px;
    transition: all.2s;
    display: flex;
    align-items: center;
    gap: 2px;
    &:hover {
      color: var(--gray-900);
    }
  }
`;

export default function UserActions() {
  return (
    <StyleUserActions>
      <Link to="/cart">
        <BiCart />
        장바구니
      </Link>
      <Link to="/login">
        <BiUser />
        로그인
      </Link>
    </StyleUserActions>
  );
}
