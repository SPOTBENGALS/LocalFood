import { Link } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";
import styled from "@emotion/styled";

function MobileNav() {
  return (
    <>
      <MobileMenu>
        <Link to="/">
          <RiHome4Line className="icon" />
        </Link>
        <Link to="/mobilecategory">
          <GiHamburgerMenu className="icon" />
        </Link>
        <Link to="/mobilesearch">
          <LuSearch className="icon" />
        </Link>
        <Link to="/mobilemenu">
          <AiOutlineUser className="icon" />
        </Link>
      </MobileMenu>
    </>
  );
}

export default MobileNav;

const MobileMenu = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  display: none;
  justify-content: space-evenly;
  padding: 12px 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #eee;

  a {
    display: flex;
    font-size: 12px;
    color: #000;
  }

  .icon {
    padding: 3px;
    font-size: 21px;
    color: #666;
  }

  @media screen and (max-width: 767px) {
    display: flex;
  }
`;
