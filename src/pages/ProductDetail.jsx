import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
export default function ProductDetail() {
  const { isLoading, error, data: products } = useQuery(["products"], getProducts);
  const product = products.filter()
  return <div></div>;
}
