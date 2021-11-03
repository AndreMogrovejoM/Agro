import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Fab,
  Button,
} from "@material-ui/core";
import imgsvg from "../../../assets/images/backgrounds/welcome-bg-2x-svg.svg";
import FeatherIcon from "feather-icons-react";

const EarningsShop = () => {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        backgroundColor: (theme) => theme.palette.primary.light,
        "&:before": {
          content: `""`,
          position: "absolute",
          left: (theme) => `${theme.direction === "rtl" ? "unset" : "0"}`,
          right: (theme) => `${theme.direction === "rtl" ? "0" : "unset"}`,
          width: "100%",
          height: "100%",
          background: `url(${imgsvg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transform: (theme) =>
            `${theme.direction === "rtl" ? "scaleX(-1)" : "unset"}`,
          backgroundPosition: (theme) =>
            `${
              theme.direction === "rtl"
                ? "right 19px center"
                : "left 70px center"
            }`,
        },

        borderWidth: "0px",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box>
            <Typography
              fontWeight="700"
              variant="h4"
              sx={{
                color: (theme) =>
                  `${
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 0, 0.87)"
                      : "rgba(0, 0, 0, 0.87)"
                  }`,
              }}
            >
              Earnings
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
            >
              $63,438.78
            </Typography>
          </Box>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Fab
              elevation="0"
              color="secondary"
              sx={{
                color: "#fff",
                width: "48px",
                height: "48px",
              }}
            >
              <FeatherIcon
                icon="dollar-sign"
                width="24"
                height="24"
              ></FeatherIcon>
            </Fab>
          </Box>
        </Box>
        <Button
          sx={{
            marginTop: "15px",
          }}
          variant="contained"
          color="primary"
        >
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default EarningsShop;
