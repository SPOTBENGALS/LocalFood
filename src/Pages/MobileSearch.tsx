import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import MobileNav from "Header/MobileNav";
import MobileHeader from "Header/MobileHeader";
import styled from "@emotion/styled";
import useStore from "Store/Storage";
import { PRODUCTDATA, PRODUCTDATATYPE } from "Store/ProductData";

function MobileSearch() {
  let setCurrentTitle = useStore((state) => state.setCurrentTitle);
  let setSearchedText = useStore((state) => state.setSearchedText);
  const navigate = useNavigate();

  const [searchText, setsearchText] = useState("");
  const [searchCandidates, setSearchCandidates] = useState<PRODUCTDATATYPE>([]);

  function searchingText() {
    if (searchText.length > 0) {
      setCurrentTitle(searchText);
      setSearchedText(searchText);
    } else {
      alert("검색어를 입력해주세요.");
    }
  }

  function SearchingByEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchingText();
      if (window.location.pathname !== "/itemlist") {
        navigate("/itemlist");
      }
    }
  }

  useEffect(() => {
    if (searchText.length > 0) {
      const searching = PRODUCTDATA.filter((data) => data.itemName.includes(searchText));
      setSearchCandidates(searching);
    } else {
      setSearchCandidates([]);
    }
  }, [searchText]);

  return (
    <>
      <MobileHeader />
      <Container>
        <WidthLimit>
          <SearchBox>
            <input
              className="inputElement"
              placeholder="검색어를 입력하세요."
              onChange={(e) => setsearchText(e.target.value)}
              value={searchText}
              onKeyDown={SearchingByEnter}
            />
            <Link to="/mobilesearch" onClick={searchingText}>
              <LuSearch className="icon" />
            </Link>
          </SearchBox>
          <SearchedList>
            {searchCandidates.map((candidate) => {
              return (
                <List key={candidate.id}>
                  <Link to={"/item/" + candidate.id}>{candidate.itemName}</Link>
                </List>
              );
            })}
          </SearchedList>
          <Recommend>
            <h5>추천 검색어</h5>
            <WordBox>
              <div onClick={() => setsearchText("사과")}>사과</div>
              <div onClick={() => setsearchText("고당도")}>고당도</div>
              <div onClick={() => setsearchText("친환경")}>친환경</div>
            </WordBox>
          </Recommend>
        </WidthLimit>
      </Container>
      <MobileNav />
    </>
  );
}

export default MobileSearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  width: 100%;
  top: 0;
  z-index: 99;
  background-color: white;
`;

const WidthLimit = styled.div`
  width: calc(100% - 30px);
`;

const SearchBox = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0;
  height: 33px;
  border: 2px solid orange;

  & input {
    width: 220px;
    height: 30px;
    border: 0;
    text-indent: 10px;

    &:focus {
      outline: 0;
    }
  }

  a {
    border: 0;
    background: orange;

    & .icon {
      margin: 5px 3px;
      padding: 0 6px;
      color: white;
      font-size: 22px;
    }
  }
`;

const SearchedList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const List = styled.div`
  display: flex;
  justify-content: start;
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  a {
    color: #333;
  }
`;

const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;

  h5 {
    margin: 10px 2px;
    font-weight: normal;
  }
`;

const WordBox = styled.div`
  display: flex;

  div {
    display: flex;
    justify-content: center;
    margin-right: 10px;
    padding: 2px 8px;
    border: 1px solid orange;
    border-radius: 15px;
    color: orange;
    font-size: 12px;
  }
`;
