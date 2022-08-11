import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  showAlert: false,
  duration: 3000,
  alertType: 'success',
  alertMsg: '',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center'
  }
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HIDE_ALERT:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_SHOW_ALERT:
      const payload = action.payload;
      return updateObject(state, {
        showAlert: true,
        duration: payload.duration ? payload.duration : state.duration,
        alertType: payload.alertType,
        alertMsg: payload.alertMsg,
        anchorOrigin: payload.anchorOrigin ? payload.anchorOrigin : state.anchorOrigin
      });

    default:
      return state;
  }
};

export default alertReducer;