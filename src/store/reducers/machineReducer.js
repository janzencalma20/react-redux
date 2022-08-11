import { updateObject }  from '../util';
import * as actionTypes from '../util/actionTypes';

const initialState = {
  machineLoading: false,
  machines: [],
  newMachine: null,
  loadedMachine: null,
  materials: null
};

const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MACHINE_LOADING:
      return updateObject(state, {
        machineLoading: action.payload
      });

    case actionTypes.NEW_MACHINE_CREATED:
      const payload = action.payload;
      return updateObject(state, {
        newMachine: payload
      });

    case actionTypes.SUCCESS_GETTING_MACHINES:
      const machines = action.payload;
      let machineArray = [];
      for(let i in machines) {
        machineArray.push(machines[i]);
      }
      return updateObject(state, {
        machines: machineArray
      });

    case actionTypes.LOAD_MACHINE:
      return updateObject(state, {
        loadedMachine: action.payload
      });

    case actionTypes.SET_MATERIALS:
      return updateObject(state, {
        materials: action.payload
      });

    default:
      return state;
  }
};

export default machineReducer;