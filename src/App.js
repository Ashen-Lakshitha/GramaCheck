import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import { default as authConfig } from "./config.json";
import Welcome from './pages/Welcome';
import UserHome from './pages/user-dashboard';
import Check from './pages/check';
import SubmitDetails from './pages/submit-details';
import ViewStatus from "./pages/view-status";
import { ErrorBoundary } from "./error-boundary";
import './App.css';
import UserDashboard from "./pages/UserDashboard";
import Status from "./pages/Status";
import ApplyForm from "./pages/ApplyForm";
import ProtectedRoute from "./components/ProtectedRoute";



function Content (){
  const error  = useAuthContext();

  return (
    <ErrorBoundary error={error}>
      <Router>
        <Switch>

          {/* paths for Welcome, UserDashboard, ApplyForm are working*/}

          <Route exact path="/" component={Welcome} />
          <Route path="/user/dashboard" component={UserDashboard} />
          <Route path="/user/apply" component={ApplyForm} />


          {/* these paths are not relevant */}
          <Route path="/check" component={Check} />
          <Route path="/user/status" component={Status}/>

        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

function App () {
  return(

    <div className="App">

      <AuthProvider config={authConfig}>
        <Content></Content>
      </AuthProvider>

    </div>
  )
};

export default App;
