import React from "react";
import { Box, Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import bg1 from "../../assets/images/backgrounds/welcome-bg.png";

import PageContainer from "../../components/container/PageContainer";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const Error = () => {
  const { user } = useSelector((state) => state.authReducer);
  // console.log(user);

  return (
    <PageContainer title="Error" description="this is Error page">
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
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
          <img src={bg1} alt="error" />
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
              id="errorPage.title"
              defaultMessage="OH No, The page you are looking for does not exist."
            />
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
            sx={{
              color: (theme) =>
                `${
                  theme.palette.mode === "dark"
                    ? "#e4f5ff"
                    : "rgba(0, 0, 0, 0.87)"
                }`,
            }}
          >
            <Box p={2}>
              <FormattedMessage
                id="errorPage.description"
                defaultMessage="The Page you are looking for is not available. kindly click
              on the back to home button"
              />
            </Box>
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={user ? "/user-profile" : "/"}
            disableElevation
          >
            <FormattedMessage
              id="errorPage.backButton"
              defaultMessage="Back to Home"
            />
          </Button>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Error;
