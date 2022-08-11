import React, {useCallback, useEffect, useState} from 'react'
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
  Card,
  Button,
  Container,
  Divider
} from '@mui/material'
import useError from 'src/hooks/useError'
import {useDispatch, useSelector} from "react-redux";
import Select from '@mui/material/Select';
import {makeStyles} from "@mui/styles";
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  onSetCoolingFHousingType,
  onSetCoolingFlowData,
  onSetCoolingFRotorType,
  onSetCoolingType,
  onSetCoolingWaterChecked
} from "../../../store/actions/coolingActions";
import {COOLING_FLOW_RATES_DATA, FLOW_RATES_COMMON_DATA, FORM_DATA} from "../../../utils/constants";
import {axiosInstance} from "../../../utils/axios";
import {getDisplayName} from "../../../utils/methods";
import FlowRatesParamTable from "./ParameterTable";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%!important'
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
    flex: 2,
    textAlign: 'left'
  },
  tableCell: {
    width: '50%!important'
  }
}));

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: '42px!important',
    height: '26px!important',
    padding: '0!important',
    margin: `${theme.spacing(1)}!important`,
  },
  switchBase: {
    padding: '1px!important',
    '&$checked': {
      transform: 'translateX(16px)!important',
      color: `#52d869!important`,
      '& + $track': {
        backgroundColor: '#52d869!important',
        opacity: '1!important',
        border: 'none!important',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869!important',
      border: '6px solid #fff!important',
    },
  },
  thumb: {
    width: '23px!important',
    height: '23px!important',
    border: '1px solid black!important'
  },
  track: {
    borderRadius: '13px!important',
    border: `1px solid ${theme.palette.grey[400]}!important`,
    backgroundColor: `gray!important`,
    opacity: '1!important',
    transition: `${theme.transitions.create(['background-color', 'border'])}!important`,
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function CoolingFlowRates() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const {
    coolingType, coolingFlowData, coolingFRotorType, coolingFHousingType, waterChecked
  } = useSelector(state => state.cooling);
  const [rotorType, setRotorType] = useState(null);
  const [housingType, setHousingType] = useState(null);
  const [warning, setWarning] = useState('');
  const { coolingSubmitError } = useError();
  const [waterJacketData, setWaterJacketData] = useState(null);

  useEffect(() => {
    if (coolingFlowData && coolingFlowData.hasOwnProperty('WaterJacket')) {
      const waterJacket = JSON.parse(
        JSON.stringify(
          coolingFlowData.WaterJacket,
          ['InletTemperature', 'FlowRate', 'ScalingFactor', 'Diameter', 'ContactGapFrame']
        )
      );
      setWaterJacketData(waterJacket);
    }
  }, [coolingFlowData]);

  useEffect(async () => {
    if (newMachine || loadedMachine) {
      const _rotorType = await getRotorType();
      const _housingType = await getHousingType();
      if (newMachine) {
        if (_rotorType !== coolingFRotorType || _housingType !== coolingFHousingType) {
          const newData = {...coolingFlowData};
          dispatch(onSetCoolingFRotorType(_rotorType));
          dispatch(onSetCoolingFHousingType(_housingType));
          if (coolingFlowData && coolingFlowData.hasOwnProperty('WaterJacket')) {
            dispatch(onSetCoolingWaterChecked(true));
          }
          newData['MachineCooling'] = FLOW_RATES_COMMON_DATA;
          newData['FluidNetwork'] = {
            ...COOLING_FLOW_RATES_DATA.FluidNetwork['Rotor'][_rotorType],
            ...COOLING_FLOW_RATES_DATA.FluidNetwork['Housing'][_housingType]
          };
          if (!newData || (newData && !newData.hasOwnProperty('WaterJacket'))) {
            newData['WaterJacket'] = COOLING_FLOW_RATES_DATA.WaterJacket
          }
          dispatch(onSetCoolingFlowData(newData));
        }
      } else if (loadedMachine && loadedMachine.cooling) {
        const loadedCooling = loadedMachine.cooling;
        if (loadedCooling.flow && loadedCooling.flow.length !== 0) {
          const flowData = {...loadedCooling.flow};
          if (!coolingFRotorType) { // first load
            if (loadedCooling.type !== null) {
              dispatch(onSetCoolingType(loadedMachine.cooling.type))
            }
            if (loadedCooling.flow && loadedCooling.flow.hasOwnProperty('WaterJacket')) {
              dispatch(onSetCoolingWaterChecked(true));
            }
            if (!flowData.hasOwnProperty('WaterJacket')) {
              flowData['WaterJacket'] = COOLING_FLOW_RATES_DATA.WaterJacket
            }
            dispatch(onSetCoolingFlowData(flowData));
          } else {
            if (_rotorType !== coolingFRotorType || _housingType !== coolingFHousingType) {
              const newData = {...coolingFlowData};
              newData['MachineCooling'] = FLOW_RATES_COMMON_DATA;
              newData['FluidNetwork'] = {
                ...COOLING_FLOW_RATES_DATA.FluidNetwork['Rotor'][_rotorType],
                ...COOLING_FLOW_RATES_DATA.FluidNetwork['Housing'][_housingType]
              };
              if (coolingFlowData && coolingFlowData.hasOwnProperty('WaterJacket')) {
                dispatch(onSetCoolingWaterChecked(true));
              }
              if (!newData || (newData && !newData.hasOwnProperty('WaterJacket'))) {
                newData['WaterJacket'] = COOLING_FLOW_RATES_DATA.WaterJacket
              }
              dispatch(onSetCoolingFlowData(newData));
            }
          }
          dispatch(onSetCoolingFRotorType(_rotorType));
          dispatch(onSetCoolingFHousingType(_housingType));
        }
      }
    }
  }, [newMachine, loadedMachine]);

  useEffect(() => {
    if (coolingType) {
      if (coolingType === 'ThroughFlow') {
        if (rotorType && housingType) {
          setWarning('');
        } else {
          setWarning('Rotor type or Housing type is not selected yet')
        }
      }
    }
  }, [rotorType, housingType, coolingType]);

  const getRotorType = useCallback(async () => {
    try {
      let rotorID = null;
      if (newMachine) rotorID = newMachine.rotor.id;
      if (loadedMachine) rotorID = loadedMachine.rotor.id;

      const response = await axiosInstance.get(`/machine/dimensions/${rotorID}/get_rotor_type/`);
      if (response && response.data !== 'None') {
        setRotorType(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      setRotorType(null);
      return null;
    }
  }, [newMachine, loadedMachine]);


  const getHousingType = useCallback(async () => {
    try {
      let housingID = null;
      if (newMachine) housingID = newMachine.housing.id;
      if (loadedMachine) housingID = loadedMachine.housing.id;

      const response = await axiosInstance.get(`/machine/dimensions/${housingID}/get_housing_type/`);
      if (response && response.data !== 'None') {
        setHousingType(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      setHousingType(null);
      return null;
    }
  }, [newMachine, loadedMachine]);

  const handleSubmit = useCallback(async () => {
    const flowData = {...coolingFlowData};
    !waterChecked && delete flowData['WaterJacket'];
    (coolingType !== 'ThroughFlow') && delete flowData['FluidNetwork'];
    const reqData = {
      type: coolingType,
      flow: flowData
    };

    try {
      let coolingID = null;
      if (newMachine) coolingID = newMachine.cooling.id;
      if (loadedMachine) coolingID = loadedMachine.cooling.id;
      await axiosInstance.patch(`/machine/cooling/${coolingID}/`, reqData);
    } catch (e) {

    }
  }, [coolingType, coolingFlowData, newMachine, loadedMachine, waterChecked]);

  const onWaterJacketToggle = (event) => {
    const checked = event.target.checked;
    dispatch(onSetCoolingWaterChecked(checked));
  };

  const onChangeCoolingType = useCallback((event) => {
    const type = event.target.value;
    dispatch(onSetCoolingType(type));
    dispatch(onSetCoolingWaterChecked(false));
    const flowData = {...coolingFlowData};
    if (flowData && flowData.hasOwnProperty('MachineCooling')) {
      flowData['MachineCooling'] = {};
      Object.keys(FLOW_RATES_COMMON_DATA).forEach(key => {
        flowData['MachineCooling'][key] = coolingFlowData['MachineCooling'][key];
      });
      flowData['MachineCooling'] = {
        ...flowData['MachineCooling'],
        ...COOLING_FLOW_RATES_DATA.MachineCooling[type]
      };
    } else {
      flowData['MachineCooling'] = {
        ...FLOW_RATES_COMMON_DATA,
        ...COOLING_FLOW_RATES_DATA.MachineCooling[type]
      };
    }

    if (!coolingFlowData || (coolingFlowData && !coolingFlowData.hasOwnProperty('WaterJacket'))) {
      flowData['WaterJacket'] = COOLING_FLOW_RATES_DATA.WaterJacket
    }
    if (type === 'ThroughFlow') {
      if (rotorType && housingType) {
        flowData['FluidNetwork'] = {
          ...COOLING_FLOW_RATES_DATA.FluidNetwork['Rotor'][rotorType],
          ...COOLING_FLOW_RATES_DATA.FluidNetwork['Housing'][housingType]
        };
      }
    } else {
      setWarning('');
    }
    dispatch(onSetCoolingFlowData(flowData));
  }, [rotorType, housingType, coolingFlowData]);

  const onHandleCoolingDataValue = useCallback((mainKey, keyName, value) => {
    const newData = {
      ...coolingFlowData,
      [mainKey]: {...coolingFlowData[mainKey], [keyName]: value}
    };
    dispatch(onSetCoolingFlowData(newData));
  }, [coolingFlowData]);

  return (
    <Stack spacing={2}>
      <Container className={classes.container}>
        {coolingFlowData && (
          <FlowRatesParamTable
            isCommon={true}
            mainData={coolingFlowData['MachineCooling']}
            onChangeCoolingDataValue={onHandleCoolingDataValue}
          />
        )}
        <TableContainer component={Card} style={{ marginTop: 20, width: '60%', textAlign: 'center' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>Machine Cooling</TableCell>
                <TableCell className={classes.tableCell}>
                  <FormControl className={'select-list'}>
                    <Select
                      value={coolingType}
                      onChange={(e) => onChangeCoolingType(e)}
                    >
                      {Object.keys(COOLING_FLOW_RATES_DATA.MachineCooling).map((coolingKey, index) => (
                        <MenuItem key={index} value={coolingKey} className={'menu-item'}>
                          { getDisplayName(coolingKey) }
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {warning ? (
          <div style={{ textAlign: 'center' }}>Rotor type or Housing type is not selected</div>
        ) : (
          <>
            {coolingFlowData && (
              <>
                <FlowRatesParamTable
                  isCommon={false}
                  mainData={coolingFlowData['MachineCooling']}
                  onChangeCoolingDataValue={onHandleCoolingDataValue}
                />
                {(coolingType === 'ThroughFlow' && rotorType && housingType) && (
                  <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ py: 1, width: '50%' }}>Passages</TableCell>
                          <TableCell sx={{ py: 1, width: '50%' }}>Flow Rate</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {coolingFlowData['FluidNetwork'] && Object.keys(coolingFlowData['FluidNetwork']).map((keyName, index) => (
                          <TableRow key={index}>
                            <TableCell className={'tb-cell'}>{ getDisplayName(keyName) }</TableCell>
                            <TableCell className={'tb-cell'}>
                              <TextField
                                type="number"
                                className={'input-field'}
                                inputProps={{ min: 0, step: 'any' }}
                                size="small"
                                value={coolingFlowData['FluidNetwork'][keyName]}
                                onChange={(e) => onHandleCoolingDataValue('FluidNetwork', keyName, e.target.value)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
            <Divider style={{ margin: '40px 0' }} />
            {coolingType && (
              <div>
                <FormControlLabel
                  label="Water Jacket"
                  labelPlacement="start"
                  control={<CustomSwitch checked={waterChecked} onChange={onWaterJacketToggle} name="WaterJacket" />}
                />
                {(waterChecked && coolingFlowData.hasOwnProperty('WaterJacket')) && (
                  <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ py: 1, width: '50%' }}>Parameter</TableCell>
                          <TableCell sx={{ py: 1, width: '50%' }}>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {waterJacketData && Object.keys(waterJacketData).map((keyName, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className={'tb-cell'}>{ getDisplayName(keyName) }</TableCell>
                              <TableCell className={'tb-cell'}>
                                <TextField
                                  type="number"
                                  className={'input-field'}
                                  inputProps={{ min: 0, step: 'any' }}
                                  size="small"
                                  value={coolingFlowData['WaterJacket'][keyName]}
                                  onChange={(e) => onHandleCoolingDataValue('WaterJacket', keyName, e.target.value)}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            )}

            <Button
              variant="contained"
              disabled={!coolingFlowData}
              style={{ marginTop: 20 }}
              onClick={() => handleSubmit()}
              color={coolingSubmitError ? 'error' : 'primary'}
              size="medium"
            >
              Save Flow Rates
            </Button>
          </>
        )}
      </Container>
    </Stack>
  )
}