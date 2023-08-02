import { useState } from 'react';
import { styled } from 'styled-components';
import numToMoneyFormat from '../../func/numToMoneyFormat';
import { useNavigate } from 'react-router-dom';
const StyleProductCard = styled.li`
  width: calc(30%);
  background-color: white;
  display: flex;
  border: 1px solid var(--gray-300);
  flex-direction: column;
  min-width: 250px;
  gap: 10px;
  padding-bottom: 10px;
  margin-bottom: 40px;
  position: relative;
  cursor: pointer;

  .logo-image {
    position: absolute;
    width: 60px;
    right: 10px;
    z-index: 1;
  }

  .product-image {
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    img:hover {
      transform: scale(1.03);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    transition: all.2s;
  }

  .product-description {
    span {
      font-size: 16px;
      font-weight: bold;
      display: block;
      text-align: center;
    }
  }
`;
export default function ProductCard({ product }) {
  const{title,subImage,mainImage, id, category} = product
  const [mouseOver, setMouseOver] = useState(false)
  const mouseOverHandler = () => setMouseOver(!mouseOver)
  const navigation = useNavigate();
  const productDetailHandler = () => navigation(`/detail/${id}` , {state :{ product }})
    return (
      <StyleProductCard onClick={productDetailHandler}>
        <div className="logo-image">
          <img src={`/public/images/${category}logo.png`} alt="" />
        </div>
        <div
          className="product-image"
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseOverHandler}
        >
          <img src={mouseOver ?subImage :mainImage} alt="product image" />
        </div>
        <div className="product-description">
          <span> {title}</span>
          <span>{numToMoneyFormat(product.price)}₩</span>
        </div>
      </StyleProductCard>
    );
}

