import styled from "@emotion/styled";

type PaginationPropsType = {
  totalPageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function SetPagination(props: PaginationPropsType) {
  function setCurrentPageHandler(n: number) {
    props.setCurrentPage(n);
  }

  return (
    <>
      <PaginationBox>
        <button onClick={() => setCurrentPageHandler(props.currentPage - 1)} disabled={props.currentPage === 1}>
          {"<"}
        </button>
        {Array(props.totalPageCount)
          .fill(props.totalPageCount)
          .map((_, i) => {
            return (
              <button
                key={"button" + i + 1}
                className={props.currentPage === i + 1 ? "on" : ""}
                onClick={() => setCurrentPageHandler(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}
        <button
          onClick={() => setCurrentPageHandler(props.currentPage + 1)}
          disabled={props.currentPage === props.totalPageCount}
        >
          {">"}
        </button>
      </PaginationBox>
    </>
  );
}

export default SetPagination;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;

    width: 28px;
    height: 28px;
    background-color: white;
    border: 1px solid #eee;
    color: #666;
    cursor: pointer;

    &.on {
      color: #ff8b2b;
    }

    &:hover {
      background-color: #ff8b2b;
      color: white;
    }

    &:disabled {
      color: #eee;
    }
    &:disabled:hover {
      background-color: white;
      color: #eee;
      cursor: default;
    }
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 80px;
  }
`;
