import Header from "Header/Header";
import Footer from "Footer/Footer";
import Submenu from "./Parts/Submenu";
import BoardList from "../Components/BoardList";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { FAQDATA } from "Store/BoardData";

function FAQ() {
  const priorNotices = FAQDATA.filter((notice) => notice.topOption === true);
  const ordinaryNotices = FAQDATA.filter((notice) => notice.topOption === false);
  const list = [...priorNotices, ...ordinaryNotices];

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title="고객센터" link="/faq" />
          <BoardContainer>
            <h2>
              FAQ <span>고객님들께서 많이 궁금해하시는 질문과 답변입니다.</span>
            </h2>
            <BoardList title="FAQ" link="/faq/" postList={list} />
          </BoardContainer>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default FAQ;

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
