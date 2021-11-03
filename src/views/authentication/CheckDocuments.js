import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  // MenuItem,
  // Select,
  Alert,
} from "@material-ui/core";
// import LogoIcon from "../../layouts/full-layout/logo/LogoIcon";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";

import Customizer from "../../layouts/full-layout/customizer/Customizer";
import Footer from "../../layouts/full-layout/footer/Footer";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

import { getUserDocumentsById, postUserState } from "../../services/profile";

import "./style.css";

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Documentos",
  },
];

const CheckDocuments = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(getUserDocumentsById(id));

  const [user, setUser] = useState();
  const [evidence, setEvidence] = useState("");

  const getUserInfo = async () => {
    try {
      const response = await getUserDocumentsById(id);
      setUser(response.data);
      setEvidence(response.data.evidence_image);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handlePage = () => {
    window.open(evidence, "_blank"); // to open new page
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);

    postUserState(id, e.target.value);

    // const checkData = {
    //   user_id: id, // 1
    //   review_id: e.target.value, // 2
    // };

    handleClick();
    // console.log(checkData);
  };

  const handleClick = () => {
    Swal.fire("Bien hecho", "Estado modificado correctamente", "success").then(
      navigate("/admin/participants-documents")
    );
  };

  // console.log(user);

  return (
    <PageContainer title="Check Documents" description="this is Register page">
      <Grid container spacing={0} sx={{ justifyContent: "center" }}>
        {/* breadcrumb */}
        <Breadcrumb
          showBackButton={true}
          backButtonDirection={"/admin/participants-documents"}
          title={
            <FormattedMessage
              id="checkdocuments"
              defaultMessage="Check Documents"
            />
          }
          items={BCrumb}
        ></Breadcrumb>
        {/* end breadcrumb */}

        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          display="flex"
          alignItems="center"
          style={{ zIndex: 1 }}
        >
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={10}>
              <Box
                sx={{
                  p: 4,
                }}
              >
                <Grid container spacing={2} display="flex" alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <AssignmentIndIcon
                      fontSize="large"
                      sx={{
                        mr: 2,
                        color: "primary.main",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Typography
                      color="textSecondary"
                      variant="h2"
                      fontWeight="500"
                      sx={{
                        mr: 1,
                      }}
                    >
                      <FormattedMessage
                        id="checkdocuments"
                        defaultMessage="Check Documents"
                      />
                    </Typography>
                  </Grid>
                  {evidence ? (
                    <Grid item xs={6} sm={4}>
                      <Alert severity="info">
                        <Button
                          onClick={handlePage}
                          variant="outlined"
                          fullWidth
                        >
                          <Typography
                            color="textPrimary"
                            variant="h3"
                            fontWeight="500"
                            sx={{
                              mr: 1,
                            }}
                          >
                            <FormattedMessage
                              id="checkdocuments"
                              defaultMessage="Check Documents"
                            />
                          </Typography>
                        </Button>
                      </Alert>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={4}>
                      <Alert
                        severity="warning"
                        variant="filled"
                        sx={{ minWidth: "300px" }}
                      >
                        <Typography
                          color="textPrimary"
                          variant="h3"
                          fontWeight="500"
                          fullWidth
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="noDocument"
                            defaultMessage="The user does not have documents."
                          />
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                </Grid>

                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  {user !== undefined && (
                    <form onSubmit={onSubmit}>
                      <Grid item xs={12}>
                        <CustomFormLabel id="label">
                          <FormattedMessage
                            id="register.documentType"
                            defaultMessage="Document Type"
                          />
                        </CustomFormLabel>

                        <CustomTextField
                          id="tdocument"
                          variant="outlined"
                          fullWidth
                          type="text"
                          value={user?.document_type}
                          disabled
                        />

                        <CustomFormLabel htmlFor="number">
                          <FormattedMessage
                            id="register.documentNumber"
                            defaultMessage="Document Number"
                          />
                        </CustomFormLabel>
                        <CustomTextField
                          id="documentNumber"
                          variant="outlined"
                          fullWidth
                          type="number"
                          max="8"
                          value={user?.document_number}
                          disabled
                        />
                      </Grid>

                      <CustomFormLabel htmlFor="number">RUC</CustomFormLabel>
                      <CustomTextField
                        id="ruc"
                        variant="outlined"
                        fullWidth
                        type="number"
                        inputProps={{ minLength: 8, maxLength: 9 }}
                        value={user?.ruc}
                        disabled
                      />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <CustomFormLabel htmlFor="name">
                            <FormattedMessage
                              id="register.name"
                              defaultMessage="Name"
                            />
                          </CustomFormLabel>
                          <CustomTextField
                            id="name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            autoComplete="fname"
                            value={user?.first_name}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomFormLabel htmlFor="name">
                            <FormattedMessage
                              id="register.lname"
                              defaultMessage="Last Name"
                            />
                          </CustomFormLabel>
                          <CustomTextField
                            id="lastName"
                            type="text"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            autoComplete="lname"
                            value={user?.last_name}
                            disabled
                          />
                        </Grid>
                      </Grid>
                      <CustomFormLabel htmlFor="name">
                        <FormattedMessage
                          id="register.college"
                          defaultMessage="College"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="college"
                        variant="outlined"
                        fullWidth
                        value={user?.college}
                        disabled
                      />

                      <CustomFormLabel htmlFor="phone">
                        <FormattedMessage
                          id="register.pNumber"
                          defaultMessage="Phone Number"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="number"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={user?.mobile}
                        inputProps={{ minLength: 9, maxLength: 18 }}
                        disabled
                      />

                      <CustomFormLabel htmlFor="name">
                        <FormattedMessage
                          id="register.country"
                          defaultMessage="Country"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="country"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={user?.country}
                        disabled
                      />

                      <CustomFormLabel htmlFor="email">
                        <FormattedMessage
                          id="register.email"
                          defaultMessage="Email Adress"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        type="email"
                        value={user?.email}
                        disabled
                      />
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          mb: 3,
                          mt: 2,
                        }}
                      />

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            id="Rechazar"
                            variant="contained"
                            size="large"
                            type="submit"
                            value={"2"}
                            onClick={onSubmit}
                            fullWidth
                            // component={Link}
                            // onClick={openCulqi}
                            // to="/"
                            sx={{
                              pt: "10px",
                              pb: "10px",
                              backgroundColor: "red",
                              "&:hover": {
                                background: "#cd0000",
                              },
                            }}
                          >
                            <FormattedMessage
                              id="checkdocuments.reject"
                              defaultMessage="Reject"
                            />
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            id="Aceptar"
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                            value={"1"}
                            onClick={onSubmit}
                            fullWidth
                            // component={Link}
                            // to="/"
                            sx={{
                              pt: "10px",
                              pb: "10px",
                            }}
                          >
                            <FormattedMessage
                              id="checkdocuments.accept"
                              defaultMessage="Accept"
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                  <Box
                    sx={{
                      position: "relative",
                      textAlign: "center",
                      mt: "20px",
                      mb: "20px",
                      "&::before": {
                        content: '""',
                        background: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#ecf0f2"
                          }`,
                        height: "1px",
                        width: "100%",
                        position: "absolute",
                        left: "0",
                        top: "13px",
                      },
                    }}
                  />

                  <div style={{ paddingbottom: "30px" }} />
                  <Footer />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Customizer />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CheckDocuments;
