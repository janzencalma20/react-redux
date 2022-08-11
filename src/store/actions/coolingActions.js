import * as actionTypes from "../util/actionTypes";
import s3 from "../../utils/s3";

export const onInitCoolingParams = () => ({
  type: actionTypes.INIT_COOLING_PARAMS
});

export const onSetCoolingHTC=(htc)=>({
  type:actionTypes.SET_COOLING_HTC,
  payload:htc
});

export const onSetCoolingParam = (key, value) => ({
  type: actionTypes.SET_COOLING_PARAM,
  payload: {key, value}
});

const onSetCoolingImageURL = (URL) => ({
  type: actionTypes.SET_COOLING_IMAGE_URL,
  payload: URL
});

export const onGetCoolingImage = (coolingType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Cooling/Types/${coolingType}.png`,
    }).then(url => {
      dispatch(onSetCoolingImageURL(url));
    }).catch(() => {
      dispatch(onSetCoolingImageURL(''));
    })
  }
};

export const onSetHTCData = (htcData) => ({
  type: actionTypes.SET_HTC_DATA,
  payload: htcData
});

export const onSetCoolingRotorType = (rotorType) => ({
  type: actionTypes.SET_COOLING_ROTOR_TYPE,
  payload: rotorType
});

export const onSetCoolingHousingType = (housingType) => ({
  type: actionTypes.SET_COOLING_HOUSING_TYPE,
  payload: housingType
});

export const onSetCoolingFRotorType = (rotorType) => ({
  type: actionTypes.SET_COOLING_F_ROTOR_TYPE,
  payload: rotorType
});

export const onSetCoolingFHousingType = (housingType) => ({
  type: actionTypes.SET_COOLING_F_HOUSING_TYPE,
  payload: housingType
});

export const onSetCoolingType = (type) => ({
  type: actionTypes.SET_COOLING_TYPE,
  payload: type
});

export const onSetCoolingFlowData = (flow) => ({
  type: actionTypes.SET_COOLING_FLOW_DATA,
  payload: flow
});

export const onSetCoolingWaterChecked = (waterChecked) => ({
  type: actionTypes.SET_WATER_CHECKED,
  payload: waterChecked
});