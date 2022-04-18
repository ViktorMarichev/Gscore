import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

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
) => (state = action.payload.user);

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    id: null,
    email: null,
    username: null,
    token: null,
  } as UserState,
  reducers: {
    login,
  },
});
export default UserSlice.reducer;
