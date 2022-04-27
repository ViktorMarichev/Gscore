import reducer, { actions } from "./slice";
export { default as UserSelectors } from "./selectors";
export const { login, updatePersonalData, logOut } = actions;
export default reducer;
