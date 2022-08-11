import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import { withStyles, makeStyles, createStyles } from '@mui/styles';
import IconButton from "@mui/material/IconButton";
import { DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {onDeleteProject} from "../../../store/actions/projectActions";

const styles = (theme) =>
  createStyles({
    tagModalHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButton: {
      color: theme.palette.grey[500],
      fontFamily: 'roboto-bold',
    },
    closeBtnIcon: {
      color: '#212D4080',
      width: 24,
      height: 24,
      fontFamily: 'roboto-bold'
    },
    modalTitle: {
      color: '#212D40',
      fontSize: 24,
      paddingLeft: 17,
      paddingBottom: 7,
      display: 'flex',
      alignItems: 'center'
    }
  });

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F0F0F0',
    paddingTop: "30px",
    fontFamily: 'roboto-regular',
    height: '100%',
    overflowX: 'hidden',
  },
  content: {
    minHeight: '100%',
    padding: theme.spacing(4),
    paddingBottom: 100,
    paddingTop: theme.spacing(6),
    '@media (min-width: 2000px)': {
      width: 1600
    },
  },
  dialogWrap: {
    margin: 'auto',
    maxWidth: 500,
    borderRadius: 14,
  },
  actionBtn: {
    textAlign: 'right',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  contentDialog: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
    color: '#697683'
  },
  delBtn: {
    backgroundColor: '#ED564A',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'roboto-regular',
    color: 'white',
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ED4F59'
    }
  },
  cancelBtn: {
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'roboto-regular',
    color: '#697683',
    boxShadow: 'none',
    textTransform: 'none'
  },
  btn: {
    margin: 8
  },
  experienceName: {
    marginTop: '12px',
    fontWeight: 'bold',
    fontFamily: 'roboto-regular',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.tagModalHeader} {...other}>
      <div className={classes.modalTitle}>{children}</div>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon classes={{ root: classes.closeBtnIcon }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(() => ({
  root: {
    padding: 16
  },
}))(MuiDialogContent);

const DeleteProjectModal = (props) => {

  const classes = useStyles();
  const {open, onClose, project } = props;
  const dispatch = useDispatch();

  const deleteProject = useCallback(() => {
    if (project) {
      dispatch(onDeleteProject(project.id, (res) => {
        onClose();
      }))
    }
  }, [project]);

  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      keepMounted
      fullWidth={true}
      maxWidth={"sm"}
      classes={{
        paper: classes.dialogWrap
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" onClose={() => onClose()}>
        {"Delete Project?"}
      </DialogTitle>

      <Divider />

      <DialogContent style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Container maxWidth="md">
          <Typography className={classes.contentDialog}>
            Are you sure you want to delete the following project?
          </Typography>
          <Typography className={classes.experienceName}>{project && (project.name)}</Typography>
        </Container>
      </DialogContent>

      <DialogActions>
        <Container maxWidth="md" className={classes.actionBtn}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box mr={2}>
              <Button
                onClick={() => onClose()}
                variant="contained"
                className={classes.cancelBtn}
              >
                Cancel
              </Button>
            </Box>
            <Button
              onClick={deleteProject}
              variant="contained"
              color="secondary"
              className={classes.delBtn}
            >
              {'Delete'}
            </Button>
          </Box>
        </Container>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProjectModal;