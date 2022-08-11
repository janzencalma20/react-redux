import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import { onGetLossMainImageUrl } from "../../store/actions/lossActions";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

export default function LossesImage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const { lossMainImageUrl}  = useSelector(state => state.loss);

  useEffect(() => {
    if (newMachine || loadedMachine) {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      dispatch(onGetLossMainImageUrl(currentMachineID));
    }
  }, [dispatch, newMachine, loadedMachine]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <Container>
        {lossMainImageUrl && (
          <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Axial View
              </Typography>
              <Stack direction="row" justifyContent="center">
                <Box component="img" src={lossMainImageUrl} height={400} width={400} />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
    </Grid>
  )
}
