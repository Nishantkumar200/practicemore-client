import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Container, Button } from "@material-ui/core";
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

import "./challenge.css";
import SettingsIcon from "@material-ui/icons/Settings";

function Challenges() {
  const [value, setValue] = useState(0);
  const [code, setCode] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [settingOptions, setSettingOptions] = useState(false);
  const questionInfo = useSelector((state) => state.questionInfo);
  const [selectedLang, setSelectedLang] = useState("nodejs");
  const [editortheme, setEditortheme] = useState("github");
  const [keyBind, setKeyBind] = useState("Standard");
  const [tabs, setTabs] = useState(2);
  const [isClicked, setisClicked] = useState(false);
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

  // const [programminglanguage, setProgrammingLanguage] = useState();
  const { loading, questionDetail } = questionInfo;
  // const queryString = window.location.search;
  // const lang = new URLSearchParams(queryString).get("lang");
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
    setSettingOptions(prev => !prev);
  };


  

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
          <Box p={1} className ="scrollCondition">
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

  useEffect(() => {
    dispatch(FetchQuestion(id));
  }, [dispatch, id]);

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

 

  return (
    <React.Fragment>
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
              <Button color="primary" variant="contained" onClick={resetCode} >
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
                onClick={() => setSettingOptions((prev) => !prev)}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick ={handleSave}>
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
                      disabled ={code.length> 0 ? false :true}
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
                        disabled ={waiting ? true :false}
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
                      disabled ={waiting ? true :false}
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
                      disabled ={code.length > 0 && !waiting ?false : true}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* code editor */}
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
                  {result?.output? (
                    <Typography style={{ color: "white" }} variant="body2">
                      Finished in : {result?.cpuTime}s
                    </Typography>
                  ) : null}
                  {result?.error? (
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

export default Challenges;
