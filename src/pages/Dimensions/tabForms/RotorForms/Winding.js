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
import {FORM_DATA} from 'src/utils/constants'
import {useDispatch, useSelector} from "react-redux";
import {getDisplayName} from "../../../../utils/methods";
import {
  onGetRotorConductorImage,
  onGetRotorMaterialsDict,
  onGetRotorWindingImage, onSetDisableRotorSaveButton,
  onSetRotorConductorData,
  onSetRotorConductorImageURL,
  onSetRotorConductorTypes,
  onSetRotorWindingData,
  onSetRotorWindingParam,
  onSetRotorWindingType
} from "../../../../store/actions/rotorActions";

export default function Winding() {
  const dispatch = useDispatch();
  const { rotorWinding, rotorConductor } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { rotorWindingType, rotorWindingData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.rotor && _loadedMachine.rotor.winding) {
        const loadedWinding = _loadedMachine.rotor.winding;
        const windingType = loadedWinding.type;
        const loadedData = loadedWinding.data ? {...loadedWinding.data} : null;
        dispatch(onSetRotorWindingType(windingType));
        dispatch(onSetRotorWindingData(loadedData));
        dispatch(onGetRotorWindingImage(windingType));

        // fetch conductor image
        const conductorImgKey = `Rotor_${windingType}`;
        fetchConductorImage(conductorImgKey);

        onSetConductorTypes(windingType);
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (filename, materialValue, type) => {
    dispatch(onGetRotorMaterialsDict(filename, materialValue, type));
  };

  const onSetConductorTypes = (windingType) => {
    // set conductor types
    let types = [];
    if (windingType === 'RandomWound') {
      types = Object.keys(rotorConductor).filter(item => item !== 'SquareConductor');
    } else if (windingType === 'BarWound') {
      types = Object.keys(rotorConductor).filter(item => item === 'SquareConductor');
    }
    dispatch(onSetRotorConductorTypes(types));
  };

  const handleWindingType = useCallback((value) => {
    dispatch(onSetRotorWindingType(value));
    dispatch(onSetRotorWindingData(rotorWinding[value]));
    dispatch(onGetRotorWindingImage(value));
    fetchMaterialDict('winding', rotorWinding[value]['WindingMaterial']['Name'], 'WindingMaterial');
    fetchMaterialDict('impregnation', rotorWinding[value]['InsulationMaterial']['Name'], 'InsulationMaterial');
    fetchMaterialDict('insulation', rotorWinding[value]['WallInsulationMaterial']['Name'], 'WallInsulationMaterial');
    if (value === 'RandomWound') {
      fetchMaterialDict('insulation', rotorWinding[value]['ImpregnationMaterial']['Name'], 'ImpregnationMaterial');
    }

    const conductorImgKey = `Rotor_${value}`;
    fetchConductorImage(conductorImgKey);

    onSetConductorTypes(value);
    dispatch(onSetRotorConductorData(null));
    dispatch(onSetRotorConductorImageURL(''));

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.winding) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.rotor.winding.type;
      if (dbType !== value) {
        dispatch(onSetDisableRotorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, rotorWinding, rotorConductor]);

  const handleWindingData = (key, value, isSelection, isMaterial) => {
    if (isMaterial) {
      const filename = key === 'WindingMaterial' ? 'winding' : (key === 'InsulationMaterial' ? 'impregnation' : 'insulation');
      fetchMaterialDict(filename, value, key);
    }

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.rotor.winding) {
      dispatch(onSetDisableRotorSaveButton(false));
    } else { // compare inputted value and db value when load machine
      const dbData = _loadedMachine.rotor.winding.data;
      if (isMaterial) {
        if (dbData && dbData[key]['Name'] !== value) {
          dispatch(onSetDisableRotorSaveButton(false));
        }
      } else {
        if (dbData && dbData[key] && dbData[key] !== Number(value)) {
          dispatch(onSetDisableRotorSaveButton(false));
        }
      }
    }
    dispatch(onSetRotorWindingParam(key, isSelection ? value : (value ? Number(value) : value), isMaterial));
  };

  const fetchConductorImage = (type) => {
    dispatch(onGetRotorConductorImage(type));
  };

  const checkDropDown = (key) => {
    return key === 'WindingMaterial'
      || key === 'InsulationMaterial'
      || key === 'ImpregnationMaterial'
      || key === 'WallInsulationMaterial'
  };

  const getOptions = useCallback((key) => {
    switch (key) {
      case 'WindingMaterial':
        return materials.winding;
      case 'InsulationMaterial':
        return materials.impregnation;
      case 'ImpregnationMaterial':
      case 'WallInsulationMaterial':
        return materials.insulation;
      default:
        return materials.winding;
    }
  }, [materials]);

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      <TextField
        select
        className={'select-list top-select'}
        name="windingType"
        label="Winding Type"
        variant="outlined"
        size="small"
        value={rotorWindingType}
        onChange={(e) => handleWindingType(e.target.value)}
      >
        {Object.keys(FORM_DATA.rotorWinding).map((windingItemKey, index) => (
          <MenuItem key={index} value={windingItemKey} className={'menu-item'}>
            { windingItemKey }
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
            {rotorWindingData &&
              Object.keys(rotorWindingData).map((windingDataItemKey, index) => {
                if (windingDataItemKey !== 'Type' && windingDataItemKey !== 'Units') {
                  if (checkDropDown(windingDataItemKey)) {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(windingDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            select
                            className={'select-list'}
                            variant="outlined"
                            name={windingDataItemKey}
                            value={rotorWindingData[windingDataItemKey]['Name']}
                            onChange={(e) =>
                              handleWindingData(windingDataItemKey, e.target.value, true, true)
                            }
                            size="small"
                          >
                            {getOptions(windingDataItemKey).map((materialItemKey, index) => (
                              <MenuItem
                                key={index}
                                value={materialItemKey}
                                className={'menu-item'}
                              >
                                {materialItemKey}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={windingDataItemKey}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(windingDataItemKey) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="number"
                            className={'input-field'}
                            inputProps={{ min: 0, step: 'any' }}
                            size="small"
                            value={rotorWindingData[windingDataItemKey]}
                            onChange={(e) =>
                              handleWindingData(windingDataItemKey, e.target.value, false, false)
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py:1}} className={'tb-cell'}>
                          {rotorWindingData.Units[windingDataItemKey]}
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
