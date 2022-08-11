import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import {Button,Typography} from "@mui/material";
import {createStyles} from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import React, {useCallback, useEffect, useState} from "react";
import { withStyles, makeStyles } from '@mui/styles';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../../../hooks/useAuth";
import {axiosInstance} from "../../../utils/axios";
import {onProjectLoaded} from "../../../store/actions/projectActions";

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: 16,
      paddingTop: 26
    },
    closeButton: {
      position: 'absolute!important',
      right: '8px!important',
      background: 'transparent!important'
    },
    closeBtnIcon: {
      color: '#212D4080',
      width: 24,
      height: 24
    },
    header: {
      color: '#212D40',
      fontSize: 24,
      paddingLeft: 17,
      paddingBottom: 7,
      display: 'flex',
      alignItems: 'center'
    }
  });

const MachineDialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <DialogTitle className={classes.root} {...other}>
      <div className={classes.header}>
        {children}
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon classes={{ root: classes.closeBtnIcon }}/>
          </IconButton>
        ) : null}
      </div>
    </DialogTitle>
  );
});

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    borderRadius: '24px!important'
  },
  createBtn: {
    width: 91,
    height: 37,
    borderRadius: 6,
    textTransform: 'none',
    fontSize: 14
  },
  cancelBtn: {
    width: 91,
    height: 37,
    borderRadius: 6,
    textTransform: 'none',
    fontSize: 14
  },
  textField: {
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: "0!important",
      border: '1px solid #697683',
      padding: 4,
      borderRadius: 3,
      paddingLeft: 6,
      fontSize: 14,
    }
  },
  label: {
    "&$focusedLabel": {
      fontSize: 12,
      color: "#606B76"
    },
    "&$erroredLabel": {
      color: "#707070"
    }
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    width: '100%',
    fontSize: 14
  },
  error: {}
}));

const CreateProjectModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { open, onClose } = props;
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (open) {
      init();
    }
  }, [open]);

  const init = () => {
    setProjectName('');
  };

  const onChangeProjectName = useCallback((e) => {
    const value = e.target.value;
    if (value === ' ' && projectName.length === 0) {
      e.preventDefault();
    } else {
      setProjectName(value);
    }
  }, [projectName]);

  const onCloseDialog = () => {
    init();
    onClose();
  };

  const onCreateProject = useCallback(async () => {
    if (user && user.id && user.organisation) {
      try {
        const request = {
          name: projectName,
          organisation: user.organisation
        };
        const res = await axiosInstance.post('/machine/project/', request);
        dispatch(onProjectLoaded(res.data));
        onClose();
        navigate('/dashboard/modelTree');
      } catch (e) {
        dispatch(onProjectLoaded(null));
        onClose();
      }
    }
  }, [projectName, user]);

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      classes={{
        root: classes.root,
        paper: classes.paper
      }}
    >
      <div>
        <MachineDialogTitle onClose={onCloseDialog}>
          Create a New Project
        </MachineDialogTitle>
        <Divider/>

        <Box m={4} pl={1} pr={1}>
          <Typography variant="h6" paragraph>
            Please enter project name.
          </Typography>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focusedLabel,
                error: classes.erroredLabel
              },
            }}
            InputProps={{
              classes: {
                root: classes.underline,
                error: classes.error
              }
            }}
            value={projectName}
            fullWidth
            margin="normal"
            id="project_name"
            label="Project Name"
            name="project_name"
            onChange={onChangeProjectName}
          />
        </Box>
        <Box mt={6} mb={3} mr={4} display='flex' justifyContent='flex-end'>
          <Button onClick={onCloseDialog} className={classes.cancelBtn}>
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={onCreateProject}
            className={classes.createBtn}
            disabled={projectName.length === 0}
            style={projectName.length === 0 ? {backgroundColor: "#F0F0F0"} : {}}
          >
            Create
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};

export default CreateProjectModal;