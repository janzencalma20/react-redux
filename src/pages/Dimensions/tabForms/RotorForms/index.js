import React, {Fragment, useState} from 'react'
import {Button, Snackbar, Stack} from '@mui/material'
import Hole from './Hole'
import Lamination from './LaminationRotor'
import Slot from './Slot'
import Conductor from './Conductor'
import {useDispatch, useSelector} from "react-redux";
import Winding from "./Winding";
import {axiosInstance} from "../../../../utils/axios";
import {onGetRotorMainImage, onSetDisableRotorSaveButton} from "../../../../store/actions/rotorActions";
import Alert from "@mui/material/Alert/Alert";

export default function StatorForms() {

  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const {
    rotorLaminationType, rotorLaminationData, rotorMaterialDict,
    rotorHoleType, rotorHoleData, rotorHoleMaterialDict,
    rotorSlotType, rotorSlotData,
    rotorWindingType, rotorWindingData, rotorWindingMaterialDict, rotorInsulationMaterialDict,
    rotorConductorType, rotorConductorData, rotorMainImageURL, disableRotorButton,
    rotorWallInsulationMaterialDict, rotorImpregnationMaterialDict
  } = useSelector(state => state.rotor);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const submitLamination = async () => {
    const cloneLaminationData = {...rotorLaminationData};
    delete cloneLaminationData.Type;

    const reqData = {
      type: rotorLaminationType,
      data: {
        ...cloneLaminationData,
        'Material': { ...cloneLaminationData['Material'], ...rotorMaterialDict }
      },
    };
    if (newMachine || loadedMachine) {
      const rotorId = newMachine ? newMachine.rotor.id : loadedMachine.rotor.id;
      const res = await axiosInstance.patch(`/machine/rotor/${rotorId}/`, reqData);
      if (res.data) {
        if (newMachine) {
          newMachine.rotor.type = res.data.type;
          newMachine.rotor.data = res.data.data;
        }
        if (loadedMachine) {
          loadedMachine.rotor.type = res.data.type;
          loadedMachine.rotor.data = res.data.data;
        }
      }
    }
  };

  const submitHole = async () => {
    const cloneHoleData = { ...rotorHoleData };
    delete cloneHoleData.Type;

    const reqData = {
      type: rotorHoleType,
      data: {
        ...cloneHoleData,
        'Material': { ...cloneHoleData['Material'], ...rotorHoleMaterialDict }
      },
    };

    try {
      const response = await axiosInstance.post('/machine/hole/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          hole: response.data['id']
        };
        if (newMachine || loadedMachine) {
          const _loadedMachine = newMachine ? newMachine : loadedMachine;
          const rotorId = _loadedMachine.rotor.id;
          await axiosInstance.patch(`/machine/rotor/${rotorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.rotor.hole = {
            id: response.data['id'],
            type: rotorHoleType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

    }
  };

  const submitSlot = async () => {
    const cloneSlotData = { ...rotorSlotData };
    delete cloneSlotData.Type;

    const reqData = {
      type: rotorSlotType,
      data: {
        ...cloneSlotData,
      },
    };
    try {
      const response = await axiosInstance.post('/machine/slot/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          slot: response.data['id']
        };
        if (newMachine || loadedMachine) {
          const _loadedMachine = newMachine ? newMachine : loadedMachine;
          const rotorId = _loadedMachine.rotor.id;
          await axiosInstance.patch(`/machine/rotor/${rotorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.rotor.slot = {
            id: response.data['id'],
            type: rotorSlotType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

    }
  };

  const submitWinding = async () => {
    const cloneData = { ...rotorWindingData };
    delete cloneData.Type;

    let reqData = {};
    if (rotorWindingType === 'RandomWound') {
      reqData = {
        type: rotorWindingType,
        data: {
          ...cloneData,
          'WindingMaterial': { ...cloneData['WindingMaterial'], ...rotorWindingMaterialDict },
          'InsulationMaterial': { ...cloneData['InsulationMaterial'], ...rotorInsulationMaterialDict },
          'ImpregnationMaterial': { ...cloneData['ImpregnationMaterial'], ...rotorImpregnationMaterialDict },
          'WallInsulationMaterial': { ...cloneData['WallInsulationMaterial'], ...rotorWallInsulationMaterialDict },
        },
      };
    } else {
      reqData = {
        type: rotorWindingType,
        data: {
          ...cloneData,
          'WindingMaterial': { ...cloneData['WindingMaterial'], ...rotorWindingMaterialDict },
          'InsulationMaterial': { ...cloneData['InsulationMaterial'], ...rotorInsulationMaterialDict },
          'WallInsulationMaterial': { ...cloneData['WallInsulationMaterial'], ...rotorWallInsulationMaterialDict },
        },
      };
    }

    try {
      const response = await axiosInstance.post('/machine/winding/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          winding: response.data['id']
        };
        if (newMachine || loadedMachine) {
          const _loadedMachine = newMachine ? newMachine : loadedMachine;
          const statorId = _loadedMachine.stator.id;
          await axiosInstance.patch(`/machine/rotor/${statorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.rotor.winding = {
            id: response.data['id'],
            type: rotorWindingType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

    }
  };

  const submitConductor = async () => {
    const cloneData = { ...rotorConductorData };
    delete cloneData.Type;

    const reqData = {
      type: rotorConductorType,
      data: {
        ...cloneData,
      },
    };

    try {
      const response = await axiosInstance.post('/machine/conductor/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          conductor: response.data['id']
        };
        if (newMachine || loadedMachine) {
          const _loadedMachine = newMachine ? newMachine : loadedMachine;
          const rotorId = _loadedMachine.rotor.id;
          await axiosInstance.patch(`/machine/rotor/${rotorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.rotor.conductor = {
            id: response.data['id'],
            type: rotorConductorType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

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
      dispatch(onGetRotorMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
  };

  const onSaveData = async () => {
    rotorLaminationData && await submitLamination();
    rotorHoleData && await submitHole();
    rotorSlotData && await submitSlot();
    rotorWindingData && await submitWinding();
    rotorConductorData && await submitConductor();
    rotorMainImageURL && await onUpdateView();
    dispatch(onSetDisableRotorSaveButton(true));
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
        disabled={disableRotorButton}
        onClick={onSaveData}
      >
        Save Data
      </Button>
      <Lamination />
      {rotorLaminationType ? (
        rotorLaminationType === 'LamHole' ? (
          <Hole />
        ) : (
          <Fragment>
            <Slot />
            <Winding />
            {rotorWindingType && <Conductor />}
          </Fragment>
        )
      ) : (
        <></>
      )}

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
