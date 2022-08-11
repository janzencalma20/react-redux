import { makeStyles, withStyles} from "@mui/styles";
import React, {useCallback, useEffect, useState} from "react";
import useCooling from "../../../hooks/useCooling";
import useError from "../../../hooks/useError";
import {FORM_DATA, HTC_DATA, htc_method, HTC_CALCULATIONS} from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {
  TableRow,
  Table,
  TableCell,
  TextField,
  Stack,
  Container,
  TableContainer,
  TableBody,
  TableHead,
  Card,
  MenuItem,
  Button
} from "@mui/material";
import {onSetCoolingRotorType, onSetHTCData} from "../../../store/actions/coolingActions";
import {axiosInstance} from "../../../utils/axios";
import {getDisplayName} from "../../../utils/methods";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    position:'relative',

  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  inputFieldName: {
    flex: 1
  },
  inputBox: {
    flex: 2,
    '& > div': {
      height: 32,
      width: 220
    }
  },
  airFlowTypeSelect: {
    height: 32,
    width: 220,
    flex: 2
  },
  tableCell: {
    width: '50%!important'
  }
}));

const HTCPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loadedMachine, newMachine } = useSelector(state => state.machine);
  const { coolingRotorType, htcData, waterChecked } = useSelector(state => state.cooling);

  const [rotorType, setRotorType] = useState(null);
  const [housingType, setHousingType] = useState(null);

  const {coolingSubmitError} = useError();
  const {htc} = HTC_DATA;

  useEffect(() => {
    if (newMachine || loadedMachine) {
      getRotorData();
      getHousingData();
    }
  }, [loadedMachine, newMachine]);

  useEffect(() => {
    if (rotorType) {
      if (newMachine) { // when create new machine
        if (rotorType !== coolingRotorType) {
          dispatch(onSetCoolingRotorType(rotorType));
          dispatch(onSetHTCData(HTC_DATA[rotorType]));
        }
      } else if (loadedMachine) { // when load exist machine
        if (loadedMachine.cooling) {
          const loadedCooling = loadedMachine.cooling;
          if (loadedCooling.htc && loadedCooling.htc.length !== 0) {
            if (!coolingRotorType) { // first load
              dispatch(onSetHTCData(loadedCooling.htc));
            } else {
              if (rotorType !== coolingRotorType) {
                dispatch(onSetHTCData(HTC_DATA[rotorType]));
              }
            }
            dispatch(onSetCoolingRotorType(rotorType));
          } else {
            if (rotorType !== coolingRotorType) {
              dispatch(onSetCoolingRotorType(rotorType));
              dispatch(onSetHTCData(HTC_DATA[rotorType]));
            }
          }
        }
      }
    }
  }, [rotorType, HTC_DATA, newMachine, loadedMachine]);

  useEffect(() => {
    const newData = {...htcData};
    if (waterChecked) {
      if (!newData.hasOwnProperty('WaterJacket')) {
        newData['WaterJacket'] = HTC_DATA.WaterJacket['WaterJacket'];
      }
    } else {
      if (newData && newData.hasOwnProperty('WaterJacket')) {
        delete newData['WaterJacket'];
      }
    }
    dispatch(onSetHTCData(newData));
  }, [waterChecked, HTC_DATA]);

  const getRotorData = useCallback(async () => {
    try {
      let rotorID = null;
      if (newMachine) rotorID = newMachine.rotor.id;
      if (loadedMachine) rotorID = loadedMachine.rotor.id;

      const response = await axiosInstance.get(`/machine/dimensions/${rotorID}/get_rotor_type/`);
      setRotorType(response.data);
    } catch (error) {
      setRotorType(null)
    }
  }, [newMachine, loadedMachine]);

  const getHousingData = useCallback(async () => {
    try {
      let housingID = null;
      if (newMachine) housingID = newMachine.housing.id;
      if (loadedMachine) housingID = loadedMachine.housing.id;

      const response = await axiosInstance.get(`/machine/dimensions/${housingID}/get_housing_type/`);
      setHousingType(response.data);
    } catch (error) {
      setHousingType(null);
    }
  }, [newMachine, loadedMachine]);

  const handleHtcData = useCallback((itemKey, propertyKey, value) => {
    const newData = {
      ...htcData,
      [itemKey]: {...htcData[itemKey], [propertyKey]: value}
    };
    dispatch(onSetHTCData(newData));
  }, [htcData]);

  const handleSubmit = useCallback(async () => {
    const reqData = {
      htc: {...htcData}
    };
    try {
      let coolingID = null;
      if (newMachine) coolingID = newMachine.cooling.id;
      if (loadedMachine) coolingID = loadedMachine.cooling.id;

      await axiosInstance.patch(`/machine/cooling/${coolingID}/`, reqData);
    } catch (e) {

    }
  }, [htcData, newMachine, loadedMachine]);

  const onRenderTableBody = useCallback(() => {
    return (
      Object.keys(htcData).map((itemKey, index) => (
        <TableRow key={index}>
          <TableCell className={'tb-cell'}>{ getDisplayName(itemKey) }</TableCell>
          <TableCell className={'tb-cell'}>
            <TextField
              select
              className={'select-list'}
              type="text"
              size="small"
              variant="outlined"
              name="calculation"
              value={htcData[itemKey]['calculation']}
              onChange={(e) => handleHtcData(itemKey, 'calculation', e.target.value)}
            >
              {HTC_CALCULATIONS.map((item, index1) => (
                <MenuItem key={index1} value={item} className={'menu-item'}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell className={'tb-cell'}>
            <TextField
              disabled={htcData[itemKey]['calculation'] === 'Correlation'}
              type="number"
              className={'input-field'}
              inputProps={{ min: 0, step: 'any' }}
              size="small"
              value={htcData[itemKey]['value']}
              onChange={(e) => handleHtcData(itemKey, 'value', e.target.value)}
            />
          </TableCell>
        </TableRow>
      ))
    )
  }, [htcData]);

  return (
    <Stack spacing={2}>
      {htcData ? (
        <Container className={classes.container} style={{marginTop:20, width:'100%', textAlign: 'center'}}>
          <TableContainer component={Card} style={{marginTop: 20, width: '100%'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{py: 1, width: '35%'}}>Surface</TableCell>
                  <TableCell sx={{py: 1, width: '35%'}}>Calculation</TableCell>
                  <TableCell sx={{py: 1, width: '30%'}}>HTC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { onRenderTableBody() }
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={handleSubmit}
            color={coolingSubmitError ? 'error' : 'primary'}
            size="medium"
            disabled={!htcData || Object.keys(htcData).length === 0}
          >
            Save HTCs
          </Button>
        </Container>
      ) : (
        <div style={{ textAlign: 'center' }}>Warning! Rotor type is not selected</div>
      )}
    </Stack>
  )
};

export default HTCPage;