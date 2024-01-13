import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  expenseData: [],
}

const expenseSlice = createSlice({
  name: 'expenseSlice',
  initialState,
  reducers: {
    getExpenseData: (state, { payload }) => {
      state.expenseData = payload
    },
    getExpenseLoading: (state, { payload }) => {
      state.isLoading = payload
    },
  }
})

const { actions, reducer } = expenseSlice;

export const {
  getExpenseData,
  getExpenseLoading
} = actions;

export default reducer;