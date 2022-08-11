import React, {useCallback, useEffect, useState} from 'react'
import {LOSS_DATA, PROJECT_NAME} from "../../utils/constants";
import Page from "../../customComponents/Page";
import {useDispatch, useSelector} from "react-redux";
import useError from "../../hooks/useError";
import LossesImage from "./LossesImage";
import {onSetLossData, onSetLossParam, onSetLossType} from "../../store/actions/lossActions";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import {axiosInstance} from "../../utils/axios";
import useLptnStatus from "../../hooks/useLptnStatus";
import {onSetHideAlert} from "../../store/actions/alertActions";
import {Alert, Snackbar} from "@mui/material";
import {getDisplayName} from "../../utils/methods";

export default function Loss() {

  const dispatch = useDispatch();
  const { lossesSubmitError } = useError();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const { lossType, lossData } = useSelector(state => state.loss);
  const [lossID, setLossID] = useState(null);
  const [warning, setWarning] = useState('');

  // ===== Notify LPTN task status =====
  useLptnStatus();
  const { showAlert, duration, alertType, alertMsg, anchorOrigin } = useSelector(state => state.alert);
  // ===================================

  const onCloseAlert = () => {
    dispatch(onSetHideAlert());
  };

  useEffect(async () => {
    if (newMachine || loadedMachine) {
      setWarning('');
      const _rotorType = await getRotorType();
      if (newMachine) {
        if (_rotorType) {
          onGetLossData(_rotorType)
        } else {
          setWarning('Rotor type is not selected yet')
        }
      } else if (loadedMachine && loadedMachine.loss) {
        const loadedLoss = loadedMachine.loss;
        setLossID(loadedLoss.id);
        if (loadedLoss.data) { // the machine has loss data already
          dispatch(onSetLossType(loadedLoss.type));
          dispatch(onSetLossData(loadedLoss.data));
        } else { // the machine doesn't have loss data yet
          const loadedRotor = loadedMachine.rotor;
          if (loadedRotor.type) {
            onGetLossData(loadedRotor.type);
          } else {
            if (_rotorType) {
              onGetLossData(_rotorType);
            } else {
              setWarning('Rotor type is not selected yet')
            }
          }
        }
      }
    }
  }, [newMachine, loadedMachine]);

  const getRotorType = useCallback(async () => {
    try {
      let rotorID = null;
      if (newMachine) {
        rotorID = newMachine.rotor.id;
      }
      if (loadedMachine) {
        rotorID = loadedMachine.rotor.id;
      }

      const response = await axiosInstance.get(`/machine/dimensions/${rotorID}/get_rotor_type/`);

      if (response && response.data !== 'None') {
        return response.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }, [newMachine, loadedMachine]);

  const onGetLossData = useCallback((rotorType) => {
    if (rotorType === 'LamSlot') {
      dispatch(onSetLossType('WRSM'));
      const data = {};
      Object.keys(LOSS_DATA['WRSM']).map((itemKey) => {
        data[itemKey] = {'loss': LOSS_DATA['WRSM'][itemKey]['loss']};
        return true;
      });
      dispatch(onSetLossData(data));
    } else if (rotorType === 'LamHole') {
      dispatch(onSetLossType('IPMSM'));
      const data = {};
      Object.keys(LOSS_DATA['IPMSM']).map((itemKey) => {
        data[itemKey] = {'loss': LOSS_DATA['IPMSM'][itemKey]['loss']};
        return true;
      });
      dispatch(onSetLossData(data));
    }
  }, [LOSS_DATA]);

  const handleSubmit = useCallback(async () => {
    const payload = {};
    Object.keys(lossData).map(itemKey => {
      payload[itemKey] = {'loss': lossData[itemKey]['loss']};
      return true
    });

    const reqData = {
      type: lossType,
      data: {...payload}
    };
    if (lossID) {
      const res = await axiosInstance.patch(`/machine/loss/${lossID}/`, reqData);
      console.log('Loss data is saved', res.data);
    }
  }, [lossData, lossType, lossID]);

  const handleChangeLoss = (key, value) => {
    dispatch(onSetLossParam(key, value));
  };

  return (
    <Page title={`Losses | ${PROJECT_NAME}`} sx={{height:'100%', display: 'flex'}}>

      <Snackbar
        open={showAlert}
        autoHideDuration={duration}
        onClose={onCloseAlert}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={onCloseAlert} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {warning ? (
          <p> { warning } </p>
        ) : (
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ py: 1, width: '60%' }}>Component</TableCell>
                  <TableCell sx={{ py: 1, width: '40%' }}>Loss</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lossData && (
                  Object.keys(lossData).map((itemKey, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className={'tb-cell'}>{ getDisplayName(itemKey) }</TableCell>
                        <TableCell className={'tb-cell'}>
                          <TextField
                            type="number"
                            className={'input-field'}
                            inputProps={{ min: 0, step: 'any' }}
                            size="small"
                            value={lossData[itemKey]['loss']}
                            onChange={(e) => handleChangeLoss(itemKey, e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="contained"
          disabled={!lossData}
          onClick={handleSubmit}
          color={lossesSubmitError ? 'error' : 'primary'}
        >
          Submit
        </Button>
      </div>
      <div>
        <LossesImage />
      </div>
    </Page>
  )
}
