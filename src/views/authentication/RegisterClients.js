import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import Swal from "sweetalert2";
import api from "../../services/Api";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Customizer from "../../layouts/full-layout/customizer/Customizer";
import Footer from "../../layouts/full-layout/footer/Footer";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router";

import "./style.css";

let rucError = false;
let mobileError = false;

function RegisterClients(props) {
  const types = [
    {
      name: "Exhibidor",
      en_name: "Exhibitor",
    },
    {
      name: "Colaborador Jr",
      en_name: "Jr Collaborator",
    },
    {
      name: "Colaborador",
      en_name: "Collaborator",
    },
    {
      name: "Auspiciador",
      en_name: "Sponsor",
    },
    {
      name: "Patrocinador",
      en_name: "Patron",
    },
    {
      name: "Periodista",
      en_name: "Journalist",
    },
  ];
  const { id } = useParams();
  // console.log(id);
  const [exhibitor, setExhibitor] = useState({
    ruc: "",
    company: "",
    mobile: "",
    country: "",
    country_es: "Perú",
    country_en: "Peru",
    email: "",
    tipo: "Exhibidor",
    group: "",
  });
  const [paisesEs, setPaisesEs] = useState([{ name: "Perú" }]);
  const [paisesEn, setPaisesEn] = useState([{ name: "Peru" }]);
  const [radioButton, setRadioButton] = useState("no");
  const [groups, setGroups] = useState();

  const countriesEs = async () => {
    await api.get("/paises/").then((response) => {
      setPaisesEs(response.data);
    });
    // .catch((error) => {
    //   // console.log("PAISES>>>>", error);
    // });
  };

  const countriesEn = async () => {
    await api.get("/countries/").then((response) => {
      setPaisesEn(response.data);
    });
    // .catch((error) => {
    //   // console.log("PAISES>>>>", error);
    // });
  };

  const getExhibitorGroups = () => {
    api.get(`human_resources/admin/exhibitor/groups/`).then((response) => {
      setGroups(response.data);
    });
    // .catch((error) => {
    //   // console.log("GUESTERROR>>>>", error);
    // });
  };

  const getExhibitorInfo = (id) => {
    console.log(id);
    api.get(`human_resources/admin/users/${id}`).then((response) => {
      setExhibitor(response.data);
    });
    // .catch((error) => {
    //   console.log("GUESTERROR>>>>", error);
    // });
  };

  const postExhibitor = (Fdata) => {
    console.log(Fdata);
    api
      .post(`/human_resources/admin/users/`, Fdata)
      .then((response) => {
        // console.log("DATA>>", response.data);
        // console.log("res status", response.status);
        Swal.fire("¡Registro de usuario exitoso!", "", "success").then(
          function () {
            window.location = "/admin/register";
          }
        );
      })
      .catch((error) => {
        Swal.fire(
          "Error en el registro del usuario",
          "Comprueba que todos los datos esten correctos",
          "error"
        );
        console.log("error :- ", error.user);
      });
  };

  const putExhibitor = (Fdata, id) => {
    // console.log("POSTDATA>>", Fdata);
    // console.log(id);
    const response = api
      .put(`/human_resources/admin/users/${id}/`, Fdata)
      .then((response) => {
        // console.log("PUT res :- ", response);
        // console.log("PUT res status:- ", response.status);
        Swal.fire("¡Edición del usuario exitoso!", "", "success").then(
          function () {
            window.location = "/admin/register";
          }
        );
      })
      .catch((error) => {
        console.log("PUT error :- ", error.message);
        Swal.fire(
          "Error en la edición de usuario",
          "Comprueba que todos los datos esten correctos",
          "error"
        );
      });
    console.log(response);
  };

  useEffect(() => {
    if (id) {
      getExhibitorInfo(id);
    }
    getExhibitorGroups();
    countriesEs();
    countriesEn();
  }, []);

  // function isCharacterALetter(char) {
  //   return /^[A-ZñÑ ]+$/i.test(char);
  // }

  function isNumeric(str) {
    return /^\d+$/.test(str);
  }

  function isPhone(str) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im.test(str);
  }

  const checkErrorbyType = (name) => {
    switch (name) {
      case "ruc":
        const docNumber = window.document.getElementById("ruc").value;
        if (
          !(docNumber.length >= 11 && docNumber.length <= 11) ||
          !isNumeric(docNumber)
        ) {
          rucError = true;
          // console.log("ruc invalido");
        } else {
          rucError = false;
        }
        break;

      case "mobile":
        const pNumber = window.document.getElementById("mobile")?.value;
        if (!isPhone(pNumber)) {
          mobileError = true;
          // console.log("numero telefono invalido");
        } else {
          mobileError = false;
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExhibitor((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
    checkErrorbyType(name);
  };

  const handleRadioButton = (newValue) => {
    setRadioButton(newValue.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(rucError || mobileError)) {
      if (localStorage.getItem("@agromin/language") === "es") {
        exhibitor.country = exhibitor.country_es;
      } else {
        exhibitor.country = exhibitor.country_en;
      }
      if (e.target.SendButton.value === "editar") {
        putExhibitor(exhibitor, id);
      } else {
        try {
          postExhibitor(exhibitor);
        } catch (error) {
          // console.log(error);
        }
      }
    }
  };

  return (
    <PageContainer title="Sign Up Clients" description="this is Register page">
      <Breadcrumb
        showBackButton={true}
        backButtonDirection={"/admin/register"}
      ></Breadcrumb>
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
          <Grid container spacing={0} display="flex" justifyContent="center">
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
                      {id ? (
                        <FormattedMessage
                          id="breadcrub.EditExhibitor"
                          defaultMessage="Edit Guest"
                        />
                      ) : (
                        <FormattedMessage
                          id="breadcrub.addExhibitor"
                          defaultMessage="Add Guest"
                        />
                      )}
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
                  <form onSubmit={onSubmit}>
                    <Grid item xs={12}>
                      {id ? (
                        <div>
                          <CustomFormLabel id="label">
                            <FormattedMessage
                              id="register.usertype"
                              defaultMessage="Document Type"
                            />
                          </CustomFormLabel>
                          <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="tdocument"
                            name="group"
                            value={exhibitor?.group}
                            onChange={handleInputChange}
                            labelId="Type Document"
                            defaultValue="Exhibidor"
                            disabled
                          >
                            {groups?.map((group) =>
                              localStorage.getItem("@agromin/language") ===
                              "es" ? (
                                <MenuItem value={group?.id}>
                                  {group?.name}
                                </MenuItem>
                              ) : (
                                <MenuItem value={group?.id}>
                                  {group?.name}
                                </MenuItem>
                              )
                            )}
                            )
                          </Select>
                        </div>
                      ) : (
                        <div>
                          <CustomFormLabel id="label">
                            <FormattedMessage
                              id="register.usertype"
                              defaultMessage="Document Type"
                            />
                          </CustomFormLabel>
                          <Select
                            variant="outlined"
                            required
                            fullWidth
                            id="tdocument"
                            name="tipo"
                            value={exhibitor?.tipo}
                            onChange={handleInputChange}
                            labelId="Type Document"
                            defaultValue="DNI"
                          >
                            {types.map((type) =>
                              localStorage.getItem("@agromin/language") ===
                              "es" ? (
                                <MenuItem value={type?.name}>
                                  {type?.name}
                                </MenuItem>
                              ) : (
                                <MenuItem value={type?.name}>
                                  {type?.en_name}
                                </MenuItem>
                              )
                            )}
                            )
                          </Select>
                        </div>
                      )}
                      <CustomFormLabel htmlFor="number">RUC*</CustomFormLabel>
                      <CustomTextField
                        id="ruc"
                        name="ruc"
                        value={exhibitor?.ruc}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        type="text"
                        inputProps={{ minLength: 11, maxLength: 11 }}
                      />
                      {rucError && (
                        <Typography
                          color="#FF0000"
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="register.badRuc"
                            defaultMessage="Número de documento inválido."
                          />
                        </Typography>
                      )}
                    </Grid>

                    {/* <Grid container spacing={2}>
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
                          required
                          autoFocus
                          autoComplete="fname"
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
                          required
                          autoFocus
                          autoComplete="lname"
                        />
                      </Grid>
                    </Grid> */}

                    <CustomFormLabel htmlFor="name">
                      <FormattedMessage
                        id="register.companyName"
                        defaultMessage="Company Name"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="company"
                      name="company"
                      value={exhibitor?.company}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      required
                      inputProps={{ maxLength: 30 }}
                    />

                    <CustomFormLabel htmlFor="email">
                      <FormattedMessage
                        id="register.email"
                        defaultMessage="Email Adress"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="email"
                      name="email"
                      value={exhibitor?.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      fullWidth
                      required
                      type="email"
                    />

                    <CustomFormLabel htmlFor="name">
                      <FormattedMessage
                        id="register.country"
                        defaultMessage="Country"
                      />
                    </CustomFormLabel>

                    {localStorage.getItem("@agromin/language") === "es" ? (
                      <Select
                        variant="outlined"
                        required
                        fullWidth
                        id="country_es"
                        name="country_es"
                        value={exhibitor?.country_es}
                        onChange={handleInputChange}
                        labelId="Country"
                        defaultValue=""
                      >
                        {paisesEs.map((pais, idx) => (
                          <MenuItem key={idx} value={pais.name}>
                            {pais.name}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        variant="outlined"
                        required
                        fullWidth
                        id="country_en"
                        name="country_en"
                        value={exhibitor?.country_en}
                        onChange={handleInputChange}
                        labelId="Country"
                        defaultValue=""
                      >
                        {paisesEn.map((pais, idx) => (
                          <MenuItem key={idx} value={pais.name}>
                            {pais.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    <CustomFormLabel id="label">
                      <FormattedMessage
                        id="register.radiobutton"
                        defaultMessage="Do you want us to contact you by whatsapp or a phone call?"
                      />
                    </CustomFormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            required="true"
                            checked={radioButton === "yes"}
                            onChange={handleRadioButton}
                            value="yes"
                          />
                        }
                        label={
                          <FormattedMessage
                            id="register.option1"
                            defaultMessage="Yes"
                          />
                        }
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            required="true"
                            checked={radioButton === "no"}
                            onChange={handleRadioButton}
                            value="no"
                          />
                        }
                        label={
                          <FormattedMessage
                            id="register.option2"
                            defaultMessage="No"
                          />
                        }
                      />
                    </RadioGroup>
                    {radioButton === "yes" ? (
                      <div>
                        <CustomFormLabel htmlFor="phone">
                          <FormattedMessage
                            id="register.pNumber"
                            defaultMessage="Phone Number"
                          />
                        </CustomFormLabel>
                        <CustomTextField
                          id="mobile"
                          name="mobile"
                          value={exhibitor?.mobile}
                          onChange={handleInputChange}
                          variant="outlined"
                          fullWidth
                          required
                          type="tel"
                          inputProps={{
                            minLength: 9,
                            maxLength: 12,
                          }}
                        />
                        {mobileError && (
                          <Typography
                            color="#FF0000"
                            variant="h6"
                            fontWeight="400"
                            sx={{
                              mr: 1,
                            }}
                          >
                            <FormattedMessage
                              id="register.phoneError"
                              defaultMessage="El número telefónico es inválido."
                            />
                          </Typography>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <Grid
                      container
                      spacing={2}
                      sx={{
                        mb: 3,
                        mt: 2,
                      }}
                    >
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="termsAndConditions"
                              color="primary"
                              required
                            />
                          }
                          label={
                            <FormattedMessage
                              id="register.acceptTerms"
                              defaultMessage="Accept Terms and conditions"
                            />
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              color="primary"
                            />
                          }
                          label={
                            <FormattedMessage
                              id="register.iWant"
                              defaultMessage="I want to get most our of Agromin"
                            />
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ pt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          to={"/admin/register"}
                          component={NavLink}
                          variant="contained"
                          color="secondary"
                          fullWidth
                          sx={{ pt: "10px", pb: "10px" }}
                        >
                          <CloseIcon icon="user" width="18" height="18" />
                          <Box fontWeight="400" sx={{ ml: 1 }}>
                            <FormattedMessage
                              id="cancel"
                              defaultMessage="Cancel"
                            />
                          </Box>
                        </Button>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        {id ? (
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
                            <EditIcon icon="user" width="18" height="18" />
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="breadcrub.EditParticipant"
                                defaultMessage="Edit Participant"
                              />
                            </Box>
                          </Button>
                        ) : (
                          <Button
                            id="SendButton"
                            color="primary"
                            variant="contained"
                            size="large"
                            type="submit"
                            value={"registrar"}
                            fullWidth
                            // component={Link}
                            // onClick={openCulqi}
                            // to="/"
                            sx={{
                              pt: "10px",
                              pb: "10px",
                            }}
                          >
                            <PersonAddIcon icon="user" width="18" height="18" />
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="breadcrub.addParticipant"
                                defaultMessage="Add Participant"
                              />
                            </Box>
                          </Button>
                        )}
                      </Grid>
                    </Grid>
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
}

export default RegisterClients;
