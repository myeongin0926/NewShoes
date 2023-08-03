import LoadingModal from "../loading/LoadingModal";
import ProductCard from "./ProductCard";
import { styled } from "styled-components";
import useProducts from "../../hooks/useProducts";


const StyleProducts = styled.section`
  ul {
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
  }
`;
export default function Products() {
const{ productsQuery : {isLoading, error, data:products}} = useProducts()
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
