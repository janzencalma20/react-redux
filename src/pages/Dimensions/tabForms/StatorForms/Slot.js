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
  onGetStatorMaterialsDict,
  onGetStatorSlotImage, onSetDisableStatorSaveButton,
  onSetStatorSlotData,
  onSetStatorSlotParam,
  onSetStatorSlotType
} from "../../../../store/actions/statorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Slot() {
  const dispatch = useDispatch();
  const { slot_stator } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { statorSlotType, statorSlotData } = useSelector(state => state.stator);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.stator && _loadedMachine.stator.slot) {
        const loadedSlot = _loadedMachine.stator.slot;
        const type = loadedSlot.type;
        const loadedData = loadedSlot.data ? {...loadedSlot.data} : null;
        dispatch(onSetStatorSlotType(type));
        dispatch(onSetStatorSlotData(loadedData));
        dispatch(onGetStatorSlotImage(type));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (materialValue) => {
    dispatch(onGetStatorMaterialsDict('insulation', materialValue, 'slot'));
  };

  const handleSlotType = useCallback((value) => {
    dispatch(onSetStatorSlotType(value));
    dispatch(onSetStatorSlotData(slot_stator[value]));
    dispatch(onGetStatorSlotImage(value));
    fetchMaterialDict(slot_stator[value]['SeparatorMaterial']['Name']);

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.slot) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.stator.slot.type;
      if (dbType !== value) {
        dispatch(onSetDisableStatorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, dispatch, slot_stator]);

  const handleSlotData = (key, value, isMaterial) => {
    if (isMaterial) {
      fetchMaterialDict(value);
    }
    if (key === 'Zs') {
      value = Math.round(value)
    }

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.slot) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else {
      const dbData = _loadedMachine.stator.slot.data;
      if (isMaterial) {
        if (dbData && dbData['SeparatorMaterial'] && dbData['SeparatorMaterial']['Name'] !== value) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      } else {
        if (dbData && dbData[key] && dbData[key] !== Number(value)) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      }
    }
    dispatch(onSetStatorSlotParam(key, isMaterial ? value : (value ? Number(value) : value), isMaterial))
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
        value={statorSlotType}
        onChange={(e) => handleSlotType(e.target.value)}
      >
        {Object.keys(FORM_DATA.slot_stator).map((slotItemKey, index) => (
          <MenuItem key={index} value={slotItemKey} className={'menu-item'}>
            { getDisplayName(slotItemKey) }
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
            {statorSlotData &&
              Object.keys(statorSlotData).map((slotDataItemKey, index) => {
                if (slotDataItemKey !== 'Type' && slotDataItemKey!=='Units') {
                  if (
                    slotDataItemKey === 'SeparatorMaterial'
                  ) {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(slotDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            select
                            className={'select-list'}
                            variant="outlined"
                            name="wedgeMaterial"
                            value={statorSlotData[slotDataItemKey]['Name']}
                            onChange={(e) =>
                              handleSlotData(
                                slotDataItemKey,
                                e.target.value,
                                true
                              )
                            }
                            SelectProps={{
                              MenuProps: {
                                sx: { maxHeight: 250 }
                              }
                            }}
                            size="small"
                          >
                            {materials.insulation.map(
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
                          { (statorSlotType === 'ParallelSlot' && slotDataItemKey === 'W1') && 'Slot Width' }
                          { (statorSlotType === 'GeneralSlot' && slotDataItemKey === 'W1') && 'Slot Width Top' }
                          { slotDataItemKey !== 'W1' && getDisplayName(slotDataItemKey) }
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          <TextField
                            type="number"
                            className={'input-field'}
                            inputProps={{min: 0, step: 'any'}}
                            size="small"
                            value={statorSlotData[slotDataItemKey]}
                            onChange={(e) =>
                              handleSlotData(slotDataItemKey, e.target.value, false)
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py: 1}} className={'tb-cell'}>
                          {statorSlotData.Units[slotDataItemKey]}
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
