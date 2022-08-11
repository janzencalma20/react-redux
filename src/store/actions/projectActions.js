import {axiosInstance} from "../../utils/axios";
import * as actionTypes from "../util/actionTypes";
import {setMachineLoading} from "./machineActions";

export const setProjectLoading = (loading) => ({
  type: actionTypes.SET_PROJECT_LOADING,
  payload: loading
});

const successGetProjects = (projects) => ({
  type: actionTypes.GET_PROJECTS_SUCCESS,
  payload: projects
});

export const onGetProjects = (orgID) => {
  return async (dispatch) => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axiosInstance.get(`/machine/organisation/${orgID}/get_org_projects/`);
      if (res && res.data) {
        dispatch(successGetProjects(res.data));
        dispatch(setProjectLoading(false));
      }
    } catch (e) {
      dispatch(successGetProjects([]));
      dispatch(setProjectLoading(false));
    }
  }
};

export const onProjectLoaded = (project) => ({
  type: actionTypes.LOAD_PROJECT,
  payload: project
});


const projectDeleteSuccess = (projectID) => ({
  type: actionTypes.PROJECT_DELETE_SUCCESS,
  payload: projectID
});


export const onDeleteProject = (projectID, callback) => {
  return async (dispatch) => {
    dispatch(setProjectLoading(true));
    try {
      const res = await axiosInstance.delete(`/machine/project/${projectID}/`);
      if (res.status > 200 && res.status < 300) {
        dispatch(projectDeleteSuccess(projectID));
        callback(true);
      } else {
        callback(true);
      }
      dispatch(setProjectLoading(false));
    } catch (e) {
      callback(false);
      dispatch(setProjectLoading(false));
    }
  }
};