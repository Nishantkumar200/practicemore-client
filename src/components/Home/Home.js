import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Container } from "@material-ui/core";
import Loading from "../Loading/Loading";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

    setTimeout(() => setSpinner(false), 1000);
    document.title = "Home";
  }, [userInfo, history]);
  return (
    <React.Fragment>
      {spinner ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">
          <AppBar position="static" elevation={0} color="transparent">
            <ToolBar variant="regular">
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>Logo</Grid>
                <Grid item>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={5}
                  >
                    <Grid item>Home</Grid>
                    <Grid item>About</Grid>
                    <Grid item>FAQs</Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<VpnKeyIcon />}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </Grid>
              </Grid>
            </ToolBar>
          </AppBar>
          {/* Landing Page Section */}
          <Grid container justify="space-around" alignItems="flex-start">
            <Grid item sm={12} lg={6} md={6}>
              <Typography className="head1">Practice</Typography>
              <Typography className="head2">Makes A Man</Typography>
              <Typography className="head3">Perfect</Typography>
              <Typography className="para1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                iusto officiis ducimus minima ex, necessitatibus placeat dolor
                inventore sapiente fuga velit maxime consequuntur voluptatibus
                impedit tempore architecto excepturi incidunt maiores?
              </Typography>
              <Button variant="contained" size="large" className="btn1">
                Try for free
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Explore More
              </Button>
            </Grid>

            <Grid item sm={12} lg={6} md={6}>
              <img
                src="../../../assets/3.jpg"
                alt="LandingImage"
                className="image1"
              />
            </Grid>
          </Grid>

          {/* Section 2 */}

          <Grid container alignItems="flex-start" justify="space-between">
            <Grid item md={6} sm={12} lg={6}>
              <img src="../../../assets/1.jpg" alt="sideImage" />
            </Grid>
            <Grid item md={6} sm={12} lg={6}>
              <Typography className="sec_head1">Stop Preparing</Typography>
              <Typography className="sec_head2">Alone !</Typography>
              <Typography className="para1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                iusto officiis ducimus minima ex, necessitatibus placeat dolor
                inventore sapiente fuga velit maxime consequuntur voluptatibus
                impedit tempore architecto excepturi incidunt maiores?
              </Typography>
              <Button variant="contained" size="large" className="btn1">
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
              lg={11}
              md={12}
              sm={12}
            >
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "-40px" }}
              >
                <Grid item md={3} alignContent="center">
                  <Typography className="work_01">01</Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, corrupti eveniet facere et impedit nostrum ipsam
                    molestias corrupti eveniet facere et impedit nostrum ipsam
                    molestias Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Eum, corrupti eveniet facere et impedit nostrum ipsam
                    molestias corrupti eveniet facere et impedit nostrum ipsam
                    molestias
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "-40px" }}
              >
                <Grid item md={3} alignContent="center">
                  <Typography className="work_01">02</Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, corrupti eveniet facere et impedit nostrum ipsam
                    molestias corrupti eveniet facere et impedit nostrum ipsam
                    molestias Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Eum, corrupti eveniet facere et impedit nostrum ipsam
                    molestias corrupti eveniet facere et impedit nostrum ipsam
                    molestias
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item md={3} alignContent="center">
                  <Typography className="work_01">03</Typography>
                </Grid>
                <Grid item md={9}>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, corrupti eveniet facere et impedit nostrum ipsam
                    molestias corrupti eveniet facere et impedit nostrum ipsam
                    molestias
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Feature Section */}
          <Grid container>
            <Grid item lg={12}>
              <Typography className="feature_head1">Features</Typography>
            </Grid>
            <Grid item lg={12}>
              <Typography className="feature_head2">
                Why is it so <span className="great">Great !</span>
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
                    <Typography className="f_description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic delectus sed adipisci, ad magni velit! Repudiandae
                      perspiciatis atque modi totam animi ad, quos aliquam quia
                      impedit vero unde sapiente aperiam?
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
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic delectus sed adipisci, ad magni velit! Repudiandae
                      perspiciatis atque modi totam animi ad, quos aliquam quia
                      impedit vero unde sapiente aperiam?
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
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic delectus sed adipisci, ad magni velit! Repudiandae
                      perspiciatis atque modi totam animi ad, quos aliquam quia
                      impedit vero unde sapiente aperiam?
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Home;
