import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  resultsLoaded: false
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESULTS_SUCCESS:
      return updateObject(state, {
        resultsLoaded: action.payload
      });

    default:
      return state;
  }
};

export default resultsReducer;