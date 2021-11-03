import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
// import Popup from "reactjs-popup";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
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
  Tab,
  Tabs,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

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
    title: "Invitados",
  },
];

const Guests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState("Normal");
  const [rows, setRows] = useState([]);

  const getGuestsVips = async () => {
    await api.get(`human_resources/admin/vip_guests/list/`).then((response) => {
      // console.log("DATA>>", response.data);
      // console.log("res status VIP", response.status);
      setRows(response.data);
    });
    // .catch((error) => {
    //   console.log("Error>", error);
    // });
  };

  const getGuests = async () => {
    await api.get(`human_resources/admin/guests/list/`).then((response) => {
      // console.log("DATA>>", response.data);
      // console.log("res status NORMAL", response.status);
      setRows(response.data);
    });
    // .catch((error) => {
    //   console.log("Error>", error);
    // });
  };

  // const delete_guest_ById = (id) => {
  //   const response = api.delete(`/human_resources/admin/users/${id}/`);
  //   console.log("RESPONSE DELETE>>>>>", response);
  //   return response;
  // };

  useEffect(() => {
    getGuests();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Usted está seguro de eliminar este usuario?",
      text: "No podrá revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      reverseButtons: true,
      confirmButtonText: "Si, eliminarlo",
    }).then((result) => {
      // console.log(result);
      if (result.value) {
        // delete_guest_ById(id);
        api
          .delete(`/human_resources/admin/users/${id}/`)
          .then((response) => {
            // console.log("RESPONSE DELETE>>>>>", response);
            setTimeout(function () {
              getGuests();
            }, 700);
            Swal.fire(
              "¡Eliminado!",
              "El usuario fue eliminado con éxito.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "¡Error!",
              text: error,
              icon: "error",
              confirmButtonColor: "#e01717",
              confirmButtonText: "Salir",
            });
          });
      }
    });
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "VIP") {
      getGuestsVips();
    } else {
      getGuests();
    }
    // getUserDocuments(newValue);
    // console.log(newValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer
      title="Guests"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={false}
        addGuest={true}
        title={
          <FormattedMessage id="signupclients.guests" defaultMessage="Guests" />
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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="secondary"
              allowScrollButtonsMobile
              scrollButtons="auto"
              indicatorColor="secondary"
              variant="scrollable"
            >
              <Tab
                sx={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  color: "primary.main",
                }}
                label={"Normal"}
                value="Normal"
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  color: "primary.main",
                }}
                label={"VIP"}
                value="VIP"
                {...a11yProps(2)}
              />
            </Tabs>

            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage id="name" defaultMessage="Name" />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.company"
                        defaultMessage="Company"
                      />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.job"
                        defaultMessage="Job"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="login.email"
                        defaultMessage="Email Adress"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.manage"
                        defaultMessage="Manage Client"
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
                        {/* <Avatar
                          src={row.profile_image}
                          alt={row.profile_image}
                          width="30"
                          sx={{
                            borderRadius: "100%",
                          }}
                        /> */}
                        <Box
                          sx={{
                            ml: 0,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{
                              textTransform: "capitalize",
                            }}
                          >
                            {row.first_name} {row.last_name}
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
                        {row.company}
                      </Typography>
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
                        {row.job_title}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {row.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Button
                        to={`/admin/guestsreview/${row.id}`}
                        component={NavLink}
                      >
                        <EditIcon />
                      </Button>

                      <Button>
                        <DeleteIcon
                          onClick={() => {
                            handleDelete(row.id);
                            // delete_user_ById(row.user.id);
                          }}
                        />
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
