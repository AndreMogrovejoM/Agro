import React, { useState } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../assets/images/backgrounds/DobleExpo.webp";
import LogoIcon from "../../layouts/full-layout/logo/LogoIcon";
import PersonIcon from "@material-ui/icons/Person";
import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import Customizer from "../../layouts/full-layout/customizer/Customizer";
import { setSideBarAuth, setUserProfile } from "../../redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../services/auth";
import { getUserProfile } from "../../services/UserProfile";
import Spinner from "../spinner/Spinner";
import Storage from "../../storage";
import "./style.css";

import Swal from "sweetalert2";
import { FormattedMessage } from "react-intl";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { activeLang } = useSelector((state) => state.CustomizerReducer);

  const onSubmit = async (data) => {
    data.preventDefault();
    setIsLoading(true);
    const credentials = {
      email: data.target.email.value,
      password: data.target.password.value,
    };

    try {
      let response = await auth(credentials);
      // console.log(response.data.paths)
      dispatch(setSideBarAuth(response.data.paths));
      response = await getUserProfile();
      dispatch(setUserProfile(response.data));
      navigate("/user-profile");
      Storage.deleteFreeUser();
    } catch (error) {
      // console.log(JSON.stringify(error));
      Swal.fire({
        title: "¡Error!",
        text:
          activeLang === "es"
            ? "Correo y/o contraseña incorrecta"
            : "Email or password is wrong",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      {isLoading && (
        <Spinner
          styles={{
            backgroundColor: "#4c4c4c8c",
            zIndex: "99",
            position: "absolute",
          }}
        />
      )}
      <Grid
        container
        spacing={0}
        sx={{ height: "100vh", justifyContent: "center" }}
      >
        <Grid
          className="container-image"
          item
          xs={12}
          sm={12}
          lg={6}
          sx={{
            background: (theme) =>
              `${theme.palette.mode === "dark" ? "#104973" : "#f1fbfe"}`,
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                position: {
                  xs: "relative",
                  lg: "absolute",
                },
                height: { xs: "auto", lg: "100vh" },
                right: { xs: "auto", lg: "-50px" },
                margin: "0 auto",
              }}
            >
              <img
                src={img1}
                alt="bg"
                className="conver__container"
                style={{
                  height: "100%",
                }}
              />
              <div className="cover__container"></div>
            </Box>

            <Box
              sx={{
                p: 4,
                position: "absolute",
                top: "0",
              }}
            ></Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          lg={6}
          display="flex"
          alignItems="center"
          style={{ zIndex: 1 }}
        >
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  p: 4,
                  pb: 0,
                }}
              >
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ paddingLeft: "0 !important", mb: 6 }}
                    >
                      <div className="row">
                        <div className="col">
                          <center>
                            <LogoIcon width="320px" height="120px" />
                          </center>
                        </div>
                      </div>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={1}>
                        <PersonIcon
                          fontSize="large"
                          sx={{
                            mr: 2,
                            color: "primary.main",
                            mt: 0.5,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10} sm={9}>
                        <Typography
                          color="textSecondary"
                          variant="h1"
                          fontWeight="500"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="view.Login"
                            defaultMessage="Login"
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <form onSubmit={onSubmit}>
                    <CustomFormLabel htmlFor="email">
                      <FormattedMessage
                        id="login.email"
                        defaultMessage="Email Adress"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="email"
                      variant="outlined"
                      type="email"
                      name="email"
                      fullWidth
                      required
                    />
                    <CustomFormLabel htmlFor="password">
                      <FormattedMessage
                        id="login.password"
                        defaultMessage="Password"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="password"
                      type="password"
                      name="password"
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        mb: 3,
                      }}
                    />
                    <Box
                      sx={{
                        display: {
                          xs: "block",
                          sm: "flex",
                          lg: "flex",
                        },
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        component={Link}
                        to="/auth/register"
                        fontWeight="500"
                        variant="h4"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          color: "primary.main",
                          mb: "16px",
                        }}
                      >
                        <FormattedMessage
                          id="login.createAccount"
                          defaultMessage="Create an account"
                        />
                      </Typography>
                      <Box
                        sx={{
                          ml: "auto",
                        }}
                      >
                        <Typography
                          component={Link}
                          to="/auth/reset-password"
                          fontWeight="500"
                          variant="h4"
                          sx={{
                            display: "block",
                            textDecoration: "none",
                            mb: "16px",
                            color: "primary.main",
                          }}
                        >
                          <FormattedMessage
                            id="login.forgotPassword"
                            defaultMessage="Forgot Password ?"
                          />
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                      fullWidth
                      sx={{
                        pt: "10px",
                        pb: "10px",
                      }}
                    >
                      <FormattedMessage
                        id="login.signIn"
                        defaultMessage="Sign In"
                      />
                    </Button>
                  </form>
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    "&::before": {
                      content: '""',
                      background: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"
                        }`,
                      height: "1px",
                      width: "100%",
                      position: "absolute",
                      left: "0",
                      top: "13px",
                    },
                  }}
                />
                <Box sx={{ mt: "20px" }}>
                  <Typography
                    component={Link}
                    to="/convention"
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "primary.main",
                      mb: "16px",
                    }}
                  >
                    <FormattedMessage
                      id="login.convention"
                      defaultMessage="Convention"
                    />
                  </Typography>
                  <Typography
                    component={Link}
                    to="/convention"
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "white",
                      // mb: "16px",
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      type="submit"
                      fullWidth
                      sx={{
                        pt: "10px",
                        pb: "10px",
                      }}
                    >
                      <FormattedMessage
                        id="login.convention.button"
                        defaultMessage="Convention"
                      />
                    </Button>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    mt: "20px",
                    mb: "0px",
                    "&::before": {
                      content: '""',
                      background: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"
                        }`,
                      height: "1px",
                      width: "100%",
                      position: "absolute",
                      left: "0",
                      top: "13px",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Customizer />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
