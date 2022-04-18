import { createSlice } from "@reduxjs/toolkit";
import Subscribe from "../../types/subscribe";

type SubscribesState = {
  subscribes: Array<Subscribe>;
  currentSubscribe: number | null;
};

const SubscribesSlices = createSlice({
  name: "subscribesSlice",
  initialState: { subscribes: [], currentSubscribe: null } as SubscribesState,
  reducers: {
    setSubscribes: (state, action: { payload: SubscribesState }) => {
      state.subscribes = action.payload.subscribes;
    },
  },
});
export default SubscribesSlices.reducer;
