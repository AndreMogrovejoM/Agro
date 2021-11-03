import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Grid,
  // CardHeader,
  CardContent,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import bg1 from "../../assets/images/backgrounds/Time.png";
import PageContainer from "../../components/container/PageContainer";
import { useWindowDimensions } from "../../helper/getWindowsDimension";

const TimeRemain = () => {
  const calculateTimeLeft = () => {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-11-24T00:00:00`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Min: Math.floor((difference / 1000 / 60) % 60),
        Seg: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }
    // console.log(timeLeft[interval]);
    timerComponents.push(
      <Card key={interval} sx={{ maxWidth: "200px", minWidth: "120px" }}>
        <Typography variant="h2" color="textSecondary">
          {interval}
        </Typography>
        <Typography
          variant="h1"
          color="textPrimary"
          sx={{ fontWeight: "bold" }}
        >
          <CardContent>{timeLeft[interval]}</CardContent>
        </Typography>
      </Card>
    );
  });

  const { user } = useSelector((state) => state.authReducer);
  const { width } = useWindowDimensions();
  // console.log(user);

  return (
    <PageContainer title="Conference" description="this is waiting page">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        textAlign="center"
        justifyContent="center"
        sx={{
          color: (theme) =>
            `${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.09)"
                : "#e4f5ff"
            }`,
        }}
      >
        <Container maxWidth="md">
          <img
            src={bg1}
            alt="error"
            style={{
              height: width <= 500 ? "" : "500px",
              width: width <= 550 ? "100%" : "500px",
            }}
          />
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
            sx={{
              color: (theme) =>
                `${
                  theme.palette.mode === "dark"
                    ? "#e4f5ff"
                    : "rgba(0, 0, 0, 0.87)"
                }`,
            }}
          >
            <FormattedMessage
              id="timeRemain"
              defaultMessage="El tiempo restante es"
            />
          </Typography>

          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
            sx={{
              color: (theme) =>
                `${
                  theme.palette.mode === "dark"
                    ? "#e4f5ff"
                    : "rgba(0, 0, 0, 0.87)"
                }`,
            }}
          >
            <Box p={3} sx={{ ml: width <= 800 ? 0 : 15 }}>
              {timerComponents.length ? (
                <div className="row">
                  <div className="col">
                    <center>
                      <Grid container spacing={2}>
                        {timerComponents}
                      </Grid>
                    </center>
                  </div>
                </div>
              ) : (
                <span>{location.reload()}</span>
              )}
            </Box>
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={user && !user.is_free ? "/user-profile" : "/"}
            sx={{ minWidth: "215px", height: "50px" }}
          >
            <Typography variant="h5">
              <FormattedMessage
                id="errorPage.backButton"
                defaultMessage="Back to Home"
              />
            </Typography>
          </Button>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default TimeRemain;
