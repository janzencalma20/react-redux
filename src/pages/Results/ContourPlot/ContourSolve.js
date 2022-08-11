import React, {useState } from 'react'
import {
    Stack,
    TextField,
    MenuItem,
    Typography
} from '@mui/material'
import { contour_data} from 'src/utils/constants'

import useImage from 'src/hooks/useImage'
import {useSelector} from "react-redux";

/* ----------------------------------------------------------------- */

export default function ContourSolve() {
    const { getContourImageUrl } = useImage()
    //  useStates
    const [contourValue, setContourValue] = useState('0')
    const {newMachine, loadedMachine } = useSelector(state => state.machine);
    //  functions
    const handleContourComponent = (value) => {
        let machineID = null;
        if (newMachine) machineID = newMachine.id;
        if (loadedMachine) machineID = loadedMachine.id;

        setContourValue(value);
        getContourImageUrl(value, machineID);
    }
    return (
        <Stack spacing={2}>
            <Typography>
               <b> Please choose the Contour Component Type</b>
            </Typography>

            <TextField
                select
                name="axialComponent"
                label="Component Type"
                variant="outlined"
                size="small"
                value={contourValue}
                margin="dense"
                onChange={(e) => handleContourComponent(e.target.value)}
            >
                {Object.keys(contour_data.numbers).map((itemData,index) => (
                    <MenuItem key={index} value={itemData}>
                        {itemData}
                    </MenuItem>
                ))}
            </TextField>

        </Stack>
    )
}
