import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import ItemTitle from "Components/ItemTitle";
import DiscountTag from "Components/DiscountTag";
import BestItemTag from "Components/BestNewTag";
import ItemPrice from "Components/ItemPrice";
import { PRODUCTDATA } from "Store/ProductData";

interface FrontItemsTypes {
  title: string;
  productIds: number[];
}

function FrontItems({ title, productIds }: FrontItemsTypes) {
  return (
    <>
      <Container>
        <WidthLimit>
          <Title>{title}</Title>
          <ItemsBox>
            {productIds.map((productId) => {
              const product = PRODUCTDATA[productId - 1];
              return (
                <Link key={"item" + productId} to={"/item/" + productId}>
                  <ImgBox>
                    <img src={product.img} alt="" />
                    {product.cost !== product.price ? <DiscountTag discount={product.discount} /> : ""}
                    <TagBox>
                      {product.bestItem === true ? <BestItemTag text="Best" /> : ""}
                      {product.newItem === true ? <BestItemTag text="New" /> : ""}
                    </TagBox>
                  </ImgBox>
                  <TextBox>
                    <ItemTitle itemName={product.itemName} />
                    <ItemPrice itemPrice={product.price} cost={product.cost} />
                  </TextBox>
                </Link>
              );
            })}
          </ItemsBox>
        </WidthLimit>
      </Container>
    </>
  );
}

export default FrontItems;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 80px 0;

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
    padding-bottom: 0;
    font-size: 18px;
  }
`;

const ItemsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 1%;
    width: 98%;

    a {
      margin: 10px 2%;
      width: 46%;
    }
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
