import { styled } from "styled-components";
import { Link, useParams } from "react-router-dom";
import scrollToTop from "../func/scrollToTop";
const StyleNavButton = styled.button`
  cursor: pointer;
  transition: 0.15s;
  border: none;
  color: var(--primary);
  background-color: var(--white);
  border-bottom: 2.5px solid ${(props) => (props.active ? "var(--primary)" : "transparent")};
  font-size: ${(props) => `${props.font}px` || "16px"};
  padding: 6px 16px;
  &:hover {
    color: ${(props) => (props.active ? "" : "var(--positive)")};
  }
`;
export default function Button({ value, param, font }) {
  const { keyword } = useParams();

  return (
    <Link to={`products/${param}`}>
      <StyleNavButton active={keyword === param ? 1 : 0} font={font} onClick={scrollToTop}>
        {value}
      </StyleNavButton>
    </Link>
  );
}
