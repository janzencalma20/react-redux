import React, {useEffect, useState} from 'react'
// material
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'

import { PROJECT_NAME } from 'src/utils/constants'
import Page from "../../../components/Page";
import useSettings from "../../../hooks/useSettings";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import {onSuccessLoadResults} from "../../../store/actions/resultsActions";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import {axiosInstance} from "../../../utils/axios";
import {onSetLPTNResult, onSetLPTNSolveTaskID} from "../../../store/actions/lptnActions";
import {getDisplayName} from "../../../utils/methods";

const useStyles = makeStyles({
  solveButton: {
    backgroundColor: '#4caf50',
    '& hover': {
      backgroundColor: '#388e3c'
    }
  }
});

const SolveTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const { result } = useSelector(state => state.lptn);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (!result && (newMachine || loadedMachine)) {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      getResult(currentMachineID);
    }
  }, [newMachine, loadedMachine, result]);

  const getResult = async (machineID) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/machine/dimensions/${machineID}/get_result/`);
      dispatch(onSetLPTNResult(res.data));
      setLoading(false);
    } catch (e) {
      dispatch(onSetLPTNResult(null));
      setLoading(false);
    }
  };

  const onSubmitSolve = async () => {
    setLoading(true);
    try {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      const response = await axiosInstance.get(`/machine/dimensions/${currentMachineID}/lptn_solve/`);
      setLoading(false);
      onShowAlert('success');
      dispatch(onSetLPTNSolveTaskID(response.data.task_id));
    } catch (error) {
      setLoading(false);
      onShowAlert('error');
      dispatch(onSetLPTNSolveTaskID(''));
    }
  };

  const onShowAlert = (type) => {
    let message = '';
    if (type === 'success') {
      message = 'Solve has been submitted';
      dispatch(onSuccessLoadResults(true));
    } else {
      message = 'Error occurred during load data';
      dispatch(onSuccessLoadResults(false));
    }
    setShowAlert(true);
    setAlertType(type);
    setAlertMsg(message);
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Page title={`RESULTS | ${PROJECT_NAME}`}>
      <Backdrop open={loading} style={{ zIndex: 100000 }}>
        <CircularProgress size={120} />
      </Backdrop>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert onClose={onCloseAlert} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h2" component="h1" paragraph>
          Results
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Please Click here to view the data.
        </Typography>
        <Box sx={{m:1,position:'relative'}}>
          <Button
            className={classes.solveButton}
            disabled={loading}
            variant="contained"
            size="large"
            onClick={onSubmitSolve}
          >
            Solve
          </Button>
        </Box>
      </Container>
      <br/><br/>
      <Stack spacing={2}>
        <h2 align="center">Temperatures</h2>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 1, width: '50%' }}>Component</TableCell>
                <TableCell sx={{ py: 1, width: '25%' }}>T_Max</TableCell>
                <TableCell sx={{ py: 1, width: '25%' }}>T_avg</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result &&
              Object.keys(result).map((item, index) => {
                if (result[item] !== 'AvgTemperature') {
                  if (result[item] === 'MaxTemperature') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(item) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="text"
                            className={'input-field'}
                            variant="outlined"
                            value="3"
                            size="small"
                          >
                          </TextField>
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="text"
                            className={'input-field'}
                            inputProps={{ min: 0 }}
                            size="small"
                            value="2"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          { getDisplayName(item) }
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="text"
                            className={'input-field'}
                            inputProps={{ min: 0 }}
                            size="small"
                            value={result[item].MaxTemperature}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }} className={'tb-cell'}>
                          <TextField
                            type="text"
                            className={'input-field'}
                            inputProps={{ min: 0 }}
                            size="small"
                            value={result[item].AvgTemperature}
                          />
                        </TableCell>
                      </TableRow>

                    )
                  }
                } else if (result[item] === '') {
                  return(
                    <Alert>
                      Please Click on the button to generate the new data
                    </Alert>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Page>
  )
};

export default SolveTable;