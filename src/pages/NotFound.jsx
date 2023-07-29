import { styled } from "styled-components";
const StyleNotFound = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default function NotFound() {
  return <StyleNotFound>NOtFound</StyleNotFound>;
}
