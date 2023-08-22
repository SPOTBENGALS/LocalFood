import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "Footer/Footer";
import Header from "Header/Header";
import DaumPostcode from "react-daum-postcode";
import { TfiClose } from "react-icons/tfi";
import { AiFillCheckSquare, AiTwotoneCheckSquare } from "react-icons/ai";
import styled from "@emotion/styled";

interface DATATYPE {
  address: string;
}

function SignUp() {
  const [IDInputValue, setIDInputValue] = useState("");
  const [PWInputValue, setPWInputValue] = useState("");
  const [PWCheckInputValue, setPWCheckInputValue] = useState("");
  const [eMailInputValue, setEMailInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [numberInputValue, setNumberInputValue] = useState("");

  const [validateID, setValidateID] = useState(true);
  const [validatePW, setValidatePW] = useState(true);
  const [validatePWCheck, setValidatePWCheck] = useState(true);
  const [validateEMail, setValidateEMail] = useState(true);
  const [validateDuplicate, setValidateDuplicate] = useState(false);
  const [validateNumber, setValidateNumber] = useState(false);
  const [validateNumberCheck, setValidateNumberCheck] = useState(false);

  const [newAddressValue, setNewAddressValue] = useState("");
  const [findAddressModal, setFindAddressModal] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [agreementModalMode, setAgreementModalMode] = useState("terms");
  const [gender, setGender] = useState("default");

  const [isAllCheckedAgreement, setAllCheckedAgreement] = useState(false);
  const [agreementAge, setAgreementAge] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState(false);
  const [agreementRequired, setAgreementRequired] = useState(false);
  const [agreementSelected, setAgreementSelected] = useState(false);
  const [agreementMarketing, setAgreementMarketing] = useState(false);

  const [isAllCompleted, setAllCompleted] = useState(false);

  function checkValidateDuplicate(e: React.MouseEvent) {
    e.preventDefault();

    if (IDInputValue === "") {
      alert("아이디를 입력해주세요.");
    } else if (validateID === false) {
      alert("6자 이상의 영문 혹은 숫자를 조합해주세요.");
    } else {
      alert("사용 가능한 아이디입니다.");
      setValidateDuplicate(true);
    }
  }

  function checkNumber(e: React.MouseEvent) {
    e.preventDefault();

    if (validateNumber) {
      alert("인증이 완료되었습니다.");
      setValidateNumberCheck(true);
    } else {
      alert("11 자리 숫자로 입력해주세요.");
    }
  }

  function findAddressHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFindAddressModal(true);
  }

  function onCompletePost(data: DATATYPE) {
    setNewAddressValue(data.address);
    setFindAddressModal(false);
  }

  function closeModal() {
    setAgreementModal(false);
    setFindAddressModal(false);
  }

  function agreementAllHandler() {
    setAllCheckedAgreement(!isAllCheckedAgreement);

    if (isAllCheckedAgreement) {
      setAgreementAge(false);
      setAgreementTerms(false);
      setAgreementRequired(false);
      setAgreementSelected(false);
      setAgreementMarketing(false);
    } else if (isAllCheckedAgreement === false) {
      setAgreementAge(true);
      setAgreementTerms(true);
      setAgreementRequired(true);
      setAgreementSelected(true);
      setAgreementMarketing(true);
    }
  }

  function modalHandler(text: string, e: React.MouseEvent) {
    e.preventDefault();
    setAgreementModal(true);
    setAgreementModalMode(text);
  }

  function SignUpSubmit() {
    alert("회원가입을 축하합니다.");
  }

  function noticeFailed() {
    if (validateDuplicate === false) {
      alert("아이디 중복확인을 해주세요.");
    } else if (validateEMail === false) {
      alert("이메일을 입력해주세요.");
    } else if (validatePW === false) {
      alert("비밀번호를 확인해주세요.");
    } else if (validatePWCheck === false) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (nameInputValue === "") {
      alert("이름을 입력해주세요.");
    } else if (validateNumberCheck === false) {
      alert("휴대폰 인증을 해주세요. ");
    } else if (newAddressValue === "") {
      alert("주소를 입력해주세요.");
    } else if (!agreementAge || !agreementTerms || !agreementRequired) {
      alert("필수 약관에 동의해주세요.");
    }
  }

  useEffect(() => {
    const idCheck = /^[A-Za-z0-9]{6,}$/;

    if (idCheck.test(IDInputValue)) {
      setValidateID(true);
    } else {
      if (IDInputValue !== "") {
        setValidateID(false);
      } else {
        setValidateID(true);
      }
    }

    setValidateDuplicate(false);
  }, [IDInputValue]);

  useEffect(() => {
    const eMailCheck = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (eMailCheck.test(eMailInputValue)) {
      setValidateEMail(true);
    } else {
      if (eMailInputValue !== "") {
        setValidateEMail(false);
      } else {
        setValidateEMail(true);
      }
    }
  }, [eMailInputValue]);

  useEffect(() => {
    if (PWCheckInputValue === PWInputValue) {
      setValidatePWCheck(true);
    } else {
      if (PWCheckInputValue === "") {
        setValidatePWCheck(true);
      } else {
        setValidatePWCheck(false);
      }
    }
  }, [PWCheckInputValue, PWInputValue]);

  useEffect(() => {
    const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;

    if (pwCheck.test(PWInputValue)) {
      setValidatePW(true);
    } else {
      if (PWInputValue !== "") {
        setValidatePW(false);
      } else {
        setValidatePW(true);
      }
    }
  }, [PWInputValue]);

  useEffect(() => {
    const phoneNumberCheck = /^[0-9\b -]{11,11}$/;

    if (phoneNumberCheck.test(numberInputValue)) {
      setValidateNumber(true);
    } else {
      if (numberInputValue !== "") {
        setValidateNumber(false);
      } else {
        setValidateNumber(true);
      }
    }
  }, [numberInputValue]);

  useEffect(() => {
    if (agreementAge && agreementTerms && agreementRequired && agreementSelected && agreementMarketing) {
      setAllCheckedAgreement(true);
    } else {
      setAllCheckedAgreement(false);
    }
  }, [agreementAge, agreementMarketing, agreementRequired, agreementSelected, agreementTerms]);

  useEffect(() => {
    if (findAddressModal || agreementModal) {
      document.body.setAttribute("style", "overflow:hidden;");
    } else {
      document.body.setAttribute("style", "");
    }
  }, [findAddressModal, agreementModal]);

  useEffect(() => {
    if (
      agreementAge &&
      agreementTerms &&
      agreementRequired &&
      validateEMail &&
      validateDuplicate &&
      validateNumber &&
      validatePWCheck &&
      newAddressValue !== ""
    ) {
      setAllCompleted(true);
    } else {
      setAllCompleted(false);
    }
  }, [
    agreementAge,
    agreementRequired,
    agreementTerms,
    newAddressValue,
    validateDuplicate,
    validateEMail,
    validateNumber,
    validatePWCheck,
  ]);
  return (
    <>
      <Header />
      <Container>
        <WidthLimit>
          <h2>회원가입</h2>
          <SignUpBox>
            <Row>
              <Title>
                아이디 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="text"
                  onChange={(e) => setIDInputValue(e.target.value)}
                  placeholder="아이디를 입력해주세요."
                />
                {validateID ? "" : <p>6자 이상의 영문 혹은 숫자를 조합해주세요.</p>}
              </InputBox>
              <SubFunction color={validateDuplicate ? "#ccc" : "#ff8b2b"}>
                <button onClick={checkValidateDuplicate}>중복 확인</button>
              </SubFunction>
            </Row>
            <Row>
              <Title>
                이메일 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="text"
                  onChange={(e) => setEMailInputValue(e.target.value)}
                  placeholder="이메일을 입력해주세요."
                />
                {validateEMail ? "" : <p>올바른 이메일 형식을 입력해주세요.</p>}
              </InputBox>
            </Row>
            <Row>
              <Title>
                비밀번호 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="password"
                  onChange={(e) => setPWInputValue(e.target.value)}
                  placeholder="비밀번호를 입력해주세요."
                  autoComplete="off"
                />
                {validatePW ? "" : <p>특수문자, 영문, 숫자를 포함하여 8자에서 20자로 입력해주세요.</p>}
              </InputBox>
            </Row>
            <Row>
              <Title>
                비밀번호 확인 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="password"
                  onChange={(e) => setPWCheckInputValue(e.target.value)}
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  autoComplete="off"
                />
                {validatePWCheck ? "" : <p>비밀번호가 일치하지 않습니다.</p>}
              </InputBox>
            </Row>
            <Row>
              <Title>
                이름 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="text"
                  onChange={(e) => setNameInputValue(e.target.value)}
                  placeholder="이름을 입력해주세요."
                />
              </InputBox>
            </Row>
            <Row>
              <Title>
                휴대폰 인증 <span>*</span>
              </Title>
              <InputBox>
                <input
                  type="text"
                  onChange={(e) => setNumberInputValue(e.target.value)}
                  placeholder="휴대폰 번호를 입력해주세요."
                />
                {validateNumber ? "" : <p>- 없이 11자리의 숫자로 입력해주세요.</p>}
              </InputBox>
              <SubFunction color={validateNumberCheck ? "#ccc" : "#ff8b2b"}>
                <button onClick={checkNumber}>인증 번호 받기</button>
              </SubFunction>
            </Row>
            <Row>
              <Title>성별</Title>
              <InputBox>
                <RadioBox>
                  <input
                    onClick={() => setGender("male")}
                    type="radio"
                    id="male"
                    checked={gender === "male"}
                    readOnly
                  />
                  <label htmlFor="male" onClick={() => setGender("male")}>
                    남성
                  </label>
                  <input
                    onClick={() => setGender("female")}
                    type="radio"
                    id="female"
                    checked={gender === "female"}
                    readOnly
                  />
                  <label htmlFor="female" onClick={() => setGender("female")}>
                    여성
                  </label>
                  <input
                    onClick={() => setGender("default")}
                    type="radio"
                    id="notChoiced"
                    checked={gender === "default"}
                    readOnly
                  />
                  <label htmlFor="notChoiced" onClick={() => setGender("default")}>
                    선택 안함
                  </label>
                </RadioBox>
              </InputBox>
            </Row>
            <Row>
              <Title>
                주소 <span>*</span>
              </Title>
              <InputBox>
                <input type="text" value={newAddressValue} placeholder="주소를 검색해주세요." disabled />
                <input type="text" placeholder="상세주소를 입력해주세요." />
                {findAddressModal ? (
                  <FindAddressModal>
                    <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
                    <span className="delete">
                      <TfiClose onClick={closeModal} />
                    </span>
                  </FindAddressModal>
                ) : (
                  ""
                )}
              </InputBox>
              <SubFunction color={newAddressValue ? "#ccc" : "#ff8b2b"}>
                <button onClick={findAddressHandler}>{newAddressValue ? "다시 검색" : "주소 검색"}</button>
              </SubFunction>
            </Row>
            <Row>
              <hr style={{ width: "100%", opacity: "0.2" }} />
            </Row>
            <Row>
              <Title>
                약관 동의 <span>*</span>
              </Title>
              <InputBox>
                <AllCheck onClick={agreementAllHandler} color={isAllCheckedAgreement ? "#ff7d11" : "#eee"}>
                  {isAllCheckedAgreement ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}
                  모두 동의합니다.
                </AllCheck>
                <CheckBox onClick={() => setAgreementAge(!agreementAge)} color={agreementAge ? "#ff7d11" : "#eee"}>
                  {agreementAge ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}만 14세 이상<span>(필수)</span>
                </CheckBox>
                <CheckBox
                  onClick={() => setAgreementTerms(!agreementTerms)}
                  color={agreementTerms ? "#ff7d11" : "#eee"}
                >
                  {agreementTerms ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}이용약관 동의<span>(필수)</span>
                  <button onClick={(e) => modalHandler("terms", e)}>약관 보기</button>
                </CheckBox>
                <CheckBox
                  onClick={() => setAgreementRequired(!agreementRequired)}
                  color={agreementRequired ? "#ff7d11" : "#eee"}
                >
                  {agreementRequired ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}개인정보 제공 동의{" "}
                  <span>(필수)</span>
                  <button onClick={(e) => modalHandler("required", e)}>약관 보기</button>
                </CheckBox>
                <CheckBox
                  onClick={() => setAgreementSelected(!agreementSelected)}
                  color={agreementSelected ? "#ff7d11" : "#eee"}
                >
                  {agreementSelected ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}개인정보 제공 동의{" "}
                  <span>(선택)</span>
                  <button onClick={(e) => modalHandler("selected", e)}>약관 보기</button>
                </CheckBox>
                <CheckBox
                  onClick={() => setAgreementMarketing(!agreementMarketing)}
                  color={agreementMarketing ? "#ff7d11" : "#eee"}
                >
                  {agreementMarketing ? <AiFillCheckSquare /> : <AiTwotoneCheckSquare />}이메일 및 문자 마케팅 수신동의{" "}
                  <span>(선택)</span>
                </CheckBox>
                {agreementModal ? (
                  <AgreementDetail>
                    <div>
                      <h5
                        className={agreementModalMode === "terms" ? "on" : ""}
                        onClick={() => setAgreementModalMode("terms")}
                      >
                        이용약관
                      </h5>
                      <h5
                        className={agreementModalMode === "required" ? "on" : ""}
                        onClick={() => setAgreementModalMode("required")}
                      >
                        개인정보 동의(필수)
                      </h5>
                      <h5
                        className={agreementModalMode === "selected" ? "on" : ""}
                        onClick={() => setAgreementModalMode("selected")}
                      >
                        개인정보 동의(선택)
                      </h5>
                    </div>
                    <ScrollBox>
                      {agreementModalMode === "terms" ? (
                        <p>
                          제1조(목적)
                          <br />
                          표준약관 제10023호
                          <br />
                          <br />
                          이 약관은 (재)로컬푸드가 운영하는 로컬푸드 사이버 몰(이하 '몰'이라 한다)에서 제공하는 인터넷
                          관련 서비스(이하 '서비스'라 한다)를 이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을
                          규정함을 목적으로 합니다.
                          <br />
                          ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다」
                          <br />
                          <br />
                          제2조(정의)
                          <br />
                          <br />
                          ① '몰'이란 (재)로컬푸드가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를
                          이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을
                          운영하는 사업자의 의미로도 사용합니다.
                          <br />
                          ② '이용자'란 '몰'에 접속하여 이 약관에 따라 '몰'이 제공하는 서비스를 받는 회원 및 비회원을
                          말합니다.
                          <br />
                          ③ ‘회원’이라 함은 '몰'에 개인정보를 제공하여 회원등록을 한 자로서, '몰'의 정보를 지속적으로
                          제공받으며, '몰'이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                          <br />
                          ④ ‘비회원’이라 함은 회원에 가입하지 않고 '몰'이 제공하는 서비스를 이용하는 자를 말합니다.
                          <br />
                          <br />
                          제3조(약관등의 명시와 설명 및 개정)
                          <br />
                          <br />
                          ① '몰'은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수
                          있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호,
                          통신판매업신고번호, 개인정보 보호책임자등을 이용자가 쉽게 알 수 있도록 '몰'의 초기
                          서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할
                          수 있습니다.
                          <br />
                          ② '몰'은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
                          청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면
                          또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                          <br />
                          ③ '몰'은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법,
                          전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을
                          위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                          <br />
                          ④ '몰'이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의
                          초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다.
                          <br />
                          다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고
                          공지합니다. 이 경우 '몰'은 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록
                          표시합니다.
                          <br />
                          ⑤ '몰'이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그
                          이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을
                          체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에
                          '몰'에 송신하여 '몰'의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
                          <br />
                          ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의 소비자보호에
                          관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의
                          소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
                          <br />
                          <br />
                          제4조(서비스의 제공 및 변경)
                          <br />
                          <br />
                          ① '몰'은 다음과 같은 업무를 수행합니다.
                          <br />
                          1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
                          <br />
                          2. 구매계약이 체결된 재화 또는 용역의 배송
                          <br />
                          3. 기타 '몰'이 정하는 업무
                          <br />
                          ② '몰'은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해
                          제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및
                          제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
                          <br />
                          ③ '몰'이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의
                          변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
                          <br />
                          ④ 전항의 경우 '몰'은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, '몰'이 고의 또는
                          과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                          <br />
                          <br />
                          제5조(서비스의 중단)
                          <br />
                          <br />
                          ① '몰'은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한
                          경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                          <br />
                          ② '몰'은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은
                          손해에 대하여 배상합니다. 단, '몰'이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
                          아니합니다.
                          <br />
                          ③ 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로 서비스를 제공할 수 없게 되는
                          경우에는 '몰'은 제8조에 정한 방법으로 이용자에게 통지하고 당초 '몰'에서 제시한 조건에 따라
                          소비자에게 보상합니다. 다만, '몰'이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지
                          또는 적립금 등을 '몰'에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게
                          지급합니다.
                          <br />
                          <br />
                          제6조(회원가입)
                          <br />
                          <br />
                          ① 이용자는 '몰'이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를
                          함으로서 회원가입을 신청합니다.
                          <br />
                          ② '몰'은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한
                          회원으로 등록합니다.
                          <br />
                          1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만
                          제7조제3항에 의한 회원자격 상실후 3년이 경과한 자로서 '몰'의 회원재가입 승낙을 얻은 경우에는
                          예외로 한다.
                          <br />
                          2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                          <br />
                          3. 기타 회원으로 등록하는 것이 '몰'의 기술상 현저히 지장이 있다고 판단되는 경우
                          <br />
                          ③ 회원가입계약의 성립시기는 '몰'의 승낙이 회원에게 도달한 시점으로 합니다.
                          <br />
                          ④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 방법으로 '몰'에
                          대하여 그 변경사항을 알려야 합니다.
                          <br />
                        </p>
                      ) : (
                        ""
                      )}
                      {agreementModalMode === "required" ? (
                        <p>
                          1. 본인확인 정보
                          <br />
                          <br />
                          - 목적 : 이용자 식별 및 본인여부 확인
                          <br />
                          - 항목 : 이름, 아이디, 비밀번호
                          <br />
                          - 보유 및 이용기간 : 회원탈퇴 후 5일까지
                          <br />
                          <br />
                          <br />
                          2. 민원확인 정보
                          <br />
                          <br />
                          - 목적 : 민원 등 고객 고충처리
                          <br />
                          - 항목 : 이메일, 휴대전화번호
                          <br />
                          - 보유 및 이용기간 : 회원탈퇴 후 5일까지
                          <br />
                          <br />
                          <br />
                          3. 법정 나이 확인 정보
                          <br />
                          <br />
                          - 목적 : 만 14세 미만 아동 확인
                          <br />
                          - 항목 : 법정 생년월일
                          <br />
                          - 보유 및 이용기간 : 회원탈퇴 후 5일까지
                          <br />
                        </p>
                      ) : (
                        ""
                      )}
                      {agreementModalMode === "selected" ? (
                        <p>
                          주문 · 결제 및 배송 서비스
                          <br />
                          <br />
                          - 수집/이용목적 : 주문/결제 시 상품 배송
                          <br />
                          - 수집항목 : 구매자정보, 상품 구매/취소/반품/교환/환불 정보, 수령인 정보
                          <br />
                          - 보유/이용기간 : 회원탈퇴 후 5일까지
                          <br />
                          <br />
                          <br />
                          급사 상품 판매 및 배송을 위한 개인정보 제 3자 제공 동의
                          <br />
                          <br />
                          - 제공받는 자 : 공급사 판매자
                          <br />
                          - 이용목적 : 판매자와 구매자의 거래의 원활한 진행, 본인의사의확인, <br />
                          고객 상담 및 불만처리, 상품과 경품 배송을 위한 배송지 확인 등<br />
                          - 제공항목 : 구매자 이름, 전화번호, ID, 휴대폰번호, 이메일주소, 상품 구매정보, <br />
                          상품 수취인 정보(이름, 주소, 전화번호)
                          <br />
                          - 보유/이용기간 : 배송완료 후 한달
                          <br />
                        </p>
                      ) : (
                        ""
                      )}
                    </ScrollBox>
                    <button onClick={closeModal}>확인</button>
                  </AgreementDetail>
                ) : (
                  ""
                )}
              </InputBox>
            </Row>
            <Row>
              <SubmitBox>
                {isAllCompleted ? (
                  <Link to="/login" onClick={SignUpSubmit}>
                    가입하기
                  </Link>
                ) : (
                  <SubmitButton onClick={noticeFailed}>가입하기</SubmitButton>
                )}
              </SubmitBox>
            </Row>
          </SignUpBox>
        </WidthLimit>
      </Container>
      <Footer />
    </>
  );
}

