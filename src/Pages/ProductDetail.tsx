import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import Header from "Header/Header";
import Footer from "Footer/Footer";
import DetailImg from "./Parts/DetailImg";
import DetailReview from "./Parts/DetailReview";
import DetailConsult from "./Parts/DetailConsult";
import DeliveryNotice from "./Parts/DeliveryNotice";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import { PRODUCTDATA } from "Store/ProductData";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTDATA[parseInt(id as unknown as string) - 1];
  const login = useStore((state) => state.login);
  const cartItemList = useStore((state) => state.cartItemList);
  const setCartItemList = useStore((state) => state.setCartItemList);
  const setBuyNowItemList = useStore((state) => state.setBuyNowItemList);
  const setCartAmount = useStore((state) => state.setCartAmount);
  const contentsList = ["상세 정보", "상품 후기", "댓글 문의", "배송/환불/교환 안내"];

  const [isWished, setWished] = useState(product.wished);
  const [amountN, setAmountN] = useState<number>(1);
  const [currentContents, setCurrentContents] = useState("상세 정보");
  const [cartModal, setCartModal] = useState(false);

  function Minus() {
    if (amountN !== 1) {
      setAmountN(amountN - 1);
    }
  }

  function Plus() {
    setAmountN(amountN + 1);
  }

  function addWishList() {
    product.wished = !product.wished;
    setWished(product.wished);
  }

  function goCart() {
    if (cartItemList.some((cardItem) => cardItem.id === product.id)) {
      cartItemList.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          cartItem.selectedAmount = amountN + cartItem.selectedAmount;
        }
      });
    } else {
      const goCartList = [
        ...cartItemList,
        {
          sort: product.sort,
          id: product.id,
          group: product.group,
          itemName: product.itemName,
          descript: product.descript,
          cost: product.cost,
          price: product.price,
          bestItem: product.bestItem,
          newItem: product.newItem,
          bundleItem: product.bundleItem,
          img: product.img,
          detailImg: product.detailImg,
          discount: product.discount,
          selectedAmount: amountN,
          checkedinCart: product.checkedinCart,
          wished: product.wished,
        },
      ];
      setCartItemList(goCartList);
    }

    setCartModal(true);

    setTimeout(() => setCartModal(false), 3000);

    let sum = 0;

    cartItemList.forEach((item) => {
      sum += item.selectedAmount;
    });

    setCartAmount(sum);
  }

  function buyNow() {
    if (login) {
      if (product.price * amountN >= 20000) {
        const goBuyNow = [
          {
            sort: product.sort,
            id: product.id,
            group: product.group,
            itemName: product.itemName,
            descript: product.descript,
            cost: product.cost,
            price: product.price,
            bestItem: product.bestItem,
            newItem: product.newItem,
            bundleItem: product.bundleItem,
            img: product.img,
            detailImg: product.detailImg,
            discount: product.discount,
            selectedAmount: amountN,
            checkedinCart: product.checkedinCart,
            wished: product.wished,
          },
        ];
        setBuyNowItemList(goBuyNow);
        navigate("/order", { state: { previousPage: "productDetail" } });
      } else {
        alert("최소 주문 금액은 20,000원 입니다. \n장바구니로 먼저 담아주세요.");
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <InfoBox>
            <ImgBox>
              <div>
                <img src={product.img} alt="" />
              </div>
            </ImgBox>
            <Infos>
              <Tags>
                {product.bestItem === true ? <BestItemTag>BestItem</BestItemTag> : ""}
                {product.newItem === true ? <NewItemTag>NewItem</NewItemTag> : ""}
              </Tags>
              <p>{product.descript}</p>
              <h2>{product.itemName}</h2>
              <Price>
                {product.discount > 0 ? <strong>{product.discount}%</strong> : ""}
                {product.price.toLocaleString()}원
                {product.cost !== product.price ? <span>{product.cost.toLocaleString()}원</span> : ""}
              </Price>
              <InfoTable>
                <tbody>
                  <tr>
                    <th>배송</th>
                    <td>
                      11/6(금)이내 도착 예정 <span>냉장 상품은 아이스팩과 함께 배송됩니다.</span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <th>생산자</th>
                    <td>새싹농장</td>
                  </tr>
                  <tr>
                    <th>수량</th>
                    <td>
                      <Amount color={amountN === 1 ? "#ccc" : "#ff8b2b"}>
                        <button className="minus" onClick={Minus}>
                          -
                        </button>
                        <div className="amountN">{amountN}</div>
                        <button className="plus" onClick={Plus}>
                          +
                        </button>
                      </Amount>
                    </td>
                  </tr>
                  <tr>
                    <th>예상 적립금</th>
                    <td>{product.price * amountN * 0.05} point</td>
                  </tr>
                  <tr>
                    <th>
                      * 최소 주문 금액은 <span>20,000원</span>입니다.
                    </th>
                  </tr>
                </tbody>
              </InfoTable>
              <TotalPrice>
                <div>총 상품 금액</div>
                <div className="totalPrice">{(product.price * amountN).toLocaleString()}원</div>
              </TotalPrice>
              <Buttons iconColor={isWished ? "red" : "#ccc"}>
                <button className="addWishList" onClick={addWishList}>
                  <HiHeart />
                </button>
                <button className="goCart" onClick={goCart}>
                  장바구니
                </button>
                <button className="buyNow" onClick={buyNow}>
                  바로구매
                </button>

                <CartModal className={cartModal ? "on" : ""}>
                  상품이 장바구니에 담겼습니다. <Link to="/cart">장바구니 바로가기 {">>"}</Link>
                </CartModal>
              </Buttons>
            </Infos>
          </InfoBox>
          <ContentMenu>
            {contentsList.map((content, idx) => {
              if (content === currentContents) {
                return (
                  <li onClick={() => setCurrentContents(content)} className="active" key={idx + content.length}>
                    {content}
                  </li>
                );
              } else {
                return (
                  <li onClick={() => setCurrentContents(content)} key={idx + content.length}>
                    {content}
                  </li>
                );
              }
            })}
          </ContentMenu>
          {currentContents === "상세 정보" ? <DetailImg detailImg={product.detailImg} /> : ""}
          {currentContents === "상품 후기" ? <DetailReview productIdN={product.id} /> : ""}
          {currentContents === "댓글 문의" ? <DetailConsult /> : ""}
          {currentContents === "배송/환불/교환 안내" ? <DeliveryNotice /> : ""}
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default ProductDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 40px 0;

  @media screen and (max-width: 767px) {
    padding: 0 0 40px;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const InfoBox = styled.div`
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  display: flex;
  width: 480px;
  margin-right: 40px;

  div {
    display: flex;
    justify-content: center;
    width: 480px;
    height: 550px;
    overflow: hidden;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0;

    div {
      width: 100%;
      height: 100vw;

      img {
        height: 110%;
      }
    }
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: calc(100% - 480px);
  color: black;

  p {
    margin: 0;
    color: #aaa;
  }

  h2 {
    margin: 10px 0;
    font-weight: 500;
  }

  @media screen and (max-width: 767px) {
    width: calc(100% - 30px);
    margin-right: 0;
    padding: 10px 15px;

    p {
      font-size: 14px;
    }

    h2 {
      margin: 5px 0 15px;
      font-size: 18px;
    }
  }
`;

const Tags = styled.div`
  display: flex;
`;

const BestItemTag = styled.div`
  padding: 5px 10px;
  margin-right: 10px;
  background-color: lightblue;
  color: white;
  margin-bottom: 10px;
  font-size: 14px;

  @media screen and (max-width: 767px) {
    font-size: 13px;
  }
`;
const NewItemTag = styled.div`
  padding: 5px 10px;
  background-color: darkseagreen;
  color: white;
  margin-bottom: 10px;
  font-size: 14px;

  @media screen and (max-width: 767px) {
    font-size: 13px;
  }
`;

const Price = styled.h2`
  display: flex;
  align-items: end;
  width: 100%;
  margin: 15px 0;
  color: #333;

  strong {
    margin-right: 10px;
    color: #ff7d11;
  }

  span {
    margin-left: 10px;
    font-size: 18px;
    font-weight: normal;
    color: #bbb;
    text-decoration: line-through;
  }
`;

const InfoTable = styled.table`
  width: 100%;

  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;

    tr {
      display: flex;
      width: 100%;
      border-top: 1px solid #eee;
      padding: 15px 0;
      font-size: 14px;
      font-weight: normal;

      th {
        min-width: 120px;
        font-weight: normal;

        span {
          margin-left: 5px;
          color: #ff7d11;
          opacity: 0.9;
        }
      }

      td {
        display: flex;
        flex-direction: column;

        span {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }

      &:last-of-type {
        padding: 10px 0 0;
        color: #999;
        font-size: 13px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    tbody {
      tr {
        padding: 10px 0;
        font-size: 13px;

        th {
          min-width: 100px;
        }
      }
    }
  }
`;

const Amount = styled.div<{ color: string }>`
  display: flex;

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
    button,
    div {
      width: 30px;
      height: 30px;
    }
  }
`;

const TotalPrice = styled.h5`
  display: flex;
  justify-content: end;
  align-items: baseline;
  margin: 0;

  width: 100%;

  div {
    font-size: 16px;
    font-weight: normal;
    color: #666;

    &.totalPrice {
      margin-left: 10px;
      font-size: 36px;
      font-weight: bold;
      color: black;
    }
  }

  @media screen and (max-width: 767px) {
    div {
      margin-top: 15px;
      font-size: 14px;

      &.totalPrice {
        font-size: 24px;
        font-weight: bold;
        color: black;
      }
    }
  }
`;

const Buttons = styled.div<{ iconColor: string }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    font-size: 24px;
    box-sizing: border-box;
    cursor: pointer;

    &.addWishList {
      background-color: white;
      border: 1px solid #ccc;

      svg {
        color: ${(props) => props.iconColor};
      }
    }
    &.goCart,
    &.buyNow {
      width: 44%;
      border: 0;
      background-color: #927650;
      color: white;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 1px;
    }

    &.buyNow {
      background-color: #ff7d11;
    }
  }

  @media screen and (max-width: 767px) {
    margin-top: 10px;

    button {
      font-size: 19px;

      &.goCart,
      &.buyNow {
        width: 40%;
        font-size: 16px;
      }

      &.buyNow {
        background-color: #ff7d11;
      }
    }
  }
`;

const ContentMenu = styled.ul`
  display: flex;
  margin-top: 50px;
  width: 100%;

  li {
    padding: 15px 0;
    width: 25%;
    border: 1px solid #eee;
    border-right: 0;
    color: #333;
    cursor: pointer;

    &:last-of-type {
      border-right: 1px solid #eee;
    }

    &.active {
      background-color: #b69c79;
      color: white;
    }
  }

  @media screen and (max-width: 767px) {
    margin-top: 20px;
    margin-block-end: 0;

    li {
      padding: 10px 0;
      width: 20%;
      font-size: 14px;

      &:last-of-type {
        width: 40%;
      }
    }
  }
`;

const CartModal = styled.div`
  position: absolute;
  top: -125px;
  left: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s;

  &.on {
    opacity: 1;

    a {
      visibility: visible;
    }
  }

  &&::after {
    content: "";
    position: absolute;
    top: 106px;
    left: calc(50% - 10px);
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    background-color: white;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  a {
    visibility: hidden;
    padding: 10px;
    margin-top: 15px;
    background-color: white;
    border: 1px solid #ff8b2b;
    font-size: 14px;
    color: #ff8b2b;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    left: calc(28px);
  }
`;
