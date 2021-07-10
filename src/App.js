import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Challenges from "./components/ChallengePage/Challenges";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Joinmeeting from "./components/JoinMeeting/Joinmeeting";
import Login from "./components/Login/Login";
import Meeting from "./components/Meeting/Meeting";
import Meetingreschedule from "./components/MeetingReschedule/Meetingreschedule";
import Signup from "./components/Signup/Signup";


function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path = "/schedule">
          <Meeting />
        </Route>
        <Route path = "/challenge/:id">
          <Challenges />
        </Route>
        <Route path ="/meetingreschedule/:userId/:meetingId" >
          <Meetingreschedule />
        </Route>
        <Route path ="/session/join/" >
          <Joinmeeting />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
