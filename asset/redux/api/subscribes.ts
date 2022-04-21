import { apiInstance } from "./instance";

type SubscribesQueryParams = {
  token: string;
};
type UpgradeSubscribeParams = {
  token: string;
  productId: number;
  subscribeId: number;
};

export const Subscribes = {
  getSubscribes: function (params: SubscribesQueryParams) {
    const { token } = params;
    const api = apiInstance({ token });
    return api.get("/subscribe/self");
  },
  upgradeSubscribe: function (params: UpgradeSubscribeParams) {
    const { token, productId, subscribeId } = params;
    const api = apiInstance({ token });
    return api.post("/subscribe/change-product", {
      productId,
      subscribeId,
    });
  },
};
