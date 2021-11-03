import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import LogoIcon from "../logo/LogoIcon";

import FeatherIcon from "feather-icons-react";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const SidebarContent = (props) => {
  const { sidebar } = useSelector((state) => state.authReducer);
  const { activeLang } = useSelector((state) => state.CustomizerReducer);

  const [open, setOpen] = useState(true);
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  return (
    <Scrollbar style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <Box>
          <List>
            <Box sx={{ pl: 2 }}>
              <LogoIcon route="/user-profile" />
            </Box>
            {/* *******SubHeader**********/}
            <li key={"DASHBOARDS"}>
              <Typography
                variant="subtitle2"
                fontWeight="500"
                sx={{ my: 2, mt: 4, opacity: "0.4" }}
              >
                <FormattedMessage id="side.title" defaultMessage="Menu" />
              </Typography>
            </li>

            <List component="li" disablePadding key={"Feria Virtual"}>
              <ListItem
                button
                component={NavLink}
                to={"/convention"}
                sx={{
                  mb: 1,
                }}
              >
                <ListItemIcon>
                  <FeatherIcon icon={"box"} width="20" height="20" />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "white"
                        : "rgba(0, 0, 0, 0.87)",
                  }}
                >
                  {activeLang === "en" ? "Virtual Convention" : "Feria Virtual"}
                </ListItemText>
              </ListItem>
            </List>
            {
              // eslint-disable-next-line array-callback-return
              sidebar.map((item, index) => {
                // {/********Sub Menu********* */}

                if (item.visible !== false) {
                  return (
                    <List component="li" disablePadding key={index}>
                      <ListItem
                        onClick={() => handleClick(index)}
                        button
                        component={NavLink}
                        to={item.href}
                        sx={{
                          mb: 1,
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "white"
                              : "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        <ListItemIcon>
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText onClick={props.onSidebarClose}>
                          {activeLang === "en" ? item.english_name : item.title}
                        </ListItemText>
                      </ListItem>
                    </List>
                  );
                }
              })
            }
          </List>
        </Box>
      </Box>
    </Scrollbar>
  );
};

export default SidebarContent;
