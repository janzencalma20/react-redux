import React, {useEffect} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Stack,
  Divider
} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import {onGetStatorMainImage} from "../../../store/actions/statorActions";

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

export default function StatorImages(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {newMachine, loadedMachine } = useSelector(state => state.machine);
  const {
    statorSlotImageURL, statorConductorImageURL, statorMainImageURL
  } = useSelector(state => state.stator);

  useEffect(() => {
    if (statorSlotImageURL && statorConductorImageURL) {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      dispatch(onGetStatorMainImage(currentMachineID));
    }
  }, [dispatch, statorSlotImageURL, statorConductorImageURL, newMachine, loadedMachine]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300} maxSize={450}>
        <Stack spacing={3} justifyContent="center" sx={{ mt: 10 }}>
          {statorSlotImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Slot Image
              </Typography>
              <Box component="img" src={statorSlotImageURL} />
            </Stack>
          )}
          {(statorSlotImageURL || statorConductorImageURL) && <Divider />}
          {statorConductorImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Conductor Image
              </Typography>
              <Box component="img" src={statorConductorImageURL} />
            </Stack>
          )}
        </Stack>
        <Container>
          {statorMainImageURL && (
            <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
              <Stack spacing={2}>
                <Typography align="center" fontSize={18} fontWeight={900}>
                  Axial View
                </Typography>
                <Stack direction="row" justifyContent="center">
                <Box component="img" src={statorMainImageURL} height={400} width={400}/>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Container>
      </SplitPane>
    </Grid>
  )
}
