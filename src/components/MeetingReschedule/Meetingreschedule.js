
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams, Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { rescheduleMeeting } from "../../Actions/user";


function Meetingreschedule() {
  const { userId, meetingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [newSelectedDate, setnewSelectedDate] = useState(new Date());

  const RescheduleMeeting = () => {
    dispatch(rescheduleMeeting(userId, meetingId, newSelectedDate));
    history.push('/dashboard')
    window.location.reload()
  };
  return (
    <React.Fragment>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Typography
              style={{
                alignItems: "center",
                textDecoration: "none",
                display: "flex",
              }}
            >
              <ArrowBackIcon />
              Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={newSelectedDate} onChange={setnewSelectedDate} disablePast />
        <TimePicker value={newSelectedDate} onChange={setnewSelectedDate} />
      </MuiPickersUtilsProvider>
      <Button variant="contained" color="default" onClick={RescheduleMeeting}>
        Update
      </Button>
    </React.Fragment>
  );
}

export default Meetingreschedule;
