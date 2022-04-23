import Subscribe from "src/types/subscribe";
import { RootState } from "./../store";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getSubscribes = (state: RootState) => {
  return state.subscribes.subscribes;
};
const getCodes = (state: RootState, subscribeId: number) => {
  return _.filter(state.subscribes.subscribes, (subscribe: Subscribe) => {
    return subscribe.id === subscribeId;
  });
};

const getCodesBySubscribeID = createSelector(
  getCodes,
  (subscribe: Subscribe) => {
    return subscribe.codes;
  }
);

export default {
  getSubscribes,
  getCodesBySubscribeID,
};
