import Codes, { actions } from "./slice";
export const { setCodes, CheckCode, updateCodeById } = actions;
export { default as CodesSelectors } from "./selectors";
export default Codes;
