import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./slices/account.slice";
import expenseReducer from "./slices/expense.slice";
import limitReducer from "./slices/limit.slice";

const store = configureStore({
  reducer: {
    accountState: accountReducer,
    expenseState: expenseReducer,
    limitState: limitReducer
  },
});

export * from './actions';
export * from './slices';

export default store;
