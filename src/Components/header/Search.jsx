import { styled } from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
const StyleSearch = styled.form`
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: end;
  padding-right: 30px;
  input {
    padding: 10px 0 0 5px;
    font-size: 15px;
    width: 100%;
    height: 35px;
    border-bottom: 2px solid var(--positive);
    &:focus {
      border-color: var(--primary);
    }
  }
  button {
    border-radius: 3px;
    cursor: pointer;
    background-color: var(--white);
    position: absolute;
    width: 30px;
    height: 30px;
    top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--positive);
    &:hover {
      color: var(--primary);
    }
  }
`;

export default function Search() {
  return (
    <StyleSearch>
      <input type="text" />
      <button>
        <BiSearchAlt2 size={25} />
      </button>
    </StyleSearch>
  );
}
