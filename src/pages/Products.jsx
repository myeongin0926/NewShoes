import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import LoadingModal from "../Components/LoadingModal";
import ProductCard from "../Components/Products/ProductCard";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
const StyleProducts = styled.section`
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: calc(100% - 95%);
    padding-bottom:100px
  }
`
export default function Products() {
  const { isLoading, error, data: products } = useQuery(["products"], getProducts);


  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <LoadingModal />;
  }



  return (
    <StyleProducts>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </StyleProducts>
  );
}
