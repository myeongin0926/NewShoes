import { styled } from "styled-components";
import React from "react";
import numToMoneyFormat from "../../func/numToMoneyFormat";
import { useNavigate } from "react-router-dom";
const StyleProductCard = styled.li`
  width: 100%;
  background-color: white;
  display: flex;
  border: 1px solid var(--gray-300);
  flex-direction: ${(props) => (props.$grid ? "column" : "")};
  height: ${(props) => (props.$grid ? "auto" : "250px")};
  min-width: 250px;
  gap: 10px;
  margin-bottom: ${(props) => (props.$grid ? "40px" : "10px")};
  position: relative;
  cursor: pointer;
  box-shadow: 1px 1px 3px 1px var(--gray-100);
  transition: all.2s;
  &:hover {
    box-shadow: 1px 1px 3px 1px var(--gray-300);
  }
  .product-image-box {
    position: relative;
    width: ${(props) => (props.$grid ? "100%" : "250px")};
    overflow: hidden;
    flex: ${(props) => (props.$grid ? "1" : "")};
  }

  .product-logo {
    position: absolute;
    width: 50px;
    right: 10px;
    z-index: 1;
    top: 15px;
    right: 10px;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all.2s;
  }

  .product-info {
    color: var(--gray-900);
    width: ${(props) => (props.$grid ? "100%" : "80%")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      display: block;
      text-align: ${(props) => (props.$grid ? "center" : "")};
    }
  }
  .description {
    padding-right: 20px;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function ProductCard({ product, grid }) {
  const { title, mainImage, id, category, description } = product;
  const navigation = useNavigate();
  const productDetailHandler = () => navigation(`/detail/${id}`, { state: { product } });
  return (
    <StyleProductCard onClick={productDetailHandler} $grid={grid}>
      <div className="product-image-box">
        <img
          className="product-logo"
          src={`https://github.com/myeongin0926/NewShoes/blob/main/public/images/${category}logo.png?raw=true`}
          alt="product logo"
        />
        <img className="product-image" src={mainImage} alt="product image" />
      </div>
      <div className="product-info">
        <div>
          {" "}
          <span> {title}</span>
          <span>{numToMoneyFormat(product.price)}₩</span>
        </div>
        {!grid && <p className="description">{description}</p>}
      </div>
    </StyleProductCard>
  );
}
