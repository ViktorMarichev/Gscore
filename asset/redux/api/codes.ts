import { apiInstance } from "./instance";

type ReleaseHoldParams = {
  codesIds: Array<number>;
  subscribeId: number;
  token: string;
};

export const Codes = {
  releaseHold: function (params: ReleaseHoldParams) {
    const { token, codesIds, subscribeId } = params;
    const api = apiInstance({ token });
    return api.put("/code/manage", {
      codesIds,
      subscribeId,
    });
  },
};
