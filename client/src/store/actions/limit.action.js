import { getLimitData, getLimitLoading } from "../slices";
import { getLimitURL, getError, setLimitURL } from "../../lib";
import axios from "axios";
import getHeader from "../../utils/getHeader";

export const getLimitAPI = (header) => {
  return async (dispatch) => {
    dispatch(getLimitLoading(true));
    try {
      const { url } = getLimitURL();
      let response = await axios.get(url, { headers: header });
      const { data, status: { code } } = response.data;

      if (code === "200") {
        dispatch(getLimitData(data[0].expense_limit));
      }
      if (code === "404") {
        dispatch(getLimitData(0));
      }
      dispatch(getLimitLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getLimitLoading(false));
    }
  };
};

export const setLimitAPI = (header, body) => {
  return async (dispatch) => {
    dispatch(getLimitLoading(true));
    try {
      const { url } = setLimitURL();
      let response = await axios.post(url, body, { headers: header });
      const { status: { code } } = response.data;
      if (code === "200") {
        dispatch(getLimitAPI(getHeader(header)))
      }
      dispatch(getLimitLoading(false));
    } catch (error) {
      getError(error);
      dispatch(getLimitLoading(false));
    }
  };
};