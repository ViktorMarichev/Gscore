import { apiInstance } from "./instance";

type SubscribesQueryParams = {
  token: string;
};

export const Subscribes = {
  getSubscribes: function (params: SubscribesQueryParams) {
    const { token } = params;
    const api = apiInstance({ token });
    return api.get("/subscribe/self");
  },
};
