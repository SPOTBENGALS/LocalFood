import { Link } from "react-router-dom";
import Footer from "Footer/Footer";
import Header from "Header/Header";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import { generateOrderNumber } from "Hooks/generateOrderNumber";

function OrderComplete() {
  const discountedTotalPayment = useStore((state) => state.discountedTotalPayment);
  const completedOrderTitle = useStore((state) => state.completedOrderTitle);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <h2>주문 완료</h2>
          <p>주문이 완료되었습니다.</p>
          <OrderCompleteBox>
            <p>주문 번호 : {generateOrderNumber()}</p>
            <p>결제 금액 : {discountedTotalPayment.toLocaleString()}원</p>
            <p>주문 상품 : {completedOrderTitle}</p>
          </OrderCompleteBox>
          <ButtonBox>
            <Link to="/">주문 내역 보기</Link>
            <Link to="/itemlist">상품 더 보기</Link>
          </ButtonBox>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default OrderComplete;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 60px 0;
`;

const WidthLimit = styled.div`
  width: 600px;

  @media screen and (max-width: 767px) {
    width: 90%;

    h2 {
      margin: 5px;
      font-size: 18px;
    }

    p {
      margin: 5px 0;
      font-size: 14px;
    }
  }
`;

const OrderCompleteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 40px;
  padding: 30px 50px;
  border: 1px solid #ccc;

  p {
    margin: 10px;
  }

  @media screen and (max-width: 767px) {
    margin-top: 20px;
    padding: 10px 20px;

    p {
      margin: 10px 0;
      font-size: 13px;
      text-align: left;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  a {
    padding: 10px 20px;
    border: 1px solid #ccc;
    color: #333;

    &:first-of-type {
      margin-right: 20px;
      background-color: #fffbf5;
    }
  }

  @media screen and (max-width: 767px) {
    a {
      font-size: 14px;
    }
  }
`;
