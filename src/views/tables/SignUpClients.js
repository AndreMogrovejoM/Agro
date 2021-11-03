import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import StorefrontIcon from "@material-ui/icons/Storefront";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
// import Popup from "reactjs-popup";
import Swal from "sweetalert2";
import api from "../../services/Api";
import { FormattedMessage } from "react-intl";

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

const BCrumbEs = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Admin Exhibidores",
  },
];

const BCrumbEn = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Exhibitors Admin",
  },
];

const PaginationTable = (props) => {
  // "Exhibidores"
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  // const [value, setValue] = useState(props.type);
  const GetExhibidores = async () => {
    await api.get(`human_resources/admin/exhibitors/list/`).then((response) => {
      const newValue = response.data;
      console.log(response.data.periodistas);
      if (props.type === "Exhibidores") {
        setRows(newValue.exhibidores);
      } else if (props.type === "Colaboradores Jr") {
        setRows(newValue.colaboradores_jr);
      } else if (props.type === "Colaboradores") {
        setRows(newValue.colaboradores);
      } else if (props.type === "Auspiciadores") {
        setRows(newValue.auspiciadores);
      } else if (props.type === "Patrocinadores") {
        setRows(newValue.patrocinadores);
      } else if (props.type === "Periodistas") {
        setRows(newValue.periodistas);
      }
    });
    // .catch((error) => {
    //   console.log("Error>", error);
    // });
  };

  useEffect(() => {
    GetExhibidores();
  }, [props]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Usted está seguro de eliminar este usuario?",
      text: "Todos los participantes que el usuario ha inscrito también serán eliminados.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      reverseButtons: true,
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.value) {
        api
          .delete(`/human_resources/admin/users/${id}/`)
          .then((response) => {
            // console.log("RESPONSE DELETE>>>>>", response);
            setTimeout(function () {
              window.location = "/admin/register";
              /* if(value === "Exhibidores"){
                GetExhibidores();
              }else {
                getTypes();
              } */
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <PageContainer
      title={props.type}
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={true}
        title={
          <FormattedMessage id={props.type} defaultMessage="Sign up clients" />
        }
        items={
          localStorage.getItem("@agromin/language") === "es"
            ? BCrumbEs
            : BCrumbEn
        }
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
                  <TableCell align="center">
                    <Typography variant="h5">
                      <FormattedMessage id="ruc" defaultMessage="RUC" />
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.company"
                        defaultMessage="Company"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.email"
                        defaultMessage="Email"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
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
                  ? rows?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                )?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Typography variant="h5">{row.ruc}</Typography>
                    </TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center">
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {props.type !== "Colaboradores Jr" && (
                        <Button
                          to={`/admin/register/assignstand/${row.id}`}
                          component={NavLink}
                        >
                          <StorefrontIcon />
                        </Button>
                      )}

                      <Button
                        to={`/admin/register/edituser/${row.id}`}
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
                    colSpan={6}
                    count={rows?.length}
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

export default PaginationTable;
