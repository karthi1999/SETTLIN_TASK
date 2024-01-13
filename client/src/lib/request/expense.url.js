import { apiURL } from "../apiURL";

export const getAllExpenseURL = () => (
  { url: `${apiURL()}/expense/getAllExpense` }
)

export const createExpenseURL = () => (
  { url: `${apiURL()}/expense/createExpense` }
)

export const updateExpenseURL = () => (
  { url: `${apiURL()}/expense/updateExpense` }
)

export const deleteExpenseURL = () => (
  { url: `${apiURL()}/expense/deleteExpense` }
)