import { Hooks, useAuthContext } from "@asgardeo/auth-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import welcome from '../../src/images/welcome.png';
import welcome2 from '../../src/images/welcome2.png';
import UserDashboard from "./UserDashboard";



export default function Welcome() {

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
                const x = JSON.parse(window.sessionStorage.getItem("session_data-instance_0"));
                console.log("token got: "+x.access_token);
            })

            getIDToken()
                .then(idToken=>{
                    console.log(JSON.parse(atob(idToken.split(".")[0])))
                })
            
            getDecodedIDToken()
                .then(decodedToken=>{
                    console.log("token ");
                    console.log(decodedToken);
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

      {state.isAuthenticated && 
        <div>
             <br></br><br></br>
             <h1>Hey! Let's start</h1>
             <div>
                <img src={welcome2} height="300px" width="400px" alt="This is the welcome img"/>
             </div>            
            <br></br>
            <Link to="/user/apply">
                <button className="submitbtn" style={{'width':'20%'}} > Continue </button>
            </Link>
        </div>
      }


      {!state.isAuthenticated &&
      <div>
        <br></br><br></br>
        
          <h1>Welcome to the grama check app</h1>
          <div>
            <img src={welcome} height="300px" width="500px" alt="This is the welcome img"/>
          </div>
          <br></br>
 
        <button className="submitbtn" style={{'width':'20%'}} onClick={()=>handleLogin()}>Continue</button>
      </div>
      }
    </div>
    );
}  