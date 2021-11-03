import { useState } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import img1 from "../../assets/images/backgrounds/DobleExpo.webp";
import logo from "../../assets/images/logos/Agromin.svg";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import { resetPassword } from "../../services/UserProfile";
import Spinner from "../spinner/Spinner";

import "./style.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { activeLang } = useSelector((state) => state.CustomizerReducer);

  const handleResetError = () => {
    Swal.fire(
      activeLang === "es" ? "Error en la direccion de correo" : "Wrong",
      activeLang === "es"
        ? "Comprueba que tu correo sea el correcto"
        : "Check, your email doesn't exist",
      "error"
    );
  };

  const handleReset = () => {
    Swal.fire(
      activeLang === "es"
        ? "¡Restablecimiento de contraseña exitoso!"
        : "Success",
      activeLang === "es"
        ? "¡Tu nueva contraseña ha sido enviada a tu correo con éxito!"
        : "Your new password will be send to your email",
      "success"
    ).then(navigate("/"));
  };

  const postEmail = async (correo) => {
    setIsLoading(true);
    const formData = { email: correo };
    // console.log(formData);
    try {
      await resetPassword(formData);
      // console.log("POST res :- ", response);
      // console.log("POST res status:- ", response.status);
      handleReset();
      // console.log("Response :- ", response);
    } catch (error) {
      // console.log("POST error :- ", error.message);
      handleResetError();
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    data.preventDefault();
    const correo = data.target.email.value;
    if (correo) {
      postEmail(correo);
    } else {
      handleResetError();
    }
    // checkEmail(correo);
  };

  return (
    <PageContainer
      title="Reset Password"
      description="this is Reset Password page"
    >
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
                style={{
                  paddingTop: "50px",
                  width: "100%",
                  maxWidth: "1920px",
                  // maxWidth: "812px",
                  height: "100%",
                }}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              sx={{
                p: 4,
                position: "absolute",
                top: "0",
              }}
            ></Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  p: 4,
                }}
              >
                <img
                  src={logo}
                  alt="bg"
                  className="conver__container"
                  style={{
                    height: "100%",
                  }}
                />

                <Typography variant="h2" fontWeight="700">
                  <FormattedMessage
                    id="forgotPassword.fpass"
                    defaultMessage="Forgot Password?"
                  />
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="h5"
                  fontWeight="400"
                  sx={{
                    mt: 2,
                  }}
                >
                  <FormattedMessage
                    id="forgotPassword.textDescription"
                    defaultMessage="Please enter the email address associated with your account and We will email you a link to reset your password."
                  />
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  <form onSubmit={onSubmit}>
                    <CustomFormLabel htmlFor="reset-email">
                      <FormattedMessage
                        id="forgotPassword.email"
                        defaultMessage="Email Adres"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="email"
                      type="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      // onClick={handleReset}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          onSubmit();
                        }
                      }}
                      sx={{
                        pt: "10px",
                        pb: "10px",
                        mt: 4,
                      }}
                    >
                      <FormattedMessage
                        id="forgotPassword.rPassword"
                        defaultMessage="Reset Password"
                      />
                    </Button>
                  </form>
                  <Button
                    color="secondary"
                    size="large"
                    fullWidth
                    component={Link}
                    to="/auth/login"
                    sx={{
                      pt: "10px",
                      pb: "10px",
                      mt: 2,
                    }}
                  >
                    <FormattedMessage
                      id="forgotPassword.bLogin"
                      defaultMessage="Back to Login"
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ResetPassword;
