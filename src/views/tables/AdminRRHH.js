import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import ChatIcon from "@material-ui/icons/Chat";
import EmailIcon from "@material-ui/icons/Email";

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
  Tab,
  Fab,
  Tabs,
  Chip,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

import img1 from "../../assets/images/users/1.jpg";
import img2 from "../../assets/images/users/2.jpg";
import img3 from "../../assets/images/users/3.jpg";
import img4 from "../../assets/images/users/4.jpg";
import img5 from "../../assets/images/users/5.jpg";

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

const rows = [
  {
    documentNumber: "70000321",
    name: "Adriana Guti",
    email: "adriana@gmail.com",
    company: "Tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "Yurand",
    email: "yurand@gmail.com",
    company: "Agromin",
    users: "3",
    imgsrc: img1,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Cerro Verde",
    users: "7",
    imgsrc: img3,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "Benja",
    email: "benja@gmail.com",
    company: "Simsa",
    users: "10",
    imgsrc: img4,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "Eder",
    email: "melvin@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img5,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
  {
    documentNumber: "70000321",
    name: "JoseMaria",
    email: "jose@gmail.com",
    company: "Te tecsup",
    users: "5",
    imgsrc: img2,
    state: "active",
  },
].sort((a, b) => (a.date < b.date ? -1 : 1));

const stands = [
  {
    name: "Colaborador",
    id: "1",
  },
  {
    name: "Auspiciador",
    id: "2",
  },
];

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Admin RRHH",
  },
];

const AdminRRHH = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState("Normal");

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
      title="AdminRRHH"
      description="this is a register for clients"
      className="table__container"
    >
      {/* breadcrumb */}
      <Breadcrumb
        title={
          <FormattedMessage
            id="signupclients.AdminRRHH"
            defaultMessage="Admin RRHH"
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
            <Grid container spacing={2}>
              <Grid item xs={11}>
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
                  {stands.map((obj, idx) => (
                    <Tab
                      key={idx}
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "18px",
                        color: "primary.main",
                      }}
                      label={
                        <FormattedMessage
                          id={obj.id}
                          defaultMessage={obj.name}
                        />
                      }
                      value={obj.id}
                      {...a11yProps(obj.id)}
                    />
                  ))}
                </Tabs>
              </Grid>
              <Grid item xs={1}>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>

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
                        id="login.email"
                        defaultMessage="Email"
                      />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage id="status" defaultMessage="Status" />
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
                        <Typography variant="h6" fontWeight="600">
                          {row.name}
                        </Typography>
                      </Box>
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
                      <Chip
                        sx={{
                          backgroundColor:
                            row.state === "active"
                              ? (theme) => theme.palette.success.light
                              : row.state === "Revisar"
                              ? (theme) => theme.palette.warning.light
                              : row.state === "Rejected"
                              ? (theme) => theme.palette.error.light
                              : (theme) => theme.palette.secondary.light,
                          color:
                            row.state === "active"
                              ? (theme) => theme.palette.success.main
                              : row.state === "Revisar"
                              ? (theme) => theme.palette.warning.main
                              : row.state === "Rejected"
                              ? (theme) => theme.palette.error.main
                              : (theme) => theme.palette.secondary.main,
                          borderRadius: "6px",
                          pl: "3px",
                          pr: "3px",
                        }}
                        size="small"
                        label={row.state}
                      />
                    </TableCell>
                    <TableCell>
                      {row.state === "active" && (
                        <>
                          <Button
                            to={`/auth/checkDocuments/${row.documentNumber}`}
                            component={NavLink}
                          >
                            <ChatIcon />
                          </Button>
                          <Button
                            to={`/auth/checkDocuments/${row.documentNumber}`}
                            component={NavLink}
                          >
                            <EmailIcon />
                          </Button>
                        </>
                      )}
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

export default AdminRRHH;
