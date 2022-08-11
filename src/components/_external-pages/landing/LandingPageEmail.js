import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {axiosInstance} from "../../../utils/axios";



export default function EmailPage() {
  const [email, setEmail] = useState('abc@ECS.com');


  const sendEmail=async()=>{
    try {
      const response = await axiosInstance.post('/machine/dimensions/email/', email);
      console.log(response)
    }
    catch (e) {

    }


  }
  function handleChange(e) {
    let inputValue = e.target.value;


    let isEmpty = inputValue === '';

    if (isEmpty) {
      console.log('Update value to: ' + inputValue);
      setEmail(inputValue);
    }
  }

  return (
    <p align="center">
      <FormControl  autoComplete="off">
        <TextField
          id='email'
          label="enter your email here"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <Grid item xs={12} sm={12} md={12}>
          <Button  variant="contained" color="primary" onClick={sendEmail}>
            Submit
          </Button>
        </Grid>
      </FormControl>
    </p>
  );
}
