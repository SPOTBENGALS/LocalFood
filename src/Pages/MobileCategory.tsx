import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { ReactComponent as MenuIcon01 } from "../Images/Icons/nav_icon01.svg";
import { ReactComponent as MenuIcon02 } from "../Images/Icons/nav_icon02.svg";
import { ReactComponent as MenuIcon03 } from "../Images/Icons/nav_icon03.svg";
import { ReactComponent as MenuIcon04 } from "../Images/Icons/nav_icon04.svg";
import { ReactComponent as MenuIcon05 } from "../Images/Icons/nav_icon05.svg";
import { ReactComponent as MenuIcon06 } from "../Images/Icons/nav_icon06.svg";
import { ReactComponent as MenuIcon07 } from "../Images/Icons/nav_icon07.svg";
import MobileNav from "Header/MobileNav";
import MobileHeader from "Header/MobileHeader";
import useStore from "Store/Storage";
import styled from "@emotion/styled";

function MobileCategory() {
  let setCurrentTitle = useStore((state) => state.setCurrentTitle);
  let setSearchedText = useStore((state) => state.setSearchedText);

  const [dropdown, setDropdown] = useState(false);

  function setList(e: string) {
    const inputValue: HTMLInputElement | null = document.querySelector(".inputElement");

    setSearchedText("");
    setCurrentTitle(e);
    if (inputValue) {
      inputValue.value = "";
    }
  }

  return (
    <>
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Menu>
            <button onClick={() => setDropdown(!dropdown)}>
              <h4>전체 카테고리</h4>
              <IoIosArrowDown className="icon" />
            </button>
            <DropDown block={dropdown ? "flex" : "none"}>
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
        </WidthLimit>
      </Container>
      <MobileNav />
    </>
  );
}

export default MobileCategory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: 0;
  z-index: 99;
  background-color: white;
`;

const WidthLimit = styled.div`
  width: calc(100% - 30px);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-weight: 500;
  border: 1px solid #eee;

  button,
  & > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    width: 92%;
    font-size: 16px;
    color: #333;
    border: 0;
    background-color: white;

    h4 {
      margin: 0;
      font-weight: 500;
    }

    .icon {
      display: flex;
      margin-top: 3px;
      margin-right: 10px;
    }
  }
`;

const DropDown = styled.div<{ block: string }>`
  display: ${(props) => props.block};
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: white;
  text-align: left;
  line-height: 30px;
  font-weight: normal;
  transition: 0.2s;

  & a {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 6px;
    width: 90%;
    color: #333;
    text-indent: 10px;
    border-top: 1px solid #eee;
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
