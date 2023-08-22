import review01 from "../Images/Recipe/watermelon.jpg";
import review02 from "../Images/Recipe/strawberrysalad.jpg";

export type REVIEWDATATYPE = {
  productId: number;
  productName: string;
  userId: string;
  reviewtext: string;
  reviewImg: string;
  reviewTime: string;
}[];

export const REVIEWDATA: REVIEWDATATYPE = [
  {
    productId: 1,
    productName: "고당도 제철 수박 4kg",
    userId: "abc1597",
    reviewtext: "달고 맛있어요.",
    reviewImg: "",
    reviewTime: "2023.7.13",
  },
  {
    productId: 1,
    productName: "고당도 제철 수박 4kg",
    userId: "abcd",
    reviewtext: "생각보다 크기가 커서 나눠먹었어요.",
    reviewImg: "",
    reviewTime: "2023.7.13",
  },
  {
    productId: 1,
    productName: "고당도 제철 수박 4kg",
    userId: "abcdee",
    reviewtext:
      "배터지게 잘먹었어요! \n 받자마자 시원하지 않은 상태에서도 맛있었는데 차갑게 냉장 보관해서 먹으니까 정말 꿀맛이에요. \n 받자마자 깍뚝 썰어서 큰 통에 넣어서 보관했는데 \n 걱정했던 마음이 무색하게 생각보다 금방 먹었어요 ㅎㅎ",
    reviewImg: review01,
    reviewTime: "2023.7.13",
  },
  {
    productId: 17,
    productName: "하우스 샤인머스켓 1kg",
    userId: "abcdas",
    reviewtext: "살짝 새콤해요.",
    reviewImg: "",
    reviewTime: "2023.7.11",
  },
  {
    productId: 17,
    productName: "하우스 샤인머스켓 1kg",
    userId: "dfgvvcs012",
    reviewtext: "달고 맛있어요. \n 매번 재주문해도 항상 신선해요.",
    reviewImg: "",
    reviewTime: "2023.7.10",
  },
  {
    productId: 10,
    productName: "통째로 갈아만든 진짜 사과즙 100mlx50포",
    userId: "dfgsdfscs000",
    reviewtext: "맛있어요. 새콤달콤. 저렴하게 살 수 있어서 좋아요.",
    reviewImg: "",
    reviewTime: "2023.7.13",
  },
  {
    productId: 15,
    productName: "딸기 1kg",
    userId: "strawberryyammy",
    reviewtext: "맛있어요. 새콤달콤. ",
    reviewImg: review02,
    reviewTime: "2023.7.13",
  },
];
