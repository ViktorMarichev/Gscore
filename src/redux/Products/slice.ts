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
      console.log("productsAction", action);
      state.products = action.payload.products;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload.products);
      return { ...action.payload.products };
    },
  },
});
export const actions = ProductsSlice.actions;
export default ProductsSlice.reducer;
