import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  disableHousingButton: true,
  housingType: '',
  housingData: null,
  housingImageURL: '',
  housingMainImageURL: '',
  housingMaterialDict: null
};

const housingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_HOUSING_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_DISABLE_HOUSING_SAVE_BUTTON:
      return updateObject(state, {
        disableHousingButton: action.payload
      });

    case actionTypes.SET_HOUSING_DATA:
      return updateObject(state, {
        housingData: action.payload
      });

    case actionTypes.SET_HOUSING_PARAM:
      const {key, value, isMaterial} = action.payload;
      const newHousingData = state.housingData;
      if (isMaterial) {
        newHousingData[key] = {};
        newHousingData[key]['Name'] = value
      } else {
        newHousingData[key] = value;
      }
      return updateObject(state, {
        housingData: newHousingData
      });

    case actionTypes.SET_HOUSING_TYPE:
      return updateObject(state, {
        housingType: action.payload
      });

    case actionTypes.SET_HOUSING_IMAGE_URL:
      return updateObject(state, {
        housingImageURL: action.payload
      });

    case actionTypes.SET_HOUSING_MAIN_IMAGE_URL:
      return updateObject(state, {
        housingMainImageURL: action.payload
      });

    case actionTypes.SET_HOUSING_MATERIAL_DICT:
      return updateObject(state, {
        housingMaterialDict: action.payload
      });

    default:
      return state;

  }
};

export default housingReducer;