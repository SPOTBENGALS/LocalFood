import product0101 from "../Images/Products/watermelon.jpg";
import product0102 from "../Images/Products/watermelon_detail.jpg";
import product0201 from "../Images/Products/apple.jpg";
import product0202 from "../Images/Products/apple_detail.jpg";
import product0301 from "../Images/Products/blueberry.jpg";
import product0302 from "../Images/Products/blueberry_detail.jpg";
import product0401 from "../Images/Products/bakedegg.jpg";
import product0402 from "../Images/Products/bakedegg_detail.jpg";
import product0501 from "../Images/Products/egg.jpg";
import product0502 from "../Images/Products/egg_detail.jpg";
import product0601 from "../Images/Products/blueegg.jpg";
import product0602 from "../Images/Products/blueegg_detail.jpg";
import product0701 from "../Images/Products/ssamvege.jpg";
import product0702 from "../Images/Products/ssamvege_detail.jpg";
import product0801 from "../Images/Products/potato.jpg";
import product0802 from "../Images/Products/potato_detail.jpg";
import product0901 from "../Images/Products/pumkin.jpg";
import product0902 from "../Images/Products/pumkin_detail.jpg";
import product1001 from "../Images/Products/applejuice.jpg";
import product1002 from "../Images/Products/applejuice_detail.jpg";
import product1101 from "../Images/Products/pickle.jpg";
import product1102 from "../Images/Products/pickle_detail.jpg";
import product1201 from "../Images/Products/banchan.jpg";
import product1202 from "../Images/Products/banchan_detail.jpg";
import product1301 from "../Images/Products/dongjuk.jpg";
import product1302 from "../Images/Products/dongjuk_detail.jpg";
import product1401 from "../Images/Products/seaweed.jpg";
import product1402 from "../Images/Products/seaweed_detail.jpg";
import product1501 from "../Images/Products/strawberry.jpg";
import product1502 from "../Images/Products/strawberry_detail.jpg";
import product1601 from "../Images/Products/fig.jpg";
import product1602 from "../Images/Products/fig_detail.jpg";
import product1701 from "../Images/Products/shinemuscat.jpg";
import product1702 from "../Images/Products/shinemuscat_detail.jpg";
import product1801 from "../Images/Products/pear.jpg";
import product1802 from "../Images/Products/pear_detail.jpg";
import product1901 from "../Images/Products/ramps.jpg";
import product1902 from "../Images/Products/ramps_detail.jpg";
import product2001 from "../Images/Products/pumkinjuice.jpg";
import product2002 from "../Images/Products/pumkinjuice_detail.jpg";
import product2101 from "../Images/Products/butterhead.jpg";
import product2102 from "../Images/Products/butterhead_detail.jpg";
import product2201 from "../Images/Products/driedseaweed.jpg";
import product2202 from "../Images/Products/driedseaweed_detail.jpg";

export type PRODUCTDATATYPE = {
  id: number;
  group: number;
  sort: string;
  itemName: string;
  descript: string;
  cost: number;
  price: number;
  bestItem: boolean;
  newItem: boolean;
  bundleItem: boolean;
  img: string;
  detailImg: string;
  discount: number;
  selectedAmount: number;
  checkedinCart: boolean;
  wished: boolean;
}[];

