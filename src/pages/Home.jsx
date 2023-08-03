import { styled } from "styled-components";
import Products from "../Components/home/Products";
import Banner from "../Components/home/Banner";
const StyleHome = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function Home() {
  return (
    <StyleHome>
      <Banner />
      <Products />
    </StyleHome>
  );
}
