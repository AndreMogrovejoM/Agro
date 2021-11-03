import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormattedMessage } from "react-intl";

import "./style.css";

import {
  Avatar,
  Box,
  Grid,
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
  CardHeader,
  Typography,
  TableHead,
} from "@material-ui/core";

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

const TableDataConfigStand = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleDelete = (id, type, index) => {
    // console.log("ID,Type,IX", id, type, index);
    props.BorradoLogico(id, type, index);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.List?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log("LISTA>>>", props.List);

  return (
    <PageContainer
      title={props.title}
      style={{ minWidth: "500px", maxHeight: "600px" }}
      sx={{ mt: -2 }}
    >
      <Card variant="outlined">
        <CardHeader
          variant="outlined"
          title={props.title}
          titleTypographyProps={{ variant: "h1", color: "primary" }}
        />
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
                    <Typography variant="h3">
                      <FormattedMessage
                        id="documentName"
                        defaultMessage="Document Name"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h3">
                      <FormattedMessage
                        id="documentDescription"
                        defaultMessage="Document description"
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4">
                      <FormattedMessage
                        id="signupclients.delete"
                        defaultMessage="Delete"
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? props.List?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : props.List
                )?.map((row, index) => (
                  <TableRow key={index}>
                    {/* {console.log(index)} */}
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {props?.isImage ? (
                          <Grid container align="left">
                            <Grid item xs={6} sm={2} md={2}>
                              <Avatar
                                src={row.image}
                                width="60"
                                variant="rounded"
                              />
                            </Grid>

                            <Grid
                              item
                              xs={6}
                              sm={10}
                              md={10}
                              sx={{ pt: 1 }}
                              align="left"
                            >
                              {row.name}
                            </Grid>
                          </Grid>
                        ) : (
                          row.name
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {props?.isImage ? row.caption : row.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button>
                        <DeleteIcon
                          onClick={() => {
                            handleDelete(row.id, props.title, index);
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
                    rowsPerPageOptions={[8]}
                    colSpan={4}
                    count={props.List?.length}
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

export default TableDataConfigStand;
