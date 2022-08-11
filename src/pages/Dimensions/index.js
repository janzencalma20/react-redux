import React, {Fragment, useEffect, useState} from 'react'
// material
import {Tabs, Grid, Tab, Stack, Box, Divider, Alert, Snackbar} from '@mui/material'
import { capitalCase } from 'capital-case'

// hooks
import useSettings from '../../hooks/useSettings'

// components
import Page from '../../customComponents/Page'
import { DIMENSIONS, PROJECT_NAME} from 'src/utils/constants'
import StatorForms from './tabForms/StatorForms'
import RotorForms from './tabForms/RotorForms'
import Scrollbar from 'src/customComponents/Scrollbar'
import StatorImages from './tabImages/StatorImages'
import HousingImages from './tabImages/HousingImages'
import RotorImages from './tabImages/RotorImages'
import useImage from 'src/hooks/useImage'
import HousingForms from "./tabForms/HousingForms";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import useLptnStatus from "../../hooks/useLptnStatus";
import {useDispatch, useSelector} from "react-redux";
import {onSetHideAlert} from "../../store/actions/alertActions";
import ConfirmDialog from "../ConfirmDialog";
import {onInitStatorParams} from "../../store/actions/statorActions";
import {onInitRotorParams} from "../../store/actions/rotorActions";
import {onInitHousingParams} from "../../store/actions/housingActions";
import ReactRouterPrompt from "react-router-prompt";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'housing',
    forms: <HousingForms />,
    images: <HousingImages />,
  },
  {
    value: 'stator',
    forms: <StatorForms />,
    images: <StatorImages />,
  },
  {
    value: 'rotor',
    forms: <RotorForms />,
    images: <RotorImages />,
  },
];

const useStyles = makeStyles(() => ({
  splitPane: {
    position: 'unset!important'
  }
}));

export default function Dimensions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { disableStatorButton } = useSelector(state => state.stator);
  const { disableRotorButton } = useSelector(state => state.rotor);
  const { disableHousingButton } = useSelector(state => state.housing);
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('stator');
  const { clearHoleImageUrl, clearConductorImageUrl, clearMainImageUrl, clearSlotImageUrl } = useImage();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [nextTab, setNextTab] = useState('stator');

  // ===== Notify LPTN task status =====
  useLptnStatus();
  const { showAlert, duration, alertType, alertMsg, anchorOrigin } = useSelector(state => state.alert);
  // ===================================

  const onCloseAlert = () => {
    dispatch(onSetHideAlert());
  };

  const handleChangeTab = (event, newValue) => {
    setNextTab(newValue);
    if (!disableStatorButton && currentTab === 'stator') {
      if (newValue === 'rotor' || newValue === 'housing') {
        setConfirmOpen(true);
        return;
      }
    }
    if (!disableRotorButton && currentTab === 'rotor') {
      if (newValue === 'stator' || newValue === 'housing') {
        setConfirmOpen(true);
        return;
      }
    }
    if (!disableHousingButton && currentTab === 'housing') {
      if (newValue === 'stator' || newValue === 'rotor') {
        setConfirmOpen(true);
        return;
      }
    }
    confirmLeavePage(newValue);
  };

  const confirmLeavePage = (newTab) => {
    currentTab === 'stator' && dispatch(onInitStatorParams());
    currentTab === 'rotor' && dispatch(onInitRotorParams());
    currentTab === 'housing' && dispatch(onInitHousingParams());
    clearHoleImageUrl();
    clearConductorImageUrl();
    clearMainImageUrl();
    clearSlotImageUrl();
    setCurrentTab(newTab);
  };

  const onInitParams = () => {
    dispatch(onInitStatorParams());
    dispatch(onInitRotorParams());
    dispatch(onInitHousingParams());
    clearHoleImageUrl();
    clearConductorImageUrl();
    clearMainImageUrl();
    clearSlotImageUrl();
  };

  return (
    <Page title={`${DIMENSIONS} | ${PROJECT_NAME}`} sx={{ height: '100%' }}>

      <ConfirmDialog
        title="Leave Page?"
        isPrompt={false}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() =>  confirmLeavePage(nextTab)}
      >
        Are you sure you want to leave this page without saving?
      </ConfirmDialog>

      <ReactRouterPrompt when={!disableStatorButton || !disableRotorButton || !disableHousingButton}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <ConfirmDialog
              title="Leave Page?"
              isPrompt={true}
              open={!disableStatorButton || !disableRotorButton || !disableHousingButton}
              setOpen={onCancel}
              onConfirm={() => {
                onInitParams();
                onConfirm()
              }}
            >
              Are you sure you want to leave this page without saving?
            </ConfirmDialog>
          )
        }
      </ReactRouterPrompt>

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
        <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={400} maxSize={480}>
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
                  className={'sbu-navbar-item'}
                  label={capitalCase(tabItem.value)}
                  value={tabItem.value}
                  sx={{ alignItems: 'start' }}
                />
              ))}
            </Tabs>
            <Divider />
            <Box sx={{ flex: 1, px: 2 }}>
              {TABS.map((tabItem, index) => {
                const isMatched = tabItem.value === currentTab
                return (
                  isMatched && (
                    <Scrollbar
                      sx={{
                        maxHeight: 'calc(100vh - 164px)',
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
            sx={{ height: 'inherit' }}
          >
            {TABS.map((tabItem, index) => {
              const isMatched = tabItem.value === currentTab
              return isMatched && <Fragment key={index}>{tabItem.images}</Fragment>
            })}
            {/*<BottomBar />*/}
          </Box>
        </SplitPane>
      </Grid>
    </Page>
  )
}
