import { useState } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { CustomFormLabel } from "../../../../components/forms/custom-elements/CustomFormLabel";
import { CustomTextField } from "../../../../components/forms/custom-elements/CustomTextField";
import { freeLogin } from "../../../../services/auth";
import { setUserProfile } from "../../../../redux/Auth/Action";
import Storage from "../../../../storage";

const Login = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  const { activeLang } = useSelector((state) => state.CustomizerReducer);

  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const onEmailChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (email === "") {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    try {
      const response = await freeLogin({ email: email });
      // console.log(response);
      Swal.fire({
        title: activeLang === "es" ? "Genial" : "Great",
        text:
          activeLang === "es"
            ? "Inicio de sesión correcto"
            : "Sign in successfully",
        icon: "success",
        confirmButtonText: activeLang === "es" ? "Cerrar" : "Close",
      }).then(() => {
        const data = response.data;
        Storage.saveFreeUser(JSON.stringify(data));
        dispatch(setUserProfile(data));
      });
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        title: "Error",
        text:
          activeLang === "es"
            ? "El correo no está registrado, o no es una cuenta gratuita"
            : "Email is not register, or not like a free account",
        icon: "error",
        confirmButtonText: activeLang === "es" ? "Cerrar" : "Close",
      });
    } finally {
      setIsLoading(false);
    }
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
                    id="view.Login.convention"
                    defaultMessage="Free Login"
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
            <div>
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
                onChange={onEmailChange}
                required
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
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
                onClick={onSubmit}
              >
                <FormattedMessage id="login.signIn" defaultMessage="Sign In" />
              </Button>
            </div>
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

export default Login;
