import React, { useState } from "react";
import {
  Fab,
  Drawer,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Box,
  Typography,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  setTheme,
  setDarkMode,
  setLang,
} from "../../../redux/customizer/Action";
import FeatherIcon from "feather-icons-react";
import { CustomRadioButton } from "../../../components/forms/custom-elements/CustomRadio";
const SidebarWidth = "320px";

const ChangeSettings = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const dispatch = useDispatch();
  const thColors = [
    {
      id: 1,
      bgColor: "#1a9bfc",
      disp: "BLUE_THEME",
    },
    {
      id: 2,
      bgColor: "#00cec3",
      disp: "GREEN_THEME",
    },
    {
      id: 3,
      bgColor: "#7352ff",
      disp: "PURPLE_THEME",
    },
    {
      id: 4,
      bgColor: "#ff5c8e",
      disp: "RED_THEME",
    },
    {
      id: 5,
      bgColor: "#1e4db7",
      disp: "INDIGO_THEME",
    },
  ];
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: "15px", bottom: "15px" }}
        onClick={() => setShowDrawer(true)}
      >
        <FeatherIcon icon="settings" />
      </Fab>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <Box p={2}>
          <Typography variant="h3">
            <FormattedMessage id="drawer.settings" defaultMessage="Settings" />
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="drawer.language" defaultMessage="Language" />
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="lang"
              name="lang"
              value={customizer.activeLang}
              onChange={(event) => dispatch(setLang(event.target.value))}
            >
              <FormControlLabel
                value="es"
                control={<CustomRadioButton />}
                label="Español"
              />
              <FormControlLabel
                value="en"
                control={<CustomRadioButton />}
                label="English"
              />
            </RadioGroup>
          </FormControl>
          {/* ------------ Dark light theme setting ------------- */}
          <Typography variant="h4" gutterBottom>
            <FormattedMessage
              id="drawer.themeoption"
              defaultMessage="Theme option"
            />
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="theme"
              name="theme"
              value={customizer.activeMode}
              onChange={(event) => dispatch(setDarkMode(event.target.value))}
            >
              <FormControlLabel
                value="light"
                control={<CustomRadioButton />}
                label={
                  <FormattedMessage
                    id="drawer.themeoption.light"
                    defaultMessage="Light"
                  />
                }
              />
              <FormControlLabel
                value="dark"
                control={<CustomRadioButton />}
                label={
                  <FormattedMessage
                    id="drawer.themeoption.dark"
                    defaultMessage="Dark"
                  />
                }
              />
            </RadioGroup>
          </FormControl>
          <Box pt={3}></Box>
          {/* ------------ RTL theme setting ------------- */}
          {/* <Typography variant="h4" gutterBottom>
            <FormattedMessage
              id="drawer.themedirection"
              defaultMessage="Theme direction"
            />
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="themedir"
              name="themedir"
              value={customizer.activeDir}
              onChange={(event) => dispatch(setDir(event.target.value))}
            >
              <FormControlLabel
                value="ltr"
                control={<CustomRadioButton />}
                label="LTR"
              />
              <FormControlLabel
                value="rtl"
                control={<CustomRadioButton />}
                label="RTL"
              />
            </RadioGroup>
          </FormControl>
          <Box pt={3}></Box> */}
          {/* ------------ Navbar Color setting ------------- */}
          <Typography variant="h4" gutterBottom>
            <FormattedMessage
              id="drawer.themecolor"
              defaultMessage="Theme color"
            />
          </Typography>
          {thColors.map((thcolor) => {
            return (
              <Fab
                color="primary"
                style={{ backgroundColor: thcolor.bgColor }}
                sx={{ marginRight: "3px" }}
                size="small"
                key={thcolor.id}
                onClick={() => dispatch(setTheme(thcolor.disp))}
              >
                {customizer.activeTheme === thcolor.disp ? (
                  <FeatherIcon icon="check" size="16" />
                ) : (
                  ""
                )}
              </Fab>
            );
          })}

          <Box pt={3}></Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default ChangeSettings;
