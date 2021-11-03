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

import { FormattedMessage, FormattedDate } from "react-intl";
import Swal from "sweetalert2";

import { deleteUserById, getUsers } from "../../services/Corporative";

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
  Grid,
  Alert,
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
    title: "Registrar participantes",
  },
];

const SignUpCompany = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [myId, setMyId] = useState(2);
  const [adminName, setadminName] = useState("");
  const [maxNumber, setMaxNumber] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  // const [rowleng, setRowLeng] = useState(0);

  const [canDelete, setCanDelete] = useState(true);
  const [isAdminRegistrered, setIsAdminRegistrered] = useState(false);

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
        Swal.fire(
          "¡Eliminado!",
          "El usuario fue eliminado con éxito.",
          "success"
        );
        deleteUserById(id);
        setTimeout(function () {
          getUsersCorporative();
        }, 700);
      }
    });

    // delete_user_ById(id);
    // window.location.reload(true);
  };

  const getUsersCorporative = async () => {
    try {
      const response = await getUsers();
      setRows(response.data.participants);
      setMaxNumber(response.data.max_num_users_inscribed);
      setMyId(response.data.admin.id);
      setCanDelete(response.data.can_delete_users);
      setIsAdminRegistrered(response.data.admin_registered);
      setMaxDate(response.data.limit_date);
      setadminName(
        response.data.admin.first_name + " " + response.data.admin.last_name
      );
      // setRowLeng(rows.length);
      // console.log(response.data);
    } catch (error) {
      // console.log("ERROR>>>>> ", error);
    }
  };

  useEffect(() => {
    getUsersCorporative();
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
      title="Registrar participantes"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={false}
        addParticipant={true}
        clientsDocuments={false}
        signUpClients={false}
        buyMore={true}
        RegisterMe={true}
        RegisterId={myId}
        number_participants={": " + rows.length + " / " + maxNumber}
        AdminRegistered={isAdminRegistrered}
        AdminName={adminName}
        title={
          <FormattedMessage
            id="signUpCompany"
            b
            defaultMessage="Corporate registration"
          />
        }
        items={BCrumb}
      ></Breadcrumb>
      {/* end breadcrumb */}
      <Grid container spacing={0} sx={{ ml: 2, mt: 2 }}>
        <Alert severity="warning" variant="filled">
          <Typography variant="h4">
            <FormattedMessage
              id="endLimit"
              defaultMessage="IMPORTANT! You have until {date} to edit and / or delete your participants."
              values={{
                fecha: (
                  <FormattedDate
                    value={maxDate}
                    year="numeric"
                    month="long"
                    day="numeric"
                    weekday="long"
                  />
                ),
              }}
            />
          </Typography>
        </Alert>
      </Grid>
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
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.documentNumber"
                        defaultMessage="Document Number"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="signupclients.name"
                        defaultMessage="Name"
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
                      <Typography variant="h5">
                        {row.user.document_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {row.user.first_name} {row.user.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {row.user.email}
                      </Typography>
                    </TableCell>
                    {canDelete ? (
                      <TableCell>
                        <Button
                          to={`/admin/managecompanyadmin/${row.user.id}`}
                          component={NavLink}
                        >
                          <EditIcon />
                        </Button>
                        <Button>
                          <DeleteIcon
                            onClick={() => {
                              handleDelete(row.user.id);
                              // delete_user_ById(row.user.id);
                            }}
                          />
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button disabled>
                          <EditIcon />
                        </Button>
                        <Button disabled>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
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
            <Alert severity="info" variant="outlined">
              <Typography variant="h4">
                <FormattedMessage
                  id="msgMaxUser"
                  defaultMessage="You already have used {value1} of {value2} max number of participants"
                  values={{
                    value1: rows.length,
                    value2: maxNumber,
                  }}
                />
              </Typography>
            </Alert>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default SignUpCompany;
