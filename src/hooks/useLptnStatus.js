import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
import {onSetShowAlert} from "../store/actions/alertActions";
import {onSetLPTNResult, onSetLPTNSolveTaskID} from "../store/actions/lptnActions";

export default function useLptnStatus() {
  const dispatch = useDispatch();
  const { solveTaskID } = useSelector(state => state.lptn);
  const { loadedMachine, newMachine } = useSelector(state => state.machine);

  useEffect(() => {
    if (solveTaskID && (newMachine || loadedMachine)) {
      const myInterval = setInterval(() => {
        let currentMachineID = null;
        if (newMachine) currentMachineID = newMachine.id;
        if (loadedMachine) currentMachineID = loadedMachine.id;

        axiosInstance.get(`/machine/dimensions/${currentMachineID}/lptn_solve_task/${solveTaskID}/`)
          .then(res => {
            const taskStatus = res.data.task_status;
            if (taskStatus === 'SUCCESS') {
              onShowAlert('success');
              dispatch(onSetLPTNResult(res.data.result));
              clearInterval(myInterval);
            } else if (taskStatus === 'FAILURE') {
              onShowAlert('error');
              clearInterval(myInterval);
            }
          })
          .catch(() => {
            onShowAlert('error');
            clearInterval(myInterval);
          });
      }, 1500);

      return () => {
        clearInterval(myInterval);
      };
    }
  }, [solveTaskID, newMachine, loadedMachine]);

  const onShowAlert = (type) => {
    dispatch(onSetLPTNSolveTaskID(''));
    let message = '';
    if (type === 'success') {
      message = 'LPTN solve task is completed successfully.';
    } else {
      message = 'An error occurred in LPTN solve task.';
    }

    const request = {
      duration: 5000,
      alertType: type,
      alertMsg: message
    };
    dispatch(onSetShowAlert(request));
  };
}