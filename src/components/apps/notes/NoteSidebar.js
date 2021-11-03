import React from "react";
import { Drawer, useMediaQuery } from "@material-ui/core";
import NoteList from "./NoteList";

const drawerWidth = 260;

const NoteSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  if (lgUp) {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex:1,
          [`& .MuiDrawer-paper`]: { position: "relative" },
        }}
        variant="permanent"
      >
        <NoteList />
      </Drawer>
    );
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        zIndex:1,
        [`& .MuiDrawer-paper`]: {
          width: 290,
          paddingTop:'70px'
        },
      }}
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
    >
      <NoteList />
    </Drawer>
  );
};

export default NoteSidebar;
