import { useState } from "react";
import { Link } from "react-router-dom";
import { BOARDDATATYPE } from "Store/BoardData";
import SetPagination from "./SetPagination";
import styled from "@emotion/styled";

function BoardList({ title, link, postList }: { title: string; link: string; postList: BOARDDATATYPE }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPost, setShowPort] = useState({
    selectedId: 0,
    show: false,
  });

  function toggleContent(postId: number) {
    if (postId === showPost.selectedId && showPost.show === true) {
      setShowPort({
        selectedId: postId,
        show: false,
      });
    } else {
      setShowPort({
        selectedId: postId,
        show: true,
      });
    }
  }

  return (
    <>
      <BoardBox>
        <ListHead>
          <ListRow className="row">
            <TH width="10%">No.</TH>
            {title === "FAQ" ? <TH width="15%">분류</TH> : ""}
            <TH width="55%">제목</TH>
            {title === "FAQ" ? "" : <TH width="15%">작성자</TH>}
            {title === "FAQ" ? "" : <TH width="20%">작성일</TH>}
          </ListRow>
        </ListHead>
        <ListBody>
          {postList.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10).map((post) => {
            return (
              <div key={post.id}>
                <ListRow className={post.topOption ? "previous row" : "row"}>
                  <TD width="10%">{post.topOption ? "공지" : post.id}</TD>
                  {title === "FAQ" ? <TD width="15%">{post.sort}</TD> : ""}
                  <TD className="title" width={title === "FAQ" ? "80%" : "55%"}>
                    {title === "FAQ" || title === "1:1 문의" ? (
                      <button onClick={() => toggleContent(post.id)}>{post.title}</button>
                    ) : (
                      <Link to={link + post.id}>{post.title}</Link>
                    )}
                  </TD>
                  {title === "FAQ" ? "" : <TD width="15%">{post.writer}</TD>}
                  {title === "FAQ" ? "" : <TD width="20%">{post.date}</TD>}
                </ListRow>
                <ListRow>
                  {showPost.show && showPost.selectedId === post.id ? (
                    <DropDownPost>
                      <AnswerBox>
                        {post.content === "" ? (
                          <span className="noAnswer">아직 답변이 달리지 않았습니다.</span>
                        ) : (
                          <mark className="answerMark">A</mark>
                        )}

                        <TextBox>
                          {post.content.split("\n").map((line) => {
                            return (
                              <span className="answerText" key={line}>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                        </TextBox>
                      </AnswerBox>
                    </DropDownPost>
                  ) : (
                    ""
                  )}
                </ListRow>
              </div>
            );
          })}
          {postList.length === 0 ? <NoPost>현재 등록된 게시글이 없습니다.</NoPost> : ""}
        </ListBody>
      </BoardBox>
      <SetPagination
        totalPageCount={Math.ceil(postList.length / 10)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default BoardList;

const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const ListHead = styled.div`
  display: flex;

  .row {
    display: flex;
    width: 100%;
    background-color: #fafafa;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
`;

const ListBody = styled.div`
  .row {
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;

  &.previous {
    a {
      color: #ff8b2b;
    }
  }
`;

const TH = styled.div<{ width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: ${(props) => props.width};
  font-size: 14px;
  font-weight: normal;
  color: #333;

  @media screen and (max-width: 767px) {
    padding: 8px 0;
    font-size: 12px;
  }
`;

const TD = styled.div<{ width: string }>`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: ${(props) => props.width};
  font-size: 12px;
  color: #666;

  &.title {
    font-size: 14px;
    text-align: left;

    a {
      width: 100%;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button {
      width: 100%;
      background-color: white;
      border: 0;
      color: #333;
      font-size: 14px;
      text-align: left;
      cursor: pointer;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media screen and (max-width: 767px) {
    font-size: 11px;

    &:first-of-type {
      font-size: 10px;
    }
  }
`;

const DropDownPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f8f8f8;
`;

const AnswerBox = styled.div`
  display: flex;
  align-items: start;
  padding: 20px;
  font-size: 14px;

  mark {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
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

  .noAnswer {
    color: #999;
  }

  @media screen and (max-width: 767px) {
    padding: 10px;
    font-size: 13px;
    text-align: left;

    mark {
      margin-left: 5px;
      padding: 0;
      width: 22px;
      height: 20px;
      font-size: 8px;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 30px;
  font-size: 13px;
  line-height: 23px;
  color: #333;

  @media screen and (max-width: 767px) {
    width: 95%;
    padding-left: 10px;
    letter-spacing: -0.5px;
  }
`;

const NoPost = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  border-bottom: 1px solid #eee;
  color: #ccc;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
