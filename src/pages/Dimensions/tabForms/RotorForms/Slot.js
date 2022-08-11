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
  onGetRotorSlotImage, onSetDisableRotorSaveButton,
  onSetRotorSlotData,
  onSetRotorSlotParam,
  onSetRotorSlotType
} from "../../../../store/actions/rotorActions";
import {getRotorSlotName} from "../../../../utils/methods";

/* ----------------------------------------------------------------- */

export default function Slot() {
  const dispatch = useDispatch();
  const { slot_rotor } = FORM_DATA;
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const { rotorSlotType, rotorSlotData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.rotor && _loadedMachine.rotor.slot) {
        const loadedSlot = _loadedMachine.rotor.slot;
        const type = loadedSlot.type;
        const loadedData = loadedSlot.data ? {...loadedSlot.data} : null;
        dispatch(onSetRotorSlotType(type));
        dispatch(onSetRotorSlotData(loadedData));
        dispatch(onGetRotorSlotImage(type));
      }
    }
  }, [newMachine, loadedMachine]);

  const handleSlotType = useCallback((value) => {
    dispatch(onSetRotorSlotType(value));
    dispatch(onSetRotorSlotData(slot_rotor[value]));
    dispatch(onGetRotorSlotImage(value));

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.slot) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.rotor.slot.type;
      if (dbType !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, slot_rotor]);

  const handleSlotData = (key, value) => {
    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.slot) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else {
      const dbData = _loadedMachine.rotor.slot.data;
      if (dbData && dbData[key] && dbData[key] !== Number(value)) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
    dispatch(onSetRotorSlotParam(key, value ? Number(value) : value));
  };

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      <TextField
        select
        className={'select-list top-select'}
        name="slotType"
        label="Slot Type"
        variant="outlined"
        size="small"
        value={rotorSlotType}
        onChange={(e) => handleSlotType(e.target.value)}
      >
        {Object.keys(FORM_DATA.slot_rotor).map((slotItemKey, index) => (
          <MenuItem key={index} value={slotItemKey} className={'menu-item'}>
            {slotItemKey}
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
            {rotorSlotData &&
              Object.keys(rotorSlotData).map((slotDataItemKey, index) => {
                if (slotDataItemKey !== 'Type' && slotDataItemKey !== 'Units') {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        { getRotorSlotName(slotDataItemKey) }
                      </TableCell>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        <TextField
                          type="number"
                          className={'input-field'}
                          inputProps={{ min: 0,  step: 'any' }}
                          size="small"
                          value={rotorSlotData[slotDataItemKey]}
                          onChange={(e) =>
                            handleSlotData(slotDataItemKey, e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell sx={{py:1}} className={'tb-cell'}>
                        {rotorSlotData.Units[slotDataItemKey]}
                      </TableCell>
                    </TableRow>
                  )
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
