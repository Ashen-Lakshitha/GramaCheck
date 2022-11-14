import React from 'react';
import {
    Typography,
    Box,
    Card
} from "@mui/material";
import Certificate from '../components/certificate';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ViewStatus({person, data}) {

    return (
        <Card variant="outlined">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    border: 'none',
                    justifyContent: 'center',
                    borderRadius: 2,
                }}
            >
                <Typography component="h5" variant="h5">
                    Your Grama certificate is
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    border: 'none',
                    padding: 5,
                    borderRadius: 2,
                }}
            >
                <Content flag = {data.isIdValid} text="ID Check" msg = {data.idMsg}/>
                <Content flag = {data.isAddressValid} text="Address Check" msg = {data.addressMsg}/>
                <Content flag = {data.isPoliceValid} text="Police Check" msg = {data.policeMsg}/>
                {/* {data.isIdValid ? <p> <CheckCircleOutlineIcon color="success"/> ID check</p> 
                        : <p> <ErrorOutlineIcon color="error"/> ID check<li>{data.idMsg}</li></p>}

                {data.isAddressValid ? <div> <CheckCircleOutlineIcon color="success"/> Address check</div> 
                                        : <p> <ErrorOutlineIcon color="error"/> Address check<li>{data.addressMsg}</li></p>}

                {data.isPoliceValid ? <p> <CheckCircleOutlineIcon color="success"/> Your police result is correct</p> 
                                        : <p> <ErrorOutlineIcon color="error"/> Your police result has an issue</p>} */}
                
                {data.success 
                    ? <Certificate person = {person} response = {data}/>
                    : <Typography color="red">Try again with correct information</Typography>}   
                </Box>
            </Card>
    )
}

function Content({flag, text, msg}){
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 2
            }}
        > 
            {flag?<><CheckCircleOutlineIcon color="success"/> <Typography>{text}</Typography></> 
                        : <> <ErrorOutlineIcon color="error"/> <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        > 
                            <Typography>{text}</Typography>
                            {text === "Police check" ?msg.split('#').map(item=><Typography variant='body2'>{item}</Typography>) :<Typography variant='body2'>{msg}</Typography>}
                        </Box></>}
        </Box>
        
    );
}