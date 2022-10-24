import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    Grid,
    Link
} from "@mui/material";

export default function ViewStatus() {

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        border: 'none',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="h1" variant="h5" color='#3F51B5'>
                        <span style= {{fontSize:40,}}>GramaCheck</span>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 'none',
                        padding: 5,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="h1" variant="h5" color=''>
                        <span style= {{fontSize:30,}}>Your Status</span>
                    </Typography>
                    <Typography component="h1" variant="h5" color=''>
                        <span style= {{fontSize:20,}}>Pending...</span>
                    </Typography>
                    <Grid>
                        <Link href="/user-dashboard" variant="body2">
                            Go Back
                        </Link>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}