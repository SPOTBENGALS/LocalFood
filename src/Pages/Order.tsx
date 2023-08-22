import { SetStateAction, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useStore from "Store/Storage";
import DaumPostcode from "react-daum-postcode";
import styled from "@emotion/styled";
import Footer from "Footer/Footer";
import Header from "Header/Header";
import CartItem from "Components/CartItem";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { SumTotalCost } from "Hooks/SetState";

interface DATATYPE {
  address: string;
}

function Order() {
  const buyNowItemList = useStore((state) => state.buyNowItemList);
  const setBuyNowItemList = useStore((state) => state.setBuyNowItemList);
  const cartItemList = useStore((state) => state.cartItemList);
  const setCartItemList = useStore((state) => state.setCartItemList);
  const point = useStore((state) => state.point);
  const totalPayment = useStore((state) => state.totalPayment);
  const setDiscountedTotalPayment = useStore((state) => state.setDiscountedTotalPayment);
  const setCompletedOrderTitle = useStore((state) => state.setCompletedOrderTitle);
  const { state } = useLocation();

  const [listOn, setListOn] = useState(true);
  const [selectedAddressMode, setAddressMode] = useState("default");
  const [addressModal, setAddressModal] = useState(false);
  const [findAddressModal, setFindAddressModal] = useState(false);
  const [newAddressValue, setNewAddressValue] = useState("");
  const [selectedAddress, setAddress] = useState({
    name: "곽두팔",
    address: "경기도 수원시 멍멍구 냥냥대로 77번길 00",
    addressDetail: "주파크빌 2차 500호",
    phone: "010-0000-8282",
  });
  const [usePoint, setUsePoint] = useState(0);
  const [selectedPayment, setPayment] = useState("");
  const [agreementModal, setAgreementModal] = useState(false);

  let itemList = cartItemList;
  let buyNowPrice = 0;
  let buyNowCost = 0;
  let buyNowDiscountPrice = 0;
  let isBuyNow = false;
  let totalPrice = 0;

  if (state !== null) {
    isBuyNow = state.previousPage === "productDetail";
    if (isBuyNow) {
      itemList = buyNowItemList;
      buyNowPrice = itemList[0].price * itemList[0].selectedAmount;
      buyNowCost = itemList[0].cost * itemList[0].selectedAmount;
      buyNowDiscountPrice = (itemList[0].price - itemList[0].cost) * itemList[0].selectedAmount;
      totalPrice = buyNowPrice - usePoint;
    }
  } else {
    totalPrice = totalPayment - usePoint;
  }

  function addressModalHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setAddressModal(true);
  }

  function findAddressHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFindAddressModal(true);
  }

  function agreementModalHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setAgreementModal(true);
  }

  function setAddressByList(
    info: SetStateAction<{ name: string; address: string; addressDetail: string; phone: string }>
  ) {
    setAddress(info);
    setAddressMode("default");
  }

  function onCompletePost(data: DATATYPE) {
    setNewAddressValue(data.address);
    setFindAddressModal(false);
  }

  function closeModal() {
    setAddressModal(false);
    setAgreementModal(false);
    setFindAddressModal(false);
  }

  function orderSubmit() {
    if (itemList.length > 1) {
      setCompletedOrderTitle(
        `${itemList[0].itemName}(${itemList[0].selectedAmount}) 외 ${itemList.length - 1}개의 상품`
      );
    } else {
      setCompletedOrderTitle(`${itemList[0].itemName}(${itemList[0].selectedAmount})`);
    }

    if (state !== null) {
      if (state.previousPage === "productDetail") {
        setBuyNowItemList([]);
        setDiscountedTotalPayment(buyNowPrice - usePoint);
      }
    } else {
      setCartItemList([]);
      setDiscountedTotalPayment(totalPayment - usePoint);
    }

    itemList = [];
  }

  useEffect(() => {
    if (addressModal || findAddressModal || agreementModal) {
      document.body.setAttribute("style", "overflow:hidden;");
    } else {
      document.body.setAttribute("style", "");
    }
  }, [addressModal, findAddressModal, agreementModal]);

  useEffect(() => {
    setAddressModal(false);
  }, [selectedAddress]);

  useEffect(() => {
    if (Number.isNaN(usePoint)) {
      setUsePoint(0);
    }
    if (usePoint > point) {
      setUsePoint(point);
    }
  }, [point, usePoint]);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <h2>주문서</h2>
          <OrderBox>
            <OrderList rotate={listOn ? "rotate(0deg)" : "rotate(180deg)"}>
              <h3>
                주문 상품
                <span className="listOn" onClick={() => setListOn(!listOn)}>
                  <IoIosArrowDown />
                </span>
              </h3>
              {listOn ? (
                <>
                  {itemList.map((item) => {
                    return (
                      <CartItem
                        key={item.id}
                        currentPage={"order"}
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
                </>
              ) : (
                <HiddenItem>
                  {itemList[0].itemName} 외 {itemList.length - 1}개의 상품
                </HiddenItem>
              )}
            </OrderList>
            <UserInfo>
              <h3>주문자 정보</h3>
              <OrderTable>
                <tbody>
                  <tr>
                    <th>
                      주문자 <span>*</span>
                    </th>
                    <td>곽두팔</td>
                  </tr>
                  <tr>
                    <th>
                      휴대전화 <span>*</span>
                    </th>
                    <td>010-0000-8282</td>
                  </tr>
                </tbody>
              </OrderTable>
            </UserInfo>
            <DeliveryInfo>
              <h3>배송 정보</h3>
              <DeliverySelect>
                <input
                  onClick={() => setAddressMode("default")}
                  type="radio"
                  id="defaultAddress"
                  checked={selectedAddressMode === "default"}
                  readOnly
                />
                <label htmlFor="defaultAddress" onClick={() => setAddressMode("default")}>
                  기본 배송지
                </label>
                <input
                  onClick={() => setAddressMode("new")}
                  type="radio"
                  id="newAddress"
                  checked={selectedAddressMode === "new"}
                  readOnly
                />
                <label htmlFor="newAddress" onClick={() => setAddressMode("new")}>
                  새 배송지
                </label>
                <button onClick={addressModalHandler}>배송 주소록</button>
                {addressModal ? (
                  <AddressList>
                    <h4>
                      배송지 목록
                      <p>새 배송지로 주문 시 배송지 목록에 추가됩니다.</p>
                      <span className="delete">
                        <TfiClose onClick={closeModal} />
                      </span>
                    </h4>

                    <table>
                      <tbody>
                        <tr
                          onClick={() =>
                            setAddressByList({
                              name: "곽두팔",
                              address: "경기도 수원시 팔달구 권광로 00번길 00",
                              addressDetail: "500호",
                              phone: "010-0000-0000",
                            })
                          }
                        >
                          <th>
                            <AiFillCheckSquare />
                          </th>
                          <td>
                            <h5>경기도 수원시 팔달구 권광로 00번길 00 500호</h5>
                            <p>곽두팔 | 010-0000-0000</p>
                          </td>
                        </tr>
                        <tr
                          onClick={() =>
                            setAddressByList({
                              name: "곽두순",
                              address: "경기도 오산시 용용구 내맘속으로 77번길 99",
                              addressDetail: "102동 200호",
                              phone: "010-0000-0000",
                            })
                          }
                        >
                          <th>
                            <AiTwotoneCheckSquare />
                          </th>
                          <td>
                            <h5>경기도 오산시 용용구 내맘속으로 77번길 99 102동 200호</h5>
                            <p>곽두순 | 010-0000-0000</p>
                          </td>
                        </tr>
                        <tr
                          onClick={() =>
                            setAddressByList({
                              name: "곽연호",
                              address: "서울시 산산구 왕왕로 000번길 33",
                              addressDetail: "-",
                              phone: "010-0000-0000",
                            })
                          }
                        >
                          <th>
                            <AiTwotoneCheckSquare />
                          </th>
                          <td>
                            <h5>서울시 산산구 왕왕로 000번길 33 </h5>
                            <p>곽연호 | 010-0000-0000</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </AddressList>
                ) : (
                  ""
                )}
              </DeliverySelect>
              {selectedAddressMode === "default" ? (
                <OrderTable>
                  <tbody>
                    <tr>
                      <th>
                        수취인 <span>*</span>
                      </th>
                      <td>
                        <p>{selectedAddress.name}</p>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        휴대전화 <span>*</span>
                      </th>
                      <td>
                        <p>{selectedAddress.phone}</p>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        배송지 <span>*</span>
                      </th>
                      <td>
                        <p>{selectedAddress.address}</p>
                        <p>{selectedAddress.addressDetail}</p>
                      </td>
                    </tr>
                    <tr>
                      <th>배송 메모</th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  </tbody>
                </OrderTable>
              ) : (
                <OrderTable>
                  <tbody>
                    <tr>
                      <th>
                        수취인 <span>*</span>
                      </th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        휴대전화 <span>*</span>
                      </th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        배송지 <span>*</span>
                      </th>
                      <td>
                        <input type="text" value={newAddressValue} disabled />
                        <input type="text" />
                        <button onClick={findAddressHandler}>주소 검색</button>
                      </td>
                    </tr>
                    <tr>
                      <th>배송 메모</th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  </tbody>
                </OrderTable>
              )}
              {findAddressModal ? (
                <FindAddressModal>
                  <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
                  <span className="delete">
                    <TfiClose onClick={closeModal} />
                  </span>
                </FindAddressModal>
              ) : (
                ""
              )}
            </DeliveryInfo>
            <PointInfo>
              <h3>적립금</h3>
              <p>보유 적립금 : {point} point</p>
              <div>
                <input type="text" onChange={(e) => setUsePoint(parseInt(e.target.value))} value={usePoint} /> point
                사용
              </div>
              <UseAllPoint color={point === usePoint ? "#ff8b2b" : "#eee"}>
                {point === usePoint ? (
                  <>
                    <AiFillCheckSquare id="useallpoint" onClick={() => setUsePoint(0)} />
                    <span onClick={() => setUsePoint(0)}>적립금 모두 사용</span>
                  </>
                ) : (
                  <>
                    <AiTwotoneCheckSquare id="useallpoint" onClick={() => setUsePoint(point)} />
                    <span onClick={() => setUsePoint(point)}>적립금 모두 사용</span>
                  </>
                )}
              </UseAllPoint>
            </PointInfo>
            <TotalPayment>
              <h3>결제</h3>
              <div>
                <Receipt>
                  <h4>결제 금액</h4>
                  <h5>
                    총 주문 금액{" "}
                    {isBuyNow ? (
                      <span>{buyNowPrice.toLocaleString()}원</span>
                    ) : (
                      <span>{totalPayment.toLocaleString()}원</span>
                    )}
                  </h5>
                  <h6>
                    ㄴ 상품 금액
                    {isBuyNow ? (
                      <span>{buyNowCost.toLocaleString()}원</span>
                    ) : (
                      <span>{SumTotalCost(cartItemList).toLocaleString()}원</span>
                    )}
                  </h6>
                  <h6>
                    ㄴ 할인 금액
                    {isBuyNow ? (
                      <span>{buyNowDiscountPrice.toLocaleString()}원</span>
                    ) : (
                      <span>{(totalPayment - SumTotalCost(cartItemList)).toLocaleString()}원</span>
                    )}
                  </h6>
                  <h5>
                    배송비 <span>무료</span>
                  </h5>
                  <h5>
                    적립금 사용{" "}
                    <span>
                      {" "}
                      {usePoint > 0 ? "-" : ""}
                      {usePoint} point
                    </span>
                  </h5>
                  <h5 className="totalPayment">
                    최종 결제 금액
                    {isBuyNow ? (
                      <span>{(buyNowPrice - usePoint).toLocaleString()}원</span>
                    ) : (
                      <span>{(totalPayment - usePoint).toLocaleString()}원</span>
                    )}
                  </h5>
                </Receipt>
                <Payment>
                  <h4>결제 수단</h4>
                  <button
                    onClick={() => setPayment("kakao")}
                    className={selectedPayment === "kakao" ? "kakao on" : "kakao"}
                  >
                    카카오페이
                  </button>
                  <button
                    onClick={() => setPayment("naver")}
                    className={selectedPayment === "naver" ? "naver on" : "naver"}
                  >
                    네이버페이
                  </button>
                  <button
                    onClick={() => setPayment("toss")}
                    className={selectedPayment === "toss" ? "toss on" : "toss"}
                  >
                    토스
                  </button>
                  <button
                    onClick={() => setPayment("card")}
                    className={selectedPayment === "card" ? "card on" : "card"}
                  >
                    신용카드
                  </button>
                  <button
                    onClick={() => setPayment("cash")}
                    className={selectedPayment === "cash" ? "cash on" : "cash"}
                  >
                    무통장입금
                  </button>
                </Payment>
              </div>
            </TotalPayment>
            <Agreement>
              <h3>약관 동의</h3>
              <h6>
                개인정보 수집 및 이용 동의 <span onClick={agreementModalHandler}>상세보기{">>"}</span>
              </h6>
              {agreementModal ? (
                <AgreementDetail>
                  <h4>
                    개인정보 수집 및 이용 동의
                    <span className="delete">
                      <TfiClose onClick={closeModal} />
                    </span>
                  </h4>
                  <div>
                    <h6>서비스 제공을 위해 아래 정보가 제공됩니다.</h6>
                    <p>
                      고객님께서는 정보제공에 동의하지 않을 수 있으며, <br /> 동의하지 않는 경우 서비스 이용이 제한될 수
                      있습니다.
                    </p>
                    <div>
                      <p>
                        개인정보 제공 받는 자: <span>로컬푸드통합지원센터</span>
                      </p>
                      <p>
                        제공목적: <span>구매한 상품의 배송</span>
                      </p>
                      <p>
                        제공정보: <span>성명, 휴대폰번호, 주소, ID</span>
                      </p>
                      <p>
                        보유 및 이용기간: <span>서비스 제공완료 3개월 후 삭제</span>
                      </p>
                    </div>
                  </div>
                  <button onClick={closeModal}>확인</button>
                </AgreementDetail>
              ) : (
                ""
              )}

              <h6>주문할 상품 설명에 명시된 내용과 사용 조건을 확인하였으며, 취소 및 환불 규정에 동의합니다. </h6>
              {selectedPayment === "" ? (
                <NoticeChoosePayment onClick={() => alert("결제 수단을 선택해주세요.")}>
                  {totalPrice.toLocaleString()}원 결제하기
                </NoticeChoosePayment>
              ) : (
                <Link to="/order/complete" onClick={orderSubmit}>
                  {totalPrice.toLocaleString()}원 결제하기
                </Link>
              )}
            </Agreement>
          </OrderBox>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default Order;

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
  width: 900px;

  @media screen and (max-width: 767px) {
    width: 100%;

    h2 {
      margin: 5px;
      font-size: 18px;
    }
  }
`;

const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  @media screen and (max-width: 767px) {
    padding: 0 10px;
    width: calc(100% - 20px);

    h3 {
      margin-top: 30px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const OrderList = styled.div<{ rotate: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  span.listOn {
    padding: 5px;
    width: 24px;
    height: 24px;
    font-size: 24px;
    color: #999;
    transform: ${(props) => props.rotate};
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 10px;

    span.listOn {
      padding: 0 5px;
      width: 20px;
      height: 20px;
      font-size: 20px;
    }
  }
`;

const HiddenItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  cursor: default;

  @media screen and (max-width: 767px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const UserInfo = styled.form`
  display: flex;
  flex-direction: column;
`;

const DeliveryInfo = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const OrderTable = styled.table`
  position: relative;
  margin: 5px 0;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid #ccc;

  tbody {
    tr {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 5px;

      th {
        display: flex;
        width: 20%;
        font-weight: normal;
        font-size: 14px;

        span {
          margin-left: 5px;
          color: #ff8b2b;
        }
      }

      td {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        padding: 5px 0;
        width: 30%;
        line-height: 30px;
        font-size: 14px;

        p {
          margin: 2px 0;
          line-height: 34px;
        }

        input {
          margin: 2px 0;
          width: 100%;
          line-height: 30px;
          text-indent: 5px;
          border-radius: 0;
          border: 1px solid #ccc;

          &:focus {
            outline: 0;
          }
        }

        button {
          position: absolute;
          top: 7px;
          right: -80px;
          padding: 0 8px;
          line-height: 32px;
          background-color: white;
          border: 1px solid #ff8b2b;
          color: #ff8b2b;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    margin: 0;
    padding-bottom: 10px;

    tbody {
      tr {
        padding: 5px 0;

        th {
          width: 25%;
          font-size: 13px;
        }

        td {
          padding: 0;
          width: 70%;
          line-height: 28px;
          font-size: 13px;

          p {
            margin: 2px 0;
            line-height: 28px;
          }

          input {
            line-height: 28px;
            box-sizing: border-box;
          }

          button {
            top: 2px;
            right: 0;
            line-height: 30px;
          }
        }
      }
    }
  }
`;

const DeliverySelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 0 0 10px;
  cursor: pointer;

  input {
    margin: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    margin: 0 15px 0 5px;
    font-size: 14px;
    cursor: pointer;
  }

  button {
    padding: 4px 8px;
    background-color: white;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    padding: 10px 0 10px 10px;

    input {
      width: 12px;
      height: 12px;
    }

    button {
      padding: 4px 10px;
    }
  }
`;

const AddressList = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: white;
  border: 1px solid #ccc;

  h4 {
    display: flex;
    align-items: baseline;
    margin: 0;
    padding: 20px;
    width: calc(100% - 40px);
    border-bottom: 1px solid #ccc;

    p {
      margin: 0 0 0 10px;
      font-size: 14px;
      font-weight: normal;
    }

    span {
      display: flex;
      margin-left: auto;
      padding: 5px;
    }
  }

  table {
    padding: 0 10px;
    background-color: white;

    tr {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #eee;

      &:first-of-type svg {
        color: #ff8b2b;
      }

      &:last-of-type {
        border: 0;
      }

      svg {
        margin-left: 10px;
        font-size: 30px;
        color: #eee;
      }

      td {
        padding-left: 15px;
        text-align: left;
      }
    }

    h5 {
      margin: 5px 0;
      font-weight: normal;
    }

    p {
      margin: 0;
      font-size: 12px;
      color: #999;
    }
  }

  @media screen and (max-width: 767px) {
    width: 80%;

    h4 {
      position: relative;
      flex-direction: column;
      padding: 15px 10px;
      width: calc(100% - 20px);

      p {
        margin: 10px 0 0 10px;
      }

      span {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 10px;
      }
    }

    table {
      padding: 0 5px;

      tr {
        padding: 10px 0;

        svg {
          margin-left: 5px;
          font-size: 24px;
        }

        td {
          padding-left: 10px;
        }
      }

      h5 {
        margin: 5px 0;
      }
    }
  }
`;

const FindAddressModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 450px;
  background-color: white;
  border: 1px solid #ccc;

  span {
    position: absolute;
    top: -1px;
    left: 100%;
    display: flex;
    padding: 15px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    width: 80%;
    transform: translateX(-53%) translateY(-40%);

    span {
      padding: 10px;
    }
  }
`;

const PointInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  p {
    padding-left: 5px;
    font-size: 14px;
  }

  div {
    padding-left: 5px;
  }

  input {
    margin-bottom: 10px;
    line-height: 25px;
    border: 1px solid #ccc;
    text-indent: 5px;

    &:focus {
      outline: 0;
    }
  }
`;

const UseAllPoint = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 20px;
    color: ${(props) => props.color};
  }
`;

const TotalPayment = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 20px;
  }

  div {
    display: flex;
    justify-content: space-between;

    h4 {
      margin: 10px 10px 0 10px;
      padding-bottom: 10px;
      text-align: left;
    }
  }

  @media screen and (max-width: 767px) {
    div {
      flex-direction: column;
      margin-bottom: 10px;

      h4 {
        margin: 10px 0 0;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

const Receipt = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: calc(40% - 50px);
  background-color: #f5f5f5;
  border: 1px solid #eee;

  h5,
  h6 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 10px 30px;
    font-size: 16px;
    font-weight: normal;

    span {
      font-size: 16px;
    }
  }

  h6 {
    padding-left: 40px;
    color: #999;
  }

  h5.totalPayment {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #eee;

    span {
      font-size: 18px;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 10px;
    width: calc(100% - 20px);

    h5,
    h6 {
      padding: 8px;
      font-size: 14px;

      span {
        font-size: 14px;
      }
    }

    h6 {
      padding: 4px 8px 10px 20px;
    }

    h5.totalPayment {
      margin-top: 5px;
      padding-top: 10px;

      span {
        font-size: 16px;
      }
    }
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(60% - 50px);

  button {
    margin: 5px 10px;
    padding: 15px 0;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    &.on {
      background-color: #ff8b2b;
      color: white;
    }

    &.kakao.on {
      background-color: #f6e500;
      color: #2d1b0c;
    }
    &.naver.on {
      background-color: #1fc700;
      color: white;
    }
    &.toss.on {
      background-color: #0050ff;
      color: white;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;

    h4 {
      margin: 10px 0;
    }
    button {
      margin: 5px 0;
      font-size: 14px;
    }
  }
`;

const Agreement = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  h3 {
    margin-bottom: 10px;
  }

  h6 {
    margin: 10px 0;
    padding: 0 5px;
    width: 100%;
    font-weight: normal;
    font-size: 14px;
  }

  span {
    margin-left: 10px;
    color: #ccc;
    font-size: 13px;
    cursor: pointer;
  }

  a {
    margin-top: 20px;
    padding: 15px;
    width: 40%;
    background-color: #ff8b2b;
    color: white;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    h6 {
      margin: 5px 0;
      word-break: keep-all;
      line-height: 20px;

      &:last-of-type {
        font-size: 13px;
      }
    }

    a {
      margin: 10px 0 40px;
      padding: 15px 0;
      width: 100%;
    }
  }
`;

const AgreementDetail = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  background-color: white;
  border: 1px solid #ccc;

  h4 {
    display: flex;
    align-items: baseline;
    margin: 0;
    padding: 20px;
    width: calc(100% - 40px);
    border-bottom: 1px solid #ccc;

    span {
      display: flex;
      margin-left: auto;
      padding: 5px;
      font-size: 16px;
      color: black;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 15px 15px 10px;

    h6 {
      width: auto;
      font-size: 16px;
      color: #ff8b2b;
    }

    p {
      margin: 0;
      padding: 0 5px;
      font-size: 14px;
      line-height: 22px;
    }

    div {
      margin-top: 30px;
      border-top: 1px solid #ccc;

      p {
        line-height: 30px;

        span {
          font-size: 14px;
          color: #ff8b2b;
          cursor: text;
        }
      }
    }
  }

  button {
    margin-bottom: 20px;
    padding: 10px;
    width: 40%;
    background-color: #ff8b2b;
    color: white;
    border: 0;
    font-size: 16px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    width: 80%;

    h4 {
      padding: 10px 15px;
      width: calc(100% - 30px);
    }

    div {
      padding: 10px 10px 5px;
      word-break: keep-all;

      h6 {
        font-size: 14px;
      }

      p {
        font-size: 13px;
        line-height: 20px;
      }

      div {
        margin-top: 10px;
        margin-bottom: 10px;

        p {
          line-height: 25px;

          span {
            margin-left: 0;
            font-size: 13px;
          }
        }
      }
    }

    button {
      padding: 10px 0;
      width: 90%;
      font-size: 14px;
    }
  }
`;

const NoticeChoosePayment = styled.a`
  text-align: center;
`;
