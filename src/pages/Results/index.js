import React, {Fragment, useCallback, useState} from 'react'
// material
import {Tabs, Grid, Tab, Stack, Box, Divider, Alert, Snackbar} from '@mui/material'
import { capitalCase } from 'capital-case'
// hooks
import useSettings from '../../hooks/useSettings'
// components
import Page from '../../customComponents/Page'
import { PROJECT_NAME, RESULTS} from 'src/utils/constants'
import Scrollbar from 'src/customComponents/Scrollbar'
import SolveTable from "./ResultTable/SolveTable";
import Solve from "./AxialPlots/Solve";
import ResultsImage from "./AxialPlots/ResultsImage";
import ContourSolve from "./ContourPlot/ContourSolve";
import ContourImage from "./ContourPlot/ContourImage";
import {makeStyles} from "@mui/styles";
import SplitPane from "react-split-pane";
import {useDispatch, useSelector} from "react-redux";
import useLptnStatus from "../../hooks/useLptnStatus";
import {onSetHideAlert} from "../../store/actions/alertActions";
// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'TABLE',
    forms: <div />,
    images: <SolveTable/>,
    disabled: false
  },
  {
    value: 'AXIAL PLOT',
    forms: <Solve/>,
    images: <ResultsImage />,
    disabled: true
  },
  {
    value: 'CONTOUR PLOT',
    forms: <ContourSolve />,
    images: <ContourImage/>,
    disabled: true
  },
];

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

// ----------------------------------------------------------------------

export default function ResultsTableIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('TABLE');
  const { resultsLoaded } = useSelector(state => state.results);

  // ===== Notify LPTN task status =====
  useLptnStatus();
  const { showAlert, duration, alertType, alertMsg, anchorOrigin } = useSelector(state => state.alert);
  // ===================================

  const onCloseAlert = () => {
    dispatch(onSetHideAlert());
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  };

  const onCheckEnable = useCallback((item) => {
    if (resultsLoaded) {
      return false
    } else {
      return item.disabled
    }
  }, [resultsLoaded]);

  return (
    <Page title={`${RESULTS} | ${PROJECT_NAME}`} sx={{ height: '100%' }}>

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

      <Grid container sx={{ height: '100%' }}>
        <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300}>
          <Stack sx={{ height: '100%' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={currentTab}
              onChange={handleChangeTab}
              sx={{ pl: 2 }}
            >
              {TABS.map((tabItem, index) => (
                <Tab
                  key={index}
                  label={capitalCase(tabItem.value)}
                  value={tabItem.value}
                  sx={{ alignItems: 'start' }}
                  disabled={onCheckEnable(tabItem)}
                />
              ))}
            </Tabs>
            <Divider />
            <Box sx={{ flex: 1, px: 2, py: 5 }}>
              {TABS.map((tabItem, index) => {
                const isMatched = tabItem.value === currentTab;
                return (
                  isMatched && (
                    <Scrollbar
                      sx={{
                        maxHeight: '63vh',
                        '& .simplebar-content': {
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        p: 2,
                      }}
                      key={index}
                    >
                      {tabItem.forms}
                    </Scrollbar>
                  )
                )
              })}
            </Box>
          </Stack>
          <Box
            maxWidth={themeStretch ? false : 'xl'}
            sx={{ flex: 1, height: 'inherit' }}
          >
            {TABS.map((tabItem, index) => {
              const isMatched = tabItem.value === currentTab;
              return isMatched && <Fragment key={index}>{tabItem.images}</Fragment>
            })}
          </Box>
        </SplitPane>
      </Grid>
    </Page>
  )
}
