import * as actionTypes from '../util/actionTypes';
import s3 from "../../utils/s3";
import {axiosInstance} from "../../utils/axios";

export const onInitRotorParams = () => ({
  type: actionTypes.INIT_ROTOR_PARAMS
});

export const onSetDisableRotorSaveButton = (disabled) => ({
  type: actionTypes.SET_DISABLE_ROTOR_SAVE_BUTTON,
  payload: disabled
});

export const onSetRotorLaminationData = (data) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_DATA,
  payload: data
});

export const onSetRotorLaminationParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_PARAM,
  payload: {key, value, isMaterial}
});

export const onSetRotorLaminationType = (type) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_TYPE,
  payload: type
});

export const onSetRotorSlotType = (type) => ({
  type: actionTypes.SET_ROTOR_SLOT_TYPE,
  payload: type
});

export const onSetRotorSlotData = (data) => ({
  type: actionTypes.SET_ROTOR_SLOT_DATA,
  payload: data
});

export const onSetRotorSlotParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_SLOT_PARAM,
  payload: {slotKey: key, slotValue: value}
});

export const onSetRotorWindingType = (type) => ({
  type: actionTypes.SET_ROTOR_WINDING_TYPE,
  payload: type
});

export const onSetRotorWindingData = (data) => ({
  type: actionTypes.SET_ROTOR_WINDING_DATA,
  payload: data
});

export const onSetRotorWindingParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_ROTOR_WINDING_PARAM,
  payload: {windingKey: key, windingValue: value, material: isMaterial}
});

export const onSetRotorConductorTypes = (types) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_TYPES,
  payload: types
});

export const onSetRotorWindingImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_WINDING_IMAGE_URL,
  payload: URL
});

export const onGetRotorWindingImage = (conductorType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Windings/${conductorType}.png`,
    }).then(url => {
      dispatch(onSetRotorWindingImageURL(url));
    }).catch(() => {
      dispatch(onSetRotorWindingImageURL(''));
    })
  }
};

export const onSetRotorConductorType = (type) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_TYPE,
  payload: type
});

export const onSetRotorConductorData = (data) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_DATA,
  payload: data
});

export const onSetRotorConductorParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_PARAM,
  payload: {conductorKey: key, conductorValue: value}
});

export const onSetRotorHoleType = (type) => ({
  type: actionTypes.SET_ROTOR_HOLE_TYPE,
  payload: type
});

export const onSetRotorHoleData = (data) => ({
  type: actionTypes.SET_ROTOR_HOLE_DATA,
  payload: data
});

export const onSetRotorHoleParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_ROTOR_HOLE_PARAM,
  payload: {holeKey: key, holeValue: value, is_material: isMaterial}
});

export const onSetRotorSlotImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_SLOT_IMAGE_URL,
  payload: URL
});

export const onGetRotorSlotImage = (slotType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Slots/${slotType}.png`,
    }).then(url => {
      dispatch(onSetRotorSlotImageURL(url));
      dispatch(onSetRotorHoleImageURL(''));
    }).catch(() => {
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorHoleImageURL(''));
    })
  }
};

export const onSetRotorConductorImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_IMAGE_URL,
  payload: URL
});

export const onGetRotorConductorImage = (conductorType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Conductors/${conductorType}.png`,
    }).then(url => {
      dispatch(onSetRotorConductorImageURL(url));
    }).catch(() => {
      dispatch(onSetRotorConductorImageURL(''));
    })
  }
};

export const onSetRotorHoleImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_HOLE_IMAGE_URL,
  payload: URL
});

export const onGetRotorHoleImage = (holeType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Holes/${holeType}.png`,
    }).then(url => {
      dispatch(onSetRotorHoleImageURL(url));
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorConductorImageURL(''));
    }).catch(() => {
      dispatch(onSetRotorHoleImageURL(''));
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorConductorImageURL(''));
    })
  }
};

export const onSetRotorMainImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetRotorMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetRotorMainImageURL(url));
    }).catch(() => {
      dispatch(onSetRotorMainImageURL(''));
    })
  }
};

const getMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_MATERIAL_DICT,
  payload: materialDict
});

const getWindingMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_WINDING_MATERIAL_DICT,
  payload: materialDict
});

const getInsulationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_INSULATION_MATERIAL_DICT,
  payload: materialDict
});

const getWallInsulationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_WALLINSULATION_MATERIAL_DICT,
  payload: materialDict
});

const getImpregnationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_IMPREGNATION_MATERIAL_DICT,
  payload: materialDict
});

const getHoleMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_ROTOR_HOLE_MATERIAL_DICT,
  payload: materialDict
});

export const onGetRotorMaterialsDict = (filename, material, type) => {
  return async (dispatch) => {
    try {
      const request = { filename, material };
      const res = await axiosInstance.post(`/machine/dimensions/get_material_dict/`, request);
      if (res && res.data) {
        switch (type) {
          case 'material':
            dispatch(getMaterialDictSuccess(res.data));
            break;
          case 'WindingMaterial':
            dispatch(getWindingMaterialDictSuccess(res.data));
            break;
          case 'InsulationMaterial':
            dispatch(getInsulationMaterialDictSuccess(res.data));
            break;
          case 'WallInsulationMaterial':
            dispatch(getWallInsulationMaterialDictSuccess(res.data));
            break;
          case 'ImpregnationMaterial':
            dispatch(getImpregnationMaterialDictSuccess(res.data));
            break;
          case 'hole':
            dispatch(getHoleMaterialDictSuccess(res.data));
            break;
          default:
            break;
        }
      }
    } catch (e) {
      switch (type) {
        case 'material':
          dispatch(getMaterialDictSuccess(null));
          break;
        case 'WindingMaterial':
          dispatch(getWindingMaterialDictSuccess(null));
          break;
        case 'InsulationMaterial':
          dispatch(getInsulationMaterialDictSuccess(null));
          break;
        case 'WallInsulationMaterial':
          dispatch(getWallInsulationMaterialDictSuccess(null));
          break;
        case 'ImpregnationMaterial':
          dispatch(getImpregnationMaterialDictSuccess(null));
          break;
        case 'hole':
          dispatch(getHoleMaterialDictSuccess(null));
          break;
        default:
          break;
      }
    }
  }
};