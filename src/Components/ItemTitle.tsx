import styled from "@emotion/styled";

function ItemTitle({ itemName }: { itemName: string }) {
  return <Title>{itemName}</Title>;
}

export default ItemTitle;

const Title = styled.h4`
  margin: 0;
  padding: 12px 0 30px;
  width: 100%;
  height: 0;
  font-size: 17px;
  font-weight: normal;
  text-align: left;
  color: #333;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 767px) {
    padding: 10px 0 25px;
    font-size: 15px;
  }
`;
