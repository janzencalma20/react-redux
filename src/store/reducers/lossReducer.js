import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  lossType: '',
  lossData: null,
  lossMainImageUrl: ''
};

const lossReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_LOSS_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_LOSS_DATA:
      return updateObject(state, {
        lossData: action.payload
      });

    case actionTypes.SET_LOSS_PARAM:
      const {key, value} = action.payload;
      const newLossData = state.lossData;
      newLossData[key]['loss'] = value;
      return updateObject(state, {
        lossData: newLossData
      });

    case actionTypes.SET_LOSS_TYPE:
      return updateObject(state, {
        lossType: action.payload
      });

    case actionTypes.SET_LOSS_MAIN_IMAGE_URL:
      return updateObject(state, {
        lossMainImageUrl: action.payload
      });

    default:
      return state;

  }
};

export default lossReducer;