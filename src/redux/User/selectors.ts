import { RootState } from "../store";
const _ = require("lodash");

const userData = (state: RootState) => {
  return state.user;
};
export default {
  userData,
};
