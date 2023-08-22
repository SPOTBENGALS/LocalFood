import { create } from "zustand";
import { PRODUCTDATA, PRODUCTDATATYPE } from "./ProductData";

interface StorageType {
  login: boolean;
  setLogin: (onoff: boolean) => void;
  currentTitle: string;
  setCurrentTitle: (title: string) => void;
  searchedText: string;
  setSearchedText: (text: string) => void;
  itemList: PRODUCTDATATYPE;
  setItemList: (array: PRODUCTDATATYPE) => void;
  cartItemList: PRODUCTDATATYPE;
  setCartItemList: (array: PRODUCTDATATYPE) => void;
  buyNowItemList: PRODUCTDATATYPE;
  setBuyNowItemList: (array: PRODUCTDATATYPE) => void;
  isAllCheckedinCart: boolean;
  setAllCheckedinCart: (boolean: boolean) => void;
  cartAmount: number;
  setCartAmount: (number: number) => void;
  totalPayment: number;
  setTotalPayment: (number: number) => void;
  point: number;
  setPoint: (number: number) => void;
  discountedTotalPayment: number;
  setDiscountedTotalPayment: (number: number) => void;
  completedOrderTitle: string;
  setCompletedOrderTitle: (text: string) => void;
}

const useStore = create<StorageType>((set) => ({
  login: false,
  setLogin: (onoff: boolean) => set(() => ({ login: onoff })),
  currentTitle: "전체 카테고리",
  setCurrentTitle: (title: string) => set(() => ({ currentTitle: title })),
  searchedText: "",
  setSearchedText: (text: string) => set(() => ({ searchedText: text })),
  itemList: PRODUCTDATA,
  setItemList: (array: PRODUCTDATATYPE) => set(() => ({ itemList: array })),
  cartItemList: [],
  setCartItemList: (array: PRODUCTDATATYPE) => set(() => ({ cartItemList: array })),
  buyNowItemList: [],
  setBuyNowItemList: (array: PRODUCTDATATYPE) => set(() => ({ buyNowItemList: array })),
  isAllCheckedinCart: false,
  setAllCheckedinCart: (boolean: boolean) => set(() => ({ isAllCheckedinCart: boolean })),
  cartAmount: 0,
  setCartAmount: (number: number) => set(() => ({ cartAmount: number })),
  totalPayment: 0,
  setTotalPayment: (number: number) => set(() => ({ totalPayment: number })),
  point: 800,
  setPoint: (number: number) => set(() => ({ point: number })),
  discountedTotalPayment: 0,
  setDiscountedTotalPayment: (number: number) => set(() => ({ discountedTotalPayment: number })),
  completedOrderTitle: "",
  setCompletedOrderTitle: (text: string) => set(() => ({ completedOrderTitle: text })),
}));

export default useStore;
