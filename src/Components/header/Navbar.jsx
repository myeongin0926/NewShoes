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
    { text: "Shoes", id: 1, param: "shoes" },
    { text: "Outer", id: 2, param: "outer" },
    { text: "Bag", id: 3, param: "bag" },
  ];
  return (
    <StyleNavbar>
      {navButtonData.map((item) => (
        <Button font="21" key={item.id} value={item.text} param={item.param} />
      ))}{" "}
    </StyleNavbar>
  );
}
