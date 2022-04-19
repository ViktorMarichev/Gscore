import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserReducer from "./User";
import SubscribesReducer from "./Subscribes";
const rootReducer = combineReducers({
  user: UserReducer,
  subscribes: SubscribesReducer,
});

const store = configureStore({
  middleware: [],
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
