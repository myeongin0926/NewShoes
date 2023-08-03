import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { styled } from "styled-components";
import numToMoneyFormat from "../func/numToMoneyFormat";
import Options from "../Components/productDetail/Options";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart } from "../api/firebase";
import { notifySuccess, notifyWarning } from "../Components/toast/Notify";
import { useParams } from "react-router";
import LoadingModal from "../Components/loading/LoadingModal";
import NotFound from "./NotFound";

const StyleDetail = styled.section`
  display: flex;
  max-height: 77vh;

  .image-box {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .main-image {
    flex: 1;
    width: 80%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .sub-image {
    width: 80%;
    display: flex;
    gap: 5px;
    img {
      border: 1px solid var(--gray-300);
      cursor: pointer;
      width: 30%;
      transition: 0.2s;
      &.active {
        border-color: var(--gray-700);
      }
    }
  }

  .product-description {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 50%;
    border-top: 3px solid var(--gray-900);
    padding-top: 20px;
    h3 {
      font-size: 25px;
    }
    span {
      font-weight: 500;
    }
    p {
      min-height: 300px;
      line-height: 30px;
      word-break: keep-all;
      padding-top: 30px;
    }
    button {
      background-color: var(--positive);
      padding: 20px;
      color: white;
      font-size: 20px;
      margin-top: 20px;
      cursor: pointer;
      &:hover{
        background: var(--primary);
      }
    }
  }
`;
export default function ProductDetail() {
  const { uid } = useAuthContext();
  const { productId } = useParams();
  const {productsQuery: { isLoading, error, data: products }} = useProducts();
  const product = products?.filter(el => el.id === productId)[0]
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentMainImage, setCurrentMainImage] = useState(product?.mainImage);

  useEffect(() => setCurrentMainImage(product?.mainImage), [product])
  if (isLoading) return <LoadingModal /> 
  if (error) return <NotFound />
  const {description, mainImage, options, price, subImage, title} = product
  const currentImageHandler = (e) =>  setCurrentMainImage(e.target.src)
  
  const activeOptionHandler = (num) => setSelectedOption(num)
  
  
  const cartAddHandler = async () => {
    if (!uid) {
      notifyWarning('로그인이 필요한 서비스입니다.')
    } else if (!selectedOption) { 
      notifyWarning("옵션을 선택해주세요.");
    } else {
      const newProduct = {
        ...product,
        option: selectedOption,
        quantity: 1,
      };
      await addOrUpdateToCart(uid, newProduct, selectedOption);
      notifySuccess('장바구니에 추가되었습니다.')
    }


  }

  return (
    <StyleDetail>
      <div className="image-box">
        <div className="main-image">
          <img src={currentMainImage} alt="main image" />
        </div>
        <div className="sub-image">
          <img
            src={mainImage}
            alt=""
            onClick={currentImageHandler}
            className={currentMainImage === mainImage ? "active" : ""}
          />
          <img
            src={subImage}
            alt=""
            onClick={currentImageHandler}
            className={currentMainImage === subImage ? "active" : ""}
          />
        </div>
      </div>
      <div className="product-description">
        <h3>{title}</h3>
        <span>{numToMoneyFormat(price)}₩</span>
        <p>{description}</p>
        <Options
          options={options}
          activeOption={selectedOption}
          activeOptionHandler={activeOptionHandler}
        />
        <button onClick={cartAddHandler}>장바구니에 담기</button>
      </div>
    </StyleDetail>
  );
}
