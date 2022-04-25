import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
type UserState = {
  id: null | number;
  email: null | string;
  username: null | string;
  token: null | string;
};
type loginAction = {
  user: UserState;
};
const login: CaseReducer<UserState, PayloadAction<loginAction>> = (
  state,
  action
) => ({
  ...action.payload.user,
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    username: null,
    token: null,
  } as UserState,
  reducers: {
    login,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});
export const actions = UserSlice.actions;
export default UserSlice.reducer;
