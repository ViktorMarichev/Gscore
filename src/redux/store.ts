import {
  configureStore,
  combineReducers,
  Reducer,
  createSlice,
  getDefaultMiddleware,
  Store,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore, Context } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserReducer from "./User";
import SubscribesReducer from "./Subscribes";
import ProductsReducer from "./Products";

const rootReducer = combineReducers({
  user: UserReducer,
  subscribes: SubscribesReducer,
  products: ProductsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ["user"],
        })
      ),
    devTools: true,
  });
};

type MakeStoreType = ReturnType<typeof makeStore>;

const WrapMakeStore = (makeStore: any) => wrapMakeStore(() => makeStore);
const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<AppStore>(WrapMakeStore(makeStore()), {
  debug: true,
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
