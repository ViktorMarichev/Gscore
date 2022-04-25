import { createSlice } from "@reduxjs/toolkit";
import Subscribe from "../../types/subscribe";
import Code from "src/types/code";
import { HYDRATE } from "next-redux-wrapper";
const _ = require("lodash");
type SubscribesState = {
  subscribes: Array<Subscribe>;
  currentSubscribe: Subscribe | null;
  isWithHeld: boolean;
};
type setCurrentSubscribeAction = {
  currentSubscribe: Subscribe;
};

type SetHodAction = {
  isWithHeld: boolean;
};

const SubscribesSlices = createSlice({
  name: "subscribesSlice",
  initialState: {
    subscribes: [],
    currentSubscribe: null,
    selectedCodes: [],
    isWithHeld: false,
  } as SubscribesState,
  reducers: {
    setSubscribes: (state, action: { payload: SubscribesState }) => {
      return {
        subscribes: action.payload.subscribes,
        currentSubscribe: action.payload.currentSubscribe,
        isWithHeld: action.payload.isWithHeld,
      };
    },
    setCurrentSubscribe: (
      state,
      action: { payload: setCurrentSubscribeAction }
    ) => {
      return {
        ...state,
        currentSubscribe: action.payload.currentSubscribe,
      };
    },

    setHold: (state, action: { payload: SetHodAction }) => {
      state.isWithHeld = action.payload.isWithHeld;
    },
  },
});
export const actions = SubscribesSlices.actions;
export default SubscribesSlices.reducer;
