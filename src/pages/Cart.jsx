import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import LoadingModal from "../Components/LoadingModal";
import CartItem from "../Components/cart/CartItem";
import { styled } from "styled-components";
import CartPayment from "../Components/cart/CartPayment";
const StyleCart = styled.section`
  height: 80%;
  ul {
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
      background: var(--positive)
    }
  }


`;
export default function Cart() {
  const { uid } = useAuthContext();
    const { data: products, isLoading } = useQuery(["carts"], () => getCart(uid));
  if (isLoading) return <LoadingModal />
    
  return (<StyleCart>
    <ul>
      {products.map((product) => <CartItem key={product.id} product={product} uid={uid} />)}
    </ul>
    <CartPayment products={products} />
</StyleCart>);
}


