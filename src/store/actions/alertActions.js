import * as actionTypes from "../util/actionTypes";

export const onSetHideAlert = () => ({
  type: actionTypes.SET_HIDE_ALERT
});

export const onSetShowAlert = (payload) => ({
  type: actionTypes.SET_SHOW_ALERT,
  payload
});