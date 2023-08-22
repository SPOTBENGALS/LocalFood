import styled from "@emotion/styled";

function ItemPrice({ itemPrice, cost }: { itemPrice: number; cost: number }) {
  return (
    <>
      <Price>
        {itemPrice.toLocaleString()}원{cost !== itemPrice ? <span>{cost.toLocaleString()}원</span> : ""}
      </Price>
    </>
  );
}

export default ItemPrice;

const Price = styled.h4`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.5px;

  span {
    margin-left: 10px;
    font-weight: normal;
    color: #bbb;
    text-decoration: line-through;
  }

  @media screen and (max-width: 767px) {
    font-size: 14px;

    span {
      display: flex;
      margin-left: 5px;
      padding-bottom: 2px;
      font-size: 13px;
    }
  }
`;
