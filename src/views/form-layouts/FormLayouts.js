import React from "react";

import { Grid } from "@material-ui/core";

import {
  FbOrdinaryForm,
  FbDefaultForm,
  FbBasicHeaderForm,
  FbReadonlyForm,
  FbDisabledForm,
  FbLeftIconForm,
  FbRightIconForm,
} from "../../components/forms/fb-elements/index";

import PageContainer from "../../components/container/PageContainer";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Form Layouts",
  },
];
const FormLayouts = () => {
  return (
    <PageContainer title="Form Layouts" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Form Layouts" items={BCrumb}></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} xs={12}>
          <FbOrdinaryForm />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FbDefaultForm />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FbBasicHeaderForm />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FbReadonlyForm />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <FbDisabledForm />
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <FbLeftIconForm />
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <FbRightIconForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FormLayouts;
