import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "Header/Header";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import Footer from "Footer/Footer";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const setLogin = useStore((state) => state.setLogin);
  const isIDSaved = localStorage.getItem("IDSave") === "true";

  let SavedID = "";
  if (localStorage.getItem("IDSavedValue") !== null || isIDSaved) {
    SavedID = localStorage.getItem("IDSavedValue") as string;
  }

  const [checked, setChecked] = useState(isIDSaved);
  const [IDInputValue, setIDInputValue] = useState(SavedID);
  const [PWInputValue, setPWInputValue] = useState("");
  const [PWView, setPWView] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");

  function noticeFailed(e: React.MouseEvent) {
    e.preventDefault();
    alert(noticeMessage);
  }

  useEffect(() => {
    if (checked) {
      localStorage.setItem("IDSave", "true");
      localStorage.setItem("IDSavedValue", IDInputValue);
    } else {
      localStorage.setItem("IDSave", "false");
      localStorage.setItem("IDSavedValue", "");
    }
  }, [IDInputValue, checked]);

  useEffect(() => {
    if (PWInputValue.length === 0) {
      setNoticeMessage("비밀번호를 입력해주세요.");
    } else if (IDInputValue.length === 0) {
      if (SavedID !== "") {
        setNoticeMessage("");
      }
      setNoticeMessage("아이디를 입력해주세요.");
    } else {
      setNoticeMessage("");
    }

    if (noticeMessage === "") {
      setLoginChecked(true);
    } else {
      setLoginChecked(false);
    }
  }, [IDInputValue, PWInputValue, SavedID, noticeMessage]);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <h2>로그인</h2>
          <LoginBox>
            <IDInput
              onChange={(e) => setIDInputValue(e.target.value)}
              defaultValue={isIDSaved ? SavedID : ""}
              placeholder="아이디를 입력해주세요."
            />
            {PWView ? (
              <PWInput
                type="text"
                onChange={(e) => setPWInputValue(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
              />
            ) : (
              <PWInput
                type="password"
                onChange={(e) => setPWInputValue(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
                autoComplete="off"
              />
            )}

            <SubFunctions>
              <PWViewIcon color={PWView ? "#666" : "#ccc"}>
                {PWView ? <FaEye onClick={() => setPWView(false)} /> : <FaEyeSlash onClick={() => setPWView(true)} />}
              </PWViewIcon>
              <SaveID onClick={() => setChecked(!checked)} color={checked ? "#ff7d11" : "#eee"}>
                {checked ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />} 아이디 저장
              </SaveID>
              <FindAccount>
                <Link to="/">아이디찾기 </Link> <span>|</span> <Link to="/"> 비밀번호찾기</Link>
              </FindAccount>
            </SubFunctions>
            {loginChecked ? (
              <LoginButton to="/" onClick={() => setLogin(true)}>
                로그인
              </LoginButton>
            ) : (
              <LoginButton to="/login" onClick={(e) => noticeFailed(e)}>
                로그인
              </LoginButton>
            )}
            <SignUpButton to="/signup">회원가입</SignUpButton>
          </LoginBox>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 100px 0;
`;

const WidthLimit = styled.div`
  width: 300px;
`;

const LoginBox = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  input {
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ccc;

    &:focus {
      outline: 0;
    }
  }
`;

const IDInput = styled.input`
  display: flex;
`;

const PWInput = styled.input`
  display: flex;
`;

const SubFunctions = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const PWViewIcon = styled.span<{ color: string }>`
  position: absolute;
  top: -42px;
  right: 20px;
  color: ${(props) => props.color};
`;

const SaveID = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;

const FindAccount = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 13px;
    color: #333;
  }

  span {
    padding: 5px;
    color: #ccc;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #ff7d11;
  color: white;
`;

const SignUpButton = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ff7d11;
  color: #ff7d11;
`;
