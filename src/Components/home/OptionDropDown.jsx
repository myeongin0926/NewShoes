import { useEffect, useState } from "react";
import React from "react";
import { styled } from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const StyleDropDown = styled.div`
  background-color: white;
  border: 1px solid var(--gray-500);
  width: 170px;
  overflow: hidden;
  transition: all.2s;
  height: 40px;
  cursor: pointer;
  svg {
    transition: all.2s;
    cursor: pointer;
  }
  &.open {
    height: calc(${(props) => props.$options * 33 + 40}px);
    svg {
      transform: rotate(180deg);
    }
  }
  .current-option {
    padding: 0 8px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    height: 38px;
  }
  ul {
    padding: 0 3px;
    li {
      font-size: 15px;
      padding: 5px;
      border-top: 1px solid var(--gray-500);
    }
  }
`;

export default function OptionDropDown({ sortOptionHandler, sortOption, options, name }) {
  const [isDropOpen, setIsDropOpen] = useState(false);

  useEffect(() => {
    if (isDropOpen) window.addEventListener("click", () => setIsDropOpen(false));
  }, [isDropOpen]);

  const dropMenuHandler = (option, text, value) => {
    setIsDropOpen(false);
    sortOptionHandler(option, { text, value });
  };

  const onCurrentOptionHandler = (e) => {
    e.stopPropagation();
    setIsDropOpen((pre) => !pre);
  };

  return (
    <StyleDropDown $options={options.length} className={isDropOpen ? "open" : ""}>
      <div className="current-option" onClick={onCurrentOptionHandler}>
        <h5>{sortOption[name].text}</h5>
        <button>
          <IoIosArrowDown size={22} />
        </button>
      </div>
      <ul>
        {options.map((menu) => (
          <li onClick={() => dropMenuHandler(menu.option, menu.text, menu.value)} key={menu.text}>
            {menu.text}
          </li>
        ))}
      </ul>
    </StyleDropDown>
  );
}
