import React, { useEffect, useState, useRef, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Container, Button, TextField } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
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
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { executeProgram, FetchQuestion } from "../../Actions/user";
import Loading from "../Loading/Loading";
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
import Board from "../Canvas Board/Board";
import "./meeting.css";
import SettingsIcon from "@material-ui/icons/Settings";
import firebase from "firebase";
import firepad from "firepad";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import VideocamIcon from "@material-ui/icons/Videocam";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import CallEndIcon from "@material-ui/icons/CallEnd";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import axios from "axios";
import Video from "twilio-video";
import Room from "../../Room";

function Meeting() {
  const [value, setValue] = useState(0);
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [discussionPanel, setDiscussionPanel] = useState(false);
  const refName = useRef();
  const firepadInstance = firepad;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [settingOptions, setSettingOptions] = useState(false);
  const questionInfo = useSelector((state) => state.questionInfo);
  const [selectedLang, setSelectedLang] = useState("nodejs");
  const [editortheme, setEditortheme] = useState("github");
  const [keyBind, setKeyBind] = useState("Standard");
  const [tabs, setTabs] = useState(2);
  const [isClicked, setisClicked] = useState(false);

  const [showVideoInvite, setShowVideoInvite] = useState(false);
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

  const keyBinding = ["Standard", "Emacs", "Vim"];

  const tab = ["2", "4", "8"];

  // Firebase Initialization
  const config = {
    apiKey: "AIzaSyAE8uc22tk0mIC0wrYwrba9NmBi_MHHmC4",
    authDomain: "firepad-gh-tests.firebaseapp.com",
    databaseURL: "https://firepad-gh-tests.firebaseio.com",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

  // For Real time collaboration

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

  const { loading, questionDetail } = questionInfo;

  const compiled = useSelector((state) => state.executeCode);
  const { waiting } = compiled;
  const result = compiled?.compiled?.body;
  console.log("result", result);

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

  const handleSave = () => {
    setEditortheme(editortheme);
    setKeyBind(keyBind);
    setTabs(tabs);
    setSettingOptions((prev) => !prev);
  };

  const handleCancel = () => {
    setSettingOptions(true);
  };

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

    localStorage.clear();
  }, []);

  // This code for tab section
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={1} className="scrollCondition">
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRunCode = () => {
    if (code.length < 0) {
      return;
    }
    dispatch(executeProgram(code, selectedLang, 5));
    setisClicked(true);
  };

  useEffect(() => {
    dispatch(FetchQuestion(id));
    var firepadRef = getExampleRef();
    var firepad = firepadInstance.fromACE(firepadRef, refName?.current?.editor);
    console.log(firepad);
  }, [dispatch, id, firepadInstance]);

  return (
    <React.Fragment>
      <Dialog
        open={discussionPanel}
        onClose={() => setDiscussionPanel((prev) => !prev)}
        aria-labelledby=""
        fullScreen
      >
        <DialogTitle id=""></DialogTitle>
        <DialogContent>
          <AppBar position="relative" color="primary">
            <ToolBar>
              <IconButton
                onClick={() => setDiscussionPanel((prev) => !prev)}
                color="secondary"
              >
                <CloseIcon />
              </IconButton>
              <Typography>Canvas Board</Typography>
            </ToolBar>
          </AppBar>

          <Board />
        </DialogContent>
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
              Your session will begin as soon as you send out the invite, and
              will remain available for 2 hours, or until one of you decides to
              end the session.
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
              connecting ? <SettingsEthernetIcon /> : <FilterTiltShiftIcon />
            }
            onClick={handleSubmit}
            disabled={connecting}
          >
            {connecting ? "Joining..." : "Join"}
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="xl" className="mainContainer">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Typography
            style={{
              alignItems: "center",
              textDecoration: "none",
              display: "flex",
              marginTop: "20px",
              marginBottom: "25px",
            }}
          >
            <ArrowBackIcon />
            Dashboard
          </Typography>
        </Link>
        <Grid container>
          {/* Side question bar */}
          <Grid item xl={5} lg={4} md={6} sm={6}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Question" {...a11yProps(0)} />
              <Tab label="Hints" {...a11yProps(1)} />
              <Tab label="Answer" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              {loading ? <Loading /> : `${questionDetail?.question}`}
            </TabPanel>
            <TabPanel value={value} index={1} style={{ textAlign: "justify" }}>
              {questionDetail?.hints}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {questionDetail?.answer}
            </TabPanel>
          </Grid>

          {/*  for resseting the code */}
          <Dialog
            open={openDialog}
            onClose={(e) => setOpenDialog((prevState) => !prevState)}
            onEscapeKeyDown={false}
          >
            <DialogTitle id="">RESET CODE</DialogTitle>
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
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={resetCode}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Code for customizing the theme */}

          <Dialog
            open={settingOptions}
            onClose={() => setSettingOptions((prev) => !prev)}
            maxWidth="sm"
          >
            <DialogTitle id=""></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h5">Code Editor Setting</Typography>
                <hr />

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
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Code editor */}
          <Grid item xl={7} lg={8} md={6} sm={6}>
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
                      disabled={code.length > 0 ? false : true}
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
                        disabled={waiting ? true : false}
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
                      startIcon={<SettingsIcon />}
                      disabled={waiting ? true : false}
                    >
                      customize editor
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<RotateLeftIcon />}
                      onClick={Reset}
                      disabled={code.length > 0 && !waiting ? false : true}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setDiscussionPanel((prev) => !prev)}
                      startIcon={<BorderColorIcon />}
                    >
                      Discussion Board
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
                      startIcon={
                        room ? (
                          <CallEndIcon color="secondary" />
                        ) : (
                          <VideocamIcon />
                        )
                      }
                      size="small"
                    >
                      {room ? "End session" : "Video Chat"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* code editor */}

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
                  mode={selectedLang === "nodejs" ? "javascript" : selectedLang}
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
                  width="65vw"
                  height="78vh"
                  value={code}
                  fontSize="14"
                  ref={refName}
                />
              </Grid>
              <Grid item className={isClicked ? "show" : "hide"}>
                <div className="output1">
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
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Meeting;
