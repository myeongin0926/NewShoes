import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { styled } from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router";
s
const StyleSwiper = styled.section`
  .swiper-slide {
    cursor: pointer;
    img {
      width: 100%;
      height: 330px;
      object-fit: cover;
    }
  }

  .swiper-pagination-bullet {
    background-color: transparent;
    height: 3px;
    width: 10%;
    border-radius: 0px;
    margin: 0 !important;
    opacity: 1;
    transition: all.2s;
    background-color: var(--white);
    &:first-child {
      border-radius: 10px 0 0 10px;
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
  }
  .swiper-pagination-bullet-active {
    background-color: var(--primary);
  }
`;
export default function Banner() {
  const navigate = useNavigate();
  const banners = [
    {
      img: "/images/superstartWhiteBanner.png",
      link: "/detail/cf6fa536-a132-4f83-be5d-e3de33669d40",
    },
    {
      img: "/images/airforceBanner.png",
      link: "/detail/c8901886-8d2c-4bb2-9d8e-1ebb4f705a0f",
    },
    {
      img: "/images/superstarBlackBanner.png",
      link: "/detail/3aadf4c8-6ef4-43f8-98b0-08140c9a1977",
    },
    {
      img: "/images/airmaxBanner.png",
      link: "/detail/9b455c09-94ac-4591-ad9d-a8b52c36a6fc",
    },
    {
      img: "/images/dunkLowBanner.png",
      link: "/detail/db8ebff7-b5d8-40c4-9dc5-0d4a219404eb",
    },
  ];

  const bannerToProduct = (link) => {
    navigate(link);
  };
  return (
    <StyleSwiper>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.img} onClick={() => bannerToProduct(banner.link)}>
            <img src={banner.img} alt="bannerImage" />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyleSwiper>
  );
}
