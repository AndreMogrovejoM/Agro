import * as React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { NavLink } from "react-router-dom";
import { useParams } from "react-router";

import { FormattedMessage } from "react-intl";
import { getUserDocumentsById } from "../../services/profile";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardContent,
  Typography,
  TableHead,
  Chip,
  Grid,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";

// const a11yProps = (index) => {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// };

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Check My Status",
  },
];

const CheckMyStatus = () => {
  const { id } = useParams();

  const [user, setUser] = React.useState();

  const getUserInfo = async () => {
    try {
      const response = await getUserDocumentsById(id);
      setUser(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const pay = false;

  // const handleClick = () => {
  //   setPay(true);
  // };

  return (
    <PageContainer
      title="Documents"
      description="this is a register for clients"
    >
      {/* breadcrumb */}
      <Breadcrumb
        addClient={false}
        signUpClients={false}
        clientsdocuments={false}
        goToPay={false}
        PayActive={pay}
        title={
          <FormattedMessage
            id="checkmystatus"
            defaultMessage="Check my status"
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
                mb: 3,
              },
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}></Box>
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

                  <TableCell>
                    <Typography variant="h5">
                      <FormattedMessage
                        id="goToPay"
                        defaultMessage="Go To Pay"
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  <TableRow key={user?.id}>
                    <TableCell>
                      <Typography variant="h5">
                        {user?.document_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            {user?.first_name} {user?.last_name}
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
                        {user?.email}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {user?.company}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor:
                            user?.user_review_state === "Accepted"
                              ? (theme) => theme.palette.success.light
                              : user?.user_review_state === "Revisar"
                              ? (theme) => theme.palette.warning.light
                              : user?.user_review_state === "Rejected"
                              ? (theme) => theme.palette.error.light
                              : (theme) => theme.palette.secondary.light,
                          color:
                            user?.user_review_state === "Accepted"
                              ? (theme) => theme.palette.success.main
                              : user?.user_review_state === "Revisar"
                              ? (theme) => theme.palette.warning.main
                              : user?.user_review_state === "Rejected"
                              ? (theme) => theme.palette.error.main
                              : (theme) => theme.palette.secondary.main,
                          borderRadius: "6px",
                          pl: "3px",
                          pr: "3px",
                        }}
                        size="small"
                        label={user?.user_review_state}
                      ></Chip>
                      {user?.user_review_state === "Revisar" && (
                        <Button
                          to={`/auth/checkDocuments/${user?.id}`}
                          component={NavLink}
                        >
                          <VisibilityIcon />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Grid item xs={12} sm={6}>
                        {user?.user_review_state === "Aceptado" ? (
                          <Button
                            to="/tables/signupclients"
                            component={NavLink}
                            variant="contained"
                            sx={{ minWidth: "140px" }}
                            color="primary"
                          >
                            <AccountBalanceWalletIcon
                              icon="user"
                              width="18"
                              height="18"
                            ></AccountBalanceWalletIcon>
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="goToPay"
                                defaultMessage="Go To Pay"
                              />
                            </Box>
                          </Button>
                        ) : (
                          <Button
                            to="/tables/signupclients"
                            component={NavLink}
                            variant="contained"
                            disabled
                            sx={{ minWidth: "140px" }}
                            color="primary"
                          >
                            <AccountBalanceWalletIcon
                              icon="user"
                              width="18"
                              height="18"
                            ></AccountBalanceWalletIcon>
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="goToPay"
                                defaultMessage="Go To Pay"
                              />
                            </Box>
                          </Button>
                        )}
                      </Grid>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default CheckMyStatus;
