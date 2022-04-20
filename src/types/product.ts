import Price from "./price";
type Product = {
  id: number;
  sitesCount: number;
  name: string;
  prices: Array<Price>;
};
export default Product;
