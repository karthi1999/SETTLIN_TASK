import { getExpenseData, getExpenseLoading } from "../slices";
import { getAllExpenseURL, getError, createExpenseURL, updateExpenseURL, deleteExpenseURL } from "../../lib";
import axios from "axios";
import getHeader from "../../utils/getHeader";

export const getAllExpenseAPI = (header) => {
  return async (dispatch) => {
    dispatch(getExpenseLoading(true));
    try {
      const { url } = getAllExpenseURL();
      let response = await axios.get(url, { headers: header });
      const { data, status: { code } } = response.data;

      if (code === "200") {
        dispatch(getExpenseData(data.expenseList));
      }
      if (code === "404") {
        dispatch(getExpenseData([]));
      }
      dispatch(getExpenseLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getExpenseLoading(false));
    }
  };
};

export const createExpenseAPI = (header, body) => {
  const { account_uuid } = header;
  return async (dispatch) => {
    dispatch(getExpenseLoading(true));
    try {
      const { url } = createExpenseURL();
      let response = await axios.post(url, body, { headers: header });
      const { status: { code } } = response.data;
      if (code === "200") {
        dispatch(getAllExpenseAPI(getHeader(header), { account_uuid: account_uuid, page: 1, limit: 10 }))
      }
      dispatch(getExpenseLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getExpenseLoading(false));
    }
  };
};

export const updateExpenseAPI = (header, body) => {
  const { account_uuid } = header;
  return async (dispatch) => {
    dispatch(getExpenseLoading(true));
    try {
      const { url } = updateExpenseURL();
      let response = await axios.post(url, body, { headers: header });
      const { status: { code } } = response.data;
      if (code === "200") {
        dispatch(getAllExpenseAPI(getHeader(header), { account_uuid: account_uuid, page: 1, limit: 10 }))
      }
      dispatch(getExpenseLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getExpenseLoading(false));
    }
  };
};

export const deleteExpenseAPI = (header, body) => {
  const { account_uuid } = header;
  return async (dispatch) => {
    dispatch(getExpenseLoading(true));
    try {
      const { url } = deleteExpenseURL();
      let response = await axios.post(url, body, { headers: header });
      const { status: { code } } = response.data;
      if (code === "200") {
        dispatch(getAllExpenseAPI(getHeader(header), { account_uuid: account_uuid, page: 1, limit: 10 }))
      }
      dispatch(getExpenseLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getExpenseLoading(false));
    }
  };
};
