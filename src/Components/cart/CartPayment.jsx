import { styled } from "styled-components";

const StyleCartPayment = styled.section`
  height: 20%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .products-payment-description {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
    border-top: 2px inset black;
    border-bottom: 2px inset black;
    padding: 15px 0;
  }
  button {
    width: 100%;
    height: 40%;
    font-size: 20px;
    background-color: var(--positive);
    font-weight: bold;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: var(--primary);
    }
  }
`;
import numToMoneyFormat from "../../func/numToMoneyFormat";
export default function CartPayment({ products }) {
    const productPriceTotal = products.reduce((acc, cur) => {
     return acc += +cur.price
    }, 0)
    console.log(products.length);

    return (
      <StyleCartPayment>
        <div className="products-payment-description">
          <span>
            {products.length
              ? `${products[0].title} 외 ${products.length - 1}개의 상품`
              : "상품이 없습니다"}
          </span>
          <span>+</span>
          {products.length > 2 ? (
            <strike>3개 이상 배송비 무료</strike>
          ) : (
            <span>배송비 3000원</span>
          )}
          <span>=</span> <span>{numToMoneyFormat(productPriceTotal + 3000)}원</span>
        </div>
        <button>결제 하기</button>
      </StyleCartPayment>
    );
}

