import { styled } from "styled-components";
import Products from "./Products";

const StyleHome = styled.section`
  height: 100%;
`

export default function Home() {
  return <StyleHome>
   <Products/>
  </StyleHome>;
}
