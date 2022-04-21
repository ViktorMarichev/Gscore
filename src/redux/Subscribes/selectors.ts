import Subscribe from "asset/types/subscribe";
import { RootState } from "./../store";
import { createSelector } from "@reduxjs/toolkit";
const _ = require("lodash");

const getSubscribes = (state: RootState) => {
  return state.subscribes;
};
const getCodes = (state: RootState, subscribeId: number) => {
  _.filter(state.subscribes, (subscribe: Subscribe) => {
    if (subscribe.id === subscribeId) return subscribe.codes;
  });
};

const getCodesBySubscribeID = createSelector(getCodes, (codes) => {
  return codes;
});

export default {
  getSubscribes,
  getCodesBySubscribeID,
};
