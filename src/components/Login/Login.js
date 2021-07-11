import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SIGNIN } from "../../Actions/user";
import "./login.css";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  if (userDetail?.isAuthenticated) {
    history.push("/dashboard");
  } else {
    history.push("/login");
  }

  const initialLoginValue = {
    email: "",
    password: "",
  };

  const [userdetail, setuserDetail] = useState(initialLoginValue);

  const { loading, userInfo } = useSelector((state) => state.loginauth);


  const handleChange = (e) => {
    e.preventDefault();
    setuserDetail({ ...userdetail, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(SIGNIN(userdetail, history));
    setuserDetail("");
  };

  useEffect(() => {
    document.title = "Login";
  }, [history, userDetail]);

  return (
    <React.Fragment>
       <Link to="/" style={{ textDecoration: "none"}}>
        <Typography
          style={{
            alignItems: "center",
            textDecoration: "none",
            display: "flex",
            marginTop:'20px',
            marginBottom:"25px"
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
          <Grid container alignItems="center" direction="row">
            <Grid item lg={6} md={6} sm={12}>
              <img
                src="../../../assets/login.jpg"
                alt="sideImage"
                className="login_illustration"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12}>
              <Typography className="login_header">Login</Typography>
              <Typography>Welcome Back </Typography>
              {userInfo?.message ? (
                <Alert severity="error" style={{marginTop:"10px",marginBottom:"10px"}}>{userInfo?.message}</Alert>
              ) : null}
              <form>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  fullWidth
                  onChange={handleChange}
                  className="field"
                  autoFocus={true}
                  required
                  size="medium"
                />

                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  fullWidth
                  className="field"
                  color="primary"
                  required
                  size="medium"
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  size="large"
                >
                  Login
                </Button>

                <Typography className="register">
                  Not registered yet ? <Link to="/signup">Register Now</Link>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Login;
