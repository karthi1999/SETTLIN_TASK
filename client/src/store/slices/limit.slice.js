import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLimitLoading: false,
  limitData: [],
}

const limitSlice = createSlice({
  name: 'limitSlice',
  initialState,
  reducers: {
    getLimitData: (state, { payload }) => {
      state.limitData = payload
    },
    getLimitLoading: (state, { payload }) => {
      state.isLimitLoading = payload
    },
  }
})

const { actions, reducer } = limitSlice;

export const {
  getLimitData,
  getLimitLoading
} = actions;

export default reducer;