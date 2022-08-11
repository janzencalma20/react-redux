import {
  Alert,
  Button,
  Divider, Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {PROJECT_NAME} from "../../utils/constants";
import Page from "../../customComponents/Page";
import LoadingScreen from "../../customComponents/LoadingScreen";
import {makeStyles} from "@mui/styles";
import useAuth from "../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {onGetProjects, onProjectLoaded} from "../../store/actions/projectActions";
import CreateProjectModal from "./modal/CreateProjectModal";
import {useNavigate} from "react-router";
import DeleteProjectModal from "./modal/DeleteProjectModal";
import useLptnStatus from "../../hooks/useLptnStatus";
import {onSetHideAlert} from "../../store/actions/alertActions";
import {onSetLPTNResult} from "../../store/actions/lptnActions";
import {onGetMaterials} from "../../store/actions/machineActions";

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
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
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
});

const headerCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', color: 'primary' },
  { id: 'owner', numeric: false, disablePadding: false, label: 'Owner', color: 'default' },
  { id: 'creation_date', numeric: false, disablePadding: false, label: 'Creation Date', color: 'default' }

];

const ProjectDashboard = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materials } = useSelector(state => state.machine);
  const { projectLoading, projects } = useSelector(state => state.project);
  const [hoverProjectID, setHoverProjectID] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // ===== Notify LPTN task status =====
  useLptnStatus();
  const { showAlert, duration, alertType, alertMsg, anchorOrigin } = useSelector(state => state.alert);
  // ===================================

  const onCloseAlert = () => {
    dispatch(onSetHideAlert());
  };

  useEffect(() => {
    dispatch(onSetLPTNResult(null));
  }, []);

  useEffect(() => {
    if (user && user.organisation) {
      dispatch(onGetProjects(user.organisation))
    }
  }, [user]);

  useEffect(() => {
    if (!materials) {
      dispatch(onGetMaterials());
    }
  }, [materials]);

  const isProjectSelected = useCallback((project) => {
    if (selectedProject) {
      return selectedProject.id === project.id
    }
    return false;
  }, [selectedProject]);

  const onStartCreateProject = () => {
    onCloseAlert();
    setOpenModal(true)
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
  };

  const onLoadProject = useCallback(() => {
    if (selectedProject) {
      onCloseAlert();
      dispatch(onProjectLoaded(selectedProject));
      navigate('/dashboard/modelTree');
    }
  }, [selectedProject]);

  const onDeleteProject = useCallback(() => {
    if (selectedProject) {
      setOpenDeleteModal(true);
    }
  }, [selectedProject]);

  return (
    <Stack spacing={8}>
      <Page title={`Dashboard | ${PROJECT_NAME}`} sx={{height:'100%'}}>

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

        <Stack spacing={2}>
          {projectLoading && (
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
              <Button className={classes.btn} variant="contained" onClick={onStartCreateProject}>
                Create Project
              </Button>
              <Button className={classes.btn} disabled={!selectedProject} variant="contained" onClick={onLoadProject}>
                Load Project
              </Button>
              <Button className={classes.btn} disabled={!selectedProject} variant="contained" onClick={onDeleteProject}>
                Delete Project
              </Button>
            </div>
            <Divider/>
            <div className={classes.tableSection}>
              <Typography variant="h5" component="h1" paragraph>
                Project Overview
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
                    {projects.length > 0 &&
                    projects.map((project, index) => (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        onMouseOver={() => setHoverProjectID(project.id)}
                        onMouseLeave={() => setHoverProjectID(0)}
                        hover={project.id === hoverProjectID}
                        selected={isProjectSelected(project)}
                        onClick={() => setSelectedProject(project)}
                        classes={{
                          hover: classes.tableRowHover,
                          selected: classes.tableRowSelected,
                        }}
                      >
                        <TableCell scope="row">
                          <h3>{ project.name }</h3>
                        </TableCell>
                        <TableCell scope="row">
                          { project.owner.name }
                        </TableCell>
                        <TableCell scope="row">
                          { project.created_at }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Stack>

        <CreateProjectModal
          open={openModal}
          onClose={onCloseModal}
        />

        <DeleteProjectModal
          open={openDeleteModal}
          onClose={onCloseModal}
          project={selectedProject}
        />

      </Page>
    </Stack>
  )
};

export default ProjectDashboard;