export default SignUp;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 100px 0;
`;

const WidthLimit = styled.div`
  width: 600px;
`;

const SignUpBox = styled.form`
  display: flex;
  flex-direction: column;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  padding: 10px 0;
`;

const Title = styled.div`
  display: flex;
  margin-top: 15px;
  width: 20%;
  font-size: 14px;
  color: #000;

  span {
    margin-left: 5px;
    color: #ff8b2b;
  }
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;

  input[type="text"],
  input[type="password"] {
    margin: 2px 0;
    padding: 6px;
    width: calc(100% - 12px);
    line-height: 30px;
    text-indent: 5px;
    border-radius: 0;
    border: 1px solid #ccc;

    &:focus {
      outline: 0;
    }
  }

  p {
    margin: 5px;
    font-size: 13px;
    color: #ff8b2b;
    text-align: left;
  }
`;

const SubFunction = styled.div<{ color: string }>`
  display: flex;
  width: 20%;

  button {
    margin-top: 2px;
    margin-left: 15px;
    width: 100%;
    height: 44px;
    background-color: white;
    border: 1px solid;
    border-color: ${(props) => props.color};
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

const RadioBox = styled.div`
  display: flex;
  padding: 14px 0;

  input {
    margin: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    margin: 0 15px 0 5px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const FindAddressModal = styled.div`
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 50%;
  transform: translateX(-180px);
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 450px;
  background-color: white;
  border: 1px solid #ccc;

  span {
    position: absolute;
    top: -1px;
    left: 100%;
    display: flex;
    padding: 15px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;
  }
`;

const AllCheck = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 18px;
  text-indent: 5px;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 24px;
    color: ${(props) => props.color};
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 14px;
  text-indent: 5px;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 24px;
    color: ${(props) => props.color};
  }

  span {
    display: flex;
    margin-top: 1px;
    margin-left: 5px;
    color: #ccc;
  }

  button {
    margin-top: 2px;
    margin-left: auto;
    background-color: white;
    border: 0;
    text-decoration: underline;
    color: #ff8b2b;
    cursor: pointer;
  }
`;

const AgreementDetail = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  background-color: white;
  border: 1px solid #ccc;

  div {
    display: flex;
    margin-bottom: 20px;
    width: 100%;

    h5 {
      margin: 0;
      padding: 20px 5px;
      width: 33.3%;
      font-size: 16px;
      font-weight: normal;
      background-color: #efefef;
      cursor: pointer;

      &.on {
        color: #ff8b2b;
        font-weight: bold;
        border-bottom: 1px solid #ff8b2b;
        background-color: white;
      }
    }
  }

  button {
    margin-bottom: 20px;
    padding: 10px;
    width: 160px;
    background-color: #ff8b2b;
    border: 0;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const ScrollBox = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  overflow-y: auto;
  color: #000;

  p {
    width: 90%;
    color: #333;
  }
`;

const SubmitBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  a {
    margin-top: 10px;
    padding: 15px;
    width: 60%;
    background-color: #ff8b2b;
    color: white;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
`;

const SubmitButton = styled.a`
  text-align: center;
`;
