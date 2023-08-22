import styled from "@emotion/styled";

function DetailImg({ detailImg }: { detailImg: string }) {
  return (
    <DetailImgBox>
      <img src={detailImg} alt="" />
    </DetailImgBox>
  );
}

export default DetailImg;

const DetailImgBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  max-width: 1100px;

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 767px) {
    max-width: 100%;
    padding: 0;
  }
`;
