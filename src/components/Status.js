import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "../App.css"
import Header from '../components/Header';
import Certificate from './Certificate';



const Status = () => {

    const token = JSON.parse(window.sessionStorage.getItem("session_data-instance_0")).access_token;

    var config = {
        method: 'get',
        url: 'https://02d7f0b7-0c25-4e2d-92e5-2e5a49ed5dc7-prod.e1-us-east-azure.choreoapis.dev/wcso/policecheck/1.0.0/getResult/2',
        headers: {
            'Authorization': 'Bearer '+token
        }
    };
  

    const [status, setStatus] = React.useState("Pending");
    const [idCheck, setIdCheck] = React.useState(false);
    const [addressCheck, setAddressCheck] = React.useState(false);
    const [policeCheck, setPoliceCheck] = React.useState(false);

    React.useEffect(() => {
        // localStorage.setItem('token', );
        axios(config).then((response) => {
            console.log(response);
           
            if(response.data.id_check === true) setIdCheck(true);
            if(response.data.address_check === true) setAddressCheck(true);
            if(response.data.police_check === true) setPoliceCheck(true);
        });

        if(idCheck === true && addressCheck === true && policeCheck === true)
            setStatus("Completed")
        else
            setStatus("Completed")

      }, [idCheck,addressCheck,policeCheck]);

   
    

    return ( 
        <div className='status-form'>

            <div >
                <h3 className="label">Your Grama certificate is <br></br><h1></h1>
                    {(status === "Rejected") ? <span className="badge-error">{status}</span> 
                                             : <span className="badge">{status}</span>}              
                </h3>
                <h2></h2>

                <div className="status">
                    
                    {(idCheck === true) ? <p> <CheckCircleOutlineIcon color="success"/> Your ID is correct</p> 
                                        : <p> <ErrorOutlineIcon color="error"/> Your ID is incorrect</p>}

                    {(addressCheck === true) ? <p> <CheckCircleOutlineIcon color="success"/> Your address is correct</p> 
                                            : <p> <ErrorOutlineIcon color="error"/> Your address is incorrect</p>}

                    {(policeCheck === true) ? <p> <CheckCircleOutlineIcon color="success"/> Your police result is correct</p> 
                                            : <p> <ErrorOutlineIcon color="error"/> Your police result has an issue</p>}
                </div>
                <br></br>
                {/* <Link to="/user/dashboard">Back to home</Link> */}
                <div className='optional'>
                    {status==="Completed" && <Certificate/> }
                </div>
        
            </div>
        </div>
    );
}
 
export default Status;