import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  solveTaskID: '',
  result: null
};

const lptnReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LPTN_SOLVE_TASK_ID:
      return updateObject(state, {
        solveTaskID: action.payload
      });

    case actionTypes.SET_LPTN_RESULT:
      return updateObject(state, {
        result: action.payload
      });

    default:
      return state;
  }
};

export default lptnReducer;