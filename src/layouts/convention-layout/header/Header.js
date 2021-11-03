import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
} from "@material-ui/core";

import { FormattedMessage } from "react-intl";
import FeatherIcon from "feather-icons-react";
import { Link, NavLink } from "react-router-dom";

import ProfileDropdown from "../../full-layout/header/ProfileDropdown";

import DuoIcon from "@material-ui/icons/Duo";
import BusinessIcon from "@material-ui/icons/Business";
import Login from "@material-ui/icons/Login";
import LockClock from "@material-ui/icons/LockClock";
import { useWindowDimensions } from "../../../helper/getWindowsDimension";
import { signOut } from "../../../services/auth";

const Header = ({ user, paths }) => {
  const [anchorEl4, setAnchorEl4] = useState(null);
  const { width } = useWindowDimensions();

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  // console.log(paths);
  return width > 800 ? (
    <AppBar
      sx={{
        backgroundColor: "#282C34",
      }}
      elevation={0}
    >
      <Toolbar>
        {user && user.is_free ? (
          <Box display="flex" alignItems="center" align="left">
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Typography
                color="white"
                variant="h4"
                fontWeight="400"
                sx={{ ml: 1 }}
              >
                {/* <FormattedMessage
              id="app.welcome"
              defaultMessage="Hola"
              values={{ name: user.first_name + user.last_name }}
            /> */}
                <FormattedMessage id="WelcomeFair" defaultMessage="Welcome" />
              </Typography>
              <Typography
                color="white"
                variant="h4"
                fontWeight="700"
                sx={{
                  ml: 1,
                  textTransform: "capitalize",
                }}
              >
                {user !== null && user.first_name}
              </Typography>
              <FeatherIcon
                icon="chevron-down"
                width="20"
                height="20"
              ></FeatherIcon>
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl4}
              keepMounted
              open={Boolean(anchorEl4)}
              onClose={handleClose4}
              sx={{
                "& .MuiMenu-paper": {
                  width: "385px",
                  right: 0,
                  top: "70px !important",
                },
                "& .MuiList-padding": {
                  p: "30px",
                },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                }}
                to="/auth/login"
              >
                <Button
                  sx={{
                    mt: 2,
                    display: "block",
                    width: "100%",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // console.log("logout");
                    location.replace("/auth/login");
                    signOut();
                  }}
                >
                  <FormattedMessage id="logout" defaultMessage="Logout" />
                </Button>
              </Link>
            </Menu>
          </Box>
        ) : (
          <>
            {/* {width > 1366 ? <Box flexGrow={0.0} /> : <Box flexGrow={0.05} />} */}

            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box display="flex" alignItems="center">
                {user !== null && (
                  <Avatar
                    src={user.profile_image}
                    alt={user.profile_image}
                    sx={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="h5"
                    fontWeight="400"
                    sx={{ ml: 1 }}
                  >
                    <FormattedMessage id="WelcomeFair" defaultMessage="Hi " />
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                    sx={{
                      ml: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {user !== null && user.first_name}
                  </Typography>
                  <FeatherIcon
                    icon="chevron-down"
                    width="20"
                    height="20"
                  ></FeatherIcon>
                </Box>
              </Box>
            </Button>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl4}
              keepMounted
              open={Boolean(anchorEl4)}
              onClose={handleClose4}
              sx={{
                "& .MuiMenu-paper": {
                  width: "385px",
                  right: 0,
                  top: "70px !important",
                },
                "& .MuiList-padding": {
                  p: "30px",
                },
              }}
            >
              <Button onClick={handleClose4}>
                <Box
                  sx={{
                    mb: 1,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "white" : "black",
                      }}
                      variant="h4"
                      fontWeight="500"
                    >
                      <FormattedMessage
                        id="user.profile"
                        defaultMessage="User Profile"
                      />
                    </Typography>
                  </Box>
                </Box>
              </Button>
              <ProfileDropdown data={user} handleClose={handleClose4} />
              <Link
                style={{
                  textDecoration: "none",
                }}
                to="/auth/login"
              >
                <Button
                  sx={{
                    mt: 2,
                    display: "block",
                    width: "100%",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // console.log("logout");
                    location.replace("/auth/login");
                    signOut();
                  }}
                >
                  <FormattedMessage id="logout" defaultMessage="Logout" />
                </Button>
              </Link>
            </Menu>
          </>
        )}
        {/* ------------------------------------------- */}
        {/* Botonera */}
        {/* ------------------------------------------- */}
        {width > 1366 ? <Box flexGrow={0.4} /> : <Box flexGrow={0.1} />}
        {user.is_free ? (
          <Box display="flex" alignItems="center" align="left">
            <Button
              variant="outlined"
              sx={{ minWidth: width > 1366 ? "200px" : "100px" }}
              startIcon={<LockClock />}
              to={`/auth/register`}
              component={NavLink}
            >
              <Typography
                color="white"
                variant="h5"
                fontWeight="400"
                sx={{ ml: 1 }}
              >
                <FormattedMessage
                  id="register.signUp"
                  defaultMessage="Regístrate"
                />
              </Typography>
            </Button>
            <Box sx={{ pl: 1 }} />
            <Button
              variant="outlined"
              sx={{ minWidth: width > 1366 ? "200px" : "100px" }}
              startIcon={<Login />}
              to={`/auth/login`}
              component={NavLink}
            >
              <Typography
                color="white"
                variant="h5"
                fontWeight="400"
                sx={{ ml: 1 }}
              >
                <FormattedMessage
                  id="register.signIn"
                  defaultMessage="Conectate"
                />
              </Typography>
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" align="left">
            {paths && paths.find(({ name }) => name === "plenaryHall") && (
              <Button
                variant="outlined"
                sx={{ minWidth: width > 1366 ? "200px" : "100px" }}
                startIcon={<DuoIcon />}
                to={`/conferencia`}
                component={NavLink}
              >
                <Typography
                  color="white"
                  variant="h5"
                  fontWeight="400"
                  sx={{ ml: 1 }}
                >
                  <FormattedMessage
                    id="SalaPlenaria"
                    defaultMessage="Sala Plenaria"
                  />
                </Typography>
              </Button>
            )}
            <Box sx={{ pl: 1 }} />
            {paths && paths.find(({ name }) => name === "businessConference") && (
              <Button
                variant="outlined"
                sx={{ minWidth: width > 1366 ? "200px" : "100px" }}
                startIcon={<BusinessIcon />}
                to={`/B2B/`}
                component={NavLink}
              >
                <Typography
                  color="white"
                  variant="h5"
                  fontWeight="400"
                  sx={{ ml: 1 }}
                >
                  <FormattedMessage
                    id="RuedadeNegocios"
                    defaultMessage="Rueda de negocios"
                  />
                </Typography>
              </Button>
            )}
          </Box>
        )}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  ) : (
    <div />
  );
};

export default Header;
