import { useState } from "react";
import { Tab, Tabs, Grid, Box } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import Login from "./login";
import Register from "./register";
import LogoIcon from "../../full-layout/logo/LogoIcon";
import PageContainer from "../../../components/container/PageContainer";
import Spinner from "../../../views/spinner/Spinner";
import "../../../views/authentication/style.css";
import { useWindowDimensions } from "../../../helper/getWindowsDimension";

const FreeAuth = ({ isLoading, setIsLoading }) => {
  const [tab, setTab] = useState("login");
  const { width } = useWindowDimensions();

  const handleChange = (e, value) => {
    setTab(value);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <PageContainer title="Login" description="this is Login page">
        {isLoading && (
          <Spinner
            styles={{
              backgroundColor: "#4c4c4c8c",
              zIndex: "99",
              position: "absolute",
            }}
          />
        )}
        <Grid
          container
          spacing={0}
          sx={{ justifyContent: "center", overflow: "auto" }}
        >
          <div className="row">
            <div className="col">
              <center>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display="flex"
                  alignItems="center"
                  style={{ zIndex: 1 }}
                >
                  <Box
                    sx={{
                      mr: 5,
                      ml: 5,
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        <center>
                          {width > 600 ? (
                            <LogoIcon
                              width="480px"
                              height="220px"
                              maxWidth="840px"
                            />
                          ) : (
                            <LogoIcon width="280px" height="120px" />
                          )}
                        </center>
                      </div>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={12}
                  display="flex"
                  alignItems="center"
                  style={{ zIndex: 1 }}
                >
                  <Box
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <div className="">
                      <Tabs
                        name="inscription_id"
                        value={tab}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="fullWidth"
                        orientation={width > 600 ? "horizontal" : "vertical"}
                      >
                        <Tab
                          sx={{
                            minWidth: "315px",
                            fontWeight: 500,
                            fontSize: 24,
                            textTransform: "capitalize",
                            color: (theme) =>
                              theme.palette.mode === "dark" ? "white" : "black",
                          }}
                          label={
                            <FormattedMessage
                              id="view.Login.convention"
                              defaultMessage="Login"
                            />
                          }
                          value="login"
                        />
                        <Tab
                          sx={{
                            minWidth: "315px",
                            fontWeight: 500,
                            fontSize: 24,
                            textTransform: "capitalize",
                            color: (theme) =>
                              theme.palette.mode === "dark" ? "white" : "black",
                          }}
                          label={
                            <FormattedMessage
                              id="view.register.convention"
                              defaultMessage="Register"
                            />
                          }
                          value="register"
                        />
                      </Tabs>
                    </div>
                  </Box>
                </Grid>
              </center>
            </div>
          </div>
          {tab === "login" ? (
            <Login setIsLoading={setIsLoading}></Login>
          ) : (
            <Register setIsLoading={setIsLoading}></Register>
          )}
        </Grid>
      </PageContainer>
    </div>
  );
};

export default FreeAuth;
