import React, { useRef, useState, useEffect, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";
import { useSelector, useDispatch } from "react-redux";
import { executeProgram, joinMeeting } from "../../Actions/user";
import Container from "@material-ui/core/Container";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import LoopIcon from "@material-ui/icons/Loop";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import firepad from "firepad";
import Fab from "@material-ui/core/Fab";
import MessageIcon from "@material-ui/icons/Message";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import io from "socket.io-client";
import ShareIcon from "@material-ui/icons/Share";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import "./joinmeeting.css";
import SettingsIcon from "@material-ui/icons/Settings";
import Board from "../Canvas Board/Board";
import { URL } from "../../URL/url";
import VideocamIcon from "@material-ui/icons/Videocam";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import Video from "twilio-video";
import axios from "axios";
import Room from "../../Room";
import CallEndIcon from "@material-ui/icons/CallEnd";

function Challenges() {
  const socket = io(URL);
  const meetLink = window.location.href;
  const [frndEmail, setFrndEmail] = useState("");
  const [color, setColor] = useState();
  const [discussionPanel, setDiscussionPanel] = useState(false);
  const refName = useRef();
  const firepadInstance = firepad;
  const [drawer, setDrawer] = useState(false);
  const [message, setMessage] = useState();
  const [msgshow, setmsgShow] = useState();
  const [frndPracticeDialog, setPracticeFrndDialog] = useState(false);
  const [showVideoInvite, setShowVideoInvite] = useState(false);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [settingOptions, setSettingOptions] = useState(false);
  const [selectedLang, setSelectedLang] = useState("nodejs");
  const [editortheme, setEditortheme] = useState("github");
  const [keyBind, setKeyBind] = useState("Standard");
  const [tabs, setTabs] = useState(2);
  const [isClicked, setisClicked] = useState(false);

  // for Video Chatting
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized dark",
    "solarized light",
    "terminal",
  ];
  const allSupportedLanguage = [
    "java",
    "c",
    "nodejs",
    "cpp",
    "php",
    "perl",
    "python3",
    "ruby",
    "go",
    "sql",
    "c#",
    "swift",
    "dart",
  ];

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const keyBinding = ["Standard", "Emacs", "Vim"];

  const tab = ["2", "4", "8"];

  //For compiling the code
  const compiled = useSelector((state) => state.executeCode);
  const { waiting } = compiled;
  const result = compiled?.compiled?.body;

  // for sending meeting link

  const { loading, joiningInfo } = useSelector((state) => state.joinSession);

  console.log(loading, joiningInfo);

  // Firebase Initialization
  const config = {
    apiKey: "AIzaSyAE8uc22tk0mIC0wrYwrba9NmBi_MHHmC4",
    authDomain: "firepad-gh-tests.firebaseapp.com",
    databaseURL: "https://firepad-gh-tests.firebaseio.com",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

  const Reset = () => {
    setOpenDialog((prevState) => !prevState);
  };

  const resetCode = () => {
    setCode("");
    setOpenDialog((prevState) => !prevState);
  };

  //  This code for opening setting option

  const handleSetting = () => {
    setSettingOptions((prev) => !prev);
  };

  const handleRunCode = () => {
    if (code.length < 0) {
      return;
    }
    dispatch(executeProgram(code, selectedLang, 5));
    setisClicked(true);
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      setMessage("");
      socket.emit("sendMessage", message);
    }
  };

  const handleFreindMeet = (mail, meetLink) => {
    if (mail.match(regexEmail) && mail.length > 0) {
      dispatch(joinMeeting(mail, meetLink));
      setFrndEmail("");
    } else {
      return alert("Invalid email");
    }
  };

  const handleSave = () => {
    setEditortheme(editortheme);
    setKeyBind(keyBind);
    setTabs(tabs);
    setSettingOptions((prev) => !prev);
  };

  const handleCancel = () => {
    setSettingOptions((prev) => !prev);
  };

  function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, "");
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + "#" + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== "undefined") {
      console.log("Firebase data: ", ref.toString());
    }
    return ref;
  }

  socket.on("sendMessage", (data) => {
    setmsgShow(data);
  });

  useEffect(() => {
    var firepadRef = getExampleRef();
    var firepad = firepadInstance.fromACE(firepadRef, refName?.current?.editor);
    console.log(firepad);
  }, [firepadInstance]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const { data } = await axios.post(`${URL}/video/token`, {
        identity: username,
        room: roomName,
      });
      console.log(data);

      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  // handle logout
  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });

  localStorage.clear()
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  console.log(userInfo)
  return (
    <React.Fragment>
      <Container maxWidth="xl" className="mainContainer">
        <Grid container>
          {/* invitingfreind */}

          <Dialog
            open={frndPracticeDialog}
            onClose={(e) => setPracticeFrndDialog((prev) => !prev)}
            onEscapeKeyDown
            onBackdropClick
          >
            <DialogTitle>
              <Grid
                container
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <Typography variant="body-1">
                    INVITE YOUR FREIND TO PRACTICE
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    color="secondary"
                    onClick={(e) => setPracticeFrndDialog((prev) => !prev)}
                    disabled={loading}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">
                  Know someone you'd like to practice with? Send them an invite!
                </Typography>

                <Typography>
                  Your session will begin as soon as you send out the invite,
                  and will remain available for 2 hours, or until one of you
                  decides to end the session.
                </Typography>
              </DialogContentText>

              <TextField
                rows={1}
                fullWidth
                label="Email Address"
                type="email"
                value={frndEmail}
                autoFocus
                margin="dense"
                onChange={(e) => setFrndEmail(e.target.value)}
                disabled={loading}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={
                  loading ? <SettingsEthernetIcon /> : <GroupAddIcon />
                }
                onClick={() => handleFreindMeet(frndEmail, meetLink)}
                disabled={loading}
              >
                {loading ? "Sending Request..." : "Send a request"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* For Start video Call */}
          <Dialog
            open={showVideoInvite}
            onClose={(e) => setShowVideoInvite((prev) => !prev)}
            onEscapeKeyDown
            onBackdropClick
          >
            <DialogTitle>
              <Grid
                container
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <Typography variant="body-1">
                    Create a room to start instant video meeting .
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    color="secondary"
                    onClick={(e) => setShowVideoInvite((prev) => !prev)}
                    disabled={loading}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">
                  Know someone you'd like to practice with? Send them an invite!
                </Typography>

                <Typography>
                  Your session will begin as soon as you send out the invite,
                  and will remain available for 2 hours, or until one of you
                  decides to end the session.
                </Typography>
              </DialogContentText>

              <TextField
                rows={1}
                fullWidth
                label="Your Name"
                type="text"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                disabled={connecting}
                style={{ marginBottom: "20px" }}
              />
              <TextField
                rows={1}
                fullWidth
                label="Room Name"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                disabled={connecting}
                helperText={`Say ${roomName} name to join this room`}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={
                  connecting ? (
                    <SettingsEthernetIcon />
                  ) : (
                    <FilterTiltShiftIcon />
                  )
                }
                onClick={handleSubmit}
                disabled={connecting}
              >
                {connecting ? "Joining..." : "Join"}
              </Button>
            </DialogActions>
          </Dialog>

          {/*  for resseting the code */}
          <Dialog
            open={openDialog}
            onClose={(e) => setOpenDialog((prevState) => !prevState)}
            onEscapeKeyDown
          >
            <DialogTitle id="">Do you want to clear the code ?</DialogTitle>
            <DialogContent>
              <DialogContentText variant="subtitle1">
                Resetting the code will lose all current changes . Are you sure
                want to proceed ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => setOpenDialog((prevState) => !prevState)}
                color="secondary"
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={resetCode}
                size="small"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Code for customizing the theme */}

          <Dialog
            open={settingOptions}
            onClose={() => setSettingOptions((prev) => !prev)}
            maxWidth="sm"
            onEscapeKeyDown
          >
            <DialogTitle id="">
              {" "}
              <Typography variant="h5">Code Editor Setting</Typography>
              <hr />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid container>
                  <Grid item className="themeContainer">
                    <div>
                      <Typography variant="subtitle2" className="themeOpt">
                        Theme Options
                      </Typography>
                      <Typography variant="body2" className="themeDesc">
                        Tired of the white background? Try different styles and
                        syntax highlighting.
                      </Typography>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          variant="outlined"
                          value={editortheme}
                          className="select"
                          onChange={(e) => setEditortheme(e.target.value)}
                        >
                          {themes.map((theme) => (
                            <MenuItem value={theme}>
                              <Typography variant="body2">{theme}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item className="themeContainer">
                    <div>
                      <Typography variant="subtitle2" className="themeOpt">
                        Key Binding Options
                      </Typography>
                      <Typography variant="body2" className="themeDesc">
                        Want to practice Vim or Emacs? We have these key binding
                        options available for you.
                      </Typography>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          variant="outlined"
                          value={keyBind}
                          className="select"
                          onChange={(e) => setKeyBind(e.target.value)}
                        >
                          {keyBinding.map((bind) => (
                            <MenuItem value={bind}>
                              <Typography variant="body2">{bind}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item className="themeContainer">
                    <div>
                      <Typography variant="subtitle2" className="themeOpt">
                        Tab Size Options
                      </Typography>
                      <Typography variant="body2" className="themeDesc">
                        Choose the width of a tab character.By defaults it sets
                        to 2 spaces spaces.
                      </Typography>
                    </div>
                    <div>
                      <FormControl>
                        <Select
                          variant="outlined"
                          value={tabs}
                          className="select"
                          onChange={(e) => setTabs(e.target.value)}
                        >
                          {tab.map((tab) => (
                            <MenuItem value={tab}>
                              <Typography variant="body2">
                                {tab} Spaces
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCancel}
                color="secondary"
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="small"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for discussiong panel */}

          <Dialog
            open={discussionPanel}
            onClose={() => setDiscussionPanel((prev) => !prev)}
            aria-labelledby=""
            fullScreen
            maxWidth="lg"
          >
            <DialogContent>
              <AppBar position="relative" color="primary">
                <ToolBar>
                  <IconButton
                    onClick={() => setDiscussionPanel((prev) => !prev)}
                    color="secondary"
                  >
                    <CloseIcon />
                  </IconButton>
                  <div
                    style={{
                      display: "inline-block",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      <BorderColorIcon />
                      Writing Pad
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <Typography>
                        Choose your favourite color & start discussing :{" "}
                      </Typography>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                  </div>
                </ToolBar>
              </AppBar>
              <Board color={color} />
            </DialogContent>{" "}
            */
          </Dialog>
          {/* Code editor */}
          <Grid
            item
            xl={12}
            lg={12}
            md={6}
            sm={12}
            style={{ marginTop: "10px" }}
          >
            <Grid container>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{ marginBottom: "10px" }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleRunCode}
                      startIcon={waiting ? <LoopIcon /> : <PlayArrowIcon />}
                      disableElevation
                      disabled={code.length > 0 ? false : true}
                      size="small"
                    >
                      {waiting ? "Executing..." : "Run Code"}
                    </Button>
                  </Grid>
                  {/*  All upper functionality */}
                  <Grid item>
                    <FormControl>
                      <Select
                        variant="outlined"
                        value={selectedLang}
                        className="langselect"
                        onChange={(e) => setSelectedLang(e.target.value)}
                      >
                        {allSupportedLanguage.map((language) => (
                          <MenuItem value={language}>
                            <Typography variant="body2">
                              {" "}
                              {language.toUpperCase()}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSetting}
                      disableElevation
                      size="small"
                    >
                      <SettingsIcon />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<RotateLeftIcon />}
                      onClick={Reset}
                      disableElevation
                      size="small"
                      disabled={code.length > 0 ? false : true}
                    >
                      Reset
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<ShareIcon />}
                      onClick={() => setPracticeFrndDialog((prev) => !prev)}
                     disabled ={userInfo?.isAuthenticated ? false:true}
                    >
                      Share link
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setDiscussionPanel((prev) => !prev)}
                      startIcon={<BorderColorIcon />}
                      size="small"
                    >
                      Jamboard
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={
                        room
                          ? handleLogout
                          : () => setShowVideoInvite((prev) => !prev)
                      }
                      startIcon={room ? <CallEndIcon color="secondary" /> : <VideocamIcon />}
                      size="small"
                    >
                      {room ? "End session" : "Video Chat"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* code editor */}
                <div className="videoChat">
                  {room ? (
                    <Room
                      roomName={roomName}
                      room={room}
                      handleLogout={handleLogout}
                    />
                  ) : null}
                </div>

                <AceEditor
                  mode={selectedLang}
                  theme={editortheme}
                  onChange={setCode}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: { tabs },
                  }}
                  keyboardHandler={keyBind}
                  width="96vw"
                  height="93vh"
                  value={code}
                  fontSize={14}
                  ref={refName}
                  focus
                  wrapEnabled
                />
              </Grid>
              <Grid item className={isClicked ? "show" : "hide"}>
                <div className="output">
                  <div
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      display: "flex",
                      color: "white",
                    }}
                  >
                    <Typography variant="overline">Output</Typography>
                    <IconButton
                      onClick={() => setisClicked(false)}
                      style={{ color: "white" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  {result?.output ? (
                    <Typography style={{ color: "white" }} variant="body2">
                      Finished in : {result?.cpuTime}s
                    </Typography>
                  ) : null}
                  {result?.error ? (
                    <Typography style={{ color: "white" }} variant="body2">
                      {result?.error}s
                    </Typography>
                  ) : null}

                  <Typography variant="subtitle1" style={{ color: "white" }}>
                    {result?.output}
                  </Typography>
                </div>
              </Grid>
              <Grid />
              <Grid />
            </Grid>
            {/* Chat Drawer */}

            <Drawer
              anchor="right"
              open={drawer}
              onClose={() => setDrawer(false)}
              className="drawer"
            >
              <div
                style={{
                  display: "column",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="drawer"
                >
                  <Typography variant="overline">Chat Messages</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => setDrawer((prev) => !prev)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className="allChats">
                  <Typography>{msgshow}</Typography>
                </div>
                <div>
                  <TextField
                    variant="standard"
                    className="typeChatMessage"
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleSendMessage}
                    value={message}
                    autoFocus
                  />
                </div>
              </div>
            </Drawer>
          </Grid>

          <Fab
            color="primary"
            aria-label="add"
            className="fabposition"
            variant="round"
            onClick={() => setDrawer((prev) => !prev)}
          >
            <MessageIcon />
          </Fab>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Challenges;
