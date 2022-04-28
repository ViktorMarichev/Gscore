import { RootState } from "./../store";
import { createSelector } from "@reduxjs/toolkit";
import Code from "src/types/code";
const _ = require("lodash");

const getCodes = (state: RootState) => {
  return state.codes.codes;
};
const filterCodes = (state: RootState, subscribeId: number) => {
  return _.filter(state.codes.codes, (code: Code) => {
    return code.subscribeId === subscribeId;
  });
};
const getSelectedCodes = (state: RootState) => {
  return state.codes.selectedCodes;
};
const checkCodeById = (state: RootState, codeId: number) => {
  return _.findIndex(state.codes.selectedCodes, (code: number) => {
    return code === codeId;
  });
};

const getCodesBySubscribeId = createSelector(filterCodes, getCodes, (code) => {
  return code;
});

export default {
  checkCodeById,
  getCodes,
  getCodesBySubscribeId,
  getSelectedCodes,
};
