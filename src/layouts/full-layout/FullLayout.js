import React, { useState } from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@material-ui/core";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Customizer from "./customizer/Customizer";
import { TopbarHeight } from "../../assets/global/Theme-variable";
import { useSelector } from "react-redux";
import Spinner from "../../views/spinner/Spinner";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = () => {
  //
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper className={customizer.activeMode === "dark" ? "darkbg" : ""}>
      {customizer.loading && (
        <Spinner
          styles={{
            backgroundColor: "#4c4c4c8c",
            zIndex: "1500",
            position: "absolute",
            height: "100%",
            top: 0,
            bottom: 0,
          }}
        />
      )}

      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor:
            customizer.activeMode === "dark" ? "#282C34" : "#ffffff",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      <Sidebar
        isSidebardir={customizer.activeDir === "ltr" ? "left" : "right"}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ height: "90vh", overflowY: "auto" }}>
            <Outlet />
          </Box>
          <Customizer />
          {/* <Footer /> */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
