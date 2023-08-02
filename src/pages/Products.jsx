import LoadingModal from "../Components/loading/LoadingModal";
import ProductCard from "../Components/Products/ProductCard";
import { styled } from "styled-components";
import useProducts from "../hooks/useProducts";


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
