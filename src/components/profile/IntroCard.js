import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import FeatherIcon from "feather-icons-react";
import { FormattedMessage } from "react-intl";
import { CustomTextField } from "../forms/custom-elements/CustomTextField";
// import Swal from "sweetalert2";

const IntroCard = ({ data, onSubmitProfile, onChangePassword }) => {
  const [isChange, setIsChange] = useState(false);
  const [lastPassword, setLastPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [mobile, setMobile] = useState(data.mobile);

  // console.log(data);
  const handleSubmit = () => {
    if (isChange) {
      onSubmitProfile(data);
      // console.log("last data ", data);
    }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // console.log("ya hice clic");
    if (newPassword === confirmNewPassword) {
      onChangePassword({
        old_password: lastPassword,
        new_password: newPassword,
      });
      setLastPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      // console.log("cambiando contrasenia", lastPassword);
    }
  };

  const handleChangeProfile = (e) => {
    setIsChange(true);
    switch (e.target.id) {
      case "first_name":
        setFirstName(e.target.value);
        break;
      case "last_name":
        setLastName(e.target.value);
        break;
      case "mobile":
        setMobile(e.target.value);
        break;
      case "last_password":
        setLastPassword(e.target.value);
        break;
      case "new_password":
        setNewPassword(e.target.value);
        break;
      case "confirm_new_password":
        setConfirmNewPassword(e.target.value);
        newPassword === e.target.value
          ? setPasswordError(true)
          : setPasswordError(false);
        break;

      default:
        break;
    }
  };

  const handleChangeNewPassword = ({ target }) => {
    const { value } = target;
    setNewPassword(value);
    // console.log(value);
    confirmNewPassword === value
      ? setPasswordError(false)
      : setPasswordError(true);
  };
  const handleChangeConfirmNewPassword = ({ target }) => {
    const { value } = target;
    setConfirmNewPassword(value);
    // console.log(value);
    newPassword === value ? setPasswordError(false) : setPasswordError(true);
  };

  return (
    <Card variant="outlined" className="container">
      <CardContent>
        <Typography fontWeight="500" variant="h3">
          <FormattedMessage id="profile.title" defaultMessage="Information" />
        </Typography>
        {/* Start container 1 */}
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          {/* start email */}
          <Grid container spacing={0} sx={{ mb: 2 }}>
            {/* icon */}
            <Grid item xs={0.5} sm={0.5} md={0.5}>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{
                  mt: 3,
                }}
              >
                <FeatherIcon
                  icon="user-check"
                  width="20"
                  display="flex"
                  alignItems="center"
                />
              </Box>
            </Grid>
            {/* Text */}
            <Grid item xs={11.5} sm={11.5} md={11.5}>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{
                  mt: 3,
                }}
              >
                <Grid container spacing={0}>
                  {/* Label */}
                  <Grid item xs={4} sm={4} md={1.5}>
                    <Typography
                      component="span"
                      variant="h5"
                      fontWeight="400"
                      sx={{
                        mr: 1,
                      }}
                    >
                      <FormattedMessage
                        id="profile.email"
                        defaultMessage="Email"
                      />
                      :
                    </Typography>
                  </Grid>
                  {/* Input Text */}
                  <Grid item xs={8} sm={8} md={10.5}>
                    <Box sx={{ mt: -2 }}>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{
                          display: "inline-flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <CustomTextField
                          id="first_name"
                          variant="outlined"
                          type="text"
                          name="first_name"
                          fullWidth
                          defaultValue={data.email}
                          disabled
                        />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {/* end email */}
          {/* start phone and document number */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={0}>
                {/* icon */}
                <Grid item xs={0.5} sm={0.5} md={1}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <FeatherIcon
                      icon="phone"
                      width="20"
                      display="flex"
                      alignItems="center"
                    />
                  </Box>
                </Grid>
                {/* Text */}
                <Grid item xs={11.5} sm={11.5} md={11}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <Grid container spacing={0}>
                      {/* Label */}
                      <Grid item xs={4} sm={4} md={3}>
                        <Typography
                          component="span"
                          variant="h5"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="profile.tel"
                            defaultMessage="Cellphone"
                          />
                          :
                        </Typography>
                      </Grid>
                      {/* Input Text */}
                      <Grid item xs={8} sm={8} md={9}>
                        <Box sx={{ mt: -2 }}>
                          <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{
                              display: "inline-flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <CustomTextField
                              id="mobile"
                              variant="outlined"
                              type="number"
                              name="mobile"
                              fullWidth
                              defaultValN={mobile}
                              onChange={handleChangeProfile}
                              value={mobile}
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={0}>
                {/* icon */}
                <Grid item xs={0.5} sm={0.5} md={1}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <FeatherIcon
                      icon="clipboard"
                      width="20"
                      display="flex"
                      alignItems="center"
                    />
                  </Box>
                </Grid>
                {/* Text */}
                <Grid item xs={11.5} sm={11.5} md={11}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Grid container spacing={0}>
                      {/* Label */}
                      <Grid item xs={4} sm={4} md={3}>
                        <Typography
                          component="span"
                          variant="h5"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="profile.documentNumber"
                            defaultMessage="Document"
                          />
                          :
                        </Typography>
                      </Grid>
                      {/* Input Text */}
                      <Grid item xs={8} sm={8} md={9}>
                        <Box sx={{ mt: -1 }}>
                          <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{
                              display: "inline-flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <CustomTextField
                              id="document_number"
                              variant="outlined"
                              type="text"
                              name="document_number"
                              fullWidth
                              defaultValue={data.document_nuber}
                              disabled
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* end phone */}

          {/* start name and last name */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={0}>
                {/* icon */}
                <Grid item xs={0.5} sm={0.5} md={1}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <FeatherIcon
                      icon="user"
                      width="20"
                      display="flex"
                      alignItems="center"
                    />
                  </Box>
                </Grid>
                {/* Text */}
                <Grid item xs={11.5} sm={11.5} md={11}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <Grid container spacing={0}>
                      {/* Label */}
                      <Grid item xs={4} sm={4} md={3}>
                        <Typography
                          component="span"
                          variant="h5"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="profile.firstname"
                            defaultMessage="First Name"
                          />
                          :
                        </Typography>
                      </Grid>
                      {/* Input Text */}
                      <Grid item xs={8} sm={8} md={9}>
                        <Box sx={{ mt: -2 }}>
                          <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{
                              display: "inline-flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <CustomTextField
                              id="first_name"
                              variant="outlined"
                              type="text"
                              name="first_name"
                              fullWidth
                              defaultValue={firstName}
                              onChange={handleChangeProfile}
                              value={firstName}
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={0}>
                {/* icon */}
                <Grid item xs={0.5} sm={0.5} md={1}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <FeatherIcon
                      icon="user"
                      width="20"
                      display="flex"
                      alignitems="center"
                    />
                  </Box>
                </Grid>
                {/* Text */}
                <Grid item xs={11.5} sm={11.5} md={11}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    sx={{
                      mt: 3,
                    }}
                  >
                    <Grid container spacing={0}>
                      {/* Label */}
                      <Grid item xs={4} sm={4} md={3}>
                        <Typography
                          component="span"
                          variant="h5"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="profile.lastname"
                            defaultMessage="Last Name"
                          />
                          :
                        </Typography>
                      </Grid>
                      {/* Input Text */}
                      <Grid item xs={8} sm={8} md={9}>
                        <Box sx={{ mt: -2 }}>
                          <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{
                              display: "inline-flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <CustomTextField
                              id="last_name"
                              variant="outlined"
                              type="text"
                              name="last_name"
                              fullWidth
                              defaultValue={lastName}
                              onChange={handleChangeProfile}
                              value={lastName}
                            />
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* end name and last name */}
        </Grid>
        {/* finish container 1 */}

        <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            // component={Link}
            onClick={handleSubmit}
            // to="/"
            sx={{
              pt: "10px",
              pb: "10px",
              minWidth: "200px",
            }}
          >
            <FormattedMessage id="profile.save" defaultMessage="Save" />
          </Button>
        </Box>

        <Box
          display="flex"
          alignItems="flex-start"
          sx={{
            mt: 5,
            borderBottom: 1,
            borderColor: "primary",
            mb: 5,
          }}
        />

        <Typography fontWeight="500" variant="h3">
          <FormattedMessage
            id="profile.change.password"
            defaultMessage="Change Password"
          />
        </Typography>
        <form onSubmit={handleSubmitPassword}>
          <Grid
            container
            spacing={0}
            sx={{ justifyContent: "center", flexDirection: "column" }}
          >
            {/* start last password */}
            <Grid container spacing={0}>
              {/* icon */}
              <Grid item xs={0.5} sm={0.5} md={1}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <FeatherIcon
                    icon="unlock"
                    width="20"
                    display="flex"
                    alignItems="center"
                  />
                </Box>
              </Grid>
              {/* Text */}
              <Grid item xs={11.5} sm={11.5} md={11}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <Grid container spacing={0}>
                    {/* Label */}
                    <Grid item xs={6} sm={6} md={2}>
                      <Typography
                        component="span"
                        variant="h5"
                        fontWeight="400"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="profile.lastpassword"
                          defaultMessage="Last Password"
                        />
                        :
                      </Typography>
                    </Grid>
                    {/* Input Text */}
                    <Grid item xs={6} sm={6} md={10}>
                      <Box sx={{ mt: -2 }}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          sx={{
                            display: "inline-flex",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <CustomTextField
                            id="last_password"
                            variant="outlined"
                            type="password"
                            name="last_password"
                            fullWidth
                            onChange={handleChangeProfile}
                            required
                          />
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {/* end last password */}

            <Box sx={{ mt: 1, mb: 1 }} />

            {/* start new password */}
            <Grid container spacing={0}>
              {/* icon */}
              <Grid item xs={0.5} sm={0.5} md={1}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <FeatherIcon
                    icon="unlock"
                    width="20"
                    display="flex"
                    alignItems="center"
                  />
                </Box>
              </Grid>
              {/* Text */}
              <Grid item xs={11.5} sm={11.5} md={11}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <Grid container spacing={0}>
                    {/* Label */}
                    <Grid item xs={6} sm={6} md={2}>
                      <Typography
                        component="span"
                        variant="h5"
                        fontWeight="400"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="profile.newpassword"
                          defaultMessage="Password"
                        />
                        :
                      </Typography>
                    </Grid>
                    {/* Input Text */}
                    <Grid item xs={6} sm={6} md={10}>
                      <Box sx={{ mt: -2 }}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          sx={{
                            display: "inline-flex",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <CustomTextField
                            id="new_password"
                            variant="outlined"
                            type="password"
                            name="new_password"
                            fullWidth
                            onChange={handleChangeNewPassword}
                            value={newPassword}
                            required
                          />
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {/* end new password */}
            <Box sx={{ mt: 1, mb: 1 }} />
            {/* start new password */}
            <Grid container spacing={0}>
              {/* icon */}
              <Grid item xs={0.5} sm={0.5} md={1}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <FeatherIcon
                    icon="unlock"
                    width="20"
                    display="flex"
                    alignItems="center"
                  />
                </Box>
              </Grid>
              {/* Text */}
              <Grid item xs={11.5} sm={11.5} md={11}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  sx={{
                    mt: 3,
                  }}
                >
                  <Grid container spacing={0}>
                    {/* Label */}
                    <Grid item xs={6} sm={6} md={2}>
                      <Typography
                        component="span"
                        variant="h5"
                        fontWeight="400"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="profile.confirmpassword"
                          defaultMessage="Password"
                        />
                        :
                      </Typography>
                    </Grid>
                    {/* Input Text */}
                    <Grid item xs={6} sm={6} md={10}>
                      <Box sx={{ mt: -2 }}>
                        <Typography
                          variant="h5"
                          fontWeight="600"
                          sx={{
                            display: "inline-flex",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <CustomTextField
                            id="confirm_new_password"
                            variant="outlined"
                            type="password"
                            name="confirm_new_password"
                            fullWidth
                            onChange={handleChangeConfirmNewPassword}
                            value={confirmNewPassword}
                            required
                          />
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {/* end new password */}

            {passwordError && (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  mt: 1,
                  ml: 5,
                }}
              >
                <Typography
                  color="#FF0000"
                  variant="h6"
                  fontWeight="400"
                  sx={{
                    mr: 1,
                  }}
                >
                  <FormattedMessage
                    id="profile.passwordError"
                    defaultMessage="Passwords are different."
                  />
                </Typography>
              </Box>
            )}
          </Grid>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              sx={{
                pt: "10px",
                pb: "10px",
                minWidth: "200px",
              }}
            >
              <FormattedMessage
                id="profile.save.password"
                defaultMessage="Change Password"
              />
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export { IntroCard };
