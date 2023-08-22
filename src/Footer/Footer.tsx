import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AiFillYoutube } from "react-icons/ai";
import { BiLogoInstagramAlt, BiLogoFacebookCircle, BiLogoBlogger } from "react-icons/bi";
import FooterImg01 from "../Images/Logos/gongjeongwui.png";
import FooterImg02 from "../Images/Logos/logo_tosspay.svg";

function Footer() {
  return (
    <Container>
      <WidthLimit>
        <FooterBox>
          <LeftBox>
            <h3>재단법인 로컬푸드통합지원센터</h3>
            <h5>고객센터 : 1688-0000</h5>
            <h5>팩스 : 02-2208-0000</h5>
            <h5>대표자명 : 이푸드</h5>
            <h5>주소 : 로컬시 로컬동 로컬읍 푸드길 00 로컬푸드통합지원센터</h5>
            <p>
              사업자등록번호 : 000-00-00000 통신판매업신고 :제2019-로컬푸드-0078호 개인정보관리책임자 : 김로컬
              <br />
              @COPYRIGHT 재단법인 로컬푸드통합지원센터. ALLRIGHTS RESERVED
            </p>
          </LeftBox>
          <RightBox>
            <Links>
              <Link to="#">로컬푸드통합지원센터 · </Link>
              <Link to="#">이용약관 · </Link>
              <Link to="#">개인정보처리방침 · </Link>
              <Link to="#">이메일무단수집거부</Link>
            </Links>
            <Buttons>
              <Link to="#">공지사항</Link>
              <Link to="#">1:1 문의</Link>
            </Buttons>
            <Icons>
              <Link to="#">
                <AiFillYoutube />
              </Link>
              <Link to="#">
                <BiLogoInstagramAlt />
              </Link>
              <Link to="#">
                <BiLogoFacebookCircle />
              </Link>
              <Link to="#">
                <BiLogoBlogger />
              </Link>
            </Icons>
            <Icons>
              <img src={FooterImg01} alt="" />
              <img src={FooterImg02} alt="" />
            </Icons>
          </RightBox>
        </FooterBox>
      </WidthLimit>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 40px 0;
  background-color: #f8f8f8;

  @media screen and (max-width: 767px) {
    padding: 20px 0;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftBox = styled.div`
  width: 48%;
  text-align: left;
  color: #666;

  h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: normal;
  }

  h5 {
    margin: 8px 0;
    font-size: 12px;
    font-weight: normal;
  }

  p {
    padding-top: 20px;
    font-size: 11px;
    color: #aaa;
    line-height: 18px;
  }

  @media screen and (max-width: 767px) {
    width: 90%;

    h3 {
      font-size: 14px;
      color: #999;
    }

    h5 {
      line-height: 12px;
      font-size: 11px;
      color: #aaa;
    }

    p {
      padding-top: 0;
      font-size: 9px;
      color: #ccc;
    }
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 48%;

  @media screen and (max-width: 767px) {
    width: 90%;
    margin-bottom: 40px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    color: #333;
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    a {
      font-size: 12px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  a {
    margin: 15px 0;
    padding: 12px;
    width: 43%;
    border: 1px solid #999;
    background-color: white;
    color: #333;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 1px solid #999;
    border-radius: 50%;
    font-size: 21px;
    color: #999;
  }

  img {
    height: 40px;
    margin-right: 15px;
    padding: 0 5px;
    background-color: white;
    border: 1px solid #dddddd;
    box-sizing: border-box;
  }

  @media screen and (max-width: 767px) {
    margin-top: 15px;
    margin-bottom: 0;

    img {
      height: 30px;
    }
  }
`;
