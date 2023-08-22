import styled from "@emotion/styled";
import review01 from "../../Images/Recipe/strawberrysalad.jpg";
import review02 from "../../Images/Recipe/dongjukpasta.jpg";
import review03 from "../../Images/Recipe/butterheadssam.jpg";
import review04 from "../../Images/Recipe/curry.jpg";

function FrontItems() {
  return (
    <>
      <Container>
        <WidthLimit>
          <Title>고객 후기</Title>
          <ReviewBox>
            <Review>
              <img src={review01} alt="" />
              <span>@peekaboo_x.x</span>
            </Review>
            <Review>
              <img src={review02} alt="" />
              <span>@peekab_x.x</span>
            </Review>
            <Review>
              <img src={review03} alt="" />
              <span>@peekboo_x.x</span>
            </Review>
            <Review>
              <img src={review04} alt="" />
              <span>@peeka</span>
            </Review>
          </ReviewBox>
        </WidthLimit>
      </Container>
    </>
  );
}

export default FrontItems;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 80px 0;

  @media screen and (max-width: 767px) {
    padding: 20px 0 50px;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  color: #333;
  padding-bottom: 30px;

  @media screen and (max-width: 767px) {
    padding-bottom: 0;
    font-size: 18px;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 2.5%;
    width: 95%;
  }
`;

const Review = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 260px;
  height: 260px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    position: absolute;
    bottom: 0;

    padding: 5px 10px;
    background-color: white;
    opacity: 0.8;
    font-size: 14px;
    border-radius: 0 10px 0 0;
  }

  @media screen and (max-width: 767px) {
    margin: 10px 2%;
    width: 46%;
    height: 185px;
  }
`;
