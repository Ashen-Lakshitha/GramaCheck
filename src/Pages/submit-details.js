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

  const url1 = "http://localhost:3001/gramaInt";

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = JSON.stringify({
        id: id,
        address: address,
        });

    setIsLoading(true);
    setError(null);
    
    fetch(url1, {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({id: id})
    }).then(res=>{
        return res.json();
    })
    .then(data=>{
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
                {isLoading && <CircularProgress color="inherit" />}
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

