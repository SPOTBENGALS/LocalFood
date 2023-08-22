import { useState, useEffect } from "react";
import useStore from "Store/Storage";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import DiscountTag from "./DiscountTag";
import { SumTotalPrice } from "Hooks/SetState";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";

interface CartItemType {
  currentPage: string;
  id: number;
  itemName: string;
  itemPrice: number;
  cost: number;
  price: number;
  img: string;
  discount: number;
  selectedAmount: number;
  checkedinCart: boolean;
}

function CartItem(props: CartItemType) {
  const { state } = useLocation();
  const cartItemList = useStore((state) => state.cartItemList);
  const setCartItemList = useStore((state) => state.setCartItemList);
  const setCartAmount = useStore((state) => state.setCartAmount);
  const isAllCheckedinCart = useStore((state) => state.isAllCheckedinCart);
  const setTotalPayment = useStore((state) => state.setTotalPayment);

  const [isChecked, setChecked] = useState(props.checkedinCart);
  const ItemOrder = cartItemList.findIndex((object) => object.id === props.id);

  let tempSelectedAmount = 0;

  if (state !== null) {
    if (state.previousPage === "productDetail") {
      tempSelectedAmount = props.selectedAmount;
    }
  } else {
    tempSelectedAmount = cartItemList[ItemOrder].selectedAmount;
  }

  const [amountN, setAmountN] = useState<number>(tempSelectedAmount);

  function Minus() {
    if (amountN !== 1) {
      cartItemList[ItemOrder].selectedAmount = cartItemList[ItemOrder].selectedAmount - 1;
      setAmountN(amountN - 1);
    }
  }

  function Plus() {
    cartItemList[ItemOrder].selectedAmount = cartItemList[ItemOrder].selectedAmount + 1;
    setAmountN(amountN + 1);
  }

  function DeleteItem() {
    setCartItemList(cartItemList.filter((item) => item.id !== props.id));
  }

  useEffect(() => {
    if (isAllCheckedinCart) {
      setChecked(true);
    } else if (isAllCheckedinCart === false) {
      if (!cartItemList.every((item) => item.checkedinCart === true)) {
        return;
      }
      setChecked(false);
    }
  }, [ItemOrder, cartItemList, isAllCheckedinCart]);

  useEffect(() => {
    if (state !== null) {
      if (state.previousPage === "cart") {
        if (isChecked === true) {
          cartItemList[ItemOrder].checkedinCart = true;
        } else if (isChecked === false) {
          cartItemList[ItemOrder].checkedinCart = false;
        }
      }
    }
  }, [ItemOrder, cartItemList, isChecked, setChecked, state]);

  useEffect(() => {
    let sum = 0;
    cartItemList.forEach((item) => {
      sum += item.selectedAmount;
    });

    setCartAmount(sum);
    setTotalPayment(SumTotalPrice(cartItemList));
  }, [amountN, cartItemList, setCartAmount, setTotalPayment]);

  return (
    <CartItemContainer key={props.id}>
      {props.currentPage === "cart" ? (
        <CartLabel onClick={() => setChecked(!isChecked)} color={isChecked ? "#ff7d11" : "#eee"}>
          {isChecked ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
          <Link to={"/item/" + props.id}>
            <ImgBox>
              <img src={props.img} alt="" />
              {props.cost !== props.itemPrice ? <DiscountTag discount={props.discount} /> : ""}
            </ImgBox>
          </Link>
        </CartLabel>
      ) : (
        <CartLabel onClick={() => setChecked(!isChecked)} color={isChecked ? "#ff7d11" : "#eee"}>
          <ImgBox>
            <img src={props.img} alt="" />
            {props.cost !== props.itemPrice ? <DiscountTag discount={props.discount} /> : ""}
          </ImgBox>
        </CartLabel>
      )}

      <InfoBox>
        <Link to={"/item/" + props.id}>
          <ItemTitle>
            <div>{props.itemName}</div>
          </ItemTitle>
        </Link>
        {props.currentPage === "cart" ? (
          <span className="delete">
            <TfiClose onClick={DeleteItem} />
          </span>
        ) : (
          ""
        )}

        {props.currentPage === "cart" ? (
          <Amount color={amountN === 1 ? "#ccc" : "#ff8b2b"}>
            <button className="minus" onClick={Minus}>
              -
            </button>
            <div className="amountN">{amountN}</div>
            <button className="plus" onClick={Plus}>
              +
            </button>
          </Amount>
        ) : (
          <Amount>수량 : {props.selectedAmount}개</Amount>
        )}

        <Price>
          <ItemPrice>
            <strong>판매 금액 : </strong>
            {props.itemPrice.toLocaleString()}원
            {props.cost !== props.itemPrice ? <span>{props.cost.toLocaleString()}원</span> : ""}
          </ItemPrice>
          <TotalPrice>총 상품 금액 : {(props.itemPrice * amountN).toLocaleString()}원</TotalPrice>
        </Price>
      </InfoBox>
    </CartItemContainer>
  );
}

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border: 0;
  }

  @media screen and (max-width: 767px) {
    padding: 20px 0 15px;
    align-items: start;
  }
`;

const CartLabel = styled.div<{ color: string }>`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 24px;
    color: ${(props) => props.color};
  }

  @media screen and (max-width: 767px) {
    svg {
      margin-right: 5px;
    }
  }
`;

const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  width: 100px;
  height: 100px;
  overflow: hidden;

  img {
    height: 110%;
  }

  @media screen and (max-width: 767px) {
    margin-right: 10px;
    width: 85px;
    height: 85px;
  }
`;

const InfoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: -webkit-fill-available;

  span.delete {
    position: absolute;
    top: 0;
    right: 0;

    svg {
      color: #999;
    }
  }

  @media screen and (max-width: 767px) {
    width: calc(100% - 124px);

    a {
      width: 100%;
    }
  }
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 15px;
  width: 100%;
  color: #333;
  font-weight: 500;

  @media screen and (max-width: 767px) {
    display: block;
    margin: 0 0 10px;
    width: 90%;
    font-size: 15px;
    font-weight: normal;
    text-align: left;

    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const Amount = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

  button,
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    box-sizing: border-box;
  }

  button {
    background-color: #ff8b2b;
    border: 0;
    color: white;
    &.minus {
      background-color: ${(props) => props.color};
      border-color: ${(props) => props.color};
    }
  }

  div {
    background-color: white;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: ${(props) => props.color};
  }

  @media screen and (max-width: 767px) {
    justify-content: start;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: -webkit-fill-available;

  strong {
    display: none;
    margin-right: 4px;
    font-weight: normal;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: end;
    margin-top: 10px;
    font-size: 14px;

    strong {
      display: flex;
    }
  }
`;

const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.5px;

  span {
    margin-left: 10px;
    font-weight: normal;
    color: #bbb;
    text-decoration: line-through;
  }

  @media screen and (max-width: 767px) {
    font-weight: normal;
    line-height: 20px;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 0.5px;
`;
