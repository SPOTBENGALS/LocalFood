import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import useStore from "Store/Storage";

function Submenu({ title, link }: { title: string; link: string }) {
  const login = useStore((state) => state.login);

  let submenuList = [
    { title: "공지사항", link: "/notice" },
    { title: "FAQ", link: "/faq" },
    { title: "1:1 문의", link: "/inquiry" },
  ];
  if (title === "커뮤니티") {
    submenuList = [
      { title: "레시피", link: "/recipe" },
      { title: "상품후기", link: "/review" },
      { title: "상품응모", link: "/applye" },
      { title: "이벤트", link: "/event" },
    ];
  }

  return (
    <>
      <SubmenuBox>
        <h2>{title}</h2>
        {submenuList.map((list, idx) => {
          if (list.title === "1:1 문의") {
            if (login) {
              return (
                <SubmenuList to={list.link} key={idx + list.link} className={list.link === link ? "on" : ""}>
                  {list.title} <span>{">"}</span>
                </SubmenuList>
              );
            } else {
              return (
                <SubmenuList
                  to="/login"
                  key={idx + list.link}
                  onClick={() => alert("로그인이 필요한 서비스입니다.")}
                  className={list.link === link ? "on" : ""}
                >
                  {list.title} <span>{">"}</span>
                </SubmenuList>
              );
            }
          } else {
            return (
              <SubmenuList to={list.link} key={idx + list.link} className={list.link === link ? "on" : ""}>
                {list.title} <span>{">"}</span>
              </SubmenuList>
            );
          }
        })}
      </SubmenuBox>
    </>
  );
}

export default Submenu;

const SubmenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 20%;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SubmenuList = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 75%;
  border: 1px solid #ccc;
  border-bottom: 0;
  color: #000;

  &:last-of-type {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background-color: #fafafa;
  }

  &.on {
    color: #ff8b2b;
  }
`;
