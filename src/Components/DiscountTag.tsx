import styled from "@emotion/styled";

interface DiscountTagType {
  discount: number;
}

function DiscountTag(props: DiscountTagType) {
  return (
    <Discount>
      <p>{props.discount}%</p>
    </Discount>
  );
}

const Discount = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  cursor: pointer;

  & p {
    position: absolute;
    z-index: 10;
    margin: 5px;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 2px 2px #ff7d11;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    width: 0;
    height: 0;
    border-top: 50px solid #ff7d11;
    border-right: 50px solid transparent;
  }

  @media screen and (max-width: 767px) {
    & p {
      margin: 5px;
      font-size: 18px;
    }
  }
`;

export default DiscountTag;
