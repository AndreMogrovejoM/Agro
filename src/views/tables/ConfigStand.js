import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Fab,
  Modal,
  Tab,
  Tabs,
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import api from "../../services/Api";
import ConfigStaff from "./ConfigStandStaff";
import Customizer from "../../layouts/full-layout/customizer/Customizer";

import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import TableDataConfigStand from "./TableDataConfigStand";

import Swal from "sweetalert2";

import { NavLink } from "react-router-dom";

import { FormattedMessage } from "react-intl";

import { useParams } from "react-router";

import "./style.css";

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Configuración de Stand",
  },
];

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

function ConfigStand(props) {
  const { id } = useParams();

  const [value, setValue] = useState("Stand");

  const [publicidades, setPublicidades] = useState();
  const [excels, setExcels] = useState();
  const [pdfs, setPdfs] = useState();
  const [staffs, setStaffs] = useState();
  // const [resource, setResource] = useState();

  // Evidences
  const [evidence, setEvidence] = useState();

  // Tabs

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };

  // MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEvidence("");
    setDescription("");
  };

  const [openExcel, setOpenExcel] = useState(false);
  const handleOpenExcel = () => setOpenExcel(true);
  const handleCloseExcel = () => {
    setOpenExcel(false);
    setEvidence("");
    setDescription("");
  };

  const [openPDF, setOpenPDF] = useState(false);
  const handleOpenPDF = () => setOpenPDF(true);
  const handleClosePDF = () => {
    setOpenPDF(false);
    setEvidence("");
    setDescription("");
  };

  // Table modal
  // publicidades
  const [CPopen, setCPOpen] = useState(false);
  const handleCPOpen = () => {
    GetPublicidades();
  };
  const handleCPClose = () => {
    setCPOpen(false);
  };

  // Excels
  const [CEopen, setCEOpen] = useState(false);
  const handleCEOpen = () => {
    GetExcels();
  };
  const handleCEClose = () => {
    setCEOpen(false);
  };

  // PDFs
  const [Pdfsopen, setPdfsOpen] = useState(false);
  const handlePdfsOpen = () => {
    GetPdfs();
  };
  const handlePdfsClose = () => {
    setPdfsOpen(false);
  };

  // BorradoLogico

  const BorradoLogico = (id, type, index) => {
    Swal.fire({
      title: "¿Usted está seguro de eliminar este documento?",
      text: "No podrá revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      reverseButtons: true,
      confirmButtonText: "Si, eliminarlo",
    }).then((result) => {
      // console.log(result);
      let endpoint = `image`;
      switch (type) {
        case "Publicidades":
          endpoint = `image`;
          break;
        case "Excels":
          endpoint = `excel`;
          break;
        case "PDFS":
          endpoint = `pdf`;
          break;
        case "resource":
          endpoint = `resource`;
          break;
        default:
          break;
      }
      if (result.value) {
        // console.log(`/fair3D/${endpoint}/${id}/`);
        api
          .delete(`/fair3D/${endpoint}/${id}/`)
          .then((response) => {
            // console.log("RESPONSE DELETE>>>>>", response.data);
            switch (type) {
              case "Publicidades":
                setPublicidades(response.data);
                break;
              case "Excels":
                setExcels(response.data);
                break;
              case "PDFS":
                setPdfs(response.data);
                break;
              // case "resource":
              //   setResource(response.data);
              //   break;
              default:
                break;
            }
            Swal.fire(
              "¡Eliminado!",
              "El documento fue eliminado con exito.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "¡Error!",
              text: error,
              icon: "error",
              confirmButtonColor: "#e01717",
              confirmButtonText: "Salir",
            });
          });
      }
    });
  };

  const [description, setDescription] = useState("");

  const [formValues, setFormValues] = useState({
    url_facebook: "",
    url_twitter: "",
    url_linkedin: "",
    url_web_page: "",
    url_video: "",
  });

  useEffect(() => {
    GetConfigStand(id);
    GetStaffs(id);
  }, []);

  const handleEvidenceChange = (event) => {
    if (event.target.files[0]) {
      setEvidence(event.target.files[0]);
      // console.log(event.target.files[0]);
    }
  };

  // GETS

  const GetConfigStand = (id) => {
    api.get(`/fair3D/detail_stand/${id}`).then((response) => {
      // console.log(response.data);
      setFormValues(response.data);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const GetPublicidades = () => {
    api.get(`/fair3D/image/list/${id}`).then((response) => {
      // console.log(response.data);
      setPublicidades(response.data);
      setCPOpen(true);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const GetPdfs = () => {
    api.get(`/fair3D/pdf/list/${id}`).then((response) => {
      // console.log(response.data);
      setPdfs(response.data);
      setPdfsOpen(true);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const GetExcels = () => {
    api.get(`/fair3D/excel/list/${id}`).then((response) => {
      // console.log(response.data);
      setExcels(response.data);
      setCEOpen(true);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const GetStaffs = (id) => {
    api.get(`/fair3D/staff/list/${id}`).then((response) => {
      // console.log(response.data);
      setStaffs(response.data);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  // POST

  const PostPublicidad = (Fdata) => {
    // console.log("MYDATA", Fdata);
    api.post(`/fair3D/image/`, Fdata).then((response) => {
      // console.log("RESPONSE>>>", response.data);

      Swal.fire(
        "Éxito",
        "La imágen publicitaria fue agregada con éxito",
        "success"
      );
      handleClose();
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const PostPDF = (Fdata) => {
    // console.log("MYDATA", Fdata);
    api.post(`/fair3D/pdf/`, Fdata).then((response) => {
      // console.log("RESPONSE>>>", response.data);

      Swal.fire("Éxito", "El documento fue agregado con éxito", "success");
      handleClosePDF();
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const PostExcel = (Fdata) => {
    // console.log("MYDATA", Fdata);
    api.post(`/fair3D/excel/`, Fdata).then((response) => {
      // console.log("RESPONSE>>>", response.data);

      Swal.fire("Éxito", "El documento fue agregado con éxito", "success");
      handleCloseExcel();
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const PutConfigStand = (Fdata, id) => {
    // console.log("ID", id);
    // console.log("Fdata", Fdata);
    api
      .put(`/fair3D/configure_stand/${id}/`, Fdata)
      .then((response) => {
        // console.log("DATA>>", response.data);
        // console.log("res status", response.status);
        Swal.fire("¡Éxito!", "Configuración de Stand éxitosa", "success");
        // setTimeout(function () {
        //   navigate("/admin/register-guests");
        // }, 1000);
      })
      .catch((error) => {
        Swal.fire(
          "Error en el registro de invitado",
          "Comprueba que todos los datos esten correctos",
          "error"
        );
        console.log("error :- ", error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = e.target;

    const Fdata = {
      url_facebook: data.url_facebook.value,
      url_twitter: data.url_twitter.value,
      url_linkedin: data.url_linkedin.value,
      url_web_page: data.url_web_page.value,
      url_video: data.url_video.value,
    };

    // console.log(Fdata);

    try {
      await PutConfigStand(Fdata, id);
    } catch (error) {
      // console.log("Error en", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
  };

  const handleInputChangeDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  return (
    <PageContainer
      title="Sign Up Clients"
      description="this is Register page"
      // style={{ overflowY: "auto" }}
    >
      <Breadcrumb
        hideName={true}
        showBackButton={true}
        backButtonDirection={"/admin/exhibidor"}
        items={BCrumb}
      />
      <Grid container spacing={0} sx={{ justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          display="flex"
          alignItems="center"
          style={{ zIndex: 1 }}
        >
          <Grid
            container
            spacing={0}
            display="flex"
            justifyContent="center"
            sx={{ overflowY: "auto" }}
          >
            <Grid item xs={12} lg={9} xl={10}>
              <Box
                sx={{
                  p: 4,
                }}
              >
                <Grid container spacing={0} display="flex" alignItems="center">
                  <Grid item xs={2} sm={2} md={1}>
                    <StorefrontIcon
                      fontSize="large"
                      sx={{
                        mr: 2,
                        color: "primary.main",
                      }}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} md={11}>
                    <Typography
                      color="textSecondary"
                      variant="h2"
                      fontWeight="500"
                      sx={{
                        mr: 1,
                      }}
                    >
                      <FormattedMessage
                        id="standConfig"
                        defaultMessage="Stand Config"
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                  />

                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="secondary"
                    allowScrollButtonsMobile
                    scrollButtons="auto"
                    indicatorColor="secondary"
                    variant="scrollable"
                  >
                    <Tab
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "30px",
                        color: "primary.main",
                      }}
                      label={
                        <>
                          <StorefrontIcon />
                          <FormattedMessage id="Stand" defaultMessage="Stand" />
                        </>
                      }
                      value="Stand"
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "30px",
                        color: "primary.main",
                      }}
                      label={
                        <>
                          <PersonPinIcon />
                          <FormattedMessage id="Stuff" defaultMessage="Staff" />
                        </>
                      }
                      value="Staff"
                      {...a11yProps(2)}
                    />
                  </Tabs>

                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                  />

                  {value === "Stand" ? (
                    <>
                      <div>
                        <CustomFormLabel htmlFor="name">
                          <FormattedMessage
                            id="publicity"
                            defaultMessage="Publicity"
                          />
                        </CustomFormLabel>

                        <Grid>
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={6}>
                              <Button onClick={handleOpen}>
                                <AddIcon
                                  fontSize="large"
                                  sx={{
                                    mr: 2,
                                    color: "primary.main",
                                  }}
                                />
                                <FormattedMessage
                                  id="add"
                                  defaultMessage="Add"
                                />
                                <FormattedMessage
                                  id="publicity"
                                  defaultMessage="Publicity"
                                />
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    // border: "2px solid #000",
                                    boxShadow: 24,
                                    p: 4,
                                  }}
                                >
                                  <Typography
                                    color="textSecondary"
                                    variant="h2"
                                    fontWeight="500"
                                    sx={{ alignitems: "center", pb: 2, pl: 2 }}
                                  >
                                    <AddIcon
                                      fontSize="medium"
                                      sx={{
                                        mr: 2,
                                        color: "primary.main",
                                      }}
                                    />
                                    <FormattedMessage
                                      id="add"
                                      defaultMessage="Add"
                                    />
                                    <FormattedMessage
                                      id="publicity"
                                      defaultMessage="Publicity"
                                    />
                                  </Typography>

                                  <label htmlFor="upload-photo">
                                    <input
                                      style={{ display: "none" }}
                                      name={`publicity`}
                                      id={`publicity`}
                                      type="file"
                                      onChange={handleEvidenceChange}
                                      fullWidth
                                      accept=" image/png, image/gif, image/jpeg"
                                      noValidate
                                    />
                                    {evidence ? (
                                      <>
                                        <Typography
                                          color="red"
                                          variant="h5"
                                          fontWeight="400"
                                          sx={{
                                            alignitems: "center",
                                            p: 1,
                                          }}
                                        >
                                          <FormattedMessage
                                            id="notifyDescription"
                                            defaultMessage="notifyDescription"
                                          />
                                        </Typography>
                                        <Typography
                                          color="primary"
                                          variant="h3"
                                          fontWeight="400"
                                          sx={{
                                            alignitems: "center",
                                            borderRadius: "5px",
                                            p: 1,
                                            cursor: "pointer",
                                          }}
                                          border={1}
                                        >
                                          {evidence.name}
                                        </Typography>
                                        <CustomFormLabel htmlFor="name">
                                          <FormattedMessage
                                            id="description"
                                            defaultMessage="Description"
                                          />
                                        </CustomFormLabel>
                                        <CustomTextField
                                          id="description"
                                          name="description"
                                          value={description}
                                          onChange={
                                            handleInputChangeDescription
                                          }
                                          variant="outlined"
                                          fullWidth
                                          inputProps={{ maxLength: 50 }}
                                          type="text"
                                          sx={{ pb: 0 }}
                                        />
                                        <Typography
                                          variant="h6"
                                          color="TextPrimary"
                                          fontWeight="300"
                                          sx={{ pb: 1 }}
                                        >
                                          <FormattedMessage
                                            id="maxSizeChars"
                                            defaultMessage="maxSizeChars"
                                          />
                                        </Typography>
                                        <Button
                                          color="primary"
                                          size="large"
                                          aria-label="add"
                                          style={{ width: "100%" }}
                                          variant="contained"
                                          onClick={() => {
                                            const formData = new FormData();
                                            formData.append("image", evidence);
                                            formData.append(
                                              "stand",
                                              parseInt(id)
                                            );
                                            formData.append(
                                              "caption",
                                              description
                                            );

                                            PostPublicidad(formData);
                                          }}
                                        >
                                          <AddIcon />
                                          <FormattedMessage
                                            id="send"
                                            defaultMessage="Send"
                                          />
                                        </Button>
                                      </>
                                    ) : (
                                      <Fab
                                        color="primary"
                                        size="large"
                                        component="span"
                                        aria-label="add"
                                        style={{ width: "100%" }}
                                        variant="extended"
                                      >
                                        <AddIcon />
                                        <FormattedMessage
                                          id="Upimages"
                                          defaultMessage="Upload Image"
                                        />
                                      </Fab>
                                    )}
                                  </label>
                                  <Typography
                                    variant="h5"
                                    color="red"
                                    fontWeight="300"
                                    sx={{ pt: 2 }}
                                  >
                                    <FormattedMessage
                                      id="maxSizeImg"
                                      defaultMessage="maxSizeImg"
                                    />
                                  </Typography>
                                </Box>
                              </Modal>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                              <Button onClick={handleCPOpen}>
                                <VisibilityIcon
                                  fontSize="large"
                                  sx={{
                                    mr: 2,
                                    color: "primary.main",
                                  }}
                                />
                                <FormattedMessage
                                  id="remove"
                                  defaultMessage="Remove"
                                />
                                <FormattedMessage
                                  id="publicity"
                                  defaultMessage="Publicity"
                                />
                              </Button>
                              <Modal
                                open={CPopen}
                                onClose={handleCPClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{ pb: 3, pr: 3, pl: 3 }}
                              >
                                <>
                                  <Button
                                    onClick={handleCPClose}
                                    sx={{ mt: 3, ml: 2, minWidth: "100px" }}
                                    variant="contained"
                                  >
                                    <CancelIcon fontSize="large" />
                                  </Button>
                                  <TableDataConfigStand
                                    isImage={true}
                                    title="Publicidades"
                                    List={publicidades}
                                    BorradoLogico={BorradoLogico}
                                    style={{ minWidth: "500px" }}
                                  />
                                </>
                              </Modal>
                            </Grid>
                          </Grid>

                          <label htmlFor="upload-photo">
                            <input
                              style={{ display: "none" }}
                              name="upload-photo"
                              id="upload-photo"
                              type="file"
                              onChange={handleEvidenceChange}
                              fullWidth
                              accept="image/png, image/gif, image/jpeg, image/jpg"
                            />

                            {/* <Typography
                          color="#FF0000"
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="register.uploadWarning"
                            defaultMessage="Please upload a document"
                          />
                        </Typography> */}
                          </label>

                          <Box sx={{ mb: 1 }} />
                        </Grid>
                      </div>
                      {/* INICIO EXCEL */}
                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel htmlFor="name">
                          <FormattedMessage id="Excel" defaultMessage="Excel" />
                        </CustomFormLabel>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                          <Button onClick={handleOpenExcel}>
                            <AddIcon
                              fontSize="large"
                              sx={{
                                mr: 2,
                                color: "primary.main",
                              }}
                            />
                            <FormattedMessage id="add" defaultMessage="Add" />
                            Excel
                          </Button>
                          <Modal
                            open={openExcel}
                            onClose={handleCloseExcel}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                // border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <Typography
                                color="textSecondary"
                                variant="h2"
                                fontWeight="500"
                                sx={{ alignitems: "center", pb: 2, pl: 2 }}
                              >
                                <AddIcon
                                  fontSize="medium"
                                  sx={{
                                    mr: 2,
                                    color: "primary.main",
                                  }}
                                />
                                <FormattedMessage
                                  id="add"
                                  defaultMessage="Add"
                                />
                                Excel
                              </Typography>
                              <label htmlFor="upload-photo">
                                <input
                                  style={{ display: "none" }}
                                  name={`excel`}
                                  id={`excel`}
                                  type="file"
                                  onChange={handleEvidenceChange}
                                  fullWidth
                                  accept=".xlsx, .xls, .csv, application/xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet "
                                  noValidate
                                />
                                {evidence ? (
                                  <>
                                    <Typography
                                      color="red"
                                      variant="h5"
                                      fontWeight="400"
                                      sx={{
                                        alignitems: "center",
                                        p: 1,
                                      }}
                                    >
                                      <FormattedMessage
                                        id="notifyDescription"
                                        defaultMessage="notifyDescription"
                                      />
                                    </Typography>
                                    <Typography
                                      color="primary"
                                      variant="h3"
                                      fontWeight="400"
                                      sx={{
                                        alignitems: "center",
                                        borderRadius: "5px",
                                        p: 1,
                                        cursor: "pointer",
                                      }}
                                      border={1}
                                    >
                                      {evidence.name}
                                    </Typography>
                                    <CustomFormLabel htmlFor="name">
                                      <FormattedMessage
                                        id="description"
                                        defaultMessage="Description"
                                      />
                                    </CustomFormLabel>
                                    <CustomTextField
                                      id="description"
                                      name="description"
                                      value={description}
                                      onChange={handleInputChangeDescription}
                                      variant="outlined"
                                      fullWidth
                                      inputProps={{ maxLength: 50 }}
                                      type="text"
                                      sx={{ pb: 0 }}
                                    />
                                    <Typography
                                      variant="h6"
                                      color="TextPrimary"
                                      fontWeight="300"
                                      sx={{ pb: 1 }}
                                    >
                                      <FormattedMessage
                                        id="maxSizeChars"
                                        defaultMessage="maxSizeChars"
                                      />
                                    </Typography>
                                    <Button
                                      color="primary"
                                      size="large"
                                      aria-label="add"
                                      style={{ width: "100%" }}
                                      variant="contained"
                                      onClick={() => {
                                        const formData = new FormData();
                                        formData.append("file", evidence);
                                        formData.append("stand", parseInt(id));
                                        formData.append(
                                          "description",
                                          description
                                        );

                                        PostExcel(formData);
                                      }}
                                    >
                                      <AddIcon />
                                      <FormattedMessage
                                        id="send"
                                        defaultMessage="Send"
                                      />
                                    </Button>
                                  </>
                                ) : (
                                  <Fab
                                    color="primary"
                                    size="large"
                                    component="span"
                                    aria-label="add"
                                    style={{ width: "100%" }}
                                    variant="extended"
                                  >
                                    <AddIcon />
                                    <FormattedMessage
                                      id="uploadDoc"
                                      defaultMessage="Upload Doc"
                                    />
                                  </Fab>
                                )}
                              </label>
                              <Typography
                                variant="h5"
                                color="red"
                                fontWeight="300"
                                sx={{ pt: 2 }}
                              >
                                <FormattedMessage
                                  id="maxSizeDoc"
                                  defaultMessage="maxSizeDoc"
                                />
                              </Typography>
                            </Box>
                          </Modal>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Button onClick={handleCEOpen}>
                            <VisibilityIcon
                              fontSize="large"
                              sx={{
                                mr: 2,
                                color: "primary.main",
                              }}
                            />
                            <FormattedMessage
                              id="remove"
                              defaultMessage="Remove"
                            />
                            Excel
                          </Button>
                          <Modal
                            open={CEopen}
                            onClose={handleCEClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{
                              padding: "30px",
                            }}
                            sx={{ pb: 3, pr: 3, pl: 3 }}
                          >
                            <>
                              <Button
                                onClick={handleCEClose}
                                sx={{ mt: 3, ml: 2, minWidth: "100px" }}
                                variant="contained"
                              >
                                <CancelIcon fontSize="large" />
                              </Button>
                              <TableDataConfigStand
                                title="Excels"
                                List={excels}
                                BorradoLogico={BorradoLogico}
                                style={{ minWidth: "500px" }}
                              />
                            </>
                          </Modal>
                        </Grid>
                      </Grid>

                      <Box sx={{ mb: 1 }} />
                      {/* Inicio PDF */}
                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel htmlFor="name">
                          <FormattedMessage id="pdf" defaultMessage="PDF" />
                        </CustomFormLabel>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                          <Button onClick={handleOpenPDF}>
                            <AddIcon
                              fontSize="large"
                              sx={{
                                mr: 2,
                                color: "primary.main",
                              }}
                            />
                            <FormattedMessage id="add" defaultMessage="Add" />
                            PDF
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Button onClick={handlePdfsOpen}>
                            <VisibilityIcon
                              fontSize="large"
                              sx={{
                                mr: 2,
                                color: "primary.main",
                              }}
                            />
                            <FormattedMessage
                              id="remove"
                              defaultMessage="Remove"
                            />
                            PDF
                          </Button>
                          <Modal
                            open={Pdfsopen}
                            onClose={handlePdfsClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{
                              padding: "30px",
                            }}
                            sx={{ pb: 3, pr: 3, pl: 3 }}
                          >
                            <>
                              <Button
                                onClick={handlePdfsClose}
                                sx={{ mt: 3, ml: 2, minWidth: "100px" }}
                                variant="contained"
                              >
                                <CancelIcon fontSize="large" />
                              </Button>
                              <TableDataConfigStand
                                title="PDFS"
                                List={pdfs}
                                BorradoLogico={BorradoLogico}
                                style={{ minWidth: "500px" }}
                              />
                            </>
                          </Modal>

                          <Modal
                            open={openPDF}
                            onClose={handleClosePDF}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                // border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <Typography
                                color="textSecondary"
                                variant="h2"
                                fontWeight="500"
                                sx={{ alignitems: "center", pb: 2, pl: 2 }}
                              >
                                <AddIcon
                                  fontSize="medium"
                                  sx={{
                                    mr: 2,
                                    color: "primary.main",
                                  }}
                                />
                                <FormattedMessage
                                  id="add"
                                  defaultMessage="Add"
                                />
                                PDF
                              </Typography>
                              <label htmlFor="upload-photo">
                                <input
                                  style={{ display: "none" }}
                                  name={`publicity`}
                                  id={`publicity`}
                                  type="file"
                                  onChange={handleEvidenceChange}
                                  fullWidth
                                  accept="application/pdf, .pdf"
                                  noValidate
                                />
                                {evidence ? (
                                  <>
                                    <Typography
                                      color="red"
                                      variant="h5"
                                      fontWeight="400"
                                      sx={{
                                        alignitems: "center",
                                        p: 1,
                                      }}
                                    >
                                      <FormattedMessage
                                        id="notifyDescription"
                                        defaultMessage="notifyDescription"
                                      />
                                    </Typography>
                                    <Typography
                                      color="primary"
                                      variant="h3"
                                      fontWeight="400"
                                      sx={{
                                        alignitems: "center",
                                        borderRadius: "5px",
                                        p: 1,
                                        cursor: "pointer",
                                      }}
                                      border={1}
                                    >
                                      {evidence.name}
                                    </Typography>
                                    <CustomFormLabel htmlFor="name">
                                      <FormattedMessage
                                        id="description"
                                        defaultMessage="Description"
                                      />
                                    </CustomFormLabel>
                                    <CustomTextField
                                      id="description"
                                      name="description"
                                      value={description}
                                      onChange={handleInputChangeDescription}
                                      variant="outlined"
                                      fullWidth
                                      inputProps={{ maxLength: 50 }}
                                      type="text"
                                      sx={{ pb: 0 }}
                                    />
                                    <Typography
                                      variant="h6"
                                      color="TextPrimary"
                                      fontWeight="300"
                                      sx={{ pb: 1 }}
                                    >
                                      <FormattedMessage
                                        id="maxSizeChars"
                                        defaultMessage="maxSizeChars"
                                      />
                                    </Typography>
                                    <Button
                                      color="primary"
                                      size="large"
                                      aria-label="add"
                                      style={{ width: "100%" }}
                                      variant="contained"
                                      onClick={() => {
                                        const formData = new FormData();
                                        formData.append("file", evidence);
                                        formData.append("stand", parseInt(id));
                                        formData.append(
                                          "description",
                                          description
                                        );

                                        PostPDF(formData);
                                      }}
                                    >
                                      <AddIcon />
                                      <FormattedMessage
                                        id="send"
                                        defaultMessage="Send"
                                      />
                                    </Button>
                                  </>
                                ) : (
                                  <Fab
                                    color="primary"
                                    size="large"
                                    component="span"
                                    aria-label="add"
                                    style={{ width: "100%" }}
                                    variant="extended"
                                  >
                                    <AddIcon />
                                    <FormattedMessage
                                      id="uploadDoc"
                                      defaultMessage="Upload Doc"
                                    />
                                  </Fab>
                                )}
                              </label>
                              <Typography
                                variant="h5"
                                color="red"
                                fontWeight="300"
                                sx={{ pt: 2 }}
                              >
                                <FormattedMessage
                                  id="maxSizeDoc"
                                  defaultMessage="maxSizeDoc"
                                />
                              </Typography>
                            </Box>
                          </Modal>
                        </Grid>
                      </Grid>

                      <Box sx={{ mb: 2 }} />
                      {/* Fin PDF */}

                      <Box
                        sx={{ borderBottom: 2, borderColor: "divider", mb: 2 }}
                      />
                      <Typography
                        color="textPrimary"
                        variant="h2"
                        fontWeight="500"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="socialNetwork"
                          defaultMessage="Social Network"
                        />
                      </Typography>
                      <Box
                        sx={{
                          borderBottom: 2,
                          borderColor: "divider",
                          mb: 2,
                          mt: 2,
                        }}
                      />
                      {/* INICIO FACEBOOK */}
                      <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <CustomFormLabel htmlFor="name">
                              <h3>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <FacebookIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={9}
                                    sx={{ alignitems: "center" }}
                                  >
                                    <FormattedMessage
                                      id="facebook"
                                      defaultMessage="Facebook"
                                    />
                                  </Grid>
                                </Grid>
                              </h3>
                            </CustomFormLabel>
                            <CustomTextField
                              id="url_facebook"
                              type="text"
                              variant="outlined"
                              fullWidth
                              autoFocus
                              name="url_facebook"
                              onChange={handleInputChange}
                              autoComplete="fname"
                              value={formValues?.url_facebook}
                              label={
                                formValues?.url_facebook
                                  ? ""
                                  : "facebook.com/agrominperu"
                              }
                            />
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <CustomFormLabel htmlFor="name">
                              <h3>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <LinkedInIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={9}
                                    sx={{ alignitems: "center" }}
                                  >
                                    <FormattedMessage
                                      id="linkedin"
                                      defaultMessage="LinkedIn"
                                    />
                                  </Grid>
                                </Grid>
                              </h3>
                            </CustomFormLabel>
                            <CustomTextField
                              id="url_linkedin"
                              type="text"
                              variant="outlined"
                              fullWidth
                              autoFocus
                              name="url_linkedin"
                              onChange={handleInputChange}
                              autoComplete="lname"
                              value={formValues?.url_linkedin}
                              label={
                                formValues?.url_linkedin
                                  ? ""
                                  : "linkedin.com/company/agromin/"
                              }
                            />
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <CustomFormLabel htmlFor="name">
                              <h3>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <TwitterIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={9}
                                    sx={{ alignitems: "center" }}
                                  >
                                    <FormattedMessage
                                      id="twitter"
                                      defaultMessage="Twitter"
                                    />
                                  </Grid>
                                </Grid>
                              </h3>
                            </CustomFormLabel>
                            <CustomTextField
                              id="url_twitter"
                              type="text"
                              variant="outlined"
                              fullWidth
                              autoFocus
                              name="url_twitter"
                              onChange={handleInputChange}
                              autoComplete="fname"
                              value={formValues?.url_twitter}
                              label={
                                formValues?.url_twitter
                                  ? ""
                                  : "twitter.com/agrominperu"
                              }
                            />
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <CustomFormLabel htmlFor="name">
                              <h3>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <LanguageIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={9}
                                    sx={{ alignitems: "center" }}
                                  >
                                    <FormattedMessage
                                      id="webPage"
                                      defaultMessage="Web page"
                                    />
                                  </Grid>
                                </Grid>
                              </h3>
                            </CustomFormLabel>
                            <CustomTextField
                              id="url_web_page"
                              type="text"
                              variant="outlined"
                              fullWidth
                              autoFocus
                              name="url_web_page"
                              onChange={handleInputChange}
                              autoComplete="lname"
                              value={formValues?.url_web_page}
                              label={
                                formValues?.url_web_page
                                  ? ""
                                  : "agrominperu.com"
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <CustomFormLabel htmlFor="name" fullwidth>
                              <h3>
                                <Grid container spacing={2}>
                                  <Grid item xs={1}>
                                    <YouTubeIcon
                                      fontSize="medium"
                                      color="primary"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={11}
                                    sx={{ alignitems: "center" }}
                                  >
                                    Video Link
                                  </Grid>
                                </Grid>
                              </h3>
                            </CustomFormLabel>
                            <CustomTextField
                              id="url_video"
                              type="text"
                              variant="outlined"
                              fullWidth
                              autoFocus
                              name="url_video"
                              onChange={handleInputChange}
                              autoComplete="lname"
                              value={formValues?.url_video}
                              label={formValues?.url_video ? "" : "youtube.com"}
                            />
                          </Grid>
                        </Grid>
                        <Box
                          sx={{
                            position: "relative",
                            textAlign: "center",
                            mt: "20px",
                            mb: "0px",
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

                        {/* Start buttons confirm cancel */}
                        <Grid container spacing={2} sx={{ pt: 2 }}>
                          <Grid item xs={12} sm={6}>
                            <Button
                              to={"/admin/exhibidor"}
                              component={NavLink}
                              variant="contained"
                              color="secondary"
                              fullWidth
                              sx={{ pt: "10px", pb: "10px" }}
                            >
                              <CloseIcon
                                icon="user"
                                width="18"
                                height="18"
                              ></CloseIcon>
                              <Box fontWeight="400" sx={{ ml: 1 }}>
                                <FormattedMessage
                                  id="cancel"
                                  defaultMessage="Cancel"
                                />
                              </Box>
                            </Button>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Button
                              id="SendButton"
                              color="primary"
                              variant="contained"
                              size="large"
                              type="submit"
                              value={"editar"}
                              fullWidth
                              // component={Link}
                              // onClick={openCulqi}
                              // to="/"
                              sx={{
                                pt: "10px",
                                pb: "10px",
                              }}
                            >
                              <SaveIcon
                                icon="user"
                                width="18"
                                height="18"
                              ></SaveIcon>
                              <Box fontWeight="400" sx={{ ml: 1 }}>
                                <FormattedMessage
                                  id="buttonConfigStand"
                                  defaultMessage="Configure Stand"
                                />
                              </Box>
                            </Button>
                          </Grid>
                        </Grid>

                        {/* Finish buttos confirm cancel */}
                      </form>

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
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          borderTop: 1,
                          borderColor: "primary",
                          pb: 2,
                        }}
                      />
                      <Typography
                        color="#FF0000"
                        variant="h6"
                        fontWeight="400"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="register.check"
                          defaultMessage="All fields with (*) are required"
                        />
                      </Typography>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "primary",
                          pb: 2,
                        }}
                      />

                      <Typography
                        color="primary"
                        variant="h2"
                        fontWeight="500"
                        sx={{
                          m: 2,
                        }}
                      >
                        <PersonPinIcon fontSize="medium" sx={{ mr: 1 }} />
                        <FormattedMessage id="Stuff" defaultMessage="Stuff" />
                        {" 1 "}
                        <FormattedMessage
                          id="Obligatorio"
                          defaultMessage="Obligatorio"
                        />
                      </Typography>

                      <Box
                        sx={{ borderBottom: 1, borderColor: "primary", mb: 2 }}
                      />
                      {/* {console.log(
                        "STAFFS",
                        staffs[Object.keys(staffs)[0]]?.id
                      )} */}
                      <ConfigStaff id={staffs[Object.keys(staffs)[0]]?.id} />
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "primary",
                          mb: 2,
                          pt: 4,
                        }}
                      />
                      <Typography
                        color="primary"
                        variant="h2"
                        fontWeight="500"
                        sx={{
                          m: 2,
                        }}
                      >
                        <PersonPinIcon fontSize="medium" sx={{ mr: 1 }} />
                        <FormattedMessage id="Stuff" defaultMessage="Stuff" />
                        {" 2 "}
                        <FormattedMessage
                          id="Opcional"
                          defaultMessage="Opcional"
                        />
                      </Typography>

                      <Box
                        sx={{ borderBottom: 1, borderColor: "primary", mb: 2 }}
                      />

                      <ConfigStaff
                        id={staffs[Object.keys(staffs)[1]]?.id || null}
                      />
                    </>
                  )}
                  <div style={{ paddingbottom: "30px" }} />
                  {/* <Footer /> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Customizer />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default ConfigStand;
