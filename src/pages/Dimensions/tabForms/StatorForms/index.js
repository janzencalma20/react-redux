import React, {useCallback, useState} from 'react'
import {Button, Snackbar, Stack} from '@mui/material'
import LaminationStator from './LaminationStator'
import Slot from './Slot'
import Conductor from './Conductor'
import Winding from "./Winding";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../../../../utils/axios";
import {onGetStatorMainImage, onSetDisableStatorSaveButton} from "../../../../store/actions/statorActions";
import Alert from "@mui/material/Alert/Alert";

/* ----------------------------------------------------------------- */

export default function StatorForms() {

  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const {
    statorLaminationType, statorLaminationData, statorMaterialDict,
    statorSlotType, statorSlotData, statorSlotMaterialDict,
    statorWindingType, statorWindingData, statorWindingMaterialDict, statorInsulationMaterialDict,
    statorConductorType, statorConductorData, statorMainImageURL, disableStatorButton,
    statorImpregnationMaterialDict, statorWallInsulationMaterialDict, statorWedgeMaterialDict,
    statorSeparatorMaterialDict, statorCoilInsulationMaterialDict, statorTopSpacerMaterialDict,
    statorBottomSpacerMaterialDict, statorLeftSpacerMaterialDict, statorRightSpacerMaterialDict
  } = useSelector(state => state.stator);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const submitLamination = useCallback(async () => {
    const cloneLaminationData = {...statorLaminationData};
    delete cloneLaminationData.Type;

    const reqData = {
      type: statorLaminationType,
      data: {
        ...cloneLaminationData,
        'Material': { ...cloneLaminationData['Material'], ...statorMaterialDict }
      }
    };
    if (newMachine || loadedMachine) {
      const statorId = newMachine ? newMachine.stator.id : loadedMachine.stator.id;
      const res = await axiosInstance.patch(`/machine/stator/${statorId}/`, reqData);
      if (res.data) {
        if (newMachine) {
          newMachine.stator.type = res.data.type;
          newMachine.stator.data = res.data.data;
        }
        if (loadedMachine) {
          loadedMachine.stator.type = res.data.type;
          loadedMachine.stator.data = res.data.data;
        }
      }
    }
  }, [newMachine, loadedMachine, statorLaminationType, statorLaminationData, statorMaterialDict]);

  const submitSlot = async () => {
    const cloneSlotData = { ...statorSlotData };
    delete cloneSlotData.Type;

    const reqData = {
      type: statorSlotType,
      data: {
        ...cloneSlotData,
        'SeparatorMaterial': { ...cloneSlotData['SeparatorMaterial'], ...statorSlotMaterialDict }
      }
    };
    try {
      const response = await axiosInstance.post('/machine/slot/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          slot: response.data['id']
        };
        if (newMachine || loadedMachine) {
          const _loadedMachine = newMachine ? newMachine : loadedMachine;
          const statorId = _loadedMachine.stator.id;
          await axiosInstance.patch(`/machine/stator/${statorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.stator.slot = {
            id: response.data['id'],
            type: statorSlotType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

    }
  };

  const submitWinding = async () => {
    const cloneData = {...statorWindingData};
    delete cloneData.Type;

    let reqData = {};

    if (statorWindingType === 'RandomWound') {
      reqData = {
        type: statorWindingType,
        data: {
          ...cloneData,
          'WindingMaterial': { ...cloneData['WindingMaterial'], ...statorWindingMaterialDict },
          'InsulationMaterial': { ...cloneData['InsulationMaterial'], ...statorInsulationMaterialDict },
          'ImpregnationMaterial': { ...cloneData['ImpregnationMaterial'], ...statorImpregnationMaterialDict },
          'WallInsulationMaterial': { ...cloneData['WallInsulationMaterial'], ...statorWallInsulationMaterialDict },
          'WedgeMaterial': { ...cloneData['WedgeMaterial'], ...statorWedgeMaterialDict },
          'SeparatorMaterial': { ...cloneData['SeparatorMaterial'], ...statorSeparatorMaterialDict },
        },
      };
    } else {
      reqData = {
        type: statorWindingType,
        data: {
          ...cloneData,
          'WindingMaterial': { ...cloneData['WindingMaterial'], ...statorWindingMaterialDict },
          'InsulationMaterial': { ...cloneData['InsulationMaterial'], ...statorInsulationMaterialDict },
          'WallInsulationMaterial': { ...cloneData['WallInsulationMaterial'], ...statorWallInsulationMaterialDict },
          'WedgeMaterial': { ...cloneData['WedgeMaterial'], ...statorWedgeMaterialDict },
          'SeparatorMaterial': { ...cloneData['SeparatorMaterial'], ...statorSeparatorMaterialDict },
          'CoilInsulationMaterial': { ...cloneData['CoilInsulationMaterial'], ...statorCoilInsulationMaterialDict },
          'TopSpacerMaterial': { ...cloneData['TopSpacerMaterial'], ...statorTopSpacerMaterialDict },
          'BottomSpacerMaterial': { ...cloneData['BottomSpacerMaterial'], ...statorBottomSpacerMaterialDict },
          'LeftSpacerMaterial': { ...cloneData['LeftSpacerMaterial'], ...statorLeftSpacerMaterialDict },
          'RightSpacerMaterial': { ...cloneData['RightSpacerMaterial'], ...statorRightSpacerMaterialDict },
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
          await axiosInstance.patch(`/machine/stator/${statorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.stator.winding = {
            id: response.data['id'],
            type: statorWindingType,
            data: reqData.data
          };
        }
      }
    } catch (e) {

    }
  };

  const submitConductor = async () => {
    const cloneData = { ...statorConductorData };
    delete cloneData.Type;

    const reqData = {
      type: statorConductorType,
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
          const statorId = _loadedMachine.stator.id;
          await axiosInstance.patch(`/machine/stator/${statorId}/`, request);
          // assign updated values into new or loaded machine model
          _loadedMachine.stator.conductor = {
            id: response.data['id'],
            type: statorConductorType,
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
      dispatch(onGetStatorMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
  };

  const onSaveData = async () => {
    statorLaminationData && await submitLamination();
    statorSlotData && await submitSlot();
    statorWindingData && await submitWinding();
    statorConductorData && await submitConductor();
    statorMainImageURL && await onUpdateView();
    dispatch(onSetDisableStatorSaveButton(true));
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
        disabled={disableStatorButton}
        onClick={onSaveData}
      >
        Save Data
      </Button>
      <LaminationStator />
      <Slot />
      <Winding />
      {statorWindingType && <Conductor />}

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
