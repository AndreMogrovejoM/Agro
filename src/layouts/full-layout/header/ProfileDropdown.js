import React from "react";

import {
  Box,
  MenuItem,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";

import FeatherIcon from "feather-icons-react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ data, handleClose }) => {
  return (
    <Box>
      <Box
        sx={{
          pb: 3,
          mt: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={data.profile_image}
            alt={data.profile_image}
            sx={{
              width: "90px",
              height: "90px",
            }}
          ></Avatar>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: "1.235",
              }}
            >
              {data.first_name} {data.last_name}
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              {data.company}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                color="textSecondary"
                display="flex"
                alignItems="center"
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                  mr: 1,
                }}
              >
                <FeatherIcon icon="mail" width="18"></FeatherIcon>
              </Typography>
              <Typography color="textSecondary" variant="h6">
                {data.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />

      <Box>
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/user-profile/"
        >
          <MenuItem
            sx={{
              pt: 3,
              pb: 3,
            }}
            onClick={() => {
              location.replace("/user-profile");
            }}
          >
            <Box display="flex" alignItems="center" onClick={handleClose}>
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                  boxShadow: "none",
                  minWidth: "50px",
                  width: "45px",
                  height: "40px",
                  borderRadius: "10px",
                }}
              >
                <FeatherIcon icon="user" width="18" height="18"></FeatherIcon>
              </Button>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    lineHeight: "1.235",
                  }}
                >
                  <FormattedMessage
                    id="user.myprofile"
                    defaultMessage="My Profile"
                  />
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  <FormattedMessage
                    id="user.accountSettings"
                    defaultMessage="Account settings"
                  />
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Link>
        <Divider
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />

        <Divider
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileDropdown;
