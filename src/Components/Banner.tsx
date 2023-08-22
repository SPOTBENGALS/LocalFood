import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner01 from "../Images/Banners/banner01.png";
import Banner02 from "../Images/Banners/banner02.png";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "0px",
  };
  return (
    <>
      <BannerContainer>
        <Slider {...settings}>
          <div>
            <img
              className="img-responsive displayed"
              src={Banner01}
              alt="화요일과 금요일에 만나는 로컬푸드. 지금 주문해보세요."
            />
          </div>
          <div>
            <img
              className="img-responsive displayed"
              src={Banner02}
              alt="매달 첫번째 화요일  주방 실전 레시피와 무료 요리 강습 화요미식회"
            />
          </div>
        </Slider>
      </BannerContainer>
    </>
  );
}

export default Banner;

const BannerContainer = styled.div`
  position: relative;
  z-index: 0;
  height: 420px;
  overflow: hidden;

  img {
    height: 420px;
    object-fit: fill;
  }

  .slick-dots {
    bottom: 15px;
  }

  @media screen and (max-width: 767px) {
    height: 180px;

    img {
      width: 150%;
      height: 180px;
      object-fit: cover;
    }
    .slick-dots {
      bottom: 10px;

      li {
        margin: 0;
      }
    }
  }
`;
