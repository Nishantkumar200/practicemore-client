import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About/About";
import Challenges from "./components/ChallengePage/Challenges";
import Dashboard from "./components/Dashboard/Dashboard";
import Faqs from "./components/Faqs/Faqs";
import Forgot from "./components/ForgotPassword/Forgot";
import Home from "./components/Home/Home";
import Joinmeeting from "./components/JoinMeeting/Joinmeeting";
import Login from "./components/Login/Login";
import Meeting from "./components/Meeting/Meeting";
import Meetingreschedule from "./components/MeetingReschedule/Meetingreschedule";
import Reset from "./components/ResetPassword/Reset";
import Signup from "./components/Signup/Signup";
import Tryout from "./components/Try Out/Tryout";

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
        <Route exact path="/schedule/:id">
          <Meeting />
        </Route>
        <Route path="/challenge/:id">
          <Challenges />
        </Route>
        <Route path="/meetingreschedule/:userId/:meetingId">
          <Meetingreschedule />
        </Route>
        <Route path="/session/join">
          <Joinmeeting />
        </Route>
        <Route path="/tryout">
          <Tryout />
        </Route>
        <Route path="/forgotpassword">
          <Forgot />
        </Route>
        <Route path="/resetpassword">
          <Reset />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
