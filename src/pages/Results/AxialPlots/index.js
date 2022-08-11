import React from 'react'
import { Stack} from '@mui/material';
import Solve from "./Solve";
import ResultsImage from "./ResultsImage";

/* ----------------------------------------------------------------- */

export default function AxialPlotsIndex() {
    return (
        <Stack spacing={8}>
         <Solve/>
        <ResultsImage/>

        </Stack>
    )
}
