import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  disableRotorButton: true,
  rotorLaminationType: '',
  rotorLaminationData: null,
  rotorSlotType: '',
  rotorSlotData: null,
  rotorSlotImageURL: '',
  rotorWindingType: '',
  rotorWindingData: null,
  rotorWindingImageURL: '',
  rotorConductorTypes: [],
  rotorConductorType: '',
  rotorConductorData: null,
  rotorConductorImageURL: '',
  rotorHoleType: '',
  rotorHoleData: null,
  rotorHoleImageURL: '',
  rotorMainImageURL: '',
  rotorMaterialDict: null,
  rotorWindingMaterialDict: null,
  rotorInsulationMaterialDict: null,
  rotorWallInsulationMaterialDict: null,
  rotorImpregnationMaterialDict: null,
  rotorHoleMaterialDict: null
};

const rotorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ROTOR_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_DISABLE_ROTOR_SAVE_BUTTON:
      return updateObject(state, {
        disableRotorButton: action.payload
      });

    case actionTypes.SET_ROTOR_LAMINATION_DATA:
      return updateObject(state, {
        rotorLaminationData: action.payload
      });

    case actionTypes.SET_ROTOR_LAMINATION_PARAM:
      const {key, value, isMaterial} = action.payload;
      const newRotorLaminationData = state.rotorLaminationData;
      if (isMaterial) {
        newRotorLaminationData[key] = {};
        newRotorLaminationData[key]['Name'] = value
      } else {
        newRotorLaminationData[key] = value;
      }
      return updateObject(state, {
        rotorLaminationData: newRotorLaminationData
      });

    case actionTypes.SET_ROTOR_LAMINATION_TYPE:
      return updateObject(state, {
        rotorLaminationType: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_TYPE:
      return updateObject(state, {
        rotorSlotType: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_DATA:
      return updateObject(state, {
        rotorSlotData: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_PARAM:
      const {slotKey, slotValue} = action.payload;
      const newRotorSlotData = state.rotorSlotData;
      newRotorSlotData[slotKey] = slotValue;
      return updateObject(state, {
        rotorSlotData: newRotorSlotData
      });

    case actionTypes.SET_ROTOR_WINDING_TYPE:
      return updateObject(state, {
        rotorWindingType: action.payload
      });

    case actionTypes.SET_ROTOR_WINDING_DATA:
      return updateObject(state, {
        rotorWindingData: action.payload
      });

    case actionTypes.SET_ROTOR_WINDING_PARAM:
      const {windingKey, windingValue, material} = action.payload;
      const newRotorWindingData = state.rotorWindingData;
      if (material) {
        newRotorWindingData[windingKey] = {};
        newRotorWindingData[windingKey]['Name'] = windingValue
      } else {
        newRotorWindingData[windingKey] = windingValue;
      }
      return updateObject(state, {
        rotorWindingData: newRotorWindingData
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_TYPES:
      return updateObject(state, {
        rotorConductorTypes: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_TYPE:
      return updateObject(state, {
        rotorConductorType: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_DATA:
      return updateObject(state, {
        rotorConductorData: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_PARAM:
      const {conductorKey, conductorValue} = action.payload;
      const newRotorConductorData = state.rotorConductorData;
      newRotorConductorData[conductorKey] = conductorValue;
      return updateObject(state, {
        rotorConductorData: newRotorConductorData
      });

    case actionTypes.SET_ROTOR_HOLE_TYPE:
      return updateObject(state, {
        rotorHoleType: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_DATA:
      return updateObject(state, {
        rotorHoleData: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_PARAM:
      const {holeKey, holeValue, is_material} = action.payload;
      const newRotorHoleData = state.rotorHoleData;
      if (is_material) {
        newRotorHoleData[holeKey] = {};
        newRotorHoleData[holeKey]['Name'] = holeValue
      } else {
        newRotorHoleData[holeKey] = holeValue;
      }
      return updateObject(state, {
        rotorHoleData: newRotorHoleData
      });

    case actionTypes.SET_ROTOR_SLOT_IMAGE_URL:
      return updateObject(state, {
        rotorSlotImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_IMAGE_URL:
      return updateObject(state, {
        rotorConductorImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_IMAGE_URL:
      return updateObject(state, {
        rotorHoleImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_MAIN_IMAGE_URL:
      return updateObject(state, {
        rotorMainImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_MATERIAL_DICT:
      return updateObject(state, {
        rotorMaterialDict: action.payload
      });

    case actionTypes.SET_ROTOR_WINDING_MATERIAL_DICT:
      return updateObject(state, {
        rotorWindingMaterialDict: action.payload
      });

    case actionTypes.SET_ROTOR_INSULATION_MATERIAL_DICT:
      return updateObject(state, {
        rotorInsulationMaterialDict: action.payload
      });

    case actionTypes.SET_ROTOR_WALLINSULATION_MATERIAL_DICT:
      return updateObject(state, {
        rotorWallInsulationMaterialDict: action.payload
      });

    case actionTypes.SET_ROTOR_IMPREGNATION_MATERIAL_DICT:
      return updateObject(state, {
        rotorImpregnationMaterialDict: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_MATERIAL_DICT:
      return updateObject(state, {
        rotorHoleMaterialDict: action.payload
      });

    default:
      return state;

  }
};

export default rotorReducer;