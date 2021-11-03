import React from "react";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import imgsvg from "../../../assets/images/backgrounds/welcome-bg-2x-svg.svg";
const WelcomeCard = () => {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        backgroundColor: (theme) => theme.palette.primary.light,
        "&:before": {
          content: `""`,
          position: "absolute",
          width: "94%",
          height: "94%",
          background: `url(${imgsvg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: (theme) =>
            `${theme.direction === "rtl" ? "scaleX(-1)" : "unset"}`,
          backgroundPosition: {
            sm: (theme) => `${theme.direction === "rtl" ? "left" : "right"}`,
            lg: (theme) => `${theme.direction === "rtl" ? "left" : "right"}`,
            xs: "left",
          },
        },
        borderWidth: "0px",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            marginTop: "8px",
            marginBottom: "0px",
            lineHeight: "35px",
            position: "relative",
            zIndex: 9,
            color: (theme) => theme.palette.secondary.main,
          }}
          variant="h3"
          gutterBottom
        >
          Hey John, <br /> Download Latest Report
        </Typography>
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

export default WelcomeCard;
