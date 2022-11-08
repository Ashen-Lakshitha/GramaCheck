import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"
import Header from '../components/Header';
import { useHistory } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";

export default function UserDashboard() {

const history = useHistory();

  return (
    <div>
        <Header/>
        
        <div className="container">
        <form className="form">
            <div className="content">

                <div className="buttons">
                    <Link to="/user/apply">
                        <button className="submitbtn">Apply for Grama certificate</button>
                    </Link> 
                </div>

                <div className="buttons">
                    <Link to="/user/status">
                        <button className="submitbtn">Check status</button>
                    </Link>
                </div>

                <div style = {{paddingBottom: "100px"}}></div>

            </div>
        </form>
        </div>
    </div>
  )
}
