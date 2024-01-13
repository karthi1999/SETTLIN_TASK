import axios from 'axios';
import { getAccountDetailsURL, getError, signinURL, signupURL } from '../../lib';
import { accountLoading, setPopMsg, setPopupDesc, setShowPopup, setCode, getAccountDetails } from '../slices';
import setCookie from '../../utils/setCookie';

export const signinAPI = (body) => {
  return async (dispatch) => {
    dispatch(accountLoading(true));
    try {
      const { url } = signinURL();
      const { data: { data, status: { code, message, description } } } = await axios.post(url, body);
      dispatch(setShowPopup(true))
      dispatch(accountLoading(false));
      dispatch(setCode(code))
      dispatch(setPopMsg(message));
      dispatch(setPopupDesc(description));
      if (code === "200") {
        const { session_uuid } = data;
        setCookie(session_uuid)
      }
    } catch (e) {
      dispatch(accountLoading(false));
      getError(e);
    }
  };
};

export const signupAPI = (body) => {
  return async (dispatch) => {
    dispatch(accountLoading(true));
    try {
      const { url } = signupURL();
      const { data: { data, status: { code, message, description } } } = await axios.post(url, body);
      dispatch(setShowPopup(true))
      dispatch(accountLoading(false));
      dispatch(setCode(code))
      dispatch(setPopMsg(message));
      dispatch(setPopupDesc(description));
      if (code === "200") {
        const { session_uuid } = data;
        setCookie(session_uuid)
      }
    } catch (e) {
      dispatch(accountLoading(false));
      getError(e);
    }
  };
};

export const signoutAPI = () => {
  return async (dispatch) => {
    dispatch(setShowPopup(false))
    dispatch(accountLoading(false));
    dispatch(setCode(null))
    dispatch(setPopMsg(null));
    dispatch(setPopupDesc(null));
  };
};

export const getAccountDetailsAPI = (body) => {
  return async (dispatch) => {
    try {
      let { url } = getAccountDetailsURL()
      let { data: { data, status: { code } } } = await axios.post(url, body)
      if (code === "200") {
        dispatch(getAccountDetails(data))
      }
      dispatch(setCode(code))
      getAccountDetails([])
    } catch (error) {
      getError(error)
    }
  }
}