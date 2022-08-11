import React from 'react'
// material
import { Container, Typography } from '@mui/material'
// hooks
import useSettings from '../../hooks/useSettings'
// components
import Page from '../../customComponents/Page'
import { PROJECT_NAME } from 'src/utils/constants'

// ----------------------------------------------------------------------

export default function Lptn() {
  const { themeStretch } = useSettings()

  return (
    <Page title={`LPTN | ${PROJECT_NAME}`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          LPTN
        </Typography>
      </Container>
    </Page>
  )
}
