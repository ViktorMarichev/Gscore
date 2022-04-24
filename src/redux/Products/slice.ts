import { createSlice } from "@reduxjs/toolkit";

import Product from "../../types/product";
import { HYDRATE } from "next-redux-wrapper";
type ProductsState = {
  products: Array<Product>;
};

const ProductsSlice = createSlice({
  name: "productsSlice",
  initialState: { products: [] } as ProductsState,
  reducers: {
    setProducts: (state, action: { payload: ProductsState }) => {
      state.products = action.payload.products;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.products) {
        state.products = [
          ...state.products,
          ...action.payload.products.products,
        ];
      }
    },
  },
});
export const actions = ProductsSlice.actions;
export default ProductsSlice.reducer;
