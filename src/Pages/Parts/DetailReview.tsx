import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";
import Masking from "Components/Masking";
import { REVIEWDATA } from "Store/ReviewData";

function DetailReview({ productIdN }: { productIdN: number }) {
  const reviews = REVIEWDATA.filter((review) => review.productId === productIdN);
  const [modal, setModal] = useState(false);

  function ToggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    if (modal) {
      document.body.setAttribute("style", "overflow:hidden;");
    } else {
      document.body.setAttribute("style", "");
    }
  }, [modal]);

  return (
    <DetailReviewBox>
      <ReviewHeader>
        총 {reviews.length}개<p>배송관련, 주문(취소/교환/환불) 관련 문의 및 요청 사항은 댓글 문의로 남겨주세요.</p>
      </ReviewHeader>
      <ReviewList>
        {reviews.length === 0 ? <NoReview>등록된 후기가 없습니다.</NoReview> : ""}
        {reviews.map((review) => {
          return (
            <Review key={review.userId}>
              <div className="user">{Masking(review.userId)}</div>
              <ReviewContents>
                <h5>{review.productName}</h5>
                <p>
                  {review.reviewtext.split("\n").map((line) => {
                    return (
                      <span className="reviewText" key={line}>
                        {line}
                        <br />
                      </span>
                    );
                  })}
                </p>
                {review.reviewImg !== "" ? (
                  <ReviewImgBox>
                    <img src={review.reviewImg} alt="" onClick={ToggleModal} />
                  </ReviewImgBox>
                ) : (
                  ""
                )}
              </ReviewContents>
              <ReviewDate>
                <span>{review.reviewTime}</span>
              </ReviewDate>
              {modal ? (
                <ImgModal>
                  <button onClick={ToggleModal}>
                    <MdClose />
                  </button>
                  <img src={review.reviewImg} alt="" />
                  <p>
                    {review.reviewtext.split("\n").map((line) => {
                      return (
                        <span className="reviewText" key={line}>
                          {line}
                          <br />
                        </span>
                      );
                    })}
                  </p>
                </ImgModal>
              ) : (
                ""
              )}
            </Review>
          );
        })}
      </ReviewList>
    </DetailReviewBox>
  );
}

export default DetailReview;

const DetailReviewBox = styled.div`
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

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  p {
    color: #666;
    font-size: 14px;
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

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  width: 100%;
`;

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-top: 1px solid #eee;
  font-size: 14px;

  .user {
    display: flex;
    justify-content: start;
    width: 15%;
    font-weight: 500;
  }

  &:first-of-type {
    border: 0;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 10px 5px;
    line-height: 20px;

    .user {
      width: 100%;
    }
  }
`;

const ReviewContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 70%;
  text-align: left;

  h5 {
    margin: 0;
    color: #aaa;
    font-weight: normal;
  }

  span {
    font-size: 14px;
    color: #333;
  }

  @media screen and (max-width: 767px) {
    width: 100%;

    p {
      margin: 5px 0;
    }
  }
`;

const ReviewImgBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
  overflow: hidden;

  img {
    width: 100%;
    cursor: pointer;
  }
`;

const ReviewDate = styled.div`
  display: flex;
  justify-content: end;

  span {
    font-size: 12px;
    color: #ccc;
  }
`;

const NoReview = styled.div`
  padding: 10px 0;
  color: #aaa;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const ImgModal = styled.div`
  position: fixed;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: end;
  top: calc(50% - 250px);
  left: calc(50% - 200px);
  width: 400px;
  border: 1px solid #ccc;
  background-color: white;

  img {
    width: 400px;
  }

  p {
    padding: 0 10px;
    width: calc(100% - 20px);
    text-align: left;
    font-size: 14px;
    line-height: 18px;
    color: #333;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 0;
    background-color: #fff;
    font-size: 28px;
    color: #999;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    top: calc(50%);
    left: calc(50%);
    transform: translate(-50%, -50%);
    width: 85%;

    img {
      width: 100%;
    }

    p {
      font-size: 15px;
      line-height: 21px;
    }
  }
`;
