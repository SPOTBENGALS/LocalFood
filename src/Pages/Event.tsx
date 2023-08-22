import { Link } from "react-router-dom";
import Header from "Header/Header";
import Footer from "Footer/Footer";
import Submenu from "./Parts/Submenu";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { EVENTDATA } from "Store/BoardData";

function Event() {
  const priorNotices = EVENTDATA.filter((notice) => notice.topOption === true);
  const ordinaryNotices = EVENTDATA.filter((notice) => notice.topOption === false);
  const list = [...priorNotices, ...ordinaryNotices];

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title="커뮤니티" link="/event" />
          <BoardContainer>
            <h2>이벤트</h2>
            <BoardBoxes>
              {list.map((box) => {
                return (
                  <Box key={box.id}>
                    <Link to={"/eventp/" + box.id}>
                      <img src={box.content} alt="event" />
                      {box.topOption ? <h3>{box.title}</h3> : <h3 className="normalWeight">{box.title}</h3>}
                      <p>{box.date}</p>
                    </Link>
                  </Box>
                );
              })}
            </BoardBoxes>
          </BoardContainer>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default Event;

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
  }

  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
    padding: 0 10px;

    h2 {
      margin: 10px 0 0;
      padding: 0 1%;
      width: 98%;
      font-size: 18px;
      text-align: left;
    }
  }
`;

const BoardBoxes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  gap: 20px;

  @media screen and (max-width: 767px) {
    width: 100%;
    gap: unset;
  }
`;

const Box = styled.div`
  display: flex;

  a {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 275px;
    border: 1px solid #eee;
    color: #333;

    img {
      width: 100%;
    }

    h3 {
      margin: 10px;
      font-size: 16px;

      &.normalWeight {
        font-weight: normal;
      }
    }

    p {
      margin: 10px;
      margin-top: 0;
      font-size: 13px;
      color: #999;
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 1% 15px;
    width: 48%;

    a {
      h3 {
        font-size: 14px;
        letter-spacing: -0.5px;
        text-align: left;

        &.normalWeight {
          font-weight: normal;
        }
      }

      p {
        font-size: 12px;
      }
    }
  }
`;
