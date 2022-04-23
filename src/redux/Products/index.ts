import Product, { actions } from "./slice";
export const { setProducts } = actions;
export { default as ProductsSelectors } from "./selectors";
export default Product;
