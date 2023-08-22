import Footer from "Footer/Footer";
import Header from "Header/Header";
import Submenu from "./Parts/Submenu";
import Board from "../Components/BoardList";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { REVIEWDATA } from "Store/BoardData";

function Review() {
  const priorNotices = REVIEWDATA.filter((notice) => notice.topOption === true);
  const ordinaryNotices = REVIEWDATA.filter((notice) => notice.topOption === false);
  const list = [...priorNotices, ...ordinaryNotices];

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title="커뮤니티" link="/review" />
          <BoardContainer>
            <h2>
              상품후기 <span>고객님들의 후기 중 베스트 후기를 보여드립니다. </span>
            </h2>
            <Board title="상품후기" link="/review/" postList={list} />
          </BoardContainer>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default Review;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 60px 0;

  @media screen and (max-width: 767px) {
    padding: 0 0 40px;
  }
`;

const WidthLimit = styled.div`
  display: flex;
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 80%;

  h2 {
    font-weight: 500;

    span {
      margin-left: 5px;
      font-size: 14px;
      font-weight: normal;
      color: #ccc;
    }
  }

  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
    padding: 0 10px;

    h2 {
      font-size: 18px;

      span {
        font-size: 13px;
      }
    }
  }
`;
