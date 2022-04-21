import Product from "./product";
import Code from "./code";
type Subscribe = {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  product: Product;
  codes: Array<Code>;
};

export default Subscribe;
