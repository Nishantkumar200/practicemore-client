import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP } from "../../Actions/user";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { GoogleLogin } from "react-google-login";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { OutlinedInput, InputAdornment } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import "./signup.css";
import Verifier from "email-verifier";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  if (userDetail?.isAuthenticated) {
    history.push("/dashboard");
  } else {
    history.push("/signup");
  }
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { loading, userSignup } = useSelector((state) => state.registerauth);
  const verifier = new Verifier("at_NuHUsCOHZM9I4Ov1xkdzU8aOLOlXf");

  //For handling Multiple Input Value
  const handleChange = (props) => (e) => {
    setFormData({ ...formData, [props]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    verifier.verify(formData?.email, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      if (data?.smtpCheck === "true") {
        dispatch(
          SIGNUP(
            formData?.username,
            formData?.email,
            formData?.password,
            formData?.confirmPassword,
            history
          )
        );
      } else {
        return alert(" Invalid Email,Please try with another .");
      }
    });
  };

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //sign up with google

  const responseGoogle = (response) => {
    const { name, email, googleId } = response?.profileObj;
    dispatch(SIGNUP(name, email, googleId, googleId, history));
  };
  useEffect(() => {
    document.title = "Sign Up ";
  }, [history, userDetail]);
  return (
    <React.Fragment>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          style={{
            alignItems: "center",
            textDecoration: "none",
            display: "flex",
            padding: "25px",
          }}
        >
          <ArrowBackIcon />
          Go to home
        </Typography>
      </Link>
      {loading ? (
        <Backdrop open={loading} style={{ color: "white" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            direction="row"
            style={{ marginTop: "10%" }}
            justify="space-between"
          >
            <Grid item md={6} lg={6} sm={12}>
              <img
                src="../../../assets/signup.jpg"
                alt="sideImage"
                className="signupImg"
              />
            </Grid>
            <Grid item md={6} lg={6} sm={12}>
              <Typography className="login_header">
                Create an account{" "}
              </Typography>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                To keep track your record , join now !
              </Typography>
              {userSignup?.message ? (
                <Alert severity="error" style={{ marginBottom: "15px" }}>
                  {userSignup?.message}
                </Alert>
              ) : null}

              <Grid container spacing={1}>
                <Grid item md={6} sm={12} xs={12} lg={6} alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Full Name
                    </InputLabel>
                    <OutlinedInput
                      autoFocus
                      required
                      value={formData.username}
                      id="outlined-adornment-password"
                      type="text"
                      onChange={handleChange("username")}
                      labelWidth={80}
                      className="field"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6} alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type="email"
                      onChange={handleChange("email")}
                      labelWidth={40}
                      value={formData.email}
                      className="field"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6} alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      className="field"
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClick}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={80}
                    />
                  </FormControl>
                </Grid>

                <Grid md={6} sm={12} xs={12} lg={6} alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      className="field"
                      required
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClick}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={150}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                onClick={handleSignUp}
                size="large"
                className="signupBtn"
              >
                Sign Up
              </Button>
              <Typography style={{ marginTop: "20px" }}>
                Already have an account ?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
              <Typography style={{ textAlign: "center", marginTop: "20px" }}>
                Or
              </Typography>

              <GoogleLogin
                clientId="513270965377-qqaf5mmsihis676tglivf3hqniaief6q.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Continue with google"
                cookiePolicy={"single_host_origin"}
                className="googlebtn"
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Signup;
