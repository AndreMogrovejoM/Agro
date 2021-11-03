import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LastPageIcon from "@material-ui/icons/LastPage";
import { NavLink } from "react-router-dom";

import { FormattedMessage } from "react-intl";
import { getUserDocuments } from "../../services/profile";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Card,
  CardContent,
  Typography,
  TableHead,
  Chip,
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
    title: "Documents",
  },
];

const ClientsDocuments = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = React.useState([]);

  const GetUserDocuments = async (type) => {
    try {
      const response = await getUserDocuments();
      // console.log(response);
      setRows(
        response.data.filter(function (item) {
          return item.user_type === type;
        })
      );
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    GetUserDocuments("Estudiante");
  }, []);

  const [value, setValue] = React.useState("Estudiante");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    GetUserDocuments(newValue);
    // console.log("cambio");
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

  rows.sort((a, b) => (a.user_review_state < b.user_review_state ? 1 : -1));

  return (
    <PageContainer
      title="Documentos"
      description="this is a register for clients"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={false}
        signUpClients={false}
        clientsdocuments={false}
        title={
          <FormattedMessage id="clientsdocuments" defaultMessage="Documents" />
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
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
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
                  label={
                    <FormattedMessage id="Student" defaultMessage="Student" />
                  }
                  value="Estudiante"
                  {...a11yProps(2)}
                />
                <Tab
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "18px",
                    color: "primary.main",
                  }}
                  label={
                    <FormattedMessage
                      id="Senior(+65)"
                      defaultMessage="Senior(+65)"
                    />
                  }
                  value="Senior"
                  {...a11yProps(3)}
                />
                <Tab
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "18px",
                    color: "primary.main",
                  }}
                  label={
                    <FormattedMessage id="Teacher" defaultMessage="Professor" />
                  }
                  value="Docente"
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>
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
                        id="signupclients.company"
                        defaultMessage="Company"
                      />
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="clientsdocuments.status"
                        defaultMessage="Status"
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
                    <TableCell>
                      <Typography variant="h5">
                        {row.document_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
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
                      >
                        {row.email}
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
                        {row.company}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor:
                            row.user_review_state === "Aceptado"
                              ? (theme) => theme.palette.success.light
                              : row.user_review_state === "Revisar"
                              ? (theme) => theme.palette.warning.light
                              : row.user_review_state === "Rechazado"
                              ? (theme) => theme.palette.error.light
                              : (theme) => theme.palette.secondary.light,
                          color:
                            row.user_review_state === "Aceptado"
                              ? (theme) => theme.palette.success.main
                              : row.user_review_state === "Revisar"
                              ? (theme) => theme.palette.warning.main
                              : row.user_review_state === "Rechazado"
                              ? (theme) => theme.palette.error.main
                              : (theme) => theme.palette.secondary.main,
                          borderRadius: "6px",
                          pl: "3px",
                          pr: "3px",
                        }}
                        size="small"
                        label={row.user_review_state}
                      ></Chip>
                      {row.user_review_state === "Revisar" ? (
                        <Button
                          to={`/admin/checkdocuments/${row.id}`}
                          component={NavLink}
                        >
                          <VisibilityIcon />
                        </Button>
                      ) : (
                        <div />
                      )}
                    </TableCell>
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

export default ClientsDocuments;
