import React from "react";
import { Grid, Box } from "@material-ui/core";
import MobileDateTimePicker from "@material-ui/lab/MobileDateTimePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import TimePicker from "@material-ui/lab/TimePicker";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import BaseCard from "../../components/base-card/BaseCard";
import PageContainer from "../../components/container/PageContainer";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Date Time",
  },
];

const ExDateTime = () => {
  const [value, setValue] = React.useState(new Date());
  const [rvalue, setrValue] = React.useState([null, null]);

  const [value2, setValue2] = React.useState(null);
  // const handleChange6 = (event, newValue) => {
  //   setValue2(newValue);
  // };
  return (
    <PageContainer title="Date Time" description="this is Date Time page">
      {/* breadcrumb */}
      <Breadcrumb title="Date Picker" items={BCrumb}></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Basic Date picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                placeholder="Start date"
                onChange={() => {}}
                renderInput={(inputProps) => (
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ "aria-label": "basic date picker" }}
                    {...inputProps}
                  />
                )}
                value={new Date()}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Date Range Picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={rvalue}
                onChange={(newValue) => {
                  setrValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <CustomTextField
                      {...startProps}
                      size="small"
                      placeholder="Check-in"
                      inputProps={{ "aria-label": "date range picker" }}
                    />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <CustomTextField
                      {...endProps}
                      size="small"
                      placeholder="Check-out"
                      inputProps={{ "aria-label": "date range picker" }}
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Different Design for Date picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <CustomTextField
                    {...props}
                    fullWidth
                    size="small"
                    inputProps={{ "aria-label": "different design" }}
                  />
                )}
                placeholder="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Time picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={value2}
                onChange={(newValue) => {
                  setValue2(newValue);
                }}
                renderInput={(params) => (
                  <CustomTextField
                    size="small"
                    {...params}
                    fullWidth
                    inputProps={{ "aria-label": "time picker" }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        width: "18px",
                        height: "18px",
                      },
                      "& .MuiFormHelperText-root": {
                        display: "none",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExDateTime;
