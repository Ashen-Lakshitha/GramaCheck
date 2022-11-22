import { useAuthContext } from "@asgardeo/auth-react";
import { Button, Box } from "@mui/material";

const Header = () => {

  const {signOut} = useAuthContext();

  return (
    <div className="header">  
    <Box sx={{ '& button': { m: 1 } }} style={{textAlign:'right', marginRight:'20px'}}>
        <Button variant="contained" size="small" onClick={()=>{}}>Help</Button>
        <Button variant="outlined" size="small" onClick={()=>signOut()}>Logout</Button>
    </Box></div>
  );
}
 
export default Header;