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
  onGetHousingImage, onGetHousingMaterialsDict, onSetDisableHousingSaveButton,
  onSetHousingData,
  onSetHousingParam,
  onSetHousingType
} from "../../../../store/actions/housingActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Housing() {
  const dispatch = useDispatch();
  const { housing } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { housingType, housingData } = useSelector(state => state.housing);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const loadedHousing = newMachine ? newMachine.housing : loadedMachine.housing;
      if (loadedHousing.type !== 'housing') {
        const type = loadedHousing.type;
        const loadedData = loadedHousing.data ? {...loadedHousing.data} : null;
        dispatch(onSetHousingType(type));
        dispatch(onSetHousingData(loadedData));
        dispatch(onGetHousingImage(type));
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (materialValue) => {
    dispatch(onGetHousingMaterialsDict('housing', materialValue));
  };

  const handleHousingType = useCallback((value) => {
    dispatch(onSetHousingType(value));
    dispatch(onSetHousingData(housing[value]));
    dispatch(onGetHousingImage(value));
    fetchMaterialDict(housing[value]['Material']['Name']);

    if (newMachine || loadedMachine) { // compare inputted type and db type
      const dbType = newMachine ? newMachine.housing.type : loadedMachine.housing.type;
      if (dbType !== value) {
        dispatch(onSetDisableHousingSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, housing]);

  const handleHousingData = (key, value, isMaterial) => {
    if (isMaterial) {
      fetchMaterialDict(value);
    }

    // compare inputted value and db value when load machine
    const dbData = newMachine ? newMachine.housing.data : loadedMachine.housing.data;
    if (isMaterial) {
      if (dbData && dbData['Material'] && dbData['Material']['Name'] !== value) {
        dispatch(onSetDisableHousingSaveButton(false));
      }
    } else {
      if (dbData && dbData[key] && dbData[key] !== Number(value)) {
        dispatch(onSetDisableHousingSaveButton(false));
      }
    }
    dispatch(onSetHousingParam(key, isMaterial ? value : (value ? Number(value) : value), isMaterial));
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        className={'select-list top-select'}
        name="Housing Type"
        label="Housing Type"
        variant="outlined"
        size="small"
        value={housingType}
        onChange={(e) => handleHousingType(e.target.value)}
      >
        {Object.keys(FORM_DATA.housing).map((housingItemKey,index) => (
          <MenuItem key={index} value={housingItemKey} className={'menu-item'}>
            {housingItemKey}
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
            {housingData &&
            Object.keys(housingData).map((housingDataItemKey, index) => {
              if (housingDataItemKey !== 'Type'&& housingDataItemKey !== 'Units') {
                if (
                  housingDataItemKey === 'Material'
                ) {
                  return (
                    <TableRow key={housingDataItemKey}>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        { getDisplayName(housingDataItemKey) }
                      </TableCell>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        <TextField
                          select
                          className={'select-list'}
                          SelectProps={{
                            MenuProps: {
                              sx: { maxHeight: 250 }
                            }
                          }}
                          variant="outlined"
                          name="housing Material"
                          value={housingData[housingDataItemKey]['Name']}
                          onChange={(e) =>
                            handleHousingData(
                              housingDataItemKey,
                              e.target.value,
                              true
                            )
                          }
                          size="small"
                        >
                          {materials.housing.map(
                            (materialItemKey) => (
                              <MenuItem
                                key={materialItemKey}
                                value={materialItemKey}
                                className={'menu-item'}
                              >
                                {materialItemKey}
                              </MenuItem>
                            ),
                          )}
                        </TextField>
                      </TableCell>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                      </TableCell>
                    </TableRow>
                  )
                } else {
                  return (
                    <TableRow key={housingDataItemKey}>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        { getDisplayName(housingDataItemKey) }
                      </TableCell>
                      <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                        <TextField
                          type="number"
                          className={'input-field'}
                          inputProps={{ min: 0, step: 'any' }}
                          size="small"
                          value={housingData[housingDataItemKey]}
                          onChange={(e) =>
                            handleHousingData(
                              housingDataItemKey,
                              e.target.value,
                              false
                            )
                          }
                        />
                      </TableCell>
                      <TableCell sx={{py:1}} className={'tb-cell'}>
                        {housingData.Units[housingDataItemKey]}
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
