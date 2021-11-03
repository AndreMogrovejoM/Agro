import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Box, Typography, Button } from "@material-ui/core";

import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import { FormattedMessage } from "react-intl";

import BarChartIcon from "@material-ui/icons/BarChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";
const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Reportes",
  },
];

const ColumnChart = () => {
  const optionsArea = {
    chart: {
      id: "area-chart",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: "1",
      curve: "smooth",
      colors: ["transparent"],
    },
    colors: ["#6ac3fd", "#0b70fb", "#f64e60", "#FFA500", "#FFC0CB"],
    xaxis: {
      categories: [
        "Día:1",
        "Día:2",
        "Día:3",
        "Día:4",
        "Día:5",
        "Día:6",
        "Día:7",
        "Día:8",
        "Día:9",
      ],
    },
    yaxis: {
      title: {
        text: "Número de visitas",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    grid: {
      show: false,
    },
    fill: {
      opacity: 0.4,
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " cientos";
        },
      },
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  const OptionsColumn = {
    chart: {
      id: "column-chart",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
    },
    colors: ["#6ac3fd", "#0b70fb", "#f64e60", "#FFA500", "#FFC0CB"],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Día:1",
        "Día:2",
        "Día:3",
        "Día:4",
        "Día:5",
        "Día:6",
        "Día:7",
        "Día:8",
        "Día:9",
      ],
    },
    yaxis: {
      title: {
        text: "Número de visitas",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " cientos";
        },
      },
      theme: "dark",
    },
    grid: {
      show: true,
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
  };

  const Series = [
    {
      name: "Visitas",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Publicidades",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Excels",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Pdfs",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },

    {
      name: "Recursos 3D",
      data: [35, 41, 85, 101, 98, 52, 53, 41, 60],
    },
  ];

  const handleChange = () => {
    if (chartType === "column") {
      setChartType("area");
    } else {
      setChartType("column");
    }
  };

  const [chartType, setChartType] = useState("column");

  return (
    <PageContainer title="Reports" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb
        title={<FormattedMessage id="Reports" defaultMessage="Reports" />}
        items={BCrumb}
        showBackButton={true}
        backButtonDirection={"/admin/exhibidor"}
      ></Breadcrumb>
      {/* end breadcrumb */}
      <Card variant="outlined">
        <Button onClick={handleChange}>
          {chartType === "column" ? (
            <>
              <Typography variant="h3" sx={{ pr: 2 }}>
                <FormattedMessage id="Column" defaultMessage="Column" />
              </Typography>
              <BarChartIcon fontSize="large" />
            </>
          ) : (
            <>
              <Typography variant="h3" sx={{ pr: 2 }}>
                <FormattedMessage id="Area" defaultMessage="Area" />
              </Typography>
              <ShowChartIcon fontSize="large" />
            </>
          )}
        </Button>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">
              <FormattedMessage id="Reports" defaultMessage="Reports" />
            </Typography>
          </Box>
        </Box>
        {chartType === "column" ? (
          <CardContent>
            <Chart
              options={OptionsColumn}
              series={Series}
              type="bar"
              height="500px"
            />
          </CardContent>
        ) : (
          <CardContent>
            <Chart
              options={optionsArea}
              series={Series}
              type="area"
              height="500px"
            />
          </CardContent>
        )}
      </Card>
    </PageContainer>
  );
};

export default ColumnChart;
