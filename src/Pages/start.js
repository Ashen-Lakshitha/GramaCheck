import { Hooks, useAuthContext } from "@asgardeo/auth-react";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import qs from 'qs';
import {
    Typography,
    Container,
    Box,
    Button,
    Paper
} from "@mui/material";
import Image from '../images/bg.jpg';

const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
        width:"100%",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    }
};

export default function Start() {

    const {
        state,
        signIn,
        signOut,
        getBasicUserInfo,
        getIDToken,
        getDecodedIDToken,
        on
    } = useAuthContext();

    const history = useHistory();

    const [ derivedAuthenticationState, setDerivedAuthenticationState ] = useState(null);
    const [ hasAuthenticationErrors, setHasAuthenticationErrors ] = useState(false);
    const [ hasLogoutFailureError, setHasLogoutFailureError ] = useState();

    const search = useLocation().search;
    const stateParam = new URLSearchParams(search).get('state');
    const errorDescParam = new URLSearchParams(search).get('error_description');

    useEffect(() => {

        if (!state?.isAuthenticated) {
            localStorage.clear();
            return;
        }
        
        getBasicUserInfo().then((basicUserDetails) => {
            // console.log(basicUserDetails);
            console.log(state);
        
        })

        getIDToken()
            .then(idToken=>{
                // console.log(idToken);
                
                var data = qs.stringify({
                    'grant_type': 'urn:ietf:params:oauth:grant-type:token-exchange',
                    'subject_token': idToken,
                    'subject_token_type': 'urn:ietf:params:oauth:token-type:jwt',
                    'requested_token_type': 'urn:ietf:params:oauth:token-type:jwt' 
                });

                var config = {
                    method: 'post',
                    url: 'https://sts.choreo.dev/oauth2/token',
                    headers: { 
                        'Authorization': 'Basic ZHRiSHVOV29ybUFzVHV3M0dDYTFnbldmbURvYTo0eDVVMU5maHo0dV9TWHN2WmFIMkdDb2pVaThh', 
                        'Content-Type': 'application/x-www-form-urlencoded', 
                        // 'Cookie': 'apim=1667837971.408.602.295488|dcb1dc1c03c8f17e5aa485d6222013b8'
                    },
                    data : data
                };

                axios(config)
                    .then(function (response) {
                        console.log(response.data.access_token);
                        let token = response.data.access_token;
                        localStorage.setItem('access-token', token)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });     
                })

    }, [state.isAuthenticated]);

    useEffect(() => {
        if(stateParam && errorDescParam) {
            if(errorDescParam === "End User denied the logout request") {
                setHasLogoutFailureError(true);
            }
        }
    }, [stateParam, errorDescParam]);

    useEffect(() => {
        on(Hooks.SignOut, () => {
            setHasLogoutFailureError(false);
        });

        on(Hooks.SignOutFailed, () => {
            if(!errorDescParam) {
                handleLogin();
            }
        })
    }, [ on ]);

    const handleLogin = () => {
        setHasLogoutFailureError(false);
        signIn()
            .catch(() => setHasAuthenticationErrors(true));
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div>
            {state.isAuthenticated && 
            // history.push("user-dashboard")}
            <div>
                <h1>Hi {state.displayName}</h1>
                <a href="user-dashboard">user</a>
                </div>
                }
            {!state.isAuthenticated &&
                <Paper style={styles.paperContainer} >
                    <Container component="main" maxWidth="sm" sx={{paddingTop: 20}}>
                        <Box
                            bgcolor = "rgba(255,255,255,0.7)"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: 'none',
                                padding: 5,
                                borderRadius: 2,
                            }}
                        >
                            <Typography component="h1" variant="h5" color='#3F51B5'>
                                <span style= {{fontSize:40,}}>Welcome to Grama Check</span>
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 
                                    ,backgroundColor: '#3F51B5'
                                }}
                                onClick={()=>handleLogin()}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Container>
                </Paper>}       
        </div>
    );
}  