import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, paymentCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();
  const cartQuery = useQuery(
    ["carts", uid || ""],
    () => {
      console.log("카트 업데이트");
      return getCart(uid);
    },
    {
      enabled: !!uid,
    }
  );

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product, product.option),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation(({ id, option }) => removeFromCart(uid, id, option), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  const payment = useMutation(() => paymentCart(uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem, payment };
}
