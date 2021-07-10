import React from "react";
import CirculalProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";

const Loading = () => {
  return (
    <React.Fragment>
      <Container alignItems="center" direction="row">
        <Grid container alignContent="center" direction="row">
          <Grid item md={12} sm={12} lg={12} alignContent="center">
            <CirculalProgress />
            <Typography>Loading...</Typography>
          </Grid>
         
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Loading;
