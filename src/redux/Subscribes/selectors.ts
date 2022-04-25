import Subscribe from "src/types/subscribe";
import { RootState } from "./../store";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getSubscribes = (state: RootState) => {
  return state.subscribes.subscribes;
};
const getCurrentSubscribe = (state: RootState) => {
  return state.subscribes.currentSubscribe;
};
const findSubscribeById = (state: RootState, subscribeId: number) => {
  return _.find(state.subscribes, (subscribe: Subscribe) => {
    return subscribe.id === subscribeId;
  });
};
const getCodes = (state: RootState, subscribeId: number) => {
  return _.filter(state.subscribes.subscribes, (subscribe: Subscribe) => {
    return subscribe.id === subscribeId;
  });
};


const getCodesBySubscribeID = createSelector(
  getCodes,
  (subscribes: Array<Subscribe>) => {
    if (subscribes.length == 0) return -1;
    else return subscribes[0].codes;
  }
);
const getSubscribeById = createSelector(
  findSubscribeById,
  (subscribe: Subscribe) => {
    return subscribe;
  }
);

export default {
  getSubscribes,
  getCurrentSubscribe,
  getCodesBySubscribeID,
  getSubscribeById,
};
