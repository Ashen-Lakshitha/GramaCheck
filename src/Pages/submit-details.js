import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    CircularProgress,
    TextField,
    Link,
    Button,
} from "@mui/material";

export default function DetailsInt() {

  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [error ,setError] = useState(null);
  const [isLoading ,setIsLoading] = useState(null);

  const url1 = "https://46c49c4b-93ff-48d6-9deb-66d022b806fd-prod.e1-us-east-azure.choreoapis.dev/zazy/integrator/1.0.0/validate?id="+id+"&address="+address;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log(localStorage.getItem("access-token"))
    fetch(url1, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("access-token") 
        },
    }).then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data);
        setIsLoading(false);
        if(!data['success']){
            setError(data['error']);
            return;
        }
    })
    .catch(err => {
        if(err.name === "AbortError"){
            console.log('Fetch aborted');
        }else{
            setIsLoading(false);
            setError(err.message);
        }
    })
  }
  
  return (
    <Container component="main" maxWidth="sm" sx={{paddingTop: 10}}>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            border: 'none',
            borderRadius: 2,
            }}
        >
            <Typography component="h6" variant="h5" color='#3F51B5'>
                <span style= {{fontSize:30,}}>Enter User information</span>
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
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="Id"
                    name="id"
                    onChange={e => setId(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    id="address"
                    onChange={e => setAddress(e.target.value)}
                />
                <Typography>
                    <span style= {{
                        fontSize:15, 
                        color:'red',
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {error}
                    </span>
                </Typography>
                {!isLoading && <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 
                        ,backgroundColor: '#3F51B5'
                    }}
                >
                    Submit
                </Button>}
                {isLoading && <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    }}
                > <CircularProgress color="inherit" /></Box>}
                <Grid container>
                    <Grid item xs>
                        <Link href="/user-dashboard" variant="body2">
                            Go Back
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </Container>
  )
}

