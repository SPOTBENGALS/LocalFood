import styled from "@emotion/styled";
import { RiRefund2Fill } from "react-icons/ri";
import { MdOutlineChangeCircle } from "react-icons/md";

function DeliveryNotice() {
  return (
    <DeliveryNoticeBox>
      <h2>배송 안내</h2>
      <NoticeTable>
        <tbody>
          <tr>
            <th>배송비</th>
            <td>최소 주문 금액 20,000원 이상 주문 시 모두 무료 배송입니다.</td>
          </tr>
          <tr>
            <th>출고일</th>
            <td>매주 화요일, 금요일에 출고됩니다. </td>
          </tr>
          <tr>
            <th>배송불가지역</th>
            <td>품질 변형 우려로 제주도 및 도서산간 지방은 배송이 불가합니다. </td>
          </tr>
        </tbody>
      </NoticeTable>
      <h2>교환/환불 안내</h2>
      <NoticeTable>
        <tbody>
          <tr>
            <th>
              <div className="icon">
                <MdOutlineChangeCircle />
              </div>
              교환/환불
            </th>
            <td>
              배송 상품에 문제가 있을 경우, 상품의 정확한 상태를 알 수 있도록 사진과 함께 문의주시길 바랍니다.
              <br />
              신선 / 냉장 / 냉동 식품 등 재판매가 불가한 상품의 특성상, 단순 변심, 주문 착오 시 교환 및 반품이 어려운 점
              양해 부탁드립니다.
              <br />
              <strong>다음과 같은 사유의 교환이나 환불은 불가합니다.</strong>
              1. 고객님의 책임 있는 사유로 상품이 멸실되거나 훼손된 경우
              <br />
              2. 고객님의 사용 또는 일부 소비로 상품의 가치가 감소한 경우
              <br />
              3. 시간이 지나 다시 판매하기 곤란할 정도로 상품의 가치가 감소한 경우
            </td>
          </tr>
          <tr>
            <th>
              <div className="icon">
                <RiRefund2Fill />
              </div>
              주문취소
            </th>
            <td>
              상품 출고일 1일 전까지 주문취소가 가능합니다.
              <br />
              주문 취소는 마이페이지 - 주문 내역에서 확인하실 수 있습니다.{" "}
            </td>
          </tr>
        </tbody>
      </NoticeTable>
    </DeliveryNoticeBox>
  );
}

export default DeliveryNotice;

const DeliveryNoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px 0;
  width: 100%;

  @media screen and (max-width: 767px) {
    padding: 10px;
    width: calc(100% - 20px);

    h2 {
      margin: 5px 0;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const NoticeTable = styled.table`
  margin-bottom: 30px;
  width: 100%;
  border-top: 2px solid #000;
  border-spacing: 0;

  tbody {
    width: 100%;
    tr {
      th {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        background-color: #eee;
        font-weight: normal;

        .icon {
          display: flex;
          flex-direction: column;
          align-items: center;

          svg {
            margin-bottom: 10px;
            font-size: 30px;
            color: #927650;
          }
        }
      }

      td {
        padding: 20px;
        text-align: left;
        border-bottom: 1px solid #ccc;
        line-height: 24px;
        font-size: 14px;
        color: #333;

        strong {
          display: flex;
          margin: 20px 0 5px;
          color: #927650;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;

    tbody {
      width: 100%;
      tr {
        th {
          padding: 10px;
          font-size: 13px;
          word-break: keep-all;

          .icon {
            padding: 0 15px;
          }
        }

        td {
          padding: 10px;
          line-height: 18px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
`;
