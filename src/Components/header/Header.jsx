import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import UserActions from "./UserActions";
import { useEffect, useState } from "react";

const StyleHeader = styled.header`
  width: var(--inner);
  height: 200px;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: ${(props) => (props.simple ? "fixed" : "relative")};
  align-items: center;
  padding-top: ${(props) => (props.simple ? "10px" : "30px")};
  padding-bottom: 10px;
`;

const StyleLogo = styled.h1`
  margin-left: 20px;
  img {
    width: 80px;
  }
`;

export default function Header() {
  const [simpleHeader, setSimpleHeader] = useState(false);
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 100) setSimpleHeader(true);
      else setSimpleHeader(false);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  return (
    <StyleHeader simple={simpleHeader ? 1 : 0}>
      {simpleHeader === false ? (
        <>
          <Link to="/">
            <StyleLogo>
              <img src="/images/NsLogo.png" alt="logo" />
            </StyleLogo>
          </Link>
          <UserActions />
          <Navbar />
        </>
      ) : (
        <>
          <UserActions simple />
          <Navbar />
        </>
      )}
    </StyleHeader>
  );
}
