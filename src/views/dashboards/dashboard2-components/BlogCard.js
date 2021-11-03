import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";

import FeatherIcon from "feather-icons-react";

import { DashboardCard } from "../../../components/base-card/DashboardCard";

import background from "../../../assets/images/backgrounds/blog-bg2.jpg";

const options = ["Action", "Another Action", "Something else here"];

const BlogCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <DashboardCard
      title="Daily Activities"
      subtitle="Overview of Years"
      action={
        <Box>
          <IconButton
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <FeatherIcon icon="more-horizontal"></FeatherIcon>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      }
    >
      <Avatar
        src={background}
        alt="img"
        width="100%"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          mt: 2,
          "@media screen and (max-width: 991px)": {
            maxHeight: "200px",
          },
        }}
      />
      <Typography
        variant="h4"
        sx={{
          mt: 2,
        }}
      >
        React 18 coming soon!
      </Typography>
      <Typography color="textSecondary" variant="subtitle1">
        By Johnathan Doe
      </Typography>

      <Typography
        color="textSecondary"
        sx={{
          fontSize: "14px",
          mt: 2,
        }}
      >
        This will be the small description for the news you have shown here.
        There could be some great info.
      </Typography>
      <Button
        sx={{
          mt: 2,
        }}
        variant="contained"
        color="primary"
      >
        Read More
      </Button>
    </DashboardCard>
  );
};

export default BlogCard;
