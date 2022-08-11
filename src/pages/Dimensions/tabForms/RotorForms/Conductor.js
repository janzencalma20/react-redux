import React, {useCallback, useEffect} from 'react'
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
  onSetDisableRotorSaveButton,
  onSetRotorConductorData,
  onSetRotorConductorParam,
  onSetRotorConductorType
} from "../../../../store/actions/rotorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Conductor() {
  const dispatch = useDispatch();
  const { rotorConductor } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { rotorConductorType, rotorConductorData, rotorConductorTypes } = useSelector(state => state.rotor);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.rotor && _loadedMachine.rotor.conductor) {
        const loadedConductor = _loadedMachine.rotor.conductor;
        const type = loadedConductor.type;
        const loadedData = loadedConductor.data ? {...loadedConductor.data} : null;
        dispatch(onSetRotorConductorType(type));
        dispatch(onSetRotorConductorData(loadedData));
        // dispatch(onGetRotorConductorImage(type));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const handleConductorType = useCallback((value) => {
    dispatch(onSetRotorConductorType(value));
    dispatch(onSetRotorConductorData(rotorConductor[value]));
    // dispatch(onGetRotorConductorImage(value));

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.conductor) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.rotor.conductor.type;
      if (dbType !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, rotorConductor]);

  const handleConductorData = (key, value) => {
    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.conductor) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else {
      const dbData = _loadedMachine.rotor.conductor.data;
      if (dbData && dbData[key] && dbData[key] !== Number(value)) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
    dispatch(onSetRotorConductorParam(key, value ? Number(value) : value));
  };

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      {rotorConductorTypes.length > 0 && (
        <TextField
          select
          className={'select-list top-select'}
          name="conductorType"
          label="Conductor Type"
          variant="outlined"
          size="small"
          value={rotorConductorType}
          onChange={(e) => handleConductorType(e.target.value)}
        >
          {rotorConductorTypes.map((conductorItemKey, index) => (
            <MenuItem key={index} value={conductorItemKey} className={'menu-item'}>
              {conductorItemKey}
            </MenuItem>
          ))}
        </TextField>
      )}

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
            {rotorConductorData &&
              Object.keys(rotorConductorData).map((conductorDataItemKey, index) => {
                if (conductorDataItemKey !== 'Type' && conductorDataItemKey !== 'Units') {
                  if (conductorDataItemKey === 'Gauge') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          {getDisplayName(conductorDataItemKey)}
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          <TextField
                            select
                            className={'select-list'}
                            variant="outlined"
                            name="Gauge"
                            value={rotorConductorData[conductorDataItemKey]}
                            onChange={(e) =>
                              handleConductorData(conductorDataItemKey, e.target.value)
                            }
                            SelectProps={{
                              MenuProps: {
                                sx: {maxHeight: 250}
                              }
                            }}
                            size="small"
                          >
                            {(rotorConductorType === 'AWG' ? materials.AWG : materials.SWG).map(
                              (materialItemKey, index) => (
                                <MenuItem
                                  key={index}
                                  value={materialItemKey}
                                  className={'menu-item'}
                                >
                                  {materialItemKey}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          {getDisplayName(conductorDataItemKey)}
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          <TextField
                            type="number"
                            className={'input-field'}
                            inputProps={{min: 0, step: 'any'}}
                            size="small"
                            value={rotorConductorData[conductorDataItemKey]}
                            onChange={(e) =>
                              handleConductorData(
                                conductorDataItemKey,
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          {rotorConductorData.Units[conductorDataItemKey]}
                        </TableCell>
                      </TableRow>
                    )
                  }
                } else {
                  return null
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
