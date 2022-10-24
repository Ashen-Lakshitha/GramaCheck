import { Hooks, useAuthContext } from "@asgardeo/auth-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

    const [ derivedAuthenticationState, setDerivedAuthenticationState ] = useState(null);
    const [ hasAuthenticationErrors, setHasAuthenticationErrors ] = useState(false);
    const [ hasLogoutFailureError, setHasLogoutFailureError ] = useState();

    const search = useLocation().search;
    const stateParam = new URLSearchParams(search).get('state');
    const errorDescParam = new URLSearchParams(search).get('error_description');

    useEffect(() => {

        if (!state?.isAuthenticated) {
            return;
        }
        // fetch("https://www.hpb.health.gov.lk/api/get-current-statistical")
        // .then(response => {
        //     if(response.ok){
        //         return response.json();
        //     }
        //     throw response;
        // })
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.log("Error");
        // })

           getBasicUserInfo().then((basicUserDetails) => {
                console.log(basicUserDetails);
                console.log(basicUserDetails.username);
            })

            getIDToken()
                .then(idToken=>{
                    console.log(JSON.parse(atob(idToken.split(".")[0])))
                })
            
            getDecodedIDToken()
                .then(decodedToken=>{
                    console.log(decodedToken)
                })

        // (async (): Promise<void> => {
        //     const basicUserInfo = await getBasicUserInfo();
        //     const idToken = await getIDToken();
        //     const decodedIDToken = await getDecodedIDToken();

        //     setName(basicUserInfo.username)
        //     const derivedState = {
        //         authenticateResponse: basicUserInfo,
        //         idToken: idToken.split("."),
        //         decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
        //         decodedIDTokenPayload: decodedIDToken
        //     };

        //     setDerivedAuthenticationState(derivedState);
        // })();
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
            {state.isAuthenticated && <div>
                <h1>Hi user</h1>
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