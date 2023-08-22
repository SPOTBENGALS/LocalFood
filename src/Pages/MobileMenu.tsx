import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import styled from "@emotion/styled";
import MobileNav from "Header/MobileNav";
import MobileHeader from "Header/MobileHeader";
import Footer from "Footer/Footer";
import useStore from "Store/Storage";

function MobileMenu() {
  const login = useStore((state) => state.login);
  const setLogin = useStore((state) => state.setLogin);
  return (
    <>
      <MobileHeader />
      <Container>
        <WidthLimit>
          <UserInfo>
            <UserBox>
              {login ? (
                <>
                  <UserIcon>
                    <AiOutlineUser className="icon" />
                  </UserIcon>
                  <h4>김로컬님 환영합니다.</h4>
                </>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </UserBox>
          </UserInfo>
          <UserMenu>
            <hr />

            {login ? (
              <>
                <Menu className="gray">
                  <Link to="/mobilemenu">주문 내역</Link>
                </Menu>
                <Menu className="gray">
                  <Link to="/mobilemenu">구매 후기</Link>
                </Menu>
              </>
            ) : (
              ""
            )}

            <hr />

            <Menu>
              <Link to="/notice">공지사항</Link>
            </Menu>
            <Menu>
              <Link to="/faq">FAQ</Link>
            </Menu>

            <hr />

            <Menu>
              <Link to="/recipe">레시피</Link>
            </Menu>
            <Menu>
              <Link to="/review">상품 후기</Link>
            </Menu>
            <Menu>
              <Link to="/applye">상품 응모</Link>
            </Menu>
            <Menu>
              <Link to="/event">이벤트</Link>
            </Menu>

            <hr />

            {login ? (
              <>
                <Menu>
                  <Link to="/inquiry">1:1 문의</Link>
                </Menu>
                <Menu className="gray">
                  <Link to="/mobilemenu">배송지 관리</Link>
                </Menu>
                <Menu className="gray">
                  <Link to="/mobilemenu">개인정보 수정</Link>
                </Menu>
                <hr />
                <Menu>
                  <Link to="/" onClick={() => setLogin(false)}>
                    로그아웃
                  </Link>
                </Menu>
              </>
            ) : (
              ""
            )}
          </UserMenu>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default MobileMenu;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 100%;
`;

const WidthLimit = styled.div`
  width: calc(100% - 30px);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  h4 {
    margin: 0;
    font-weight: 500;
  }

  a {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding: 10px;
    width: 50%;
    background-color: #ff8b2b;
    border: 0;
    font-size: 18px;
    color: white;
  }
`;

const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  padding: 10px;
  background-color: #e5d9c9;
  border: 1px solid #927650;
  border-radius: 50%;
  font-size: 30px;
  color: #927650;
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;

  hr {
    border: 1px solid #fff;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  font-weight: 500;
  border: 1px solid #eee;
  background-color: white;

  & > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    width: calc(100% - 20px);
    font-size: 16px;
    color: #333;
    border: 0;
  }

  &.gray {
    a {
      color: #aaa;
      font-weight: normal;
    }
  }
`;
