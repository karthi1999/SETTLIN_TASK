import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  accountDetails: null,
  showPopup: false,
  popupMsg: null,
  popupDesc: null,
  code: null
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    accountLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    getAccountDetails: (state, { payload }) => {
      state.accountDetails = payload
    },
    setShowPopup: (state, { payload }) => {
      state.showPopup = payload
    },
    setPopMsg: (state, { payload }) => {
      state.popupMsg = payload
    },
    setPopupDesc: (state, { payload }) => {
      state.popupDesc = payload
    },
    setCode: (state, { payload }) => {
      state.code = payload
    }
  },
});

const { actions, reducer } = accountSlice;

export const {
  accountLoading,
  getAccountDetails,
  setShowPopup,
  setPopMsg,
  setPopupDesc,
  setCode
} = actions;

export default reducer;