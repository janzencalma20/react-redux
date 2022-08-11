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
  onGetRotorHoleImage, onGetRotorMaterialsDict, onSetDisableRotorSaveButton,
  onSetRotorHoleData,
  onSetRotorHoleParam,
  onSetRotorHoleType
} from "../../../../store/actions/rotorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Hole() {
  const dispatch = useDispatch();
  const { hole } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { rotorHoleType, rotorHoleData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.rotor && _loadedMachine.rotor.hole) {
        const loadedHole = _loadedMachine.rotor.hole;
        const type = loadedHole.type;
        const loadedData = loadedHole.data ? {...loadedHole.data} : null;
        dispatch(onSetRotorHoleType(type));
        dispatch(onSetRotorHoleData(loadedData));
        dispatch(onGetRotorHoleImage(type));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (materialValue) => {
    dispatch(onGetRotorMaterialsDict('magnet', materialValue, 'hole'));
  };

  const handleHoleType = useCallback((value) => {
    dispatch(onSetRotorHoleType(value));
    dispatch(onSetRotorHoleData(hole[value]));
    dispatch(onGetRotorHoleImage(value));
    fetchMaterialDict(hole[value]['Material']['Name']);

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.hole) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.rotor.hole.type;
      if (dbType !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, hole]);

  const handleHoleData = (key, value, isMaterial) => {
    if (isMaterial) {
      fetchMaterialDict(value);
    }

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.hole) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else {
      const dbData = _loadedMachine.rotor.hole.data;
      if (isMaterial) {
        if (dbData && dbData['Material'] && dbData['Material']['Name'] !== value) {
          dispatch(onSetDisableRotorSaveButton(false));
        }
      } else {
        if (dbData && dbData[key] && dbData[key] !== Number(value)) {
          dispatch(onSetDisableRotorSaveButton(false));
        }
      }
    }
    dispatch(onSetRotorHoleParam(key, isMaterial ? value : (value ? Number(value) : value), isMaterial))
  };

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      <TextField
        select
        className={'select-list top-select'}
        name="holeType"
        label="Hole Type"
        variant="outlined"
        size="small"
        value={rotorHoleType}
        onChange={(e) => handleHoleType(e.target.value)}
      >
        {Object.keys(FORM_DATA.hole).map((holeItemKey, index) => (
          <MenuItem key={index} value={holeItemKey} className={'menu-item'}>
            {holeItemKey}
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
            {rotorHoleData &&
              Object.keys(rotorHoleData).map((holeDataItemKey, index) => {
                if (holeDataItemKey !== 'Type' && holeDataItemKey !== 'Units') {
                  if (holeDataItemKey === 'Material') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(holeDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            select
                            className={'select-list'}
                            variant="outlined"
                            name="conductorMaterial"
                            value={rotorHoleData[holeDataItemKey]['Name']}
                            onChange={(e) =>
                              handleHoleData(holeDataItemKey, e.target.value, true)
                            }
                            size="small"
                            SelectProps={{
                              MenuProps: {
                                sx: { maxHeight: 250 }
                              }
                            }}
                          >
                            {materials.magnet.map(
                              (materialItemKey, index) => (
                                <MenuItem key={index} value={materialItemKey} className={'menu-item'}>
                                  {materialItemKey}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                        </TableCell>
                        <TableCell sx={{py:1}} className={'tb-cell'}>
                          {rotorHoleData.Units[holeDataItemKey]}
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={holeDataItemKey}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(holeDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="number"
                            className={'input-field'}
                            inputProps={{ min: 0, step: 'any' }}
                            size="small"
                            value={rotorHoleData[holeDataItemKey]}
                            onChange={(e) =>
                              handleHoleData(holeDataItemKey, e.target.value, false)
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py:1}} className={'tb-cell'}>
                          {rotorHoleData.Units[holeDataItemKey]}
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
