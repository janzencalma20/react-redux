import React, {useCallback, useEffect, useState} from 'react'
// material
import {Button, Stack, Typography} from '@mui/material';
// hooks
// components
import Page from '../../customComponents/Page'
import { PROJECT_NAME } from 'src/utils/constants'
import {useDispatch, useSelector} from "react-redux";
import {
  newMachineCreated, onDeleteMachineS3Dir,
  onDeleteSavedMachine,
  onGetProjectsMachines,
  onSaveMachine
} from "../../store/actions/machineActions";
import { makeStyles } from '@mui/styles';
import CreateMachine from "./modal/CreateMachine";
import {TableContainer,Table,TableHead,TableRow, TableCell,TableBody,Divider} from "@mui/material";
import {useNavigate} from "react-router";
import LoadingScreen from "../../customComponents/LoadingScreen";
import {onInitStatorParams} from "../../store/actions/statorActions";
import {onInitRotorParams} from "../../store/actions/rotorActions";
import {onInitHousingParams} from "../../store/actions/housingActions";
import {onInitLossParams} from "../../store/actions/lossActions";
import {onInitCoolingParams} from "../../store/actions/coolingActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    paddingTop: 16,
    paddingLeft: 16
  },
  tableSection: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 18
  },
  linkWidth: {
    width: 'fit-content'
  },
  btn: {
    width: 170,
    marginBottom: '20px!important'
  },
  tableRowHover: {
    backgroundColor: '#F2F7FC !important'
  },
  tableRowSelected: {
    backgroundColor: '#dfebf7 !important'
  },
  formControl: {
    margin: 8,
    width: 300
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
});

const headerCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', color: 'primary' },
  { id: 'project', numeric: false, disablePadding: false, label: 'Project', color: 'default' },
  { id: 'stator_type', numeric: false, disablePadding: false, label: 'Stator Type', color: 'default' },
  { id: 'rotor_type', numeric: false, disablePadding: false, label: 'Rotor Type', color: 'default' },
  { id: 'housing_type', numeric: false, disablePadding: false, label: 'Housing Type', color: 'default' },

];

