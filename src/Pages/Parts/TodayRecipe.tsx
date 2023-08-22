import styled from "@emotion/styled";
import recipeImg from "../../Images/Recipe/eggplant.jpg";

function TodayRecipe() {
  return (
    <>
      <Container>
        <WidthLimit>
          <Title>오늘의 레시피</Title>
          <RecipeBox>
            <img src={recipeImg} alt="가지밥" />
            <TextBox>
              <h3>
                [화요 미식회]가지밥
                <br />
              </h3>
              <p>
                가지 싫어하는 사람도 반하는 맛<br />
                가지의 식감을 싫어하는 사람들을 위한 색다른 가지 요리법
                <br />
                <br />
                -재료-
                <br />
                불린쌀 200g , 가지 2개 , 갈은 소고기 50g , 진간장 1T, 미림 1/2T,
                <br />
                참기름 1T, 설탕 1/2T, 청·홍고추 1개씩, 깨소금 약간
              </p>
            </TextBox>
          </RecipeBox>
        </WidthLimit>
      </Container>
    </>
  );
}

export default TodayRecipe;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 80px 0;
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

const Title = styled.h1`
  color: #333;
  padding-bottom: 30px;

  @media screen and (max-width: 767px) {
    padding-bottom: 10px;
    font-size: 18px;
  }
`;

const RecipeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 250px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;

    img {
      max-width: 85%;
      height: auto;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 30px;

  h3 {
    color: #333;
    font-weight: normal;
  }

  p {
    text-align: left;
    line-height: 30px;
    color: #333;
  }

  @media screen and (max-width: 767px) {
    padding-left: 0;

    h3 {
      margin-bottom: 0;
      font-size: 16px;
    }

    p {
      font-size: 13px;
      line-height: 20px;
      color: #555;
      letter-spacing: -0.5px;
    }
  }
`;
