import React from "react";

import { Drawer, useMediaQuery } from "@material-ui/core";
import { SidebarWidth } from "../../../assets/global/Theme-variable";

import SidebarContent from "./SidebarContent";

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <SidebarContent onSidebarClose={props.onSidebarClose} />
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      <SidebarContent onSidebarClose={props.onSidebarClose} />
    </Drawer>
  );
};

export default Sidebar;
