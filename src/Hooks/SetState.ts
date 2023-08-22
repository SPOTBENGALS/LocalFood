import { PRODUCTDATATYPE } from "Store/ProductData";

export const SumTotalPrice = (array: PRODUCTDATATYPE) => {
  let sum = 0;

  array.forEach((item) => {
    sum += item.price * item.selectedAmount;
  });

  return sum;
};

export const SumTotalCost = (array: PRODUCTDATATYPE) => {
  let sum = 0;

  array.forEach((item) => {
    sum += item.cost * item.selectedAmount;
  });

  return sum;
};