export const PRODUCTDATA: PRODUCTDATATYPE = [
  {
    sort: "과일",
    id: 1,
    group: 0,
    itemName: "고당도 제철 수박 4kg",
    descript: "여름 시즌 고당도 수박",
    cost: 12000,
    price: 10000,
    bestItem: true,
    newItem: true,
    bundleItem: false,
    img: product0101,
    detailImg: product0102,
    discount: 16,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 2,
    group: 0,
    itemName: "사과 2kg",
    descript: "아삭아삭 꿀사과 중과",
    cost: 12500,
    price: 12500,
    bestItem: true,
    newItem: false,
    bundleItem: false,
    img: product0201,
    detailImg: product0202,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 3,
    group: 0,
    itemName: "블루베리 500g",
    descript: "아삭아삭 꿀사과 중과",
    cost: 30000,
    price: 30000,
    bestItem: false,
    newItem: true,
    bundleItem: false,
    img: product0301,
    detailImg: product0302,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "계란",
    id: 4,
    group: 0,
    itemName: "구운계란 30구",
    descript: "무살충제 영양간식 구운 계란",
    cost: 12500,
    price: 12500,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product0401,
    detailImg: product0402,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "계란",
    id: 5,
    group: 0,
    itemName: "친환경 계란 30구",
    descript: "무항생제 무착색제 안전한 계란",
    cost: 9300,
    price: 9300,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product0501,
    detailImg: product0502,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "계란",
    id: 6,
    group: 0,
    itemName: "청란 청계란 특란 20구",
    descript: "산지직송 무항생제 유정란",
    cost: 19900,
    price: 19900,
    bestItem: false,
    newItem: true,
    bundleItem: false,
    img: product0601,
    detailImg: product0602,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "채소",
    id: 7,
    group: 0,
    itemName: "친환경 모듬 쌈채소 6종",
    descript: "청로메인, 비타민, 적근대, 치커리, 케일, 적겨자",
    cost: 13900,
    price: 9900,
    bestItem: false,
    newItem: false,
    bundleItem: true,
    img: product0701,
    detailImg: product0702,
    discount: 28,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "채소",
    id: 8,
    group: 0,
    itemName: "수미감자 5kg",
    descript: "23년 햇감자 대",
    cost: 11900,
    price: 11900,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product0801,
    detailImg: product0802,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "채소",
    id: 9,
    group: 1,
    itemName: "고당도 미니 밤호박",
    descript: "청정 자연을 그대로 담은 밤호박 3kg",
    cost: 12900,
    price: 12900,
    bestItem: false,
    newItem: true,
    bundleItem: false,
    img: product0901,
    detailImg: product0902,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "가공식품",
    id: 10,
    group: 1,
    itemName: "통째로 갈아만든 진짜 사과즙 100mlx50포",
    descript: "진짜 100%과일만 갈아서 만든 주스",
    cost: 22900,
    price: 19900,
    bestItem: true,
    newItem: false,
    bundleItem: false,
    img: product1001,
    detailImg: product1002,
    discount: 13,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "반찬/간편식",
    id: 11,
    group: 1,
    itemName: "수제 오이피클 무피클 500g",
    descript: "방부제를 첨가하지 않은 수제 피클",
    cost: 12000,
    price: 12000,
    bestItem: false,
    newItem: true,
    bundleItem: false,
    img: product1101,
    detailImg: product1102,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "반찬/간편식",
    id: 12,
    group: 1,
    itemName: "4종 반찬 세트 궁채/깻잎무침/알마늘/고추장아찌",
    descript: "궁채/깻잎무침/알마늘/고추장아찌 합 500g",
    cost: 17900,
    price: 17900,
    bestItem: false,
    newItem: false,
    bundleItem: true,
    img: product1201,
    detailImg: product1202,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "수산물",
    id: 13,
    group: 1,
    itemName: "친환경 서해안 동죽 2kg",
    descript: "살이 꽉차 오동통하고 수분가득한 국내산 동죽",
    cost: 13500,
    price: 13500,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product1301,
    detailImg: product1302,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "수산물",
    id: 14,
    group: 1,
    itemName: "쌈다시마500g",
    descript: "청정해역에서 채취해 싱싱한 다시마",
    cost: 8800,
    price: 8800,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product1401,
    detailImg: product1402,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 15,
    group: 1,
    itemName: "딸기 1kg",
    descript: "신선하고 달콤한 딸기",
    cost: 13900,
    price: 9900,
    bestItem: true,
    newItem: false,
    bundleItem: false,
    img: product1501,
    detailImg: product1502,
    discount: 28,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 16,
    group: 1,
    itemName: "무농약 하우스 무화과 600g",
    descript: "고당도 제철과일 무화과 6-8과 ",
    cost: 12900,
    price: 12900,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product1601,
    detailImg: product1602,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 17,
    group: 2,
    itemName: "하우스 샤인머스켓 1kg",
    descript: "고당도 1kg 2-3송이",
    cost: 20900,
    price: 20900,
    bestItem: true,
    newItem: false,
    bundleItem: false,
    img: product1701,
    detailImg: product1702,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "과일",
    id: 18,
    group: 2,
    itemName: "나주배 3kg 4-8과",
    descript: "배의 명산지 나주산 신고배",
    cost: 7600,
    price: 7600,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product1801,
    detailImg: product1802,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "반찬/간편식",
    id: 19,
    group: 2,
    itemName: "산마늘 명이절임 500g",
    descript: "자연의 맛과 영양이 담긴 신선함",
    cost: 11900,
    price: 11900,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product1901,
    detailImg: product1902,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "가공식품",
    id: 20,
    group: 2,
    itemName: "호박즙 100% 120ml 30포",
    descript: "첨가물 없이 건강한 100% 국내산",
    cost: 13900,
    price: 13900,
    bestItem: true,
    newItem: false,
    bundleItem: false,
    img: product2001,
    detailImg: product2002,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "채소",
    id: 21,
    group: 2,
    itemName: "무농약 버터헤드 레터스",
    descript: "샐러드 식단 채소",
    cost: 4600,
    price: 4600,
    bestItem: false,
    newItem: true,
    bundleItem: false,
    img: product2101,
    detailImg: product2102,
    discount: 0,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
  {
    sort: "수산물",
    id: 22,
    group: 2,
    itemName: "먹기좋게 자른 건미역 1kg",
    descript: "청정해역 건미역",
    cost: 20100,
    price: 18100,
    bestItem: false,
    newItem: false,
    bundleItem: false,
    img: product2201,
    detailImg: product2202,
    discount: 9,
    selectedAmount: 0,
    checkedinCart: false,
    wished: false,
  },
];