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
type updatePersonalDataAction = {
  email: string;
  username: string;
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
    updatePersonalData: (
      state,
      action: { payload: updatePersonalDataAction }
    ) => {
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      };
    },
    logOut: (state, action) => {
      return {
        id: null,
        email: null,
        username: null,
        token: null,
      };
    },
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