const MachineOptions = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { machines, machineLoading } = useSelector(state => state.machine);
  const { loadedProject, projects } = useSelector(state => state.project);
  const [openMachine, setOpenMachine] = useState(false);
  const [hoverMachineId, setHoverMachineId] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const isAllSelected =
    projects.length > 0 && selectedProjects.length === projects.length;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    variant: "menu"
  };

  useEffect(() => {
    if (loadedProject) {
      let current = [...selectedProjects];
      current.push(loadedProject);
      setSelectedProjects(current);
    }
  }, [loadedProject]);

  useEffect(() => {
    if (dispatch) {
      getInitData();
    }
  }, [dispatch]);

  const getInitData = useCallback(() => {
    dispatch(onInitStatorParams());
    dispatch(onInitRotorParams());
    dispatch(onInitHousingParams());
    dispatch(onInitLossParams());
    dispatch(onInitCoolingParams());
    dispatch(newMachineCreated(null));
    dispatch(onSaveMachine(null));
    dispatch(onGetProjectsMachines(true, [loadedProject.id]));
  }, [dispatch, loadedProject]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedProjects(selectedProjects.length === projects.length ? [] : [...projects]);
      return;
    }
    setSelectedProjects(value);
  };

  const onFilterMachines = useCallback(() => {
    if (selectedProjects.length > 0) {
      const projectIDs = selectedProjects.map(p => p.id);
      dispatch(onGetProjectsMachines(true, projectIDs))
    }
  }, [selectedProjects]);

  const onStartCreateMachine = () => {
    setOpenMachine(true);
    setIsNew(true);
  };

  const onLoadMachine = useCallback(() => {
    dispatch(onSaveMachine(selectedMachine));
    const url = '/dashboard/dimensions/';
    navigate(url);
  }, [dispatch, selectedMachine, navigate]);

  const onCloseModal = useCallback(() => {
    setOpenMachine(false);
    !isNew && getInitData();
  }, [isNew]);

  const onSelectMachine = (machine) => {
    setSelectedMachine(machine);
  };

  const isMachineSelected = useCallback((machine) => {
    if (selectedMachine) {
      return selectedMachine.id === machine.id
    }
    return false;
  }, [selectedMachine]);

  const onDuplicateMachine = useCallback(() => {
    if (selectedMachine) {
      setOpenMachine(true);
      setIsNew(false);
    }
  }, [selectedMachine]);

  const onDeleteMachine = useCallback(() => {
    if (selectedMachine) {
      const dir = `${selectedMachine.id}/`;
      dispatch(onDeleteMachineS3Dir(dir, (res) => {
        if (res) {
          dispatch(onDeleteSavedMachine(selectedMachine.id, (res1) => {
            if (res1) {
              const projectIDs = selectedProjects.map(p => p.id);
              dispatch(onGetProjectsMachines(false, projectIDs));
            }
          }));
        }
      }));
    }
  }, [selectedMachine, loadedProject, selectedProjects]);

  return (

    <Page title={`Model Tree | ${PROJECT_NAME}`} sx={{height:'100%'}}>
      <Stack spacing={2}>
        {machineLoading && (
          <LoadingScreen
            sx={{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            }}
          />
        )}
        <div className={classes.root}>
          <div className={classes.buttonDiv}>
            <Button className={classes.btn} onClick={onStartCreateMachine} variant="contained">
              Create New Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onLoadMachine} variant="contained">
              Load Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onDuplicateMachine} variant="contained">
              Duplicate Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onDeleteMachine} variant="contained">
              Delete Machine
            </Button>
          </div>
          <Divider/>
          <div className={classes.tableSection}>
            <FormControl className={classes.formControl}>
              <InputLabel id="mutiple-select-label">Project Filter</InputLabel>
              <Select
                labelId="mutiple-select-label"
                label={'Project Filter'}
                multiple
                value={selectedProjects}
                onChange={handleChange}
                MenuProps={MenuProps}
                renderValue={(values) => values.map(i => i.name).join(", ")}
                onClose={() => onFilterMachines()}
              >
                <MenuItem
                  value="all"
                  classes={{
                    root: isAllSelected ? classes.selectedAll : ""
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      classes={{ indeterminate: classes.indeterminateColor }}
                      checked={isAllSelected}
                      indeterminate={
                        selectedProjects.length > 0 && selectedProjects.length < projects.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.selectAllText }}
                    primary="Select All"
                  />
                </MenuItem>
                {projects.map((project, index) => (
                  <MenuItem key={index} value={project}>
                    <ListItemIcon>
                      <Checkbox checked={selectedProjects.filter(p => p.id === project.id).length !== 0} />
                    </ListItemIcon>
                    <ListItemText primary={project.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="h5" component="h1" paragraph style={{ textAlign: 'center', marginTop: 30 }}>
              Saved Machines
            </Typography>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    {headerCells.map((header, index) => (
                      <TableCell
                        key={`header-${index}`}
                        align="left"
                        padding="normal"
                      >
                        <span>{header.label}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {machines &&
                    machines.map((machine, index) => (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={machine.id}
                      onMouseOver={() => setHoverMachineId(machine.id)}
                      onMouseLeave={() => setHoverMachineId(0)}
                      hover={machine.id === hoverMachineId}
                      onClick={() => onSelectMachine(machine)}
                      selected={isMachineSelected(machine)}
                      classes={{
                        hover: classes.tableRowHover,
                        selected: classes.tableRowSelected,
                      }}
                    >
                      <TableCell scope="row"><h3>{ machine.name }</h3></TableCell>
                      <TableCell scope="row">
                        {machine.project && machine.project.name && (
                          <h3>{machine.project.name}</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {machine.stator && machine.stator.type && (
                          <h3>{machine.stator.type}</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {(machine.rotor && machine.rotor.type) && (
                          <h3>{ machine.rotor.type }</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {(machine.housing && machine.housing.type) && (
                          <h3>{ machine.housing.type }</h3>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Stack>
      <CreateMachine
        open={openMachine}
        onClose={onCloseModal}
        isNew={isNew}
        selectedMachine={selectedMachine}
      />
    </Page>

  )
};

export default MachineOptions;