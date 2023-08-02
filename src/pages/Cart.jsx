import LoadingModal from "../Components/loading/LoadingModal";
import CartItem from "../Components/cart/CartItem";
import { styled } from "styled-components";
import CartPayment from "../Components/cart/CartPayment";
import useCart from "../hooks/useCart";


const StyleCart = styled.section`
  height: 80%;
  ul{
    height: 100%;
    overflow: auto;
    margin-bottom: 10px;
    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--positive);
    }
  }
   .empty-cart {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    color: var(--gray-500);
   }
`;
export default function Cart() {
  const { cartQuery: { isLoading, error, data: products } } = useCart();
  if (isLoading) return <LoadingModal />
  if (error) return 'error'
  return (
    <StyleCart>
      {products.length ? (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id + product.option} product={product} />
            ))}
          </ul>{" "}
          <CartPayment products={products} />
        </>
      ) : (
        <div className="empty-cart">장바구니가 비어있습니다</div>
      )}
    </StyleCart>
  );
}


