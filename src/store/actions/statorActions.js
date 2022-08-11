import * as actionTypes from '../util/actionTypes';
import s3 from "../../utils/s3";
import {axiosInstance} from "../../utils/axios";
import {setProjectLoading} from "./projectActions";

export const onInitStatorParams = () => ({
  type: actionTypes.INIT_STATOR_PARAMS
});

export const onSetDisableStatorSaveButton = (disabled) => ({
  type: actionTypes.SET_DISABLE_STATOR_SAVE_BUTTON,
  payload: disabled
});

export const onSetStatorLaminationData = (data) => ({
  type: actionTypes.SET_STATOR_LAMINATION_DATA,
  payload: data
});

export const onSetStatorLaminationParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_STATOR_LAMINATION_PARAM,
  payload: {key, value, isMaterial}
});

export const onSetStatorLaminationType = (type) => ({
  type: actionTypes.SET_STATOR_LAMINATION_TYPE,
  payload: type
});

export const onSetStatorSlotType = (type) => ({
  type: actionTypes.SET_STATOR_SLOT_TYPE,
  payload: type
});

export const onSetStatorSlotData = (data) => ({
  type: actionTypes.SET_STATOR_SLOT_DATA,
  payload: data
});

export const onSetStatorSlotParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_STATOR_SLOT_PARAM,
  payload: {slotKey: key, slotValue: value, is_material: isMaterial}
});

export const onSetStatorWindingType = (type) => ({
  type: actionTypes.SET_STATOR_WINDING_TYPE,
  payload: type
});

export const onSetStatorWindingData = (data) => ({
  type: actionTypes.SET_STATOR_WINDING_DATA,
  payload: data
});

export const onSetStatorWindingParam = (key, value, isMaterial) => ({
  type: actionTypes.SET_STATOR_WINDING_PARAM,
  payload: {windingKey: key, windingValue: value, material: isMaterial}
});

const onSetStatorWindingImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_WINDING_IMAGE_URL,
  payload: URL
});

export const onGetStatorWindingImage = (windingType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Windings/${windingType}.png`,
    }).then(url => {
      dispatch(onSetStatorWindingImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorWindingImageURL(''));
    })
  }
};

export const onSetStatorConductorTypes = (types) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_TYPES,
  payload: types
});

export const onSetStatorConductorType = (type) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_TYPE,
  payload: type
});

export const onSetStatorConductorData = (data) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_DATA,
  payload: data
});

export const onSetStatorConductorParam = (key, value) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_PARAM,
  payload: {conductorKey: key, conductorValue: value}
});

const onSetStatorSlotImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_SLOT_IMAGE_URL,
  payload: URL
});

export const onGetStatorSlotImage = (slotType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Slots/${slotType}.png`,
    }).then(url => {
      dispatch(onSetStatorSlotImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorSlotImageURL(''));
    })
  }
};

export const onSetStatorConductorImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_IMAGE_URL,
  payload: URL
});

export const onGetStatorConductorImage = (conductorType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Conductors/${conductorType}.png`,
    }).then(url => {
      dispatch(onSetStatorConductorImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorConductorImageURL(''));
    })
  }
};

const onSetStatorMainImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetStatorMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetStatorMainImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorMainImageURL(''));
    })
  }
};

const getMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_MATERIAL_DICT,
  payload: materialDict
});

const getWindingMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_WINDING_MATERIAL_DICT,
  payload: materialDict
});

const getInsulationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_INSULATION_MATERIAL_DICT,
  payload: materialDict
});

const getImpregnationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_IMPREGNATION_MATERIAL_DICT,
  payload: materialDict
});

const getWallInsulationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_WALLINSULATION_MATERIAL_DICT,
  payload: materialDict
});

const getWedgeMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_WEDGE_MATERIAL_DICT,
  payload: materialDict
});

const getSeparatorMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_SEPARATOR_MATERIAL_DICT,
  payload: materialDict
});

const getCoilInsulationMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_COILINSULATION_MATERIAL_DICT,
  payload: materialDict
});

const getTopSpacerMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_TOPSPACER_MATERIAL_DICT,
  payload: materialDict
});

const getBottomSpacerMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_BOTTOMSPACER_MATERIAL_DICT,
  payload: materialDict
});

const getLeftSpacerMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_LEFTSPACER_MATERIAL_DICT,
  payload: materialDict
});

const getRightSpacerMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_RIGHTSPACER_MATERIAL_DICT,
  payload: materialDict
});

const getSlotMaterialDictSuccess = (materialDict) => ({
  type: actionTypes.SET_STATOR_SLOT_MATERIAL_DICT,
  payload: materialDict
});

export const onGetStatorMaterialsDict = (filename, material, type) => {
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
          case 'ImpregnationMaterial':
            dispatch(getImpregnationMaterialDictSuccess(res.data));
            break;
          case 'WallInsulationMaterial':
            dispatch(getWallInsulationMaterialDictSuccess(res.data));
            break;
          case 'WedgeMaterial':
            dispatch(getWedgeMaterialDictSuccess(res.data));
            break;
          case 'SeparatorMaterial':
            dispatch(getSeparatorMaterialDictSuccess(res.data));
            break;
          case 'CoilInsulationMaterial':
            dispatch(getCoilInsulationMaterialDictSuccess(res.data));
            break;
          case 'TopSpacerMaterial':
            dispatch(getTopSpacerMaterialDictSuccess(res.data));
            break;
          case 'BottomSpacerMaterial':
            dispatch(getBottomSpacerMaterialDictSuccess(res.data));
            break;
          case 'LeftSpacerMaterial':
            dispatch(getLeftSpacerMaterialDictSuccess(res.data));
            break;
          case 'RightSpacerMaterial':
            dispatch(getRightSpacerMaterialDictSuccess(res.data));
            break;
          case 'slot':
            dispatch(getSlotMaterialDictSuccess(res.data));
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
        case 'ImpregnationMaterial':
          dispatch(getImpregnationMaterialDictSuccess(null));
          break;
        case 'WallInsulationMaterial':
          dispatch(getWallInsulationMaterialDictSuccess(null));
          break;
        case 'WedgeMaterial':
          dispatch(getWedgeMaterialDictSuccess(null));
          break;
        case 'SeparatorMaterial':
          dispatch(getSeparatorMaterialDictSuccess(null));
          break;
        case 'CoilInsulationMaterial':
          dispatch(getCoilInsulationMaterialDictSuccess(null));
          break;
        case 'TopSpacerMaterial':
          dispatch(getTopSpacerMaterialDictSuccess(null));
          break;
        case 'BottomSpacerMaterial':
          dispatch(getBottomSpacerMaterialDictSuccess(null));
          break;
        case 'LeftSpacerMaterial':
          dispatch(getLeftSpacerMaterialDictSuccess(null));
          break;
        case 'RightSpacerMaterial':
          dispatch(getRightSpacerMaterialDictSuccess(null));
          break;
        case 'slot':
          dispatch(getSlotMaterialDictSuccess(null));
          break;
        default:
          break;
      }
    }
  }
};