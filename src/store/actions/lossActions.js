import * as actionTypes from "../util/actionTypes";
import s3 from "../../utils/s3";

export const onInitLossParams = () => ({
  type: actionTypes.INIT_LOSS_PARAMS
});

export const onSetLossData = (data) => ({
  type: actionTypes.SET_LOSS_DATA,
  payload: data
});

export const onSetLossParam = (key, value) => ({
  type: actionTypes.SET_LOSS_PARAM,
  payload: {key, value}
});

export const onSetLossType = (type) => ({
  type: actionTypes.SET_LOSS_TYPE,
  payload: type
});

const onSetLossMainImageUrl = (URL) => ({
  type: actionTypes.SET_LOSS_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetLossMainImageUrl = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetLossMainImageUrl(url));
    }).catch(() => {
      dispatch(onSetLossMainImageUrl(''));
    })
  }
};