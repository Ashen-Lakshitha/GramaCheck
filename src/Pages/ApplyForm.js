import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Header from "../components/Header";
import Status from "../components/Status";

const ApplyForm = () => {

  const [click, setClick] = useState(false);
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [error ,setError] = useState(null);
  const [isLoading ,setIsLoading] = useState(null);
  const url1 = "http://localhost:3001/gramaInt";

  const handleSubmit = (event) => {
    setClick(true);
    console.log("click value : "+click);
    event.preventDefault();
    const body = JSON.stringify({
        id: id,
        address: address,
        });

    //setIsLoading(true);
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

  // useEffect(() => {
    
  // }, [click]);


  return ( 
    <div>
      <Header/>
        
      <div className="container">
      <form className="form">
        
        <div className="content">
          
            <h2>Apply for certificate</h2>
            <br></br>

            <form >

              <div className='title2'>
                  <label>NIC number</label> <br></br>
                    <input type="email" className="div1" placeholder="Enter NIC number" onChange={e => setId(e.target.value)}/>
                    <br></br>
                  <label>Address</label> <br></br>
                    <input type="password" className="div1" placeholder="Enter address" onChange={e => setAddress(e.target.value)}/>
              
                  <p className="err">{error}</p>
              </div>
              
              {isLoading && <CircularProgress color="inherit" />}
              {!isLoading && 
              <div className="buttons">
                {/* <Link to="/user/status"> */}
                  <button type="submit" className="submitbtn" 
                  onClick={handleSubmit}>Submit</button>
                {/* </Link> */}
              </div>
              }

            </form>

            </div>
            <br></br>
            {/* <Link to="/user/dashboard">Back to home</Link> */}
        </form>

        <div className="optional">
          {click && <Status/> }
        </div>
      </div>
    </div>
  );
}
 
export default ApplyForm;