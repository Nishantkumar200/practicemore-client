import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SIGNIN } from "../../Actions/user";
import "./login.css";
import { Backdrop, CircularProgress, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { GoogleLogin } from "react-google-login";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { OutlinedInput, InputAdornment } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  const [showPassword, setShowPassword] = useState(false);
  const initialLoginValue = {
    email: "",
    password: "",
  };

  const [userdetail, setuserDetail] = useState(initialLoginValue);

  const { loading, userInfo } = useSelector((state) => state.loginauth);

  const handleChange = (props) => (e) => {
    e.preventDefault();
    setuserDetail({ ...userdetail, [props]: e.target.value });
  };

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(SIGNIN(userdetail?.email, userdetail?.password));
    setuserDetail("");
  };

  // google sign in

  const responseGoogle = (response) => {
    const { email, googleId } = response?.profileObj;
    dispatch(SIGNIN(email, googleId));
  };
  useEffect(() => {
    if (userDetail?.isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
    document.title = "Login";
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
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container maxWidth="lg">
          <Grid container alignItems="center" direction="row">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <img
                src="../../../assets/login.jpg"
                alt="sideImage"
                className="login_illustration"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
              <Typography className="login_header">Login</Typography>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                Welcome Back{" "}
              </Typography>
              {userInfo?.message ? (
                <Alert
                  severity="error"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {userInfo?.message}
                </Alert>
              ) : null}
              <Grid spacing={1} alignItems="center" direction="row" container>
                <Grid item md={6} sm={12} xs={12} lg={6} alignItems="center">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      autoFocus
                      required
                      id="outlined-adornment-password"
                      type="email"
                      value={userdetail.email}
                      onChange={handleChange("email")}
                      labelWidth={40}
                      className="field"
                    />
                  </FormControl>
                </Grid>

                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      required
                      className="field"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={userdetail.password}
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
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                size="large"
                className="loginBtn"
              >
                Login
              </Button>

              <Typography className="register">
                Not registered yet ?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Register Now
                </Link>
              </Typography>

              <Link to="/forgotpassword" style={{ textDecoration: "none",color:'red' }}>
                Forgot Password ?
              </Link>

              <Typography style={{ textAlign: "center", marginTop: "20px" }}>
                Or
              </Typography>

              <GoogleLogin
                clientId="513270965377-qqaf5mmsihis676tglivf3hqniaief6q.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Login with google"
                cookiePolicy={"single_host_origin"}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Login;
