import * as actionTypes from '../util/actionTypes';
import {axiosInstance} from "../../utils/axios";
import s3 from "../../utils/s3";
import { bucket_name }  from '../../config';

export const setMachineLoading = (loading) => ({
  type: actionTypes.SET_MACHINE_LOADING,
  payload: loading
});

export const newMachineCreated = (payload) => ({
  type: actionTypes.NEW_MACHINE_CREATED,
  payload
});

const successGetMachines = (machines) => ({
  type: actionTypes.SUCCESS_GETTING_MACHINES,
  payload: machines
});

export const onGetProjectsMachines = (startLoading, projectIDs) => {
  return async (dispatch) => {
    startLoading && dispatch(setMachineLoading(true));
    try {
      const request = {
        project_ids: projectIDs
      };
      const res = await axiosInstance.post(`/machine/dimensions/projects/get-machines/`, request);
      if (res && res.data) {
        dispatch(successGetMachines(res.data));
        dispatch(setMachineLoading(false));
      }
    } catch (e) {
      dispatch(successGetMachines({}));
      dispatch(setMachineLoading(false));
    }
  }
};

export const onSaveMachine = (machine) => ({
  type: actionTypes.LOAD_MACHINE,
  payload: machine
});

export const onDeleteSavedMachine = (machineID, callback) => {
  return async (dispatch) => {
    dispatch(setMachineLoading(true));
    try {
      await axiosInstance.delete(`/machine/dimensions/${machineID}/`);
      callback(true);
    } catch (e) {
      callback(false);
      dispatch(setMachineLoading(false));
    }
  }
};

const getMaterialsSuccess = (materials) => ({
  type: actionTypes.SET_MATERIALS,
  payload: materials
});

export const onGetMaterials = () => {
  return (dispatch) => {
    axiosInstance.get(`/machine/dimensions/get_materials/`)
      .then(res => {
        dispatch(getMaterialsSuccess(res.data))
      })
      .catch(() => {
        dispatch(getMaterialsSuccess([]))
      })
  }
};

export const onDeleteMachineS3Dir = (dir, callback) => {
  return async () => {
    const listParams = {
      Bucket: bucket_name,
      Prefix: dir
    };
    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) {
      return;
    }

    let objects = [];
    listedObjects.Contents.forEach((content) => {
      objects.push({Key: String(content.Key)})
    });

    const deleteParams = {
      Bucket: bucket_name,
      Delete: {
        Objects: objects
      }
    };

    try {
      await s3.deleteObjects(deleteParams).promise();
      if (listedObjects.IsTruncated) {
        await onDeleteMachineS3Dir(dir, callback);
      }
      callback('S3 objects are deleted')
    } catch (e) {
      callback(null)
    }
  }
};