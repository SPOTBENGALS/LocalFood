import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import useStore from "Store/Storage";
import Nav from "./Nav";

function Header() {
  const login = useStore((state) => state.login);
  const setLogin = useStore((state) => state.setLogin);
  return (
    <Container>
      <Notice>로컬푸드는 매주 화요일, 금요일에 배송됩니다.</Notice>
      <WidthLimit>
        <SiteMap>
          {login ? (
            <Menu to="/" onClick={() => setLogin(false)}>
              로그아웃
            </Menu>
          ) : (
            <>
              <Menu to="/signup">회원가입</Menu>
              <Menu to="/login">로그인</Menu>
            </>
          )}
          <MenuDiv>
            고객센터
            <DropDown>
              <Link to="/notice">공지사항</Link>
              <Link to="/faq">FAQ</Link>
              {login ? <Link to="/inquiry">1:1 문의</Link> : <Link to="/login">1:1 문의</Link>}
            </DropDown>
          </MenuDiv>
        </SiteMap>
        <Logo>
          <Link to="/">
            LOCAL<strong>FOOD</strong>
          </Link>
        </Logo>
      </WidthLimit>
      <Nav />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Notice = styled.div`
  width: 100%;
  padding: 5px 0;
  background-color: #ff7d11;
  color: white;
  font-size: 14px;
`;

const WidthLimit = styled.div`
  width: 1100px;
`;

const SiteMap = styled.ul`
  display: flex;
  justify-content: end;
`;

const Menu = styled(Link)`
  position: relative;
  display: flex;
  padding: 5px 15px;
  border-right: 1px solid #ccc;
  font-size: 12px;
  transition: 0.3s;
  color: #000;

  &:hover {
    background-color: #eee;
  }
`;

const MenuDiv = styled.div`
  position: relative;
  display: flex;
  padding: 5px 15px;
  border-right: 1px solid #ccc;
  font-size: 12px;
  transition: 0.3s;
  color: #000;
  border: 0;
  cursor: pointer;

  &:hover div {
    display: flex;
  }
`;

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 999;
  top: 24px;
  left: -1px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 1px solid #ccc;
  box-sizing: border-box;

  & a {
    padding: 10px;
    color: #333;
    text-align: center;
    transition: 0.2s;

    &:hover {
      color: #ff7d11;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 56px;
  color: orange;
  text-decoration: overline;

  a {
    color: orange;
  }

  & strong {
    color: #927650;
  }
`;
