import React, { useEffect, useState } from 'react'
import {
    Typography,
} from '@mui/material'
import axios from 'axios';
/* ----------------------------------------------------------------- */

export default function ResultTable() {

    const [TemperatureData, setTemperatureData] = useState(null)
    const getTemperatureData=async ()=>{
        const response=await axios.get("http://127.0.0.1:8000/api/machine/dimensions/1/lptn_solve/");
        setTemperatureData(response.data)
        console.log(TemperatureData)
    }
    //  useEffects
    useEffect(()=>{
        getTemperatureData()
    },[]);
    return (

       <Typography>

       </Typography>

    )
}
