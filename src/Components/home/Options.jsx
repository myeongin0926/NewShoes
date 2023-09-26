import { styled } from "styled-components";
import React from "react";
const StyleOptions = styled.section`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  justify-content: space-around;
  div {
    padding: 10px;
    text-align: center;
    font-size: 13px;
    border: 1px solid var(--gray-300);
    width: calc(100% / 3 - 2px);
    font-weight: bold;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background-color: var(--gray-100);
    }
    &.active {
      border-color: var(--gray-700);
    }
  }
`;
export default function Options({ options, activeOption, activeOptionHandler }) {
  return (
    <StyleOptions>
      {options.map((option) => {
        return (
          <div
            key={option}
            className={option === activeOption ? "active" : ""}
            onClick={() => activeOptionHandler(option)}
          >
            {option}
          </div>
        );
      })}
    </StyleOptions>
  );
}
