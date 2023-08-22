import { useState } from "react";
import Header from "Header/Header";
import Footer from "Footer/Footer";
import Submenu from "./Parts/Submenu";
import Board from "../Components/BoardList";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { APPLYEVENTDATA } from "Store/BoardData";
import { TfiClose } from "react-icons/tfi";

function ApplyEvent() {
  const priorNotices = APPLYEVENTDATA.filter((notice) => notice.topOption === true);
  const ordinaryNotices = APPLYEVENTDATA.filter((notice) => notice.topOption === false);
  let list = [...priorNotices, ...ordinaryNotices];
  const [createModal, setCreateModal] = useState(false);
  const [applyContent, setApplyContent] = useState("");
  const [applyTitle, setApplyTitle] = useState("");
  const [listProps, setListProps] = useState(list);

  function createModalHandler() {
    setCreateModal(true);
  }

  function closeModal() {
    setCreateModal(false);
  }

  function createNewInquiry() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    if (applyContent.length >= 5 && applyContent.length <= 30) {
      if (applyTitle.length < 1) {
        alert("응모 제목을 입력해주세요.");
      } else {
        ordinaryNotices.unshift({
          id: ordinaryNotices[0].id + 1,
          sort: "",
          title: applyTitle,
          topOption: false,
          content: applyContent,
          writer: "user",
          date: year + "." + month + "." + date,
        });
        list = [...priorNotices, ...ordinaryNotices];
        setListProps(list);
        setApplyTitle("");
        setApplyContent("");
        alert("문의가 등록되었습니다.");
        setCreateModal(false);
      }
    } else {
      alert("응모글을 3~30글자로 작성해주세요.");
    }
  }

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title="커뮤니티" link="/applye" />
          <BoardContainer>
            <h2>
              상품응모 <span>응모 이벤트가 진행 중인지 확인 후 응모해주세요.</span>
            </h2>
            <CreateButton onClick={createModalHandler}>응모하기</CreateButton>
            <Board title="상품응모" link="/applye/" postList={listProps} />
            {createModal ? (
              <CreateModal>
                {" "}
                <h4>
                  응모하기
                  <p>최소 3글자 최대 30글자로 응모글을 남겨주시길 바랍니다.</p>
                  <span className="delete">
                    <TfiClose onClick={closeModal} />
                  </span>
                </h4>
                <InputBox>
                  <input type="text" onChange={(e) => setApplyTitle(e.target.value)} placeholder="응모 게시글 제목" />
                  <input
                    type="text"
                    onChange={(e) => setApplyContent(e.target.value)}
                    placeholder="응모하실 상품 또는 내용을 입력해주세요."
                  />
                  <button onClick={createNewInquiry}>응모하기</button>
                </InputBox>
              </CreateModal>
            ) : (
              ""
            )}
          </BoardContainer>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default ApplyEvent;

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
  position: relative;
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
    padding: 0 10px;
    width: calc(100% - 20px);

    h2 {
      font-size: 18px;
      letter-spacing: -0.5px;

      span {
        font-size: 13px;
      }
    }
  }
`;

const CreateButton = styled.button`
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  padding: 10px 15px;
  background-color: #ff8b2b;
  border: 0;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    top: unset;
    right: 10px;
    bottom: 100px;

    h2 {
      font-size: 18px;
      letter-spacing: -0.5px;

      span {
        font-size: 13px;
      }
    }
  }
`;

const CreateModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  background-color: white;
  border: 1px solid #ccc;

  h4 {
    display: flex;
    align-items: baseline;
    margin: 0;
    padding: 20px;
    width: calc(100% - 40px);
    border-bottom: 1px solid #ccc;

    p {
      margin: 0 0 0 10px;
      font-size: 14px;
      font-weight: normal;
      color: #999;
    }

    span {
      display: flex;
      margin-left: auto;
      padding: 5px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 767px) {
    top: 80%;
    width: 90%;

    h4 {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 15px;
      width: calc(100% - 30px);

      p {
        margin: 10px 0 0 0;
        font-size: 13px;
        letter-spacing: -0.5px;
        text-align: left;
      }

      span {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;

  input {
    margin-right: 5px;
    width: 50%;
    height: 40px;
    border: 1px solid #ccc;
    text-indent: 10px;

    &:focus-visible {
      outline: 0;
    }

    &:first-of-type {
      width: 25%;
    }
  }

  button {
    width: 15%;
    background-color: #ff8b2b;
    color: white;
    border: 0;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 12px 0;
    width: 90%;

    input {
      margin-bottom: 10px;
      width: 100%;
      height: 35px;

      &:first-of-type {
        width: 100%;
      }
    }

    button {
      padding: 10px 0;
      margin-bottom: 10px;
      width: 100%;
    }
  }
`;
