import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import useStore from "Store/Storage";
import styled from "@emotion/styled";

function MobileHeader() {
  const login = useStore((state) => state.login);
  const cartAmount = useStore((state) => state.cartAmount);
  const setCartAmount = useStore((state) => state.setCartAmount);
  const cartItemList = useStore((state) => state.cartItemList);

  useEffect(() => {
    let sum = 0;
    cartItemList.forEach((item) => {
      sum += item.selectedAmount;
    });

    setCartAmount(sum);
  }, [cartItemList, setCartAmount]);

  return (
    <>
      <EmptyBox />
      <Container>
        <WidthLimit>
          <Logo>
            <Link to="/">
              LOCAL<strong>FOOD</strong>
            </Link>
          </Logo>
          <CartBox>
            {login ? (
              <Link to="/cart">
                <FiShoppingCart />
                <span>{cartAmount}</span>
              </Link>
            ) : (
              <Link to="/login">
                <FiShoppingCart />
                <span>{cartAmount}</span>
              </Link>
            )}
          </CartBox>
        </WidthLimit>
      </Container>
    </>
  );
}

export default MobileHeader;

const EmptyBox = styled.div`
  display: none;
  height: 64px;

  @media screen and (max-width: 767px) {
    display: flex;
  }
`;

const Container = styled.div`
  position: fixed;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: 0;
  z-index: 99;
  background-color: white;

  @media screen and (max-width: 767px) {
    display: flex;
  }
`;

const WidthLimit = styled.div`
  width: calc(100% - 30px);
`;

const Logo = styled.div`
  display: flex;
  margin: 18px 0 15px;
  font-weight: bold;
  font-size: 24px;
  color: orange;
  text-decoration: overline;

  a {
    color: orange;
  }

  & strong {
    color: #927650;
  }
`;

const CartBox = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  font-size: 24px;
  margin-top: 10px;
  padding-right: 10px;
  font-weight: 500;

  & a {
    color: #333;
  }

  & span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    top: -6px;
    right: 0;
    background: #ff7d11;
    border-radius: 50%;
    font-size: 10px;
    color: white;
    padding: 1px 1px 0 0;
  }
`;
