import { styled } from "styled-components";
import OptionDropDown from "./OptionDropDown";
import { MdOutlineViewDay, MdOutlineGridView } from "react-icons/md";

const StyleSortOptionBar = styled.div`
  position: relative;
  z-index: 5;
  padding: 20px;
  .view-option {
    position: absolute;
    top: 0;
    right: 370px;
    display: flex;
    gap: 5px;
    button {
      height: 40px;
      display: flex;
      align-items: center;
      color: var(--gray-700);
      cursor: pointer;
      font-size: 27px;
      &:hover {
        color: var(--gray-900);
      }
      &.active {
        color: var(--gray-900);
      }
    }
  }
  .option-box {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    left: 0;
    top: 0;
  }
`;

export default function SortOptionBar({ sortOptionHandler, sortOption }) {
  const sortOptions = [
    { text: "-", value: "", option: "sort" },
    { text: "높은 가격순", value: "higher", option: "sort" },
    { text: "낮은 가격순", value: "lower", option: "sort" },
  ];
  const brandOptions = [
    { text: "-", value: "", option: "brand" },
    { text: "나이키", value: "nike", option: "brand" },
    { text: "아디다스", value: "adidas", option: "brand" },
  ];

  const viewOptionHandler = (boo) => {
    sortOptionHandler("grid", boo);
  };
  return (
    <StyleSortOptionBar>
      <div className="option-box">
        <div className="view-option">
          <button
            onClick={() => viewOptionHandler(false)}
            className={sortOption.grid ? "" : "active"}
          >
            <MdOutlineViewDay />
          </button>
          <button
            onClick={() => viewOptionHandler(true)}
            className={sortOption.grid ? "active" : ""}
          >
            <MdOutlineGridView />
          </button>
        </div>
        <OptionDropDown
          sortOptionHandler={sortOptionHandler}
          sortOption={sortOption}
          options={sortOptions}
          name="sort"
        />
        <OptionDropDown
          sortOptionHandler={sortOptionHandler}
          sortOption={sortOption}
          options={brandOptions}
          name="brand"
        />
      </div>
    </StyleSortOptionBar>
  );
}
