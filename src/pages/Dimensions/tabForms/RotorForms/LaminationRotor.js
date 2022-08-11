import React, {useEffect, useCallback} from 'react'
import {
  Stack,
  TextField,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Card
} from '@mui/material'
import { FORM_DATA } from 'src/utils/constants'
import {useDispatch, useSelector} from "react-redux";
import {
  onGetRotorMaterialsDict, onSetDisableRotorSaveButton,
  onSetRotorConductorImageURL,
  onSetRotorHoleImageURL,
  onSetRotorLaminationData,
  onSetRotorLaminationParam,
  onSetRotorLaminationType, onSetRotorMainImageURL, onSetRotorSlotImageURL
} from "../../../../store/actions/rotorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function LaminationRotor(props) {
  const dispatch = useDispatch();
  const { lamination_rotor } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { rotorLaminationType, rotorLaminationData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const loadedRotor = newMachine ? newMachine.rotor : loadedMachine.rotor;
      if (loadedRotor.type !== 'rotor') {
        const type = loadedRotor.type;
        const loadedData = loadedRotor.data ? {...loadedRotor.data} : null;
        dispatch(onSetRotorLaminationType(type));
        dispatch(onSetRotorLaminationData(loadedData));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (materialValue) => {
    dispatch(onGetRotorMaterialsDict('lamination', materialValue, 'material'));
  };

  const handleLaminationType = useCallback((value) => {
    dispatch(onSetRotorHoleImageURL(''));
    dispatch(onSetRotorSlotImageURL(''));
    dispatch(onSetRotorConductorImageURL(''));
    dispatch(onSetRotorMainImageURL(''));

    dispatch(onSetRotorLaminationType(value));
    dispatch(onSetRotorLaminationData(lamination_rotor[value]));
    fetchMaterialDict(lamination_rotor[value]['Material']['Name']);

    if (newMachine || loadedMachine) { // compare inputted type and db type
      const dbType = newMachine ? newMachine.rotor.type : loadedMachine.rotor.type;
      if (dbType !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, lamination_rotor]);

  const handleLaminationData = (key, value, isMaterial) => {
    if (isMaterial) {
      fetchMaterialDict(value);
    }

    // compare inputted value and db value when load machine
    const dbData = newMachine ? newMachine.rotor.data : loadedMachine.rotor.data;
    if (isMaterial) {
      if (dbData && dbData['Material'] && dbData['Material']['Name'] !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    } else {
      if (dbData && dbData[key] && dbData[key] !== Number(value)) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
    dispatch(onSetRotorLaminationParam(key, value ? Number(value) : value, isMaterial));
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        className={'select-list top-select'}
        name="laminationType"
        label="Lamination Type"
        variant="outlined"
        size="small"
        value={rotorLaminationType}
        onChange={(e) => handleLaminationType(e.target.value)}
      >
        {Object.keys(FORM_DATA.lamination_rotor).map((laminationItemKey, index) => (
          <MenuItem key={index} value={laminationItemKey} className={'menu-item'}>
            {laminationItemKey}
          </MenuItem>
        ))}
      </TextField>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 1, width: '50%' }}>Parameter</TableCell>
              <TableCell sx={{ py: 1, width: '30%' }}>Value</TableCell>
              <TableCell sx={{ py: 1, width: '20%' }}>Units</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rotorLaminationData &&
              Object.keys(rotorLaminationData).map((laminationDataItemKey, index) => {
                  if (laminationDataItemKey !== 'Type' && laminationDataItemKey!=='Units') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(laminationDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          {laminationDataItemKey === 'Material' ? (
                            <TextField
                              select
                              className={'select-list'}
                              SelectProps={{
                                MenuProps: {
                                  sx: { maxHeight: 250 }
                                }
                              }}
                              variant="outlined"
                              value={rotorLaminationData[laminationDataItemKey]['Name']}
                              onChange={(e) =>
                                handleLaminationData(
                                  laminationDataItemKey,
                                  e.target.value,
                                  true
                                )
                              }
                              size="small"
                            >
                              {materials.lamination.map(
                                (materialItemKey, index) => (
                                  <MenuItem key={index} value={materialItemKey} className={'menu-item'}>
                                    {materialItemKey}
                                  </MenuItem>
                                ),
                              )}
                            </TextField>
                          ) : (
                            <TextField
                              type="number"
                              className={'input-field'}
                              inputProps={{ min: 0, step: 'any' }}
                              size="small"
                              value={rotorLaminationData[laminationDataItemKey]}
                              onChange={(e) =>
                                handleLaminationData(
                                  laminationDataItemKey,
                                  e.target.value,
                                  false
                                )
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{py:1}} className={'tb-cell'}>
                          {rotorLaminationData.Units[laminationDataItemKey]}
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return null
                  }
                },
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
