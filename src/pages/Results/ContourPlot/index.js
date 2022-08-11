import React from 'react'
import { Stack} from '@mui/material';
import ContourSolve from "./ContourSolve";
import ContourImage from "./ContourImage";
/* ----------------------------------------------------------------- */

export default function ContourPlotIndex() {
    return (
        <Stack spacing={8}>
            <ContourSolve/>
            <ContourImage/>


        </Stack>
    )
}
