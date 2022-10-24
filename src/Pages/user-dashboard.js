import React from 'react';
import { useHistory } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import {
    Container,
    Typography,
    Box,
    Button,
} from "@mui/material";

export default function UserHome() {
    const history = useHistory();

    const {signOut} = useAuthContext();

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: 'none',
                    justifyContent: 'right',
                    borderRadius: 2,
                }}
            >
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 
                        ,backgroundColor: '#3F51B5'
                    }}
                    onClick={()=>signOut()}
                >
                    Logout
                </Button>
            </Box>
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
                    bgcolor = "lightblue"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: 'none',
                        padding: 5,
                        borderRadius: 2,
                    }}
                >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 
                            ,backgroundColor: '#3F51B5'
                        }}
                        onClick={()=>history.push("/submit-details")}
                    >
                        Apply for Grama certificate
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 
                            ,backgroundColor: '#3F51B5'
                        }}
                        onClick={()=>history.push("/view-status")}
                    >
                        View Status
                    </Button>
                </Box>
            </Container>
        </div>
    )
}