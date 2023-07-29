import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import LoadingModal from "../Components/LoadingModal";
export default function Cart() {
  const { uid } = useAuthContext();
    const { data: product, isLoading } = useQuery(["carts"], () => getCart(uid));
  if (isLoading) return <LoadingModal />
    
  return <>{product.map((el) => el.title)}</>;
}


