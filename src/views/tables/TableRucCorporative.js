import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

import { useParams } from "react-router";
import { FormattedMessage, FormattedDate } from "react-intl";
// import { get_billing_ById } from "../../services/Corporative";
import api from "../../services/Api";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Alert,
} from "@material-ui/core";

const transformNumber = (number) => {
  return number / 100;
};

const columns = [
  { id: "nParticipants", label: "Number of participants", minWidth: 170 },
  { id: "creationDate", label: "Fecha de creación", minWidth: 100 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
  },
  { id: "currency", label: "Tipo de Moneda", minWidth: 170 },
];

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Consulta de transacciones por RUC",
  },
];

const TableRucCorporative = () => {
  const { id } = useParams();

  const Capitalize = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const [rows, setRows] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [admin, setAdmin] = useState([]);
  const [ruc, setRuc] = useState();

  const getBillingById = (id) => {
    const response = api
      .get(`/human_resources/admin/billing/corporate_group/${id}/`)
      .then((response) => {
        // console.log("GET BILLING res :- ", response);
        // console.log("GET BILLING res status:- ", response.status);
        setRows(response.data.payments);
        setCompanyName(response.data.company_name);
        setAdmin(response.data.admin);
        setRuc(response.data.ruc);
      });
    // .catch((error) => {
    //   console.log("GET BILLING error :- ", error);
    // });
    // console.log("RESPONSE CORPORATIVE>>>>>", response);
    return response;
  };

  useEffect(() => {
    if (id) {
      getBillingById(id);
    }
  }, []);

  return (
    <PageContainer
      title="Consulta de transacciones por RUC"
      description="Consulta de facturas "
    >
      {/* breadcrumb */}
      <Breadcrumb
        showBackButton={true}
        backButtonDirection={"/admin/billing"}
        title={
          <FormattedMessage
            id="consultaRuc"
            defaultMessage="Consulta de transacciones"
            // values={{ name: Capitalize(companyName) }}
          />
        }
        items={BCrumb}
      ></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ ml: 3, mt: 2 }} />
        <Alert severity="info">
          <Grid item sx={12}>
            <Typography variant="h3" fontWeight="600">
              <FormattedMessage id="companyNx" defaultMessage="Razón social" />{" "}
              : {Capitalize(companyName)}
            </Typography>
          </Grid>
          <Grid item sx={12}>
            <Typography variant="h3" fontWeight="600">
              RUC : {ruc}
            </Typography>
          </Grid>

          <Grid item sx={12}>
            <Typography variant="h4" fontWeight="500">
              <FormattedMessage
                id="signupclients.admin"
                defaultMessage="Administrador"
              />{" "}
              : {Capitalize(admin.first_name)} {Capitalize(admin.last_name)}
            </Typography>
          </Grid>

          <Grid item sx={12}>
            <Typography variant="h4" fontWeight="500">
              <FormattedMessage id="profile.email" defaultMessage="Correo" /> :{" "}
              {admin.email}
            </Typography>
          </Grid>
        </Alert>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <TableContainer
            sx={{
              maxHeight: 440,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <Typography variant="h5" fontWeight="600">
                        <FormattedMessage
                          id={column.id}
                          b
                          defaultMessage={column.label}
                        />
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell
                        sx={{
                          pl: 3,
                        }}
                      >
                        <Typography variant="h5">
                          {row.number_participants}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 1,
                          }}
                        >
                          <FormattedDate
                            value={row.creation_date}
                            year="numeric"
                            month="short"
                            day="numeric"
                            weekday="short"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">
                          {transformNumber(row.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h5">{row.currency}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default TableRucCorporative;
