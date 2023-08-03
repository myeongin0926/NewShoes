import { styled } from "styled-components";
import OptionDropDown from "./OptionDropDown";

const StyleSortOptionBar = styled.div`
  position: relative;
  z-index: 10;
  padding: 20px;
  .dropdown-box {
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

  return (
    <StyleSortOptionBar>
      <div className="dropdown-box">
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
