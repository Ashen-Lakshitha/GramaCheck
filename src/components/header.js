import { useAuthContext } from "@asgardeo/auth-react";
import { Button, Box } from "@mui/material";

const Header = () => {

  const {signOut} = useAuthContext();

  return (  
    <Box sx={{ '& button': { m: 1 } }} style={{textAlign:'right', margin:'20px'}}>
        <Button variant="contained" size="small" onClick={()=>{}}>Help</Button>
        <Button variant="outlined" size="small" onClick={()=>signOut()}>Logout</Button>
    </Box>
  );
}
 
export default Header;