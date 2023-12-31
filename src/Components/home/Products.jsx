import LoadingModal from "../loading/LoadingModal";
import React from "react";
import ProductCard from "./ProductCard";
import { styled } from "styled-components";
import useProducts from "../../hooks/useProducts";
import SortOptionBar from "./SortOptionBar";
import { useSortOptionContext } from "../../context/SortOptionContext";
const StyleProducts = styled.ul`
  display: ${(props) => (props.$grid ? "grid" : "flex")};
  flex-direction: column;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
`;

export default function Products() {
  const {
    productsQuery: { isLoading, error, data },
  } = useProducts();

  const { sortOption } = useSortOptionContext();

  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <LoadingModal />;
  }
  let products = [...data];
  if (sortOption.brand.value !== "") {
    products = products.filter((product) => product.category === sortOption.brand.value);
  }
  if (sortOption.sort.value !== "") {
    products = products.sort((a, b) =>
      sortOption.sort.value === "higher" ? b.price - a.price : a.price - b.price
    );
  }

  return (
    <>
      <SortOptionBar />
      <StyleProducts $grid={sortOption.grid}>
        {products.map((product) => (
          <ProductCard grid={sortOption.grid} key={product.id} product={product} />
        ))}
      </StyleProducts>
    </>
  );
}
