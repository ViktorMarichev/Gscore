import { apiInstance } from "./instance";

type buyQueryParams = {
  token: string;
  priceId: number;
};

export const Products = {
  getProducts: function () {
    const api = apiInstance();
    return api.get("/products");
  },
  buyProduct: function (params: buyQueryParams) {
    const { token, priceId } = params;
    const api = apiInstance({ token });
    return api.post("/payments/buy", {
      priceId,
    });
  },
};
