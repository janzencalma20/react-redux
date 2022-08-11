import React, {useState} from 'react'
import {Button, Snackbar, Stack} from '@mui/material'
import Housing from "./Housing";
import {axiosInstance} from "../../../../utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {onGetHousingMainImage, onSetDisableHousingSaveButton} from "../../../../store/actions/housingActions";
import Alert from "@mui/material/Alert/Alert";

export default function HousingForms() {

  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const {
    housingType, housingData, housingMaterialDict, housingMainImageURL, disableHousingButton
  } = useSelector(state => state.housing);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const submitHousing = async () => {
    const cloneHousingData = { ...housingData };
    delete cloneHousingData.Type;

    const reqData = {
      type: housingType,
      data: {
        ...cloneHousingData,
        'Material': { ...cloneHousingData['Material'], ...housingMaterialDict }
      }
    };
    if (newMachine || loadedMachine) {
      const housingId = newMachine ? newMachine.housing.id : loadedMachine.housing.id;
      const res = await axiosInstance.patch(`/machine/housing/${housingId}/`, reqData);
      if (res.data) {
        if (newMachine) {
          newMachine.housing.type = res.data.type;
          newMachine.housing.data = res.data.data;
        }
        if (loadedMachine) {
          loadedMachine.housing.type = res.data.type;
          loadedMachine.housing.data = res.data.data;
        }
      }
    }
  };

  const onUpdateView = async () => {
    try {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      const response = await axiosInstance.get(`/machine/dimensions/${currentMachineID}/create_machine_image/`);
      if (response.data.error) {
        setAlertMsg(response.data.error);
        setShowAlert(true);
      }
      dispatch(onGetHousingMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
  };

  const onSaveData = async () => {
    housingData && await submitHousing();
    housingMainImageURL && await onUpdateView();
    dispatch(onSetDisableHousingSaveButton(true));
  };

  const onCloseAlert = () => {
    setAlertMsg('');
    setShowAlert(false);
  };

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        className={'save-data-btn'}
        disabled={disableHousingButton}
        onClick={onSaveData}
      >
        Save Data
      </Button>
      <Housing />

      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Alert onClose={onCloseAlert} severity="error">
          {alertMsg}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
