import SubscribesReducer, { actions } from "./slice";
export const { setSubscribes, setCurrentSubscribe, setHold, setSubscribeView } =
  actions;
export { default as SubscribesSelectors } from "./selectors";
export default SubscribesReducer;
