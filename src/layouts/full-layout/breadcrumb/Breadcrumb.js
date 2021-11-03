import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  // Breadcrumbs,
  // Link,
  Alert,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ThemeSelect from "../../../views/dashboards/dashboard1-components/ThemeSelect";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Swal from "sweetalert2";
import { buyPases } from "../../../services/Corporative";

import { CulqiProvider, Culqi } from "../../../components/react-culqi";

import { FormattedMessage } from "react-intl";

const Breadcrumb = (props) => {
  const handleClick = () => {
    Swal.fire({
      title: "Número de pases a comprar",
      input: "select",
      inputOptions: {
        3: "3 pases",
        4: "4 pases",
        5: "5 pases",
        6: "6 pases",
        7: "7 pases",
        8: "8 pases",
        9: "9 pases",
        10: "10 pases",
      },
      inputPlaceholder: "Número de pases",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== "") {
            resolve();
          } else {
            resolve("Debes seleccionar una cantidad de pases, entre 3 y 10.");
          }
        });
      },
    }).then(function (result) {
      if (result.value) {
        const participants = result.value;
        setNparticipants(participants);
        Swal.fire({
          title: "Seleccionar moneda",
          input: "select",
          inputOptions: {
            PEN: "PEN",
            USD: "USD",
          },
          inputPlaceholder: "Tipo de moneda",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== "") {
                resolve();
              } else {
                resolve(
                  "Debes seleccionar un tipo de moneda para realizar la compra"
                );
              }
            });
          },
        }).then(function (result) {
          if (result.value) {
            setMyCurrency(result.value);
            // console.log(Mycurrency);
            if (result.value === "USD") {
              setCantidad(participants * 10000);
            } else if (result.value === "PEN") {
              setCantidad(participants * 41000);
            }
            window.document.getElementById("btnCulqiSET").click();
            window.document.getElementById("btnCulqi").click();
          }
        });
      }
    });
  };

  // const [page, setPage] = useState(0);
  const [Mycurrency, setMyCurrency] = useState("PEN");
  const [nParticipants, setNparticipants] = useState(0);

  const [cantidad, setCantidad] = useState();

  return (
    <CulqiProvider
      // publicKey="pk_live_2dc49f35f43d1783"
      publicKey="pk_test_7611a201f786ac3e"
      amount={cantidad}
      title="AGROMIN"
      currency={Mycurrency}
      description="AGROMIN"
      onToken={(token) => {
        const Fdata = {
          number_participants: nParticipants,
          currency: Mycurrency,
          token: token.id,
        };
        // console.log(Fdata);
        buyPases(Fdata);
      }}
      onError={(error) => {
        console.error("something bad happened", error);
      }}
      options={{
        style: {
          maincolor: "#172274",
          // buttontext: "black",
          buttoncolor: "#172274",
          maintext: "primary",
          desctext: "secondary",
          logo: "https://plataforma.agrominperu.com/favicon.png",
        },
      }}
    >
      <Grid
        container
        sx={{
          p: "0 15px 15px 15px",
        }}
      >
        <Grid item xs={12} sm={6} lg={8}>
          <Typography
            fontWeight="700"
            variant="h1"
            sx={{
              lineHeight: "1.235",
            }}
          >
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
          <Box
            sx={{
              display: { xs: "none", md: "block", lg: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <ThemeSelect
              clients={
                props.addClient || props.signUpClients || props.clientsDocuments
              }
              showDate={false}
            />
            <Grid
              container
              spacing={2}
              display="flex"
              justifyContent="flex-end"
            >
              {/* Admin Exhibitor */}

              {props.AdminStandConfig && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/admin/configstand"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <SettingsIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></SettingsIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="drawer.settings"
                        defaultMessage="Settings"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.Stuff && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/auth/registerClients"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <PersonAddIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></PersonAddIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage id="Stuff" defaultMessage="Staff" />
                    </Box>
                  </Button>
                </Grid>
              )}
              {/* End Admin Exhibitor */}

              {props.addClient && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/admin/register/newuser"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <PersonAddIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></PersonAddIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="breadcrub.addExhibitor"
                        defaultMessage="Add Exhibitor"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.addGuest && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/admin/guestsreview/"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <PersonAddIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></PersonAddIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="addGuest"
                        defaultMessage="Add Guest"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.addParticipant && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/admin/managecompanyadmin/"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <GroupAddIcon fontSize="medium" />
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="breadcrub.addParticipant"
                        defaultMessage="Add Participant"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.RegisterMe && (
                <Grid item xs={12} sm={6}>
                  {props.AdminRegistered ? (
                    <Button
                      variant="contained"
                      sx={{ minWidth: "215px" }}
                      // onClick={handleClick}
                      color="primary"
                      disabled
                    >
                      <PersonAddIcon
                        icon="user"
                        width="20"
                        height="20"
                      ></PersonAddIcon>
                      <Box fontWeight="400" sx={{ ml: 1 }}>
                        <FormattedMessage
                          id="registerMe"
                          defaultMessage="Register Me"
                        />
                      </Box>
                    </Button>
                  ) : (
                    <Button
                      to="/admin/manageadmindata/"
                      component={NavLink}
                      variant="contained"
                      color="primary"
                      sx={{ minWidth: "215px" }}
                    >
                      <PersonAddIcon fontSize="medium" />
                      <Box fontWeight="400" sx={{ ml: 1 }}>
                        <FormattedMessage
                          id="registerMe"
                          defaultMessage="Add Participant"
                        />
                      </Box>
                    </Button>
                  )}
                </Grid>
              )}

              {props.signUpClients && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/signupclients"
                    component={NavLink}
                    variant="contained"
                    sx={{ minWidth: "215px" }}
                    color="primary"
                  >
                    <PeopleIcon icon="user" width="20" height="18"></PeopleIcon>
                    <Box fontWeight="400" sx={{ ml: 20 }}>
                      <FormattedMessage
                        id="signupclients.signUpClients"
                        defaultMessage="Sign up clients"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.clientsDocuments && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/clientsdocuments"
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <AssignmentIndIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></AssignmentIndIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="breadcrub.clientsDocuments"
                        defaultMessage="Documents"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.goToPay && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to="/signupclients"
                    component={NavLink}
                    variant="contained"
                    disabled
                    sx={{ minWidth: "215px" }}
                    color="primary"
                  >
                    <AccountBalanceWalletIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></AccountBalanceWalletIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage
                        id="goToPay"
                        defaultMessage="Go To Pay"
                      />
                    </Box>
                  </Button>
                </Grid>
              )}

              {props.number_participants && (
                <Grid item xs={6} sm={6}>
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ pt: 0, pb: 0, minWidth: "215px" }}
                  >
                    <Grid container spacing={2} sx={{ alignitems: "center" }}>
                      <Grid item xs={3}>
                        <PeopleIcon
                          icon="user"
                          width="20"
                          height="20"
                        ></PeopleIcon>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h4">
                          {props.number_participants}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Alert>
                </Grid>
              )}
              {/* showBackButton */}

              {props.showBackButton && (
                <Grid item xs={12} sm={6}>
                  <Button
                    to={props.backButtonDirection}
                    component={NavLink}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: "215px" }}
                  >
                    <ArrowBackIcon
                      icon="user"
                      width="20"
                      height="20"
                    ></ArrowBackIcon>
                    <Box fontWeight="400" sx={{ ml: 1 }}>
                      <FormattedMessage id="back" defaultMessage="Back" />
                    </Box>
                  </Button>
                </Grid>
              )}

              <Culqi>
                {({ openCulqi, Amount, setAmount, setCurrency }) => {
                  return (
                    <>
                      {props.buyMore && (
                        <Grid item xs={12} sm={6}>
                          <Button
                            onClick={handleClick}
                            variant="contained"
                            sx={{ minWidth: "215px" }}
                            color="primary"
                          >
                            <AddShoppingCartIcon
                              icon="user"
                              width="20"
                              height="20"
                            ></AddShoppingCartIcon>
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="buyMore"
                                defaultMessage="Buy More"
                              />
                            </Box>
                          </Button>
                          <Button
                            id="btnCulqiSET"
                            onClick={() => {
                              setAmount(cantidad);
                              setCurrency(Mycurrency);
                              // console.log("CANTIDAD>>>", cantidad);
                            }}
                            style={{ display: "none" }}
                          />
                          <Button
                            id="btnCulqi"
                            onClick={openCulqi}
                            style={{ display: "none" }}
                          />
                        </Grid>
                      )}
                    </>
                  );
                }}
              </Culqi>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </CulqiProvider>
  );
};

export default Breadcrumb;
