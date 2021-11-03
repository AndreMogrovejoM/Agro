import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/Api";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
// import StorefrontIcon from "@material-ui/icons/Storefront";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
// import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
// import { NavLink } from "react-router-dom";
// import Popup from "reactjs-popup";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";

import "./style.css";

import {
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  TableHead,
  // Avatar,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick1 = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick1 = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick1 = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick1 = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick1}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick1}
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
        onClick={handleNextButtonClick1}
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
        onClick={handleLastPageButtonClick1}
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

const BCrumbEs = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Asignación de Stands",
  },
];

const BCrumbEn = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Stand Management",
  },
];

const PaginationTable = () => {
  const { id } = useParams();
  const [page, setPage] = React.useState(0);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  const [assigned, setAssigned] = useState([]);
  const [available, setAvailable] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows1 =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assigned.length) : 0;
  const emptyRows2 =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - available.length) : 0;

  // const emptyRows3 =
  //   page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - assigned.length) : 0;
  const emptyRows4 =
    page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - assigned.length) : 0;

  const getStands = async () => {
    await api
      .get(`human_resources/admin/assign_stands/${id}`)
      .then((response) => {
        setAssigned(response.data.assigned);
        setAvailable(response.data.available);
      });
    // .catch((error) => {
    //   console.log("Error>", error);
    // });
  };
  const assignStand = async (Fdata) => {
    await api
      .put(`/human_resources/admin/assign_stands/${id}/`, Fdata)
      .then((response) => {
        Swal.fire("¡Stand asignado correctamente!", "", "success").then(
          function () {
            /* window.location = "/admin/register"; */
            getStands();
          }
        );
      })
      .catch(() => {
        Swal.fire("Error, no se pudo asignar el stand.", "", "error");
      });
  };
  const removeStand = async (Fdata) => {
    await api
      .put(`/human_resources/admin/remove_stands/${id}/`, Fdata)
      .then((response) => {
        Swal.fire("¡Stand eliminado correctamente!", "", "success").then(
          function () {
            /* window.location = "/admin/register"; */
            getStands();
          }
        );
      })
      .catch(() => {
        Swal.fire("Error, no se pudo eliminar el stand.", "", "error");
      });
  };

  useEffect(() => {
    getStands();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  return (
    <PageContainer
      title="Sign Up Clients"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        title={
          <FormattedMessage
            id="signupclients.standmanagement"
            defaultMessage="Sign up clients"
          />
        }
        showBackButton={true}
        backButtonDirection={"/admin/register"}
        items={
          localStorage.getItem("@agromin/language") === "es"
            ? BCrumbEs
            : BCrumbEn
        }
      ></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
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
                      <TableCell align="left">
                        <Typography variant="h1">
                          <FormattedMessage
                            id="signupclients.stands"
                            defaultMessage="Stands"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.standName"
                            defaultMessage="RUC"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.standType"
                            defaultMessage="Company"
                          />
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.manage.assign"
                            defaultMessage="Assign"
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? available.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : available
                    ).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <Typography variant="h5">{row.name}</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            color="textSecondary"
                            variant="h6"
                            fontWeight="400"
                          >
                            {row.type}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              assignStand({ stand_id: row.id });
                            }}
                          >
                            <Fab size="small" color="primary" aria-label="add">
                              <AddIcon />
                            </Fab>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows2 > 0 && (
                      <TableRow style={{ height: 53 * emptyRows2 }}>
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
                        colSpan={6}
                        count={available.length}
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
        </Grid>
        <Grid item xs={12} md={6}>
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
                      <TableCell align="left">
                        <Typography variant="h1">
                          <FormattedMessage
                            id="signupclients.mystands"
                            defaultMessage="RUC"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.standName"
                            defaultMessage="RUC"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.standType"
                            defaultMessage="Company"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h5">
                          <FormattedMessage
                            id="signupclients.manage.remove"
                            defaultMessage="Remove"
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage2 > 0
                      ? assigned.slice(
                          page2 * rowsPerPage2,
                          page2 * rowsPerPage2 + rowsPerPage2
                        )
                      : assigned
                    ).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <Typography variant="h5">{row.name}</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            color="textSecondary"
                            variant="h6"
                            fontWeight="400"
                          >
                            {row.type}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              removeStand({ stand_id: row.id });
                            }}
                          >
                            <Fab size="small" color="primary" aria-label="add">
                              <DeleteIcon />
                            </Fab>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows4 > 0 && (
                      <TableRow style={{ height: 53 * emptyRows4 }}>
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
                        colSpan={6}
                        count={assigned.length}
                        rowsPerPage={rowsPerPage2}
                        page={page2}
                        SelectProps={{
                          inputprops: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage2}
                        onRowsPerPageChange={handleChangeRowsPerPage2}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PaginationTable;
