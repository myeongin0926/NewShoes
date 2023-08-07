import { styled } from "styled-components";
import { useMenuContext } from "../../context/MenuContext";

const StyleMenu = styled.aside`
  position: fixed;
  height: 100vh;
  width: 400px;
  background-color: #d6d6d6;
  top: 0;
  transition: all.3s;
  right: ${(props) => (props.$isOpen ? "0" : "-100%")};
  z-index: 9;
`;

export default function Menu() {
  const { isOpen, menuOpenHandler } = useMenuContext();

  return <StyleMenu $isOpen={isOpen}></StyleMenu>;
}
