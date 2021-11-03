import React from "react";

import { Grid, Card, Typography } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import icons from "./data";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Feather Icons",
  },
];

const ReactIcons = () => {
  return (
    <PageContainer
      title="Feather Icons"
      description="this is Feather Icons page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="Feather Icons" items={BCrumb}></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {icons.map((icon, index) => (
          <Grid item xs={6} sm={3} lg={2} key={index}>
            <Card
              variant="outlined"
              sx={{
                textAlign: "center",
              }}
            >
              <FeatherIcon icon={icon.text} />
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  mt: "10px",
                }}
              >
                {icon.text}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default ReactIcons;
