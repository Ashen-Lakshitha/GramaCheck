import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";


const Header = () => {

  const {signOut} = useAuthContext();

  return (  
    <div style={{textAlign:'right', margin:'20px'}}>
        <Link to="/login"><button className="logoutbtn" onClick={()=>signOut()}>Log out</button></Link>
    </div>
  );
}
 
export default Header;