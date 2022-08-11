import * as actionTypes from "../util/actionTypes";

export const onSetLPTNSolveTaskID = (task_id) => ({
  type: actionTypes.SET_LPTN_SOLVE_TASK_ID,
  payload: task_id
});

export const onSetLPTNResult = (result) => ({
  type: actionTypes.SET_LPTN_RESULT,
  payload: result
});