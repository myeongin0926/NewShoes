import { styled } from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import numToMoneyFormat from "../../func/numToMoneyFormat";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import { notifySuccess } from "../toast/Notify";
const StyleCartItem = styled.li`
  height: 150px;
  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid var(--gray-500);
  padding: 20px 20px 20px 0px;
  img {
    width: 150px;
    height: 140px;
    object-fit: cover;
  }
  .product-title-price {
    flex: 1;
    cursor: pointer;
    font-weight: bold;
    h3 {
      font-size: 17px;
    }
    span {
      font-size: 15px;
      color: var(--gray-700);
    }
  }

  .delete {
    font-size: 15px;
    font-weight: bold;
    padding: 5px 10px;
    transition: all.2s;
    border-radius: 3px;
    border-top: 2px solid var(--primary);
    border-bottom: 2px solid var(--primary);
    cursor: pointer;
    &:hover {
      color: white;
      background-color: var(--primary);
    }
  }
  .price-quantity {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-weight: bold;
    input {
      width: 30px;
      font-size: 18px;
      outline: none;
    }
  }
  .quantity {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    svg {
      color: var(--gray-700);
      cursor: pointer;
      transition: all.2s;
      &:hover {
        color: var(--gray-900);
      }
    }
  }
`;

export default function CartItem({ product }) {
  const navigation = useNavigate();
  const { id, mainImage, option, price, quantity, title } = product;
  const { addOrUpdateItem, removeItem } = useCart();
  const productDetailHandler = () => navigation(`/detail/${id}`);
  const handleMinus = () => {
    if (quantity < 2);
    else {
      addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
    }
  };

  const handlePlus = () => addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  const handleDelete = () => {
    removeItem.mutate({ id, option });
    notifySuccess("장바구니에서 제거되었습니다.");
  };

  return (
    <StyleCartItem>
      <img src={mainImage} alt="product Image" />
      <div className="product-title-price">
        <h3 onClick={productDetailHandler}>{title}</h3>
        <span>사이즈 - {option}</span>
      </div>
      <div className="price-quantity">
        <span className="price">{numToMoneyFormat(price)} 원</span>
        <span className="quantity">
          <AiOutlinePlusCircle size={20} onClick={handlePlus} />
          {quantity}
          <AiOutlineMinusCircle size={20} onClick={handleMinus} />
        </span>
      </div>
      <button className="delete" onClick={handleDelete}>
        삭제
      </button>
    </StyleCartItem>
  );
}
