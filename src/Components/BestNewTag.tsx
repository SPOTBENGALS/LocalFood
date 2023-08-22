import styled from "@emotion/styled";

function BestNewTag({ text }: { text: string }) {
  return (
    <Tag color={text === "Best" ? "lightblue" : "darkseagreen"}>
      {text}
      <br />
      Item
    </Tag>
  );
}

export default BestNewTag;

const Tag = styled.span<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  font-size: 14px;
  color: white;
  margin-left: 10px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    width: 45px;
    height: 45px;
    font-size: 11px;
  }
`;
