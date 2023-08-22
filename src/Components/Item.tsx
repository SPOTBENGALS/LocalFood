import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ItemTitle from "./ItemTitle";
import ItemPrice from "./ItemPrice";
import DiscountTag from "./DiscountTag";
import BestItemTag from "./BestNewTag";

interface ItemType {
  id: number;
  itemName: string;
  itemPrice: number;
  cost: number;
  img: string;
  discount: number;
  bestItem: boolean;
  newItem: boolean;
}

function Item(props: ItemType) {
  return (
    <>
      <ItemContainer key={props.id}>
        <Link to={"/item/" + props.id}>
          <ImgBox>
            <img src={props.img} alt="" />
            {props.cost !== props.itemPrice ? <DiscountTag discount={props.discount} /> : ""}
            <TagBox>
              {props.bestItem === true ? <BestItemTag text="Best" /> : ""}
              {props.newItem === true ? <BestItemTag text="New" /> : ""}
            </TagBox>
          </ImgBox>
          <TextBox>
            <ItemTitle itemName={props.itemName} />
            <ItemPrice itemPrice={props.itemPrice} cost={props.cost} />
          </TextBox>
        </Link>
      </ItemContainer>
    </>
  );
}

export default Item;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;

  a {
    width: 100%;
    color: #333;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 2% 15px;
    width: 46%;
  }
`;

const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 280px;
  overflow: hidden;

  img {
    height: 110%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 185px;

    img {
      height: 150%;
    }
  }
`;

const TextBox = styled.div`
  width: 260px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const TagBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  bottom: 10px;
  right: 10px;
`;
