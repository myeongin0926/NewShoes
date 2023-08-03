import LoadingModal from "../loading/LoadingModal";
import ProductCard from "./ProductCard";
import { styled } from "styled-components";
import useProducts from "../../hooks/useProducts";
import SortOptionBar from "./SortOptionBar";
import { useState } from "react";
const StyleProducts = styled.section`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
  }
`;

export default function Products() {
  const {
    productsQuery: { isLoading, error, data },
  } = useProducts();

  const [sortOption, setSortOption] = useState({
    brand: { text: "-", value: "" },
    sort: { text: "-", value: "" },
    grid: true,
  });

  const sortOptionHandler = (option, value) => {
    setSortOption((preOption) => ({ ...preOption, [option]: value }));
  };

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
      <SortOptionBar sortOptionHandler={sortOptionHandler} sortOption={sortOption} />
      <StyleProducts>
        <ul>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </StyleProducts>
    </>
  );
}
