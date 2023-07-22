import { styled } from "styled-components";
import { Link } from "react-router-dom";
import scrollToTop from "../func/scrollToTop";
const StyleFooter = styled.footer`
  height: 200px;
  align-items: center;
  background-color: var(--positive);
  display: flex;
  font-weight: 600;
  justify-content: center;
  flex-direction: column;
  img {
    width: 120px;
  }
  div {
    display: flex;
    gap: 50px;
    font-size: 22px;
    a {
      color: var(--white);
    }
  }
`;
export default function Footer() {
  return (
    <StyleFooter>
      <Link to="/" onClick={scrollToTop}>
        <img src="/favicon.ico" alt="" />
      </Link>
      <div>
        <a href="https://github.com/myeongin0926" target="_blank">
          GitHub
        </a>
        <a href="https://shell-sceptre-93d.notion.site/060a6a33ffd042e8aa83b578c7adb8fc?pvs=4" target="_blank">
          Notion
        </a>
      </div>
    </StyleFooter>
  );
}
