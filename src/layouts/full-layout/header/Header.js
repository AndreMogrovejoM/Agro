import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FeatherIcon from "feather-icons-react";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";

import ProfileDropdown from "./ProfileDropdown";

import { signOut } from "../../../services/auth";

import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { setUserProfile } from "../../../redux/Auth/Action";
import { getUserProfile } from "../../../services/UserProfile";

const Header = (props) => {
  const dispatch = useDispatch();
  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const { user } = useSelector((state) => state.authReducer);

  const getUserProfileData = async () => {
    try {
      const response = await getUserProfile();
      dispatch(setUserProfile(response.data));
    } catch (error) {}
  };
  // console.log(user);
  useEffect(() => {
    if (user !== null) return;
    getUserProfileData();
  }, []);

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.toggleSidebar}
          size="large"
          sx={{
            display: {
              lg: "flex",
              xs: "none",
            },
          }}
        >
          <FeatherIcon icon="menu" />
        </IconButton>

        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>

        {/* ------------ End Menu icon ------------- */}

        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
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
                <FormattedMessage id="fair.greeting" defaultMessage="Hi " />
              </Typography>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  ml: 1,
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
                <Typography variant="h4" fontWeight="500">
                  <FormattedMessage
                    id="user.profile"
                    defaultMessage="User Profile"
                  />
                </Typography>
              </Box>
            </Box>
          </Button>

          {user !== null && (
            <ProfileDropdown data={user} handleClose={handleClose4} />
          )}
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/auth"
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
                location.replace("/auth");
                signOut();
              }}
            >
              <FormattedMessage id="logout" defaultMessage="Logout" />
            </Button>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
