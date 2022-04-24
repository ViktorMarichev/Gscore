import Product from "src/types/product";
import { RootState } from "./../store";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getProducts = (state: RootState) => {
  return state.products.products;
};
const getProduct = (state: RootState, productId: number) => {
  return _.filter(state.products.products, (product: Product) => {
    return product.id === productId;
  });
};

const getProductById = createSelector(getProduct, getProducts, (product) => {
  return product;
});

export default {
  getProducts,
  getProductById,
};
