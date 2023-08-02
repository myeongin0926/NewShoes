import { styled } from "styled-components";
import numToMoneyFormat from "../../func/numToMoneyFormat";
import useCart from "../../hooks/useCart";
import { notifySuccess } from "../toast/Notify";

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
export default function CartPayment({ products }) {
    const productPriceTotal = products.reduce((acc, cur) => {
      return acc += +cur.price * cur.quantity
    }, 0)
    const productQuantityTotal = products.reduce((acc, cur) => {
      return (acc +=  cur.quantity);
    }, 0);
    const { payment } = useCart();

    const paymentCart =  () => {
        payment.mutate({}, {
            onSuccess: () => {
               notifySuccess('결제가 완료되었습니다.')
            }
        })
    }

    return (
        <StyleCartPayment>
        <div className="products-payment-description">
          {products.length ? (
            <>
              {" "}
              <span>
                {products[0].title} 외 {productQuantityTotal - 1}개의 상품
              </span>
              <span>+</span>
              {productQuantityTotal > 2 ? (
                <strike>3개 이상 배송비 무료</strike>
              ) : (
                <span>배송비 3000원</span>
              )}
              <span>=</span> <span>{numToMoneyFormat(productPriceTotal + 3000)}원</span>
            </>
          ) : (
            "상품이 없습니다"
          )}
        </div>
        <button onClick={paymentCart}>결제 하기</button>
      </StyleCartPayment>
    );
}

