import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

function GoBackButton({ buttonText }: { buttonText: string }) {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <ButtonBox>
        <button onClick={goBack}>{buttonText}</button>
      </ButtonBox>
    </>
  );
}

export default GoBackButton;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
  width: 100%;

  button {
    padding: 10px 20px;
    border: 0;
    background-color: #aaa;
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    button {
      padding: 8px 12px;
      margin-bottom: 100px;
    }
  }
`;
