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
  onGetStatorMaterialsDict,
  onSetDisableStatorSaveButton,
  onSetStatorLaminationData,
  onSetStatorLaminationParam,
  onSetStatorLaminationType
} from "../../../../store/actions/statorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function LaminationStator(props) {
  const dispatch = useDispatch();
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { statorLaminationType, statorLaminationData } = useSelector(state => state.stator);
  const { lamination_stator } = FORM_DATA;

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const loadedStator = newMachine ? newMachine.stator : loadedMachine.stator;
      if (loadedStator.type !== 'stator') {
        const type = loadedStator.type;
        const loadedData = loadedStator.data ? { ...loadedStator.data } : null;
        dispatch(onSetStatorLaminationType(type));
        dispatch(onSetStatorLaminationData(loadedData));
      }
    }
  }, [newMachine, loadedMachine]);

  const fetchMaterialDict = (materialValue) => {
    dispatch(onGetStatorMaterialsDict('lamination', materialValue, 'material'));
  };

  const handleLaminationType = useCallback((value) => {
    dispatch(onSetStatorLaminationType(value));
    dispatch(onSetStatorLaminationData(lamination_stator[value]));
    fetchMaterialDict(lamination_stator[value]['Material']['Name']);

    if (newMachine || loadedMachine) { // compare inputted type and db type
      const dbType = newMachine ? newMachine.stator.type : loadedMachine.stator.type;
      if (dbType !== value) {
        dispatch(onSetDisableStatorSaveButton(false));
      }
    }
  }, [dispatch, lamination_stator, newMachine, loadedMachine]);

  const handleLaminationData = useCallback((key, value, isMaterial) => {
    if (statorLaminationData) {
      if (isMaterial) {
        fetchMaterialDict(value);
      }

      // compare inputted value and db value when load machine
      const dbData = newMachine ? newMachine.stator.data : loadedMachine.stator.data;
      if (isMaterial) {
        if (dbData && dbData['Material'] && dbData['Material']['Name'] !== value) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      } else {
        if (dbData && dbData[key] && dbData[key] !== Number(value)) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      }
      dispatch(onSetStatorLaminationParam(key, isMaterial ? value : (value ? Number(value) : value), isMaterial));
    }
  }, [newMachine, loadedMachine, statorLaminationData]);

  return (
    <Stack spacing={2}>
      <TextField
        select
        className={'select-list top-select'}
        name="laminationType"
        label="Lamination Type"
        variant="outlined"
        size="small"
        value={statorLaminationType}
        onChange={(e) => handleLaminationType(e.target.value)}
      >
        {Object.keys(FORM_DATA.lamination_stator).map((laminationItemKey, index) => (
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
            {statorLaminationData &&
              Object.keys(statorLaminationData).map((laminationDataItemKey, index) => {
                  if (laminationDataItemKey !== 'Type' && laminationDataItemKey !== 'Units' && laminationDataItemKey !== statorLaminationData['Material']) {
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
                              value={statorLaminationData[laminationDataItemKey]['Name']}
                              onChange={(e) =>
                                handleLaminationData(
                                  laminationDataItemKey,
                                  e.target.value,
                                  true
                                )
                              }
                              size="small"
                            >
                              {materials.lamination.map((materialItemKey, index) => (
                                <MenuItem key={index} value={materialItemKey} className={'menu-item'}>
                                  { materialItemKey}
                                </MenuItem>)
                              )}
                            </TextField>
                          ) : (
                            <TextField
                              type="number"
                              className={'input-field'}
                              inputProps={{
                                min: 0,
                                step: 'any'
                              }}
                              size="small"
                              value={statorLaminationData[laminationDataItemKey]}
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
                          {statorLaminationData.Units[laminationDataItemKey]}
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
