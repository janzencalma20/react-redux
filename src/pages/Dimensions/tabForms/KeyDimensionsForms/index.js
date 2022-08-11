import React from 'react'
import { Stack} from '@mui/material'
import KeyDimensionsAPI from "./mockDataFetching";

/* ----------------------------------------------------------------- */

export default function KeyDimensionsForms() {
  return (
    <Stack spacing={8}>
      <KeyDimensionsAPI />
    </Stack>
  )
}
