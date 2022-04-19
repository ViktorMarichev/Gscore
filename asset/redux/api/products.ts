import { apiInstance } from "./instance";

export const Products = {
  getProducts: function () {
    const api = apiInstance();
    return api.get("/products");
  },
};
