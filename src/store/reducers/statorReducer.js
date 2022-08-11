import { updateObject }  from '../util';
import * as actionTypes from '../util/actionTypes';

const initialState = {
  disableStatorButton: true,
  statorLaminationType: '',
  statorLaminationData: null,
  statorSlotType: '',
  statorSlotData: null,
  statorSlotImageURL: '',
  statorWindingType: '',
  statorWindingData: null,
  statorWindingImageURL: '',
  statorConductorTypes: [],
  statorConductorType: '',
  statorConductorData: null,
  statorConductorImageURL: '',
  statorMainImageURL: '',
  statorMaterialDict: null,
  statorWindingMaterialDict: null,
  statorInsulationMaterialDict: null,
  statorImpregnationMaterialDict: null,
  statorWallInsulationMaterialDict: null,
  statorWedgeMaterialDict: null,
  statorSeparatorMaterialDict: null,
  statorCoilInsulationMaterialDict: null,
  statorTopSpacerMaterialDict: null,
  statorBottomSpacerMaterialDict: null,
  statorLeftSpacerMaterialDict: null,
  statorRightSpacerMaterialDict: null,
  statorSlotMaterialDict: null
};

const statorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_STATOR_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_DISABLE_STATOR_SAVE_BUTTON:
      return updateObject(state, {
        disableStatorButton: action.payload
      });

    case actionTypes.SET_STATOR_LAMINATION_DATA:
      return updateObject(state, {
        statorLaminationData: action.payload
      });

    case actionTypes.SET_STATOR_LAMINATION_PARAM:
      const {key, value, isMaterial} = action.payload;
      const newStatorLaminationData = state.statorLaminationData;
      if (isMaterial) {
        newStatorLaminationData[key] = {};
        newStatorLaminationData[key]['Name'] = value
      } else {
        newStatorLaminationData[key] = value;
      }
      return updateObject(state, {
        statorLaminationData: newStatorLaminationData
      });

    case actionTypes.SET_STATOR_LAMINATION_TYPE:
      return updateObject(state, {
        statorLaminationType: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_TYPE:
      return updateObject(state, {
        statorSlotType: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_DATA:
      return updateObject(state, {
        statorSlotData: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_PARAM:
      const {slotKey, slotValue, is_material} = action.payload;
      const newStatorSlotData = state.statorSlotData;
      if (is_material) {
        newStatorSlotData[slotKey] = {};
        newStatorSlotData[slotKey]['Name'] = slotValue
      } else {
        newStatorSlotData[slotKey] = slotValue;
      }
      return updateObject(state, {
        statorSlotData: newStatorSlotData
      });

    case actionTypes.SET_STATOR_SLOT_IMAGE_URL:
      return updateObject(state, {
        statorSlotImageURL: action.payload
      });

    case actionTypes.SET_STATOR_WINDING_TYPE:
      return updateObject(state, {
        statorWindingType: action.payload
      });

    case actionTypes.SET_STATOR_WINDING_DATA:
      return updateObject(state, {
        statorWindingData: action.payload
      });

    case actionTypes.SET_STATOR_WINDING_PARAM:
      const {windingKey, windingValue, material} = action.payload;
      const newStatorWindingData = state.statorWindingData;
      if (material) {
        newStatorWindingData[windingKey] = {};
        newStatorWindingData[windingKey]['Name'] = windingValue
      } else {
        newStatorWindingData[windingKey] = windingValue;
      }
      return updateObject(state, {
        statorWindingData: newStatorWindingData
      });

    case actionTypes.SET_STATOR_WINDING_IMAGE_URL:
      return updateObject(state, {
        statorWindingImageURL: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_TYPES:
      return updateObject(state, {
        statorConductorTypes: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_TYPE:
      return updateObject(state, {
        statorConductorType: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_DATA:
      return updateObject(state, {
        statorConductorData: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_PARAM:
      const {conductorKey, conductorValue} = action.payload;
      const newStatorConductorData = state.statorConductorData;
      newStatorConductorData[conductorKey] = conductorValue;
      return updateObject(state, {
        statorConductorData: newStatorConductorData
      });

    case actionTypes.SET_STATOR_CONDUCTOR_IMAGE_URL:
      return updateObject(state, {
        statorConductorImageURL: action.payload
      });

    case actionTypes.SET_STATOR_MAIN_IMAGE_URL:
      return updateObject(state, {
        statorMainImageURL: action.payload
      });

    case actionTypes.SET_STATOR_MATERIAL_DICT:
      return updateObject(state, {
        statorMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_WINDING_MATERIAL_DICT:
      return updateObject(state, {
        statorWindingMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_INSULATION_MATERIAL_DICT:
      return updateObject(state, {
        statorInsulationMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_IMPREGNATION_MATERIAL_DICT:
      return updateObject(state, {
        statorImpregnationMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_WALLINSULATION_MATERIAL_DICT:
      return updateObject(state, {
        statorWallInsulationMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_WEDGE_MATERIAL_DICT:
      return updateObject(state, {
        statorWedgeMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_SEPARATOR_MATERIAL_DICT:
      return updateObject(state, {
        statorSeparatorMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_COILINSULATION_MATERIAL_DICT:
      return updateObject(state, {
        statorCoilInsulationMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_TOPSPACER_MATERIAL_DICT:
      return updateObject(state, {
        statorTopSpacerMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_BOTTOMSPACER_MATERIAL_DICT:
      return updateObject(state, {
        statorBottomSpacerMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_LEFTSPACER_MATERIAL_DICT:
      return updateObject(state, {
        statorLeftSpacerMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_RIGHTSPACER_MATERIAL_DICT:
      return updateObject(state, {
        statorRightSpacerMaterialDict: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_MATERIAL_DICT:
      return updateObject(state, {
        statorSlotMaterialDict: action.payload
      });

    default:
      return state;
  }
};

export default statorReducer;