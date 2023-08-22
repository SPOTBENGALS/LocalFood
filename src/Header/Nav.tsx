import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "Store/Storage";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { ReactComponent as MenuIcon01 } from "../Images/Icons/nav_icon01.svg";
import { ReactComponent as MenuIcon02 } from "../Images/Icons/nav_icon02.svg";
import { ReactComponent as MenuIcon03 } from "../Images/Icons/nav_icon03.svg";
import { ReactComponent as MenuIcon04 } from "../Images/Icons/nav_icon04.svg";
import { ReactComponent as MenuIcon05 } from "../Images/Icons/nav_icon05.svg";
import { ReactComponent as MenuIcon06 } from "../Images/Icons/nav_icon06.svg";
import { ReactComponent as MenuIcon07 } from "../Images/Icons/nav_icon07.svg";
import styled from "@emotion/styled";

function Nav() {
  const login = useStore((state) => state.login);
  let setCurrentTitle = useStore((state) => state.setCurrentTitle);
  let setSearchedText = useStore((state) => state.setSearchedText);
  const cartAmount = useStore((state) => state.cartAmount);
  const setCartAmount = useStore((state) => state.setCartAmount);
  const cartItemList = useStore((state) => state.cartItemList);
  const navigate = useNavigate();

  const [searchText, setsearchText] = useState("");
  const [isSticky, setSticky] = useState(false);

  function setList(e: string) {
    const inputValue: HTMLInputElement | null = document.querySelector(".inputElement");

    setSearchedText("");
    setCurrentTitle(e);
    if (inputValue) {
      inputValue.value = "";
    }
  }

  function searchingText() {
    setCurrentTitle(searchText);
    setSearchedText(searchText);
  }

  function SearchingByEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchingText();
      if (window.location.pathname !== "/itemlist") {
        navigate("/itemlist");
      }
    }
  }

  useEffect(() => {
    let sum = 0;
    cartItemList.forEach((item) => {
      sum += item.selectedAmount;
    });

    setCartAmount(sum);
  }, [cartItemList, setCartAmount]);

  useEffect(() => {
    const scroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition >= 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <>
      <NavContainer
        role="button"
        sticky={isSticky === true ? "fixed" : ""}
        border={isSticky === true ? "1px solid #eee" : ""}
      >
        <WidthLimit>
          <Menu>
            <Link to="/itemlist" onClick={() => setList("전체 카테고리")}>
              <GiHamburgerMenu className="icon" />
              <h4>전체 카테고리</h4>
            </Link>
            <DropDown>
              <Link to="/itemlist" onClick={() => setList("계란")}>
                <MenuIcon01 />
                계란
              </Link>
              <Link to="/itemlist" onClick={() => setList("채소")}>
                <MenuIcon02 />
                채소
              </Link>
              <Link to="/itemlist" onClick={() => setList("과일")}>
                <MenuIcon03 />
                과일
              </Link>
              <Link to="/itemlist" onClick={() => setList("가공식품")}>
                <MenuIcon04 />
                가공식품
              </Link>
              <Link to="/itemlist" onClick={() => setList("쌀/잡곡")}>
                <MenuIcon05 />
                쌀/잡곡
              </Link>
              <Link to="/itemlist" onClick={() => setList("반찬/간편식")}>
                <MenuIcon06 />
                반찬/간편식
              </Link>
              <Link to="/itemlist" onClick={() => setList("수산물")}>
                <MenuIcon07 />
                수산물
              </Link>
            </DropDown>
          </Menu>
          <Menu>
            <Link to="/itemlist" onClick={() => setList("베스트상품")}>
              베스트상품
            </Link>
          </Menu>
          <Menu>
            <Link to="/itemlist" onClick={() => setList("묶음상품")}>
              묶음상품
            </Link>
          </Menu>
          <Menu className="community">
            <Link to="/recipe">커뮤니티</Link>
            <DropDown>
              <Link to="/recipe">레시피</Link>
              <Link to="/review">상품 후기</Link>
              <Link to="/applye">상품 응모</Link>
              <Link to="/event">이벤트</Link>
            </DropDown>
          </Menu>
          <SearchBox>
            <input
              className="inputElement"
              placeholder="검색어를 입력하세요."
              onChange={(e) => setsearchText(e.target.value)}
              onKeyDown={SearchingByEnter}
            />
            <Link to="/itemlist" onClick={searchingText}>
              <LuSearch className="icon" />
            </Link>
          </SearchBox>
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
      </NavContainer>
    </>
  );
}

export default Nav;

const NavContainer = styled.div<{ sticky: string; border: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: ${(props) => props.sticky};
  top: 0;
  z-index: 99;
  background-color: white;
  border-bottom: ${(props) => props.border};

  @media screen and (max-width: 767px) {
    position: unset;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px 15px 0;
  font-weight: 500;

  & > a {
    display: flex;
    font-size: 18px;
    color: #333;
    transition: 0.2s;

    &:hover {
      color: #ff7d11;
    }

    .icon {
      margin-top: 3px;
    }

    h4 {
      margin: 0;
      text-indent: 10px;
    }
  }

  &:hover div {
    display: flex;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 99;
  top: 55px;
  left: -1px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 5px 0;
  border: 1px solid #ccc;
  background: white;
  box-sizing: content-box;
  text-align: left;
  line-height: 30px;
  font-weight: normal;

  & a {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 15px;
    color: #333;
    text-indent: 5px;
    font-size: 14px;

    svg {
      width: 30px;
      fill: #666;
    }

    &:hover {
      color: #ff9741;

      svg {
        fill: #ff7d11;
      }
    }
  }
`;

const SearchBox = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0;
  height: 33px;
  border: 2px solid #ff7d11;

  & input {
    width: 220px;
    height: 30px;
    border: 0;
    text-indent: 10px;

    &:focus {
      outline: 0;
    }
  }

  a {
    border: 0;
    background: #ff7d11;

    & .icon {
      margin: 5px 3px;
      padding: 0 6px;
      color: white;
      font-size: 22px;
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const CartBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-right: 10px;
  font-weight: 500;
  font-size: 30px;

  & a {
    color: #333;
  }

  & span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    top: -8px;
    right: 0;
    background: #ff7d11;
    border-radius: 50%;
    font-size: 12px;
    color: white;
    padding: 1px 1px 0 0;
  }

  @media screen and (max-width: 767px) {
    position: fixed;
    top: 8px;
    right: 10px;
    font-size: 24px;

    & span {
      width: 15px;
      height: 15px;
      top: -6px;
      font-size: 10px;
    }
  }
`;
