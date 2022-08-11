import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  // For HTC page
  coolingRotorType: '',
  coolingHousingType: '',
  htcData: '',
  // For Flow Rates Page
  coolingFRotorType: '',
  coolingFHousingType: '',
  coolingType: '',
  coolingFlowData: '',
  waterChecked: false
};

const coolingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_COOLING_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_COOLING_ROTOR_TYPE:
      return updateObject(state, {
        coolingRotorType: action.payload
      });

    case actionTypes.SET_COOLING_HOUSING_TYPE:
      return updateObject(state, {
        coolingHousingType: action.payload
      });

    case actionTypes.SET_COOLING_F_ROTOR_TYPE:
      return updateObject(state, {
        coolingFRotorType: action.payload
      });

    case actionTypes.SET_COOLING_F_HOUSING_TYPE:
      return updateObject(state, {
        coolingFHousingType: action.payload
      });

    case actionTypes.SET_HTC_DATA:
      return updateObject(state, {
        htcData: action.payload
      });

    case actionTypes.SET_COOLING_FLOW_DATA:
      return updateObject(state, {
        coolingFlowData: action.payload
      });

    case actionTypes.SET_COOLING_HTC:
      return updateObject(state, {
        coolingHTC: action.payload
      });


    case actionTypes.SET_COOLING_PARAM:
      const {key, value} = action.payload;
      const newCoolingFlow = state.coolingFlow;
       newCoolingFlow[key] = value;
       const newCoolingHTC=state.coolingHTC;
       newCoolingHTC[key]=value;
      return updateObject(state, {
        coolingFlow: newCoolingFlow,
        coolingHTC:newCoolingHTC
      });

    case actionTypes.SET_COOLING_TYPE:
      return updateObject(state, {
        coolingType: action.payload
      });

    case actionTypes.SET_COOLING_IMAGE_URL:
      return updateObject(state,{
        coolingType: action.payload()
      });

    case actionTypes.SET_WATER_CHECKED:
      return updateObject(state, {
        waterChecked: action.payload
      });


    default:
      return state;

  }
};

export default coolingReducer;