import Button from "../Button";
import { styled } from "styled-components";
const StyleNavbar = styled.nav`
  display: flex;
  gap: 50px;
  justify-content: center;
  flex: 1;
  margin-top: 7px;
`;

export default function Navbar() {
  const navButtonData = [

  ];
  return (
    <StyleNavbar>
      {navButtonData.map((item) => (
        <Button font="21" key={item.id} value={item.text} param={item.param} />
      ))}{" "}
    </StyleNavbar>
  );
}
