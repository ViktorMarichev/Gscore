import { createSlice } from "@reduxjs/toolkit";
import Subscribe from "../../types/subscribe";
const _ = require("lodash");
type SubscribesState = {
  subscribes: Array<Subscribe>;
  currentSubscribe: Subscribe | null;
  isWithHeld: boolean;
  subscribeViewId: number | null;
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
    subscribeViewId: null,
  } as SubscribesState,
  reducers: {
    setSubscribes: (state, action: { payload: SubscribesState }) => {
      return {
        subscribes: action.payload.subscribes,
        currentSubscribe: action.payload.currentSubscribe,
        isWithHeld: action.payload.isWithHeld,
        subscribeViewId: action.payload.subscribeViewId,
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
    setSubscribeView: (state) => {
      state.subscribeViewId = state.currentSubscribe?.id!;
    },
  },
});
export const actions = SubscribesSlices.actions;
export default SubscribesSlices.reducer;
