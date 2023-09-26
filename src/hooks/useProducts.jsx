import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";
import React from "react";
export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });
  const addProduct = useMutation(({ product, files }) => addNewProduct(product, files), {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return { productsQuery, addProduct };
}
