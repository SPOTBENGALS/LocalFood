import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "Header/Header";
import MobileHeader from "Header/MobileHeader";
import MobileNav from "Header/MobileNav";
import Item from "Components/Item";
import Footer from "Footer/Footer";
import useInfiniteScroll from "react-infinite-scroll-hook";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import { PRODUCTDATA, PRODUCTDATATYPE } from "Store/ProductData";

type TempListType = {
  count: number;
  result: PRODUCTDATATYPE;
};

function ProductList() {
  const currentTitle = useStore((state) => state.currentTitle);
  const setCurrentTitle = useStore((state) => state.setCurrentTitle);
  const searchedText = useStore((state) => state.searchedText);
  const setSearchedText = useStore((state) => state.setSearchedText);
  const itemList = useStore((state) => state.itemList);
  const setItemList = useStore((state) => state.setItemList);

  const categories = ["전체 카테고리", "계란", "채소", "과일", "가공식품", "쌀/잡곡", "반찬/간편식", "수산물"];
  const [tempList, setTempList] = useState<TempListType>({
    count: 0,
    result: PRODUCTDATA.filter((data) => data.group === 0),
  });

  let hasNext = PRODUCTDATA.filter((data) => data.group === tempList.count + 1).length !== 0;

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: hasNext,
    onLoadMore: async () => {
      hasNext = PRODUCTDATA.filter((data) => data.group === tempList.count + 1).length !== 0;
      const nextProducts: PRODUCTDATATYPE = await PRODUCTDATA.filter((data) => data.group === tempList.count + 1);
      setTempList({
        count: tempList.count + 1,
        result: [...tempList.result, ...nextProducts],
      });
    },
    disabled: false,
    rootMargin: "0px 0px 50px 0px",
  });

  function setList(e: string) {
    setSearchedText("");
    setCurrentTitle(e);
  }

  useEffect(() => {
    setItemList(tempList.result);
    if (searchedText.length > 0) {
      setItemList(tempList.result.filter((data) => data.itemName.includes(searchedText)));
    } else {
      if (currentTitle === "전체 카테고리") {
        setItemList(tempList.result);
      } else if (currentTitle === "베스트상품") {
        setItemList(tempList.result.filter((data) => data.bestItem === true));
      } else if (currentTitle === "묶음상품") {
        setItemList(tempList.result.filter((data) => data.bundleItem === true));
      } else if (currentTitle !== "전체 카테고리") {
        setItemList(tempList.result.filter((data) => data.sort === currentTitle));
      }
    }
  }, [currentTitle, hasNext, searchedText, setItemList, tempList]);

  return (
    <>
      <Header />
      <MobileHeader />
      <Container>
        <WidthLimit>
          <ProductNav>
            <Title>
              {searchedText.length !== 0 ? (
                <span> &#8220; {currentTitle} &#8221;의 검색 결과입니다.</span>
              ) : (
                currentTitle
              )}
            </Title>
            {searchedText.length !== 0 || currentTitle === "베스트상품" || currentTitle === "묶음상품" ? (
              ""
            ) : (
              <Categories>
                {categories.map((category, index) => {
                  if (category === currentTitle) {
                    return (
                      <Link key={index} to="/itemlist" className="active" onClick={() => setList(category)}>
                        {category}
                      </Link>
                    );
                  }
                  return (
                    <Link key={index} to="/itemlist" onClick={() => setList(category)}>
                      {category}
                    </Link>
                  );
                })}
              </Categories>
            )}
          </ProductNav>
          <ItemList>
            {itemList.length === 0 ? (
              <Notice>죄송합니다. 준비된 상품이 없습니다.</Notice>
            ) : (
              itemList.map((data) => {
                return (
                  <Item
                    key={data.id}
                    id={data.id}
                    itemName={data.itemName}
                    itemPrice={data.price}
                    img={data.img}
                    cost={data.cost}
                    discount={data.discount}
                    bestItem={data.bestItem}
                    newItem={data.newItem}
                  />
                );
              })
            )}
          </ItemList>
          <Loading ref={infiniteRef}>{hasNext ? "Loading..." : ""}</Loading>
        </WidthLimit>
      </Container>
      <MobileNav />
      <Footer />
    </>
  );
}

export default ProductList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0 40px 0;

  @media screen and (max-width: 767px) {
    padding: 0 0 40px;
  }
`;

const WidthLimit = styled.div`
  width: 1100px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const ProductNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
`;

const Title = styled.h2`
  color: #333;

  span {
    font-size: 18px;
    font-weight: normal;
  }

  @media screen and (max-width: 767px) {
    font-size: 18px;
    font-weight: 500;
    margin: 15px 0;
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  padding: 20px 0;

  a {
    color: #333;

    &.active {
      color: orange;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 10px;
    width: calc(100% - 20px);
    font-size: 14px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: white;
    overflow-x: auto;
    white-space: nowrap;

    a {
      display: flex;
      padding: 0 10px;
      line-height: 45px;
    }
  }
`;

const Notice = styled.h3`
  padding: 30px 0;
  width: 100%;
  color: #aaa;
  font-weight: normal;

  @media screen and (max-width: 767px) {
    padding: 60px 0;
    font-size: 14px;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  gap: 20px;

  @media screen and (max-width: 767px) {
    margin: 0 1%;
    width: 98%;
    gap: unset;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
