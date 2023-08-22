import styled from "@emotion/styled";
import { TbTruckDelivery } from "react-icons/tb";

function DeliveryBanner() {
  return (
    <Container>
      <WidthLimit>
        <DeliveryNotice>
          <LeftBox>
            FRIBOX DELIVERY <br />
            매주 화요일, 금요일에 찾아갑니다.
          </LeftBox>
          <RightBox>
            TUE · FRI
            <TbTruckDelivery className="deliveryIcon" />
          </RightBox>
        </DeliveryNotice>
      </WidthLimit>
    </Container>
  );
}

export default DeliveryBanner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 40px 0;
  background-color: #ff7d11;

  @media screen and (max-width: 767px) {
    padding: 20px 0 10px;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const DeliveryNotice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const LeftBox = styled.div`
  width: 60%;
  text-align: left;
  color: white;
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;

  @media screen and (max-width: 767px) {
    width: 90%;
    font-size: 18px;
    line-height: 28px;
  }
`;

const RightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  color: #d56000;
  font-size: 60px;
  font-weight: bold;

  .deliveryIcon {
    margin-left: 20px;
    font-size: 72px;
    stroke: #d56000;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 40px;
  }
`;
