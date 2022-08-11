import React, { Fragment, useState } from 'react'
import {Tabs, Grid, Tab, Stack, Box, Divider, Alert, Snackbar} from '@mui/material'
import { capitalCase } from 'capital-case'
import useSettings from '../../hooks/useSettings'
import Page from '../../customComponents/Page'
import { COOLING, PROJECT_NAME } from 'src/utils/constants'
import Scrollbar from 'src/customComponents/Scrollbar'
import {makeStyles} from "@mui/styles";
import SplitPane from "react-split-pane";
import HTCPage from "./HTC";
import CoolingFlowRates from "./FlowRates";
import useLptnStatus from "../../hooks/useLptnStatus";
import {useDispatch, useSelector} from "react-redux";
import {onSetHideAlert} from "../../store/actions/alertActions";

const TABS = [
  {
    value: 'Flow Rates',
    forms: <CoolingFlowRates />

  },
  {
    value: 'Heat Transfer Coefficients',
    forms: <HTCPage/>
  }
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

export default function Cooling() {
  const classes=useStyles();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('Flow Rates');

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

  return (
    <Page title={`${COOLING} | ${PROJECT_NAME}`} sx={{ height: '100%' }}>

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
        <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300} maxSize={450}>
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
                      {tabItem.images}
                    </Scrollbar>
                  )
                )
              })}
            </Box>
          </Stack>
        </SplitPane>
        <Grid item xs={12} md={9} sx={{ height: '100%' }}>
          <Box
            maxWidth={themeStretch ? false : 'xl'}
            sx={{ flex: 1, height: 'inherit' }}
          >
            {TABS.map((tabItem, index) => {
              const isMatched = tabItem.value === currentTab;
              return isMatched && <Fragment key={index}>{tabItem.forms}</Fragment>
            })}
            {/*<BottomBar />*/}
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}
