import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import Footer from "Footer/Footer";
import Header from "Header/Header";
import CartItem from "Components/CartItem";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { SumTotalPrice } from "Hooks/SetState";

function Cart() {
  const navigate = useNavigate();
  const cartItemList = useStore((state) => state.cartItemList);
  const setCartItemList = useStore((state) => state.setCartItemList);
  const isAllCheckedinCart = useStore((state) => state.isAllCheckedinCart);
  const setAllCheckedinCart = useStore((state) => state.setAllCheckedinCart);
  const totalPayment = useStore((state) => state.totalPayment);
  const setTotalPayment = useStore((state) => state.setTotalPayment);
  const [isOVerMinimum, setIsOVerMinimum] = useState(totalPayment >= 20000);

  function shipOutDay() {
    const today = new Date();
    let shipOut = "화요일";
    if (today.getDay() < 2 || today.getDay() > 4) {
      shipOut = today.getMonth() + 1 + "/" + today.getDate() + "(화)";
    } else if (today.getDay() >= 2 && today.getDay() <= 4) {
      shipOut = today.getMonth() + 1 + "/" + today.getDate() + "(금)";
    }

    return shipOut;
  }

  function DeleteSelectedItem() {
    setCartItemList(cartItemList.filter((item) => item.checkedinCart === false));
  }

  function noticeMinimumAmount() {
    alert("최소 주문 금액은 20,000원 입니다. ");
  }

  function setNavigate() {
    navigate("/order", { state: { previousPage: "cart" } });
  }

  useEffect(() => {
    if (isAllCheckedinCart === true) {
      cartItemList.forEach((cartItem) => {
        cartItem.checkedinCart = true;
      });
    } else if (isAllCheckedinCart === false) {
      cartItemList.forEach((cartItem) => {
        cartItem.checkedinCart = false;
      });
    }
  }, [isAllCheckedinCart, cartItemList]);

  useEffect(() => {
    if (cartItemList.every((item) => item.checkedinCart === true)) {
      setAllCheckedinCart(true);
    } else {
      setAllCheckedinCart(false);
    }
  }, [cartItemList, setAllCheckedinCart]);

  useEffect(() => {
    setTotalPayment(SumTotalPrice(cartItemList));
  }, [cartItemList, setTotalPayment]);

  useEffect(() => {
    if (totalPayment >= 20000) {
      setIsOVerMinimum(true);
    } else {
      setIsOVerMinimum(false);
    }
  }, [totalPayment]);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <h2>장바구니</h2>
          <CartBox>
            <CartList>
              <CartListHeader>
                <AllCheck
                  onClick={() => setAllCheckedinCart(!isAllCheckedinCart)}
                  color={isAllCheckedinCart ? "#ff7d11" : "#eee"}
                >
                  {isAllCheckedinCart ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
                  전체선택
                </AllCheck>
                <DeleteChecked onClick={DeleteSelectedItem}>선택삭제</DeleteChecked>
              </CartListHeader>
              {cartItemList.length === 0 ? <Empty>장바구니에 상품을 담아보세요.</Empty> : ""}
              {cartItemList.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    currentPage={"cart"}
                    id={item.id}
                    itemName={item.itemName}
                    itemPrice={item.price}
                    cost={item.cost}
                    price={item.price}
                    img={item.img}
                    discount={item.discount}
                    selectedAmount={item.selectedAmount}
                    checkedinCart={item.checkedinCart}
                  />
                );
              })}
              <CartListHeader>
                <AllCheck
                  onClick={() => setAllCheckedinCart(!isAllCheckedinCart)}
                  color={isAllCheckedinCart ? "#ff7d11" : "#eee"}
                >
                  {isAllCheckedinCart ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
                  전체선택
                </AllCheck>
                <DeleteChecked onClick={DeleteSelectedItem}>선택삭제</DeleteChecked>
              </CartListHeader>
            </CartList>
            <GetOrder>
              <InfoBox>
                <TotalOrder>
                  총 주문 금액 <span>{totalPayment.toLocaleString()}원</span>
                </TotalOrder>
                <DeliveryFee>
                  배송비 <span>무료</span>
                </DeliveryFee>
                <TotalPayment>
                  총 결제 금액 <span>{totalPayment.toLocaleString()}원</span>
                </TotalPayment>
              </InfoBox>
              {isOVerMinimum ? (
                <GetOrderButton to="/order" onClick={setNavigate}>
                  주문하기
                </GetOrderButton>
              ) : (
                <NoticeMinimum onClick={noticeMinimumAmount}>주문하기</NoticeMinimum>
              )}
              <NoticeBox>
                <p>
                  최소 주문 금액은 <span>20,000원</span> 입니다.
                </p>
                <p>
                  * 지금 주문하실 경우 <span>{shipOutDay()}</span> 상품이 출고됩니다.
                </p>
                <p>* 적립금은 주문서 작성 화면에서 사용 가능합니다.</p>
                <p>* 입금 대기 상태일 때 주문·배송 조회에서 직접 주문 취소가 가능합니다.</p>
              </NoticeBox>
            </GetOrder>
          </CartBox>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default Cart;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 60px 0;

  @media screen and (max-width: 767px) {
    padding: 0 0 20px;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;

    h2 {
      margin: 5px;
      font-size: 18px;
    }
  }
`;

const CartBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media screen and (max-width: 767px) {
    padding: 0 10px;
    width: calc(100% - 20px);
  }
`;

const CartListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #aaa;
  font-size: 14px;

  &:last-of-type {
    border-bottom: 0;
    border-top: 1px solid #aaa;
  }

  @media screen and (max-width: 767px) {
    padding: 5px 0;

    &:last-of-type {
      display: none;
    }
  }
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0;
  color: #ccc;

  @media screen and (max-width: 767px) {
    padding: 50px 0;
  }
`;

const AllCheck = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;

const DeleteChecked = styled.div`
  display: flex;
  margin-left: 15px;
  cursor: pointer;
`;

const GetOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(30% - 40px);

  @media screen and (max-width: 767px) {
    padding: 0 10px;
    width: calc(100% - 20px);
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  padding: 20px;
  width: calc(100% - 40px);
  border: 1px solid #ccc;
  background-color: #fafafa;

  div {
    padding: 10px 0;

    span {
      letter-spacing: 0.5px;
    }
  }

  @media screen and (max-width: 767px) {
    margin-top: 20px;
    padding: 10px 30px;
    width: calc(100% - 60px);
  }
`;

const TotalOrder = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeliveryFee = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPayment = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GetOrderButton = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: 15px;
  background-color: #ff7d11;
  color: white;

  @media screen and (max-width: 767px) {
    padding: 15px 0;
  }
`;

const NoticeMinimum = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: 15px;
  background-color: #ff7d11;
  border: 0;
  font-size: 16px;
  color: white;
`;

const NoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;
  font-size: 13px;
  color: #999;
  text-align: left;

  p {
    margin: 3px 0;

    span {
      color: #ff8b2b;
    }
  }
`;
