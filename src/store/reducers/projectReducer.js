import * as actionTypes from "../util/actionTypes";
import {updateObject} from "../util";

const initialState = {
  projectLoading: false,
  projects: [],
  loadedProject: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROJECT_LOADING:
      return updateObject(state, {
        projectLoading: action.payload
      });

    case actionTypes.GET_PROJECTS_SUCCESS:
      const projects = action.payload.projects;
      return updateObject(state, {
        projects: projects
      });

    case actionTypes.PROJECT_DELETE_SUCCESS:
      const projectID = action.payload;
      const updatedProjects = state.projects.filter((project) => project.id !== projectID);
      return updateObject(state, {
        projects: updatedProjects
      });

    case actionTypes.LOAD_PROJECT:
      return updateObject(state, {
        loadedProject: action.payload
      });

    default:
      return state;
  }
};

export default projectReducer;