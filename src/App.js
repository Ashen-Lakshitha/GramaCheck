import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import { default as authConfig } from "./config.json";
import Start from './Pages/start';
import SubmitDetails from './Pages/submit-details';
import ViewStatus from "./Pages/view-status";
import { ErrorBoundary } from "./error-boundary";

function Content (){
  const {error} = useAuthContext();
  return (
    <ErrorBoundary error={error}>
      <Router>
        <Switch>
          <Route exact path="/" component={Start} />
          {/* <Route path="/user-dashboard" component={UserHome} />
          <Route path="/check" component={Check} /> */}
          <Route path="/submit-details" component={SubmitDetails} />
          <Route path="/view-status" component={ViewStatus} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

function App () {
  return(
  <AuthProvider config={authConfig}>
    <Content></Content>
    </AuthProvider>
  )
};

export default App;
