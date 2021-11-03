import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import BarChartIcon from "@material-ui/icons/BarChart";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/Api";
import SettingsIcon from "@material-ui/icons/Settings";
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
  Tab,
  Tabs,
  Grid,
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
    title: "Mis stands",
  },
];

const AdminExhibidor = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState("A (6m x 2m)");
  const [rows, setRows] = useState([]);
  const [stands, setStands] = useState([]);

  // FILTRAR STAND POR TIPO
  const getExhibitors = async (type) => {
    api.get(`human_resources/admin/assigned_stands/`).then((response) => {
      setStands([...new Set(response.data.stands.map((item) => item.type))]);
      // setRows(response.data.stands);
      setRows(
        response.data.stands.filter(function (item) {
          return item.type === type;
        })
      );
      // console.log("DATA>>", response.data);
      // console.log("Exhibitors status", response.status);
    });
    // .catch((error) => {
    //   console.log("Error>", error);
    // });
  };

  useEffect(() => {
    getExhibitors(value);
  }, [value]);

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
          .delete(`/fair3D/staff/${id}/`)
          .then((response) => {
            // console.log("RESPONSE DELETE>>>>>", response);
            getExhibitors(value);
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
    // getUserDocuments(newValue);
    // console.log(newValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer
      title="Mis stands"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        AdminStandConfig={false}
        Reports={false}
        title={<FormattedMessage id="misstands" defaultMessage="Mis stands" />}
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
              // defaultValue={stands.stands[0]}
            >
              {/* {console.log("MIS STANDS", stands)} */}
              {/* {console.log("ROWS", rows)} */}

              {stands?.map((obj, idx) => (
                <Tab
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "18px",
                    color: "primary.main",
                  }}
                  label={<h3>{obj}</h3>}
                  value={obj}
                  key={idx}
                  {...a11yProps(obj.pos)}
                />
              ))}
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
                      <FormattedMessage id="standname" defaultMessage="Name" />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage id="Stuff" defaultMessage="Staff" />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage id="Actions" defaultMessage="Actions" />
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
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TableRow>
                        {row.staff.map((staff, index) => (
                          <Grid container spacing={0} key={index}>
                            <Grid item sm={11} md={10}>
                              <Typography
                                color="textSecondary"
                                variant="h6"
                                fontWeight="400"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {staff.user.first_name} {staff.user.last_name}
                              </Typography>
                            </Grid>
                            <Grid item sm={1} md={2}>
                              <Button sx={{ mt: -1 }}>
                                <DeleteIcon
                                  color="primary"
                                  fontSize="medium"
                                  onClick={() => {
                                    handleDelete(staff.id);
                                    // delete_user_ById(row.user.id);
                                  }}
                                />
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </TableRow>
                    </TableCell>

                    <TableCell>
                      <Button
                        to={`/admin/configstand/${row.id}`}
                        component={NavLink}
                        variant="contained"
                        color="primary"
                      >
                        <SettingsIcon
                          icon="user"
                          width="18"
                          height="18"
                        ></SettingsIcon>
                      </Button>{" "}
                      <Button
                        variant="contained"
                        to={`/admin/reports`}
                        component={NavLink}
                        color="primary"
                      >
                        <BarChartIcon width="18" height="18" />
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

export default AdminExhibidor;
