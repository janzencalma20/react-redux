import React from 'react'
import {
    Box,
    Grid,
    Typography,
    Stack, Container,
} from '@mui/material';
import useImage from 'src/hooks/useImage';

// ----------------------------------------------------------------------

export default function ResultsImage(props) {
    const { axialImageUrl, getAxialImageUrl } = useImage()


    // useEffect(() => {
    //     if (axialImageUrl) {
    //         getAxialImageUrl()
    //     }
    // }, [axialImageUrl])

    return (
        <Grid container sx={{ height: 'inherit' }} spacing={4}>
    <Grid item md={8}>
        <Container>
            {axialImageUrl && (
                <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
                    <Stack spacing={2}>
                        <Typography align="center" fontSize={18} fontWeight={900}>
                            Axial View
                        </Typography>
                        <Box component="img" src={axialImageUrl} />
                    </Stack>

                    <Stack direction="row" justifyContent="center">

                    </Stack>
                </Stack>
            )}
        </Container>
    </Grid>
        </Grid>

    )
}
