import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
import "swiper/css/navigation";

const StyleDetail = styled.section`
  display: flex;
  gap: 50px;
  .image-box {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--positive);
    transition: all.2s;
    &:hover {
      color: var(--primary);
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
      &:hover {
        background: var(--primary);
      }
    }
  }
`;
export default function ProductDetail() {
  const { uid } = useAuthContext();
  const { productId } = useParams();
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  const product = products?.filter((el) => el.id === productId)[0];
  const [selectedOption, setSelectedOption] = useState(null);

  if (isLoading) return <LoadingModal />;
  if (error) return <NotFound />;
  const { description, mainImage, options, price, subImage, title } = product;

  const activeOptionHandler = (num) => {
    if (selectedOption === num) setSelectedOption(null);
    else setSelectedOption(num);
  };

  const cartAddHandler = async () => {
    if (!uid) {
      notifyWarning("로그인이 필요한 서비스입니다.");
    } else if (!selectedOption) {
      notifyWarning("옵션을 선택해주세요.");
    } else {
      const newProduct = {
        ...product,
        option: selectedOption,
        quantity: 1,
      };
      await addOrUpdateToCart(uid, newProduct, selectedOption);
      notifySuccess("장바구니에 추가되었습니다.");
    }
  };

  return (
    <StyleDetail>
      <Swiper
        className="image-box"
        modules={[Navigation]}
        spaceBetween={0}
        navigation={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img src={mainImage} alt="product Main Image" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={subImage} alt="product Sub Image" />
        </SwiperSlide>
      </Swiper>
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
