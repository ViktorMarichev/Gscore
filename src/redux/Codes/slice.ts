import { createSlice } from "@reduxjs/toolkit";

import Code from "../../types/code";
import { HYDRATE } from "next-redux-wrapper";
const _ = require("lodash");
type CodesState = {
  codes: Array<Code>;
  selectedCodes: Array<number>;
};
type CheckedCodeAction = {
  codeId: number;
};

const CodesSlice = createSlice({
  name: "codesSlice",
  initialState: { codes: [], selectedCodes: [] } as CodesState,
  reducers: {
    setCodes: (state, action: { payload: { codes: Array<Code> } }) => {
      return {
        codes: action.payload.codes,
        selectedCodes: [],
      };
    },
    CheckCode: (state, action: { payload: CheckedCodeAction }) => {
      if (
        _.findIndex(state.selectedCodes, (code: number) => {
          return code === action.payload.codeId;
        }) != -1
      ) {
        state.selectedCodes = _.filter(state.selectedCodes, (code: number) => {
          return code !== action.payload.codeId;
        });
      } else {
        state.selectedCodes.push(action.payload.codeId);
      }
    },
    updateCodeById: (state, action: { payload: { code: Code } }) => {
      const index = _.findIndex(state.codes, (code: Code) => {
        return code.id === action.payload.code.id;
      });
      state.codes[index] = action.payload.code;
    },
  },
});
export const actions = CodesSlice.actions;
export default CodesSlice.reducer;
