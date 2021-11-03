import { useState } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/PersonAdd";
import { FormattedDate, FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

// import LogoIcon from "../../../full-layout/logo/LogoIcon";
import { CustomFormLabel } from "../../../../components/forms/custom-elements/CustomFormLabel";
import { CustomTextField } from "../../../../components/forms/custom-elements/CustomTextField";

import { setUserProfile } from "../../../../redux/Auth/Action";
import { freeRegister } from "../../../../services/auth";
import Storage from "../../../../storage";

const Register = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  const { activeLang } = useSelector((state) => state.CustomizerReducer);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "" || lastName === "" || email === "") {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    let data = {
      name: name,
      last_name: lastName,
      email: email,
    };
    try {
      const response = await freeRegister(data);
      // console.log(response);
      data = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        is_free: response.data.is_free,
      };
      Swal.fire({
        title: activeLang === "es" ? "Genial" : "Great",
        text:
          activeLang === "es" ? "Registrado correctamente" : "Success register",
        icon: "success",
        confirmButtonText: activeLang === "es" ? "Cerrar" : "Close",
      }).then(() => {
        Storage.saveFreeUser(JSON.stringify(data));
        dispatch(setUserProfile(data));
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text:
          activeLang === "es"
            ? "El correo no está disponible"
            : "Email is not available",
        icon: "error",
        confirmButtonText: activeLang === "es" ? "Cerrar" : "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeUsername = (e) => {
    setName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  return (
    <Grid container spacing={0} display="flex" justifyContent="center">
      <Grid item xs={12} lg={9} xl={6}>
        <Box
          sx={{
            pr: 4,
            pl: 4,
            pb: 0,
            pt: 0,
          }}
        >
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Grid container spacing={2} display="flex" alignItems="center">
              <Grid item xs={2} sm={1}>
                <PersonIcon
                  fontSize="large"
                  sx={{
                    mr: 2,
                    color: "primary.main",
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={11}>
                <Typography
                  color="textSecondary"
                  variant="h1"
                  fontWeight="500"
                  sx={{
                    mr: 1,
                  }}
                >
                  <FormattedMessage
                    id="view.register.convention"
                    defaultMessage="Say us your name"
                  />
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: "10px" }}>
              <Typography
                fontWeight="500"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                <FormattedMessage
                  id="convention.detail.login"
                  defaultMessage="Free"
                />
              </Typography>
              <Typography
                fontWeight="500"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "#e3b306",
                  mb: "16px",
                }}
              >
                <FormattedMessage
                  id="view.Login.convention.information"
                  defaultMessage="la conferencia empezará el 24 de Noviembre"
                  values={{
                    fecha: (
                      <FormattedDate
                        value={new Date("November 24, 2021")}
                        year="numeric"
                        month="long"
                        day="numeric"
                        weekday="long"
                      />
                    ),
                  }}
                />
              </Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <CustomFormLabel htmlFor="name">
                <FormattedMessage id="register.name" defaultMessage="Name" />
              </CustomFormLabel>
              <CustomTextField
                id="name"
                type="text"
                name="name"
                variant="outlined"
                fullWidth
                required
                inputProps={{ minLength: 3, maxLength: 10 }}
                defaultValue=""
                value={name}
                onChange={changeUsername}
              />
              <CustomFormLabel htmlFor="lastName">
                <FormattedMessage
                  id="register.lname"
                  defaultMessage="Last Name"
                />
              </CustomFormLabel>
              <CustomTextField
                id="lastName"
                variant="outlined"
                type="text"
                name="lastName"
                fullWidth
                defaultValue=""
                value={lastName}
                onChange={changeLastName}
                required
                inputProps={{ minLength: 4, maxLength: 10 }}
              />
              <CustomFormLabel htmlFor="email">
                <FormattedMessage
                  id="login.email"
                  defaultMessage="Email Adress"
                />
                *
              </CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                type="email"
                name="email"
                fullWidth
                sx={{
                  mb: 3,
                }}
                defaultValue=""
                value={email}
                onChange={changeEmail}
                required
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
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "primary.main",
                    mb: "16px",
                  }}
                >
                  <FormattedMessage
                    id="view.payRegister.convention"
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
                    to="/auth/login"
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      mb: "16px",
                      color: "primary.main",
                    }}
                  >
                    <FormattedMessage
                      id="view.payLogin.convention"
                      defaultMessage="I have an account"
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
                <FormattedMessage id="login.signIn" defaultMessage="Sign In" />
              </Button>
            </form>
          </Box>
          {isError && (
            <Box sx={{ mt: "10px" }}>
              <Typography
                fontWeight="500"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "red",
                  mb: "16px",
                }}
              >
                <FormattedMessage
                  id="convention.login.error"
                  defaultMessage="Required"
                />
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              mt: "20px",
              mb: "0px",
              "&::before": {
                content: '""',
                background: (theme) =>
                  `${theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"}`,
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
  );
};

export default Register;
