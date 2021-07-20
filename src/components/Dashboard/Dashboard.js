import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelmeeting,
  findAllMeeting,
  Logout,
  scheduleMeeting,
} from "../../Actions/user";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import { Backdrop, CircularProgress } from "@material-ui/core";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Tooltip from "@material-ui/core/Tooltip";

function Dashboard() {
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  if (userDetail?.isAuthenticated) {
    history.push("/dashboard");
  } else {
    history.push("/login");
  }
  const [modalstate, setModalstate] = useState(false);

  const dispatch = useDispatch();
  const { usermeetings, loading } = useSelector((state) => state.allMeetings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [practice, setPractice] = useState("");

  const todayDate = new Date();

  const allAvailableForPractice = [
    "Datastructure",
    "Competitve Programming",
    "System Design",
    "Behaviour",
  ];

  // For Scheduling the meeting
  const handleSubmit = () => {
    console.log(practice)
    dispatch(scheduleMeeting(userDetail?.id, practice, selectedDate));
    setModalstate((prevState) => !prevState);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // cancel the meeting

  const meetingCancel = (meetId, userId) => {
    window.location.reload();
    dispatch(cancelmeeting(meetId, userId));
    dispatch(findAllMeeting(userDetail?.id));
  };

  // handling meeting with freind

  useEffect(() => {
    dispatch(findAllMeeting(userDetail?.id));
    document.title = "Dashboard";
  }, [dispatch, userDetail?.id]);


  return (
    <React.Fragment>
      <Container>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
              <Link to="/">
                    <img
                      src="../../../assets/logo.png"
                      alt="logo"
                      className="logo"
                    />
                  </Link>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={4}>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      style={{ backgroundColor: "blueviolet" }}
                    >{`${userDetail?.username.charAt(0)}`}</Avatar>
                    <Typography> {userDetail?.username}</Typography>
                  </Grid>
                  <Grid item>
                    <Link to="/">
                      <Typography onClick={() => dispatch(Logout(history))}>
                        Logout
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to={"/session/join/"}>Practice with freind</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Practice with friends Dialog */}

        <Container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalstate((prevState) => !prevState)}
            style={{ marginTop: "50px" }}
            size="large"
          >
            Start Your Practice Session
          </Button>

          {/* Allow user to choose Slot timing */}

          <Dialog
            open={modalstate}
            onClose={() => setModalstate((prevState) => !prevState)}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle>Start New Practice Interview With Peers</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  spacing={4}
                  alignItems="center"
                >
                  <Grid item>What would you like to practice : </Grid>
                  <Grid item>
                    <FormControl variant="standard">
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={practice}
                        onChange={(e) => setPractice(e.target.value)}
                        className="practice"
                      >
                        {allAvailableForPractice.map((forPractice) => (
                          <MenuItem
                            value={forPractice.toLowerCase().replace(/\s/g, "")}
                          >
                            <Typography variant="body2">
                              {" "}
                              {forPractice.toLocaleUpperCase()}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid
                  container
                  alignItems="center"
                  justify="space-between"
                  spacing={2}
                >
                  <Grid item>Book Your Slot</Grid>

                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        disablePast
                      />
                      <TimePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setModalstate((prevState) => !prevState)}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          {loading ? (
            <Backdrop open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <TableContainer style={{ marginTop: "35px" }}>
              {usermeetings?.meeting?.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow hover>
                      <TableCell>Scheduled On</TableCell>
                      <TableCell>Question you'll ask</TableCell>
                      <TableCell>Type</TableCell>
                    
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usermeetings?.meeting?.map((meeting) => (
                      <TableRow key={meeting?._id}>
                        <TableCell>
                          {moment(meeting?.slottime).format(
                            "dddd, MMMM Do YYYY, h:mm A "
                          )}
                        </TableCell>
                        <TableCell>
                          <Link to={`/challenge/${meeting?.questionId}`}>
                            {meeting?.quesionyouask}
                          </Link>
                        </TableCell>
                        <TableCell>{meeting?.language.toUpperCase()}</TableCell>
                        <TableCell>
                          {moment(todayDate).isSameOrAfter(
                            new Date(meeting?.slottime)
                          ) ? (
                            <Link to={`/schedule/${meeting?.questionId}`} style={{textDecoration:"none"}}>
                              <Button variant="contained" color="primary">
                                Join Session
                              </Button>
                            </Link>
                          ) : (
                            <>
                              <Tooltip title="Cancel meeting">
                                <IconButton
                                  onClick={() =>
                                    meetingCancel(meeting?._id, userDetail?.id)
                                  }
                                  color="secondary"
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Tooltip>
                              <span>
                                {" "}
                                |{" "}
                                <Link
                                  to={`/meetingreschedule/${userDetail?.id}/${meeting?._id}`}
                                >
                                  <Tooltip title="Reschedule meeting">
                                    <IconButton color="primary">
                                      <ScheduleIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                              </span>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No meeting is scheduled</Typography>
              )}
            </TableContainer>
          )}
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
