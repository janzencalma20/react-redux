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
import { FORM_DATA, Layers } from 'src/utils/constants'
import {useDispatch, useSelector} from "react-redux";
import {
  onGetStatorConductorImage,
  onGetStatorMaterialsDict,
  onGetStatorWindingImage, onSetDisableStatorSaveButton,
  onSetStatorConductorData,
  onSetStatorConductorImageURL,
  onSetStatorConductorTypes,
  onSetStatorWindingData,
  onSetStatorWindingParam,
  onSetStatorWindingType
} from "../../../../store/actions/statorActions";
import {getDisplayName} from "../../../../utils/methods";

export default function Winding() {
  const dispatch = useDispatch();
  const { statorWinding, statorConductor } = FORM_DATA;
  const { newMachine, loadedMachine, materials } = useSelector(state => state.machine);
  const { statorWindingType, statorWindingData } = useSelector(state => state.stator);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      const _loadedMachine = newMachine ? newMachine : loadedMachine;
      if (_loadedMachine && _loadedMachine.stator && _loadedMachine.stator.winding) {
        const loadedWinding = _loadedMachine.stator.winding;
        const windingType = loadedWinding.type;
        const loadedData = loadedWinding.data ? {...loadedWinding.data} : null;
        dispatch(onSetStatorWindingType(windingType));
        dispatch(onSetStatorWindingData(loadedData));
        dispatch(onGetStatorWindingImage(windingType));

        // fetch conductor image
        const split = loadedData['Nlayer'].split(' ');
        const conductorImgKey = `Stator_${windingType}_${split[split.length - 1]}`;
        fetchConductorImage(conductorImgKey);

        onSetConductorTypes(windingType);
      }
    }
  }, [newMachine, loadedMachine, dispatch]);

  const fetchMaterialDict = (filename, materialValue, type) => {
    dispatch(onGetStatorMaterialsDict(filename, materialValue, type));
  };

  const onSetConductorTypes = (windingType) => {
    // set conductor types
    let types = [];
    if (windingType === 'RandomWound') {
      types = Object.keys(statorConductor).filter(item => item !== 'SquareConductor');
    } else if (windingType === 'BarWound') {
      types = Object.keys(statorConductor).filter(item => item === 'SquareConductor');
    }
    dispatch(onSetStatorConductorTypes(types));
  };

  const handleWindingType = useCallback((value) => {
    dispatch(onSetStatorWindingType(value));
    dispatch(onSetStatorWindingData(statorWinding[value]));
    dispatch(onGetStatorWindingImage(value));
    fetchMaterialDict('winding', statorWinding[value]['WindingMaterial']['Name'], 'WindingMaterial');
    fetchMaterialDict('impregnation', statorWinding[value]['InsulationMaterial']['Name'], 'InsulationMaterial');
    fetchMaterialDict('insulation', statorWinding[value]['WallInsulationMaterial']['Name'], 'WallInsulationMaterial');
    fetchMaterialDict('insulation', statorWinding[value]['WedgeMaterial']['Name'], 'WedgeMaterial');
    fetchMaterialDict('insulation', statorWinding[value]['SeparatorMaterial']['Name'], 'SeparatorMaterial');
    if (value === 'RandomWound') {
      fetchMaterialDict('insulation', statorWinding[value]['ImpregnationMaterial']['Name'], 'ImpregnationMaterial');
    } else {
      fetchMaterialDict('insulation', statorWinding[value]['CoilInsulationMaterial']['Name'], 'CoilInsulationMaterial');
      fetchMaterialDict('insulation', statorWinding[value]['TopSpacerMaterial']['Name'], 'TopSpacerMaterial');
      fetchMaterialDict('insulation', statorWinding[value]['BottomSpacerMaterial']['Name'], 'BottomSpacerMaterial');
      fetchMaterialDict('insulation', statorWinding[value]['LeftSpacerMaterial']['Name'], 'LeftSpacerMaterial');
      fetchMaterialDict('insulation', statorWinding[value]['RightSpacerMaterial']['Name'], 'RightSpacerMaterial');
    }

    const split = statorWinding[value]['Nlayer'].split(' ');
    const conductorImgKey = `Stator_${value}_${split[split.length - 1]}`;
    fetchConductorImage(conductorImgKey);

    onSetConductorTypes(value);
    dispatch(onSetStatorConductorData(null));
    dispatch(onSetStatorConductorImageURL(''));

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.winding) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else { // compare inputted type and db type
      const dbType = _loadedMachine.stator.winding.type;
      if (dbType !== value) {
        dispatch(onSetDisableStatorSaveButton(false));
      }
    }
  }, [newMachine, loadedMachine, statorWinding, statorConductor]);

  const handleWindingData = (key, value, isSelection, isMaterial) => {
    if (isMaterial) {
      const filename = (key === 'WindingMaterial') ? 'winding' : (key === 'InsulationMaterial' ? 'impregnation' : 'insulation');
      fetchMaterialDict(filename, value, key);
    }
    if (key === 'Nppath' || key === 'Nturns') {
      value = value ? Math.round(value) : '';
    }
    if (key === 'Nlayer') {
      const split = value.split(' ');
      const conductorImgKey = `Stator_${statorWindingType}_${split[split.length - 1]}`;
      fetchConductorImage(conductorImgKey);
    }

    const _loadedMachine = newMachine ? newMachine : loadedMachine;
    if (!_loadedMachine.stator.winding) {
      dispatch(onSetDisableStatorSaveButton(false));
    } else { // compare inputted value and db value when load machine
      const dbData = _loadedMachine.stator.winding.data;
      if (isMaterial) {
        if (dbData && dbData[key]['Name'] !== value) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      } else {
        if (dbData && dbData[key] && dbData[key] !== Number(value)) {
          dispatch(onSetDisableStatorSaveButton(false));
        }
      }
    }
    dispatch(onSetStatorWindingParam(key, isSelection ? value : (value ? Number(value) : value), isMaterial));
  };

  const fetchConductorImage = (type) => {
    dispatch(onGetStatorConductorImage(type));
  };

  const checkDropDown = (key) => {
    return key === 'WindingMaterial'
      || key === 'InsulationMaterial'
      || key === 'Nlayer'
      || key === 'ImpregnationMaterial'
      || key === 'WallInsulationMaterial'
      || key === 'WedgeMaterial'
      || key === 'SeparatorMaterial'
      || key === 'CoilInsulationMaterial'
      || key === 'TopSpacerMaterial'
      || key === 'BottomSpacerMaterial'
      || key === 'LeftSpacerMaterial'
      || key === 'RightSpacerMaterial'
  };

  const getOptions = useCallback((key) => {
    switch (key) {
      case 'Nlayer':
        return Layers;
      case 'WindingMaterial':
        return materials.winding;
      case 'InsulationMaterial':
        return materials.impregnation;
      case 'ImpregnationMaterial':
      case 'WallInsulationMaterial':
      case 'WedgeMaterial':
      case 'SeparatorMaterial':
      case 'CoilInsulationMaterial':
      case 'TopSpacerMaterial':
      case 'BottomSpacerMaterial':
      case 'LeftSpacerMaterial':
      case 'RightSpacerMaterial':
        return materials.insulation;
      default:
        return Layers;
    }
  }, [materials, Layers]);

  const showField = useCallback((key) => {
    if (statorWindingData['Nlayer'] === 'Single') {
      switch (key) {
        case 'Type':
          return false;
        case 'Units':
          return false;
        case 'SeparatorThickness':
          return false;
        case 'SeparatorMaterial':
          return false;
        default:
          return true;
      }
    } else {
      switch (key) {
        case 'Type':
          return false;
        case 'Units':
          return false;
        default:
          return true;
      }
    }
  }, [statorWindingData]);

  return (
    <Stack spacing={2} className={'side-navbar-stack'}>
      <TextField
        select
        className={'select-list top-select'}
        name="windingType"
        label="Winding Type"
        variant="outlined"
        size="small"
        value={statorWindingType}
        onChange={(e) => handleWindingType(e.target.value)}
      >
        {Object.keys(FORM_DATA.statorWinding).map((windingItemKey, index) => (
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
            {statorWindingData &&
              Object.keys(statorWindingData).map((windingDataItemKey, index) => {
                if (showField(windingDataItemKey)) {
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
                            value={
                              windingDataItemKey === 'Nlayer'
                                ? statorWindingData[windingDataItemKey]
                                : statorWindingData[windingDataItemKey]['Name']
                            }
                            onChange={(e) =>
                              handleWindingData(windingDataItemKey, e.target.value, true, windingDataItemKey !== 'Nlayer')
                            }
                            size="small"
                            SelectProps={{
                              MenuProps: {
                                sx: { maxHeight: 250 }
                              }
                            }}
                          >
                            {getOptions(windingDataItemKey).map((materialItemKey, index) => (
                              <MenuItem
                                key={index}
                                value={materialItemKey}
                                className={'menu-item'}
                              >
                                {materialItemKey}
                              </MenuItem>)
                            )}
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
                            value={statorWindingData[windingDataItemKey]}
                            onChange={(e) =>
                              handleWindingData(windingDataItemKey, e.target.value, false, false)
                            }
                          />
                        </TableCell>
                        <TableCell sx={{py:1}} className={'tb-cell'}>
                          {statorWindingData.Units[windingDataItemKey]}
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
