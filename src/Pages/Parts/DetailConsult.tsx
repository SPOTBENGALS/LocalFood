import styled from "@emotion/styled";
import Masking from "Components/Masking";
import { useState } from "react";

function DetailConsult() {
  const questions = [
    {
      qustionId: 1,
      userId: "wldudwldud",
      title: "배송 문의",
      text: "지금 당장 빨리 너무 먹고싶어요!!!ㅠㅠ 배송 언제되나요?",
      date: "2023.7.14",
      answer: "",
      answerDate: "",
    },
    {
      qustionId: 2,
      userId: "ksdlfjei",
      title: "교환 문의",
      text: "식재료도 교환이 되나요?",
      date: "2023.7.11",
      answer: "재판매 불가한 상품의 특성상, 단순 변심, 주문 착오 시 교환 및 반품이 어려운 점 양해부탁드립니다.",
      answerDate: "2023.7.12",
    },
    {
      qustionId: 3,
      userId: "eiw00ls",
      title: "다 좋은데",
      text: "아이스팩 하나만 더 넣어주시면 안되요?",
      date: "2023.7.09",
      answer: "죄송하지만, 택배 상품의 중량과 수량에 따라 아이스팩을 제공해드리고 있습니다. ",
      answerDate: "2023.7.10",
    },
  ];
  const [questionDetail, setQuestionDetail] = useState({
    selectedId: 0,
    show: false,
  });

  function ToggleContent(questionId: number) {
    if (questionId === questionDetail.selectedId && questionDetail.show === true) {
      setQuestionDetail({
        selectedId: questionId,
        show: false,
      });
    } else {
      setQuestionDetail({
        selectedId: questionId,
        show: true,
      });
    }
  }

  return (
    <DetailQuestionBox>
      <QuestionHeader>
        총 {questions.length}개<p>상품과 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고없이 삭제됩니다.</p>
      </QuestionHeader>
      <QuestionList>
        {questions.length === 0 ? <NoQuestion>등록된 문의가 없습니다.</NoQuestion> : ""}
        {questions.map((question, idx) => {
          return (
            <QuestionnAnswer key={idx}>
              <Question>
                <div className="user">{Masking(question.userId)}</div>
                <QuestionTitle role="button" onClick={() => ToggleContent(question.qustionId)}>
                  {question.title}
                </QuestionTitle>
                <QuestionDate>
                  <span>{question.date}</span>
                </QuestionDate>
              </Question>

              {questionDetail.show && questionDetail.selectedId === question.qustionId ? (
                question.answer !== "" ? (
                  <Answer>
                    <div>
                      <mark>Q</mark>
                      {question.text}
                    </div>
                    <div>
                      <mark className="answerMark">A</mark>
                      {question.answer}
                      <span>{question.answerDate}</span>
                    </div>
                  </Answer>
                ) : (
                  <Answer>
                    <div>
                      <mark>Q</mark>
                      {question.text}
                    </div>
                  </Answer>
                )
              ) : (
                ""
              )}
            </QuestionnAnswer>
          );
        })}
      </QuestionList>
    </DetailQuestionBox>
  );
}

export default DetailConsult;

const DetailQuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px 0;
  width: 100%;

  @media screen and (max-width: 767px) {
    align-items: center;
    padding: 20px 10px;
    width: calc(100% - 20px);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  p {
    font-size: 14px;
    color: #666;
  }

  @media screen and (max-width: 767px) {
    font-size: 14px;
    text-align: left;

    p {
      font-size: 12px;
      letter-spacing: 0.5px;
      line-height: 20px;
      word-break: keep-all;
    }
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  width: 100%;
`;

const QuestionnAnswer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-top: 1px solid #eee;

  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 14px;

  .user {
    display: flex;
    justify-content: start;
    width: 15%;
    font-weight: 500;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 10px 5px;
    margin-bottom: 0;
    line-height: 20px;

    .user {
      width: 100%;
    }
  }
`;

const QuestionTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0;
  width: 70%;
  text-align: left;

  @media screen and (max-width: 767px) {
    margin: 5px 0;
    width: 100%;
  }
`;

const QuestionDate = styled.div`
  display: flex;
  justify-content: end;

  span {
    font-size: 12px;
    color: #ccc;
  }
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 14px;
    background-color: #f8f8f8;

    mark {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background-color: #ff7d11;
      font-size: 12px;
      color: white;

      &.answerMark {
        background-color: #927650;
      }
    }

    span {
      margin-left: auto;
      font-size: 12px;
      color: #999;
    }
  }
`;

const NoQuestion = styled.div`
  padding: 10px 0;
  color: #aaa;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
