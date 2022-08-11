import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

import machineReducer from './reducers/machineReducer';
import statorReducer from "./reducers/statorReducer";
import rotorReducer from "./reducers/rotorReducer";
import housingReducer from "./reducers/housingReducer";
import resultsReducer from "./reducers/resultsReducer";
import lossReducer from "./reducers/lossReducer";
import coolingReducer from "./reducers/coolingReducer";
import projectReducer from "./reducers/projectReducer";
import alertReducer from "./reducers/alertReducer";
import lptnReducer from "./reducers/lptnReducer";

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  alert: alertReducer,
  project: projectReducer,
  machine: machineReducer,
  stator: statorReducer,
  rotor: rotorReducer,
  housing: housingReducer,
  results: resultsReducer,
  loss: lossReducer,
  cooling: coolingReducer,
  lptn: lptnReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;