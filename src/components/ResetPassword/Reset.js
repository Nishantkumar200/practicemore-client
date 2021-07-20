import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Backdrop, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { resetPassword } from "../../Actions/user";

function Reset() {
  const [newpassword, setNewPassword] = useState();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const email = new URLSearchParams(window.location.search).get("email");

  const handleSubmit = () => {
    dispatch(resetPassword(email, newpassword));
    setNewPassword("");
  };

  const { loading, message } = useSelector((state) => state.resetpassword);

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
                src="../../../assets/7.jpg"
                alt="forgot password"
                className="forgot"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              {message ? (
                <Alert
                  severity="success"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {message}
                  <Link to="/login">Login here</Link>
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
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              <br />
              <Button
                variant="contained"
                color="primary"
                className="emailRequest"
                onClick={handleSubmit}
                autoFocus
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Reset;
