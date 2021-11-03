import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import api from "../../services/Api";

import "./style.css";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Button,
  Card,
  CardContent,
  Typography,
  TableHead,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Información de facturación",
  },
];

const Guests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const getAllCompanies = () => {
    api
      .get(`/human_resources/admin/billing/corporate_group/`)
      .then((response) => {
        // console.log("DATA>>", response.data);
        // console.log("res status", response.status);
        setRows(response.data);
      });
    // .catch((error) => {
    //   console.log("error :- ", error);
    // });
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer
      title="Información de facturación"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={false}
        clientsDocuments={false}
        signUpClients={false}
        title={
          <FormattedMessage
            id="virRucCorporative"
            defaultMessage="Vista de RUCs de corporativo"
          />
        }
        items={BCrumb}
      ></Breadcrumb>
      {/* end breadcrumb */}
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">RUC</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="companyNx"
                        defaultMessage="Business name"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.admin"
                        defaultMessage="Admin"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.email"
                        defaultMessage="Email"
                      />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="maxusers"
                        defaultMessage="Max number of users"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.review"
                        defaultMessage="Review"
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            ml: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {row.ruc}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {row.company_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            ml: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{
                              textTransform: "capitalize",
                            }}
                          >
                            {row.admin.first_name} {row.admin.last_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {row.admin.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            ml: 1,
                          }}
                        >
                          <Typography
                            color="textSecondary"
                            variant="h6"
                            fontWeight="400"
                          >
                            {row.max_num_users_inscribed}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Button
                        to={`/admin/tableruccorporative/${row.id}`}
                        component={NavLink}
                      >
                        <VisibilityIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={4}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputprops: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Guests;
