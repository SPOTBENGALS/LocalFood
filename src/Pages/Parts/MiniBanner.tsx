import styled from "@emotion/styled";
import minibanner from "../../Images/Banners/banner02.png";

function MiniBanner() {
  return (
    <Container>
      <WidthLimit>
        <img src={minibanner} alt="" />
      </WidthLimit>
    </Container>
  );
}

export default MiniBanner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 30px 0;

  @media screen and (max-width: 767px) {
    padding: 20px 0;
  }
`;

const WidthLimit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 150px;
  overflow: hidden;

  img {
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;

    img {
      width: 150%;
    }
  }
`;
