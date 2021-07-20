import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import "./forget.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailRequest } from "../../Actions/user";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Forgot() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(emailRequest(email));
    setEmail(" ");
  };

  const { loading, result } = useSelector((state) => state.forgotPassword);
  console.log(loading, result);
  return (
    <React.Fragment>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <img
                src="../../../assets/6.jpg"
                alt="forgot password"
                className="forgot"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
            {result ? (
                <Alert
                  severity="success"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {result}
                </Alert>
              ) : null}
              <Typography variant="h6">
                Have You Forgotten , Don't worry :){" "}
              </Typography>
              <Typography variant="subtitle1">
                Enter your email address , we will send you a link to your email
                address to reset your password
              </Typography>
              <br />
              <TextField
                variant="outlined"
                label="Email address"
                fullWidth
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                className="emailRequest"
                onClick={handleSubmit}
                autoFocus
                disabled={loading}
              >
                Request password reset
              </Button>
              <br />
              <Link to="/login">Login</Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Forgot;
