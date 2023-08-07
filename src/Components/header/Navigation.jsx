import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
const StyleNavigation = styled.nav`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 100px;
  font-weight: bold;
  button {
    padding-top: 5px;
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
`;
export default function Navigation() {
  const mainNav = [
    { text: "Men", link: "products/men" },
    { text: "Women", link: "products/women" },
    { text: "kids", link: "products/kids" },
  ];
  const nav = useNavigate();

  const mainNavOnClickHandler = (link) => {
    nav(link);
  };
  return (
    <StyleNavigation>
      {mainNav.map((el) => (
        <span key={el.text} onClick={() => mainNavOnClickHandler(el.link)}>
          {el.text}
        </span>
      ))}
    </StyleNavigation>
  );
}
