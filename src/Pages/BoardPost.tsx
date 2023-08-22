import { useParams } from "react-router-dom";
import Header from "Header/Header";
import Footer from "Footer/Footer";
import Submenu from "Pages/Parts/Submenu";
import GoBackButton from "../Components/GoBackButton";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import styled from "@emotion/styled";
import { NOTICEDATA, RECIPEDATA, REVIEWDATA, APPLYEVENTDATA, EVENTDATA } from "Store/BoardData";

function BoardPost({ title }: { title: string }) {
  const { id } = useParams();
  const postId = id as unknown as string;
  let post = NOTICEDATA.filter((post) => post.id.toString() === postId)[0];
  let descript = "로컬푸드 소식을 공지드립니다.";
  let submenu = "고객센터";
  let selectedLink = "/notice";

  switch (title) {
    case "공지사항":
      submenu = "고객센터";
      selectedLink = "/notice";
      post = NOTICEDATA.filter((post) => post.id.toString() === postId)[0];
      descript = "로컬푸드 소식을 공지드립니다.";
      break;

    case "레시피":
      submenu = "커뮤니티";
      selectedLink = "/recipe";
      post = RECIPEDATA.filter((post) => post.id.toString() === postId)[0];
      descript = "로컬푸드 소식을 공지드립니다.";
      break;

    case "상품후기":
      submenu = "커뮤니티";
      selectedLink = "/review";
      post = REVIEWDATA.filter((post) => post.id.toString() === postId)[0];
      descript = "고객님들께서 남기신 후기들 중 베스트를 뽑아 보여드립니다. ";
      break;
    case "상품응모":
      submenu = "커뮤니티";
      selectedLink = "/applye";
      post = APPLYEVENTDATA.filter((post) => post.id.toString() === postId)[0];
      descript = "응모 이벤트가 진행 중인지 확인 후 응모해주세요.";
      break;
    case "이벤트":
      submenu = "커뮤니티";
      selectedLink = "/event";
      post = EVENTDATA.filter((post) => post.id.toString() === postId)[0];
      descript = "";
      break;
  }

  function splitContent(content: string) {
    return content.split("\n").map((line, idx) => {
      return (
        <span key={line + idx}>
          {line}
          <br />
        </span>
      );
    });
  }

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <Submenu title={submenu} link={selectedLink} />
          <PostBox>
            <h2>
              {title} <span>{descript} </span>
            </h2>
            <Post>
              <thead>
                <tr>
                  <th>제목</th>
                  <td colSpan={3}>{post.title}</td>
                </tr>
                <tr>
                  <th>작성자</th>
                  <td>{post.writer}</td>
                  <th>작성일</th>
                  <td>{post.date.slice(0, 10)}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4}>
                    {title === "이벤트" ? (
                      <img src={post.content} alt="event" />
                    ) : (
                      <div>{splitContent(post.content)}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </Post>
            <GoBackButton buttonText="목록으로" />
          </PostBox>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default BoardPost;

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

const PostBox = styled.div`
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

const Post = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #eee;
    background-color: #fafafa;
    font-size: 14px;
    color: #333;

    th {
      padding: 10px 0;
      width: 20%;
      font-weight: normal;
    }

    td {
      padding: 10px 0;
      background-color: white;
      font-weight: normal;
      text-align: left;
      text-indent: 15px;
    }
  }

  tbody tr td {
    padding: 30px;
    width: 100%;
    border-bottom: 1px solid #eee;
    line-height: 25px;
    font-size: 14px;
    text-align: left;

    img {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 767px) {
    thead tr {
      font-size: 13px;

      td {
        text-indent: 10px;
      }
    }

    tbody tr td {
      padding: 15px;
    }
  }
`;
