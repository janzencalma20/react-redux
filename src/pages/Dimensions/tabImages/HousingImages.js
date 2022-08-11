import React, {useEffect} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Stack
} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import {onGetHousingMainImage} from "../../../store/actions/housingActions";

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

export default function HousingImages(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { newMachine, loadedMachine } = useSelector(state => state.machine);
  const { housingImageURL, housingMainImageURL } = useSelector(state => state.housing);

  useEffect(() => {
    if (housingImageURL) {
      let currentMachineID = null;
      if (newMachine) currentMachineID = newMachine.id;
      if (loadedMachine) currentMachineID = loadedMachine.id;
      dispatch(onGetHousingMainImage(currentMachineID));
    }
  }, [housingImageURL, newMachine, loadedMachine, dispatch]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300}>
        <Stack spacing={3} justifyContent="center" sx={{ mt: 10 }}>
          {housingImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Housing Image
              </Typography>
              <Box component="img" src={housingImageURL} />
            </Stack>
          )}
          {/*{(housingImageUrl || housingImageUrl) && <Divider />}*/}
          {/*{housingImageUrl && (*/}
          {/*    <Stack spacing={2}>*/}
          {/*      <Typography align="center" fontSize={18} fontWeight={900}>*/}
          {/*        Housing Input Parameters*/}
          {/*      </Typography>*/}
          {/*      <Box component="img" src={housingImageUrl} />*/}
          {/*    </Stack>*/}
          {/*)}*/}
        </Stack>
        <Container>
          {housingMainImageURL && (
            <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
              <Stack spacing={2}>
                <Typography align="center" fontSize={18} fontWeight={900}>
                  Axial View
                </Typography>
                  <Stack direction="row" justifyContent="center">
                <Box component="img" src={housingMainImageURL} height={400} width={400} />
                  </Stack>
              </Stack>
            </Stack>
          )}
        </Container>
      </SplitPane>
    </Grid>
  )
}
