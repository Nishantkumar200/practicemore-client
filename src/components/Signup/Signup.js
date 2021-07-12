import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
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

  const [formData, setFormData] = useState(initialState);

  const { loading, userSignup } = useSelector((state) => state.registerauth);

  //For handling Multiple Input Value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(SIGNUP(formData, history));
  };

  //sign up with google

  const responseGoogle = (response) => {
    console.log(response?.profileObj);
    const { name, email, googleId } = response?.profileObj;
    console.log(name, email, googleId);
    setFormData({
      ...formData,
      username: name,
      email: email,
      password: googleId,
      confirmPassword: googleId,
    });

    dispatch(SIGNUP(formData, history));
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
            marginTop: "20px",
            marginBottom: "25px",
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
          >
            <Grid item md={6} lg={6} sm={12}>
              <img src="../../../assets/signup.jpg" alt="sideImage" />
            </Grid>
            <Grid item md={6} lg={6} sm={12}>
              <Typography className="login_header">
                Create an account{" "}
              </Typography>
              <Typography>To keep track your record , join now !</Typography>
              {userSignup?.message ? (
                <Alert
                  severity="error"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {userSignup?.message}
                </Alert>
              ) : null}
              <form>
                <TextField
                  type="text"
                  name="username"
                  label="Username"
                  required
                  onChange={handleChange}
                  className="field"
                  autoFocus
                  fullWidth
                />

                <br />

                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  required
                  onChange={handleChange}
                  className="field"
                  fullWidth
                />
                <br />

                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  required
                  onChange={handleChange}
                  className="field"
                  fullWidth
                  helperText="Password must contain 8 characters"
                />
                <br />

                <TextField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                  onChange={handleChange}
                  className="field"
                  fullWidth
                />

                <br />

                <Button
                  variant="contained"
                  onClick={handleSignUp}
                  color="primary"
                  size="large"
                >
                  Sign Up
                </Button>

                <Typography style={{ marginTop: "20px" }}>
                  Already have an account ? <Link to="/login">Login</Link>
                </Typography>
              </form>
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
