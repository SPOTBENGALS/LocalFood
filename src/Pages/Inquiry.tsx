import { useState } from "react";
import Header from "Header/Header";
import Footer from "Footer/Footer";
import Submenu from "./Parts/Submenu";
import BoardList from "../Components/BoardList";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { INQUIRYDATA } from "Store/BoardData";
import { TfiClose } from "react-icons/tfi";

function Inquiry() {
  const priorNotices = INQUIRYDATA.filter((notice) => notice.topOption === true);
  const ordinaryNotices = INQUIRYDATA.filter((notice) => notice.topOption === false);
  const list = [...priorNotices, ...ordinaryNotices];
  const [createModal, setCreateModal] = useState(false);
  const [inquiryInputValue, setInquiryInputValue] = useState("");
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

    if (inquiryInputValue.length >= 10 && inquiryInputValue.length <= 50) {
      list.unshift({
        id: list[0].id + 1,
        sort: "",
        title: inquiryInputValue,
        topOption: false,
        content: "",
        writer: "user",
        date: year + "." + month + "." + date,
      });
      setListProps(list);
      setInquiryInputValue("");
      alert("문의가 등록되었습니다.");
      setCreateModal(false);
    } else {
      alert("문의글을 10~50글자로 작성해주세요.");
    }
  }
  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title="고객센터" link="/inquiry" />
          <BoardContainer>
            <h2>
              1:1 문의 <span>문의량이 많을 경우 답변은 24시간 이상 소요될 수 있습니다.</span>
            </h2>
            <CreateButton onClick={createModalHandler}>문의하기</CreateButton>
            <BoardList title="1:1 문의" link="/inquiry/" postList={listProps} />
            {createModal ? (
              <CreateModal>
                {" "}
                <h4>
                  문의 등록
                  <p>최소 10글자 최대 50글자로 문의를 남겨주시길 바랍니다.</p>
                  <span className="delete">
                    <TfiClose onClick={closeModal} />
                  </span>
                </h4>
                <InputBox>
                  <input type="text" onChange={(e) => setInquiryInputValue(e.target.value)} />
                  <button onClick={createNewInquiry}>문의 등록</button>
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

export default Inquiry;

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
    width: 75%;
    height: 40px;
    border: 1px solid #ccc;
    text-indent: 10px;

    &:focus-visible {
      outline: 0;
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
    padding: 12px 0;

    input {
      width: 70%;
      height: 35px;
    }

    button {
      width: 20%;
    }
  }
`;
