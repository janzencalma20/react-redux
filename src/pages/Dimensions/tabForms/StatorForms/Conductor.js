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
  onSetDisableStatorSaveButton,
  onSetStatorConductorData,
  onSetStatorConductorParam,
  onSetStatorConductorType
} from "../../../../store/actions/statorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Conductor() {
  const dispatch = useDispatch();
  const { statorConductor } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { statorConductorType, statorConductorData, statorConductorTypes } = useSelector(state => state.stator);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.stator && _loadedMachine.stator.conductor) {
        const loadedConductor = _loadedMachine.stator.conductor;
        const type = loadedConductor.type;
        const loadedData = loadedConductor.data ? {...loadedConductor.data} : null;
        dispatch(onSetStatorConductorType(type));
        dispatch(onSetStatorConductorData(loadedData));
        // dispatch(onGetStatorConductorImage(type));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const handleConductorType = useCallback((value) => {
    dispatch(onSetStatorConductorType(value));
    dispatch(onSetStatorConductorData(statorConductor[value]));
    // dispatch(onGetStatorConductorImage(value));

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.conductor) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.stator.conductor.type;
      if (dbType !== value) {
        dispatch(onSetDisableStatorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, statorConductor]);

  const handleConductorData = (key, value) => {
    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.conductor) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else {
      const dbData = _loadedMachine.stator.conductor.data;
      if (dbData && dbData[key] && dbData[key] !== Number(value)) {
        dispatch(onSetDisableStatorSaveButton(false));
      }
    }
    dispatch(onSetStatorConductorParam(key, value ? Number(value) : value));
  };

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      {statorConductorTypes.length > 0 && (
        <TextField
          select
          className={'select-list top-select'}
          name="conductorType"
          label="Conductor Type"
          variant="outlined"
          size="small"
          value={statorConductorType}
          onChange={(e) => handleConductorType(e.target.value)}
        >
          {statorConductorTypes.map((conductorItemKey, index) => (
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
            {statorConductorData &&
              Object.keys(statorConductorData).map((conductorDataItemKey, index) => {
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
                            value={statorConductorData[conductorDataItemKey]}
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
                            {(statorConductorType === 'AWG' ? materials.AWG : materials.SWG).map(
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
                            value={statorConductorData[conductorDataItemKey]}
                            onChange={(e) =>
                              handleConductorData(
                                conductorDataItemKey,
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          {statorConductorData.Units[conductorDataItemKey]}
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
