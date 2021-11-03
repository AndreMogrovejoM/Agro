import React from "react";
import PageContainer from "../../components/container/PageContainer";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";

import Swal from "sweetalert2";
import { FormattedMessage } from "react-intl";

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
      // const response = api
      //   .delete(`/human_resources/admin/users/${id}/`)
      //   .then((response) => {
      //     console.log("RESPONSE DELETE>>>>>", response);
      //     setTimeout(function () {
      //       getGuests();
      //     }, 700);
      //     Swal.fire(
      //       "Eliminado!",
      //       "El usuario fue eliminado con éxito.",
      //       "success"
      //     );
      //   })
      //   .catch((error) => {
      //     Swal.fire({
      //       title: "Error!",
      //       text: error,
      //       icon: "error",
      //       confirmButtonColor: "#e01717",
      //       confirmButtonText: "Salir",
      //     });
      //   });
    }
  });
};

const BasicTable = (props) => {
  return (
    <PageContainer
      title={props.title}
      style={{ minWidth: "500px", maxHeight: "600px" }}
    >
      <Card variant="outlined">
        <CardHeader
          variant="outlined"
          title={props.title}
          titleTypographyProps={{ variant: "h1" }}
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
              aria-label="simple table"
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
                {props.List.map((obj, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {obj.image}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {obj.caption}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button>
                        <DeleteIcon
                          onClick={() => {
                            handleDelete(obj.id);
                            // delete_user_ById(row.user.id);
                          }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default BasicTable;
