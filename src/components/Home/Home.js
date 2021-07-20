import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Backdrop } from "@material-ui/core";

function Home() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    if (userInfo?.isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }

    setTimeout(() => setSpinner(false), 3000);
    document.title = "Home";
  }, [userInfo, history]);
  return (
    <React.Fragment>
      {spinner ? (
        <Backdrop open={spinner}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <AppBar position="relative" elevation={0} color="transparent">
            <ToolBar variant="regular">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{ padding: "10px", marginLeft: "60px" }}
              >
                <Grid item>
                  <Link to="/">
                    <img
                      src="../../../assets/logo.png"
                      alt="logo"
                      className="logo"
                    />
                  </Link>
                </Grid>

                <Grid item>
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      elevation={0}
                      component={Link}
                      to="/login"
                      style={{ marginRight: "10px" }}
                    >
                      Login
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      elevation={0}
                      component={Link}
                      to="/signup"
                    >
                      Sign Up
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ToolBar>
          </AppBar>

          <Container maxWidth="lg">
            {/* Landing Page Section */}

            <Grid container spacing={2}>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                lg={7}
                alignItems="center"
                className="topsidecontainer"
              >
                <Typography className="top_heading">We Make Your</Typography>
                <Typography className="top_secheading">
                  Coding Interview <span className="easy">Simple</span>
                </Typography>
                <Typography className="somedesc" variant="overline">
                  Practicemore is the highly featured platform with realtime
                  collaboration , live video chatting along with discussion
                  jamboard to help you enhance your skills, expand your
                  knowledge and prepare for technical interviews in best way.
                </Typography>
                <br />
                <Button
                  variant="contained"
                  className="getStarted"
                  component={Link}
                  to="/signup"
                >
                  Let's start
                </Button>
              </Grid>
              <Grid item md={6} sm={12} xs={12} lg={5} alignItems="center">
                <img
                  src="../../../assets/5.jpg"
                  alt=""
                  className="bannerside"
                />
              </Grid>
            </Grid>

            {/* Section 2 */}

            <Grid
              container
              direction="flex"
              spacing={2}
              alignItems="flex-start"
            >
              <Grid item md={4} sm={12} xs={12} lg={6} alignItems="center">
                <img
                  src="../../../assets/1.jpg"
                  className="secondBanner"
                  alt="sideImage"
                />
              </Grid>
              <Grid item md={8} sm={12} xs={12} lg={6} alignItems="center">
                <Typography className="sec_head1">Stop Preparing</Typography>
                <Typography className="sec_head2">Alone !</Typography>
                <Typography className="para1" variant="overline">
                  Getting bore while preparing. Just send a freind invitation to
                  your freind and start practicing with realtime collaboration
                  environment along with video chatting and{" "}
                  <span> have fun ! </span>
                </Typography>
                <br />
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/tryout"
                  color="primary"
                  className="tryout"
                >
                  Checkout demo interview
                </Button>
              </Grid>
            </Grid>
            {/* Work Section */}
            <Grid container direction="column" alignItems="center">
              <Typography className="work_head1">How It Works</Typography>
              <Grid
                item
                direction="row"
                alignItems="center"
                justify="center"
                lg={9}
                md={12}
                sm={12}
              >
                <Grid
                  container
                  alignItems="center"
                  style={{ marginBottom: "-40px" }}
                >
                  <Grid item md={3} sm={12} xs={12} alignItems="center">
                    <Typography className="work_01">01</Typography>
                  </Grid>
                  <Grid item md={9} sm={12} xs={12} alignItems="center">
                    <Typography className="para1" variant="overline">
                      Tell us when and what you want to practice and we’ll pair
                      you with an optimal peer. We provide interview questions
                      and a collaborative environment for you to conduct the
                      interview.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  style={{ marginBottom: "-40px" }}
                >
                  <Grid item md={3} sm={12} xs={12} alignItems="center">
                    <Typography className="work_01">02</Typography>
                  </Grid>
                  <Grid item md={9} sm={12} xs={12} alignItems="center">
                    <Typography className="para1" variant="overline">
                      Interviews are conducted using a collaborative environment
                      over video. You and your peer will interview each other
                      for 30-45 minutes. After the interview, you’ll each
                      provide feedback on to help each other improve
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item md={3} sm={12} xs={12} alignItems="center">
                    <Typography className="work_01">03</Typography>
                  </Grid>
                  <Grid item md={9} sm={12} xs={12} alignItems="center">
                    <Typography className="para1" variant="overline">
                      Learn from peers’ feedback, gain confidence and master the
                      art of interviewing. Keep practicing until you interview
                      like a rock star. Impress recruiters and land awesome job
                      offers. Start Practicing!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Feature Section */}
            <Grid container>
              <Grid item lg={12} sm={12} xs={12}>
                <Typography className="feature_head1">Features</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography className="feature_head2">
                  Why is it so <span className="great">Useful !</span>
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <Grid container spacing={4}>
                <Grid item lg={4} md={4} sm={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography className="f_title">Real Time</Typography>
                      <Typography className="f_subtitle">
                        Collaboration
                      </Typography>
                      <Typography className="f_description" variant="overline">
                        We provide you a realtime collaborative code editor to
                        work with one another and see live changes improve your
                        code at a time and code fast .
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography className="f_title">More than 10+</Typography>
                      <Typography className="f_subtitle">
                        Language Support
                      </Typography>
                      <Typography className="f_description" variant="overline">
                        To help in acing your job interview , we provide you to
                        practice your skill with 14+ different languages at one
                        platform and make your life easy so that you don't have
                        search any more :)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography className="f_title">One to one</Typography>
                      <Typography className="f_subtitle">
                        Video Chatting
                      </Typography>
                      <Typography className="f_description" variant="overline">
                        To make more understanding of code , we provide you one
                        to one video chatting so that you can discuss about your
                        doubts and clear your fear of online technical
                        interview .
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </React.Fragment>
  );
}

export default Home;
