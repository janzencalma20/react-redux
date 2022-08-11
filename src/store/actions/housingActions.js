import * as actionTypes from "../util/actionTypes";
import s3 from "../../utils/s3";
import {axiosInstance} from "../../utils/axios";

export const onInitHousingParams = () => ({
  type: actionTypes.INIT_HOUSING_PARAMS
});

export const onSetDisableHousingSaveButton = (disabled) => ({
  type: actionTypes.SET_DISABLE_HOUSING_SAVE_BUTTON,
  payload: disabled
});

export const onSetHousingData = (data) => ({
  type: actionTypes.SET_HOUSING_DATA,
  payload: data
});

export const onSetHousingParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_HOUSING_PARAM,
  payload: {key, value, isMaterial}
});

export const onSetHousingType = (type) => ({
  type: actionTypes.SET_HOUSING_TYPE,
  payload: type
});

const onSetHousingImageURL = (URL) => ({
  type: actionTypes.SET_HOUSING_IMAGE_URL,
  payload: URL
});

export const onGetHousingImage = (housingType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Housings/${housingType}.png`,
    }).then(url => {
      dispatch(onSetHousingImageURL(url));
    }).catch(() => {
      dispatch(onSetHousingImageURL(''));
    })
  }
};

const onSetHousingMainImageURL = (URL) => ({
  type: actionTypes.SET_HOUSING_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetHousingMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetHousingMainImageURL(url));
    }).catch(() => {
      dispatch(onSetHousingMainImageURL(''));
    })
  }
};

const getMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_HOUSING_MATERIAL_DICT,
  payload: materialDict
});

export const onGetHousingMaterialsDict = (filename, material) => {
  return async (dispatch) => {
    try {
      const request = { filename, material };
      const res = await axiosInstance.post(`/machine/dimensions/get_material_dict/`, request);
      if (res && res.data) {
        dispatch(getMaterialDictSuccess(res.data))
      }
    } catch (e) {
      dispatch(getMaterialDictSuccess(null))
    }
  }
};