import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  RadioGroup,
  Radio,
  Fab,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/PersonAdd";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import LogoIcon from "../../layouts/full-layout/logo/LogoIcon";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import { CulqiProvider, Culqi } from "../../components/react-culqi";
import api from "../../services/Api";

import Customizer from "../../layouts/full-layout/customizer/Customizer";
import Footer from "../../layouts/full-layout/footer/Footer";
import Spinner from "../spinner/Spinner";

import "./style.css";
import { useWindowDimensions } from "../../helper/getWindowsDimension";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

let flagError = false;
let nDocError = false;
let nameError = false;
let lnameError = false;
let jobError = false;
let rucError = false;
let emailError = false;
let phoneError = false;

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paises, setPaises] = useState([{ name: "Perú" }]);
  const [paisesEn, setPaisesEn] = useState([{ name: "Peru" }]);
  const [inscripcion, setInscripcion] = useState([{ name: "Participant" }]);
  const [documentos, setDocumentos] = useState([{ name: "DNI" }]);
  const [inscriptionTab, setInscription] = useState(parseInt(id) || 1);
  const [radioButton, setRadioButton] = useState("no");
  const [evidence, setEvidence] = useState();
  const [evidenceButton, setEvidenceButton] = useState("yes");
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();

  // const participantes = [
  //   {
  //     num: "3",
  //   },
  //   /* {
  //     num: "4",
  //   },
  //   {
  //     num: "5",
  //   },
  //   {
  //     num: "6",
  //   },
  //   {
  //     num: "7",
  //   },
  //   {
  //     num: "8",
  //   },
  //   {
  //     num: "9",
  //   },
  //   {
  //     num: "10",
  //   }, */
  // ];

  const inscription = async () => {
    setIsLoading(true);
    try {
      await api.get("/profile/inscription_types/").then((response) => {
        setInscripcion(response.data);
        // console.log(response.data);
      });

      await api.get("/profile/document_types/").then((response) => {
        setDocumentos(response.data);
        // console.log(response.data);
      });

      await api.get("/paises/").then((response) => {
        setPaises(response.data);
      });

      await api.get("/countries/").then((response) => {
        setPaisesEn(response.data);
      });
    } catch (error) {
      console.log("error al obtener la información", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const document = async () => {
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });
  // };

  // const countriesEs = async () => {
  //   // .catch((error) => {
  //   //   console.log("PAISES>>>>", error);
  //   // });
  // };

  // const countriesEn = async () => {
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });
  // };

  useEffect(() => {
    inscription();
    // countriesEn();
    // countriesEs();
    // document();
  }, []);

  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const enviar = () => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    formData.append("evidence", evidence);
    // console.log(formData);
    api({
      method: "post",
      url: "/profile/inscription/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        // console.log("K_____ res :- ", response);
        // console.log("K_____ res status:- ", response.status);
        Swal.fire({
          title: "Inscripción finalizada",
          text: `${response.data} sus credenciales fueron enviadas a su correo.`,
          icon: "success",
          confirmButtonText: "Gracias",
        }).then(navigate("/"));
      })
      .catch((error) => {
        // console.log("K_____ error :- ", error.response);
        Swal.fire({
          title: "¡Error!",
          text: `${error.response.data}`,
          icon: "error",
          confirmButtonColor: "#e01717",
          confirmButtonText: "Salir",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [formValues, setFormValues] = React.useState({
    inscription_id: 1,
    document_type: 1,
    document_number: "",
    ruc: "",
    number_participants: "3",
    name: "",
    last_name: "",
    date: "",
    company_name: "",
    job: "",
    phone_number: "",
    country: "",
    country_es: "Perú",
    country_en: "Peru",
    email: "",
    confirmemail: "",
    publicity: false,
    currency: "PEN",
    language: "es",
    token: "",
  });

  function isCharacterALetter(char) {
    return /^[A-ZñÑ ]+$/i.test(char);
  }

  function isNumeric(str) {
    return /^\d+$/.test(str);
  }

  function isPhone(str) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im.test(str);
  }

  const checkErrorbyType = (name) => {
    switch (name) {
      case "document_number":
        const docNumber =
          window.document.getElementById("documentNumber").value;
        if (
          !(docNumber.length >= 8 && docNumber.length <= 12) ||
          !isNumeric(docNumber)
        ) {
          nDocError = true;
          // console.log("numero de documento invalido");
        } else {
          nDocError = false;
        }
        break;
      case "name":
        const valueName = window.document.getElementById("name").value;
        if (!isCharacterALetter(valueName)) {
          nameError = true;
          // console.log("nomnbre invalido");
        } else {
          nameError = false;
        }
        break;

      case "last_name":
        const valueLname = window.document.getElementById("lastName").value;
        if (!isCharacterALetter(valueLname)) {
          lnameError = true;
          // console.log("last name invalido");
        } else {
          lnameError = false;
        }
        break;

      case "company_name":
        break;

      case "job":
        const valueJob = window.document.getElementById("job").value;
        if (!isCharacterALetter(valueJob)) {
          jobError = true;
          // console.log("job invalido");
        } else {
          jobError = false;
        }
        break;

      case "date":
        const age = window.document.getElementById("date").value;
        if (getAge(age) < 65) {
          flagError = true;
          // console.log("date invalido");
        } else if (getAge(age) > 65) {
          flagError = false;
        }
        break;
      case "ruc":
        const rucNumber = window.document.getElementById("ruc").value;
        if (!(rucNumber.length === 11) || !isNumeric(rucNumber)) {
          rucError = true;
          // console.log("ruc invalido");
        } else {
          rucError = false;
        }
        break;
      case "confirmemail":
        const email = window.document.getElementById("email").value;
        const confirm = window.document.getElementById("confirmEmail").value;
        // console.log(confirm);
        // console.log(email);
        if (email !== confirm) {
          // console.log(confirm);
          // console.log(email);
          emailError = true;
          // console.log("confirmacion email invalida");
        } else {
          emailError = false;
        }
        break;
      case "email":
        const email2 = window.document.getElementById("email").value;
        const confirm2 = window.document.getElementById("confirmEmail").value;
        // console.log(confirm);
        // console.log(email);
        if (email2 !== confirm2) {
          // console.log(confirm);
          // console.log(email);
          emailError = true;
          // console.log("confirmacion email invalida");
        } else {
          emailError = false;
        }
        break;
      case "phone_number":
        const pNumber = window.document.getElementById("number")?.value;
        if (!isPhone(pNumber) && radioButton === "yes") {
          phoneError = true;
          // console.log(radioButton);
          // console.log("numero telefono invalido");
        } else {
          phoneError = false;
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
    checkErrorbyType(name);
  };

  const resetFormValues = () => {
    formValues.document_number = "";
    formValues.email = "";
    formValues.phone_number = "";
    formValues.country_en = "Peru";
    formValues.country_es = "Perú";
  };

  const handleRadioButton = (newValue) => {
    setRadioButton(newValue.target.value);
  };

  const handleEvidenceButton = (newValue) => {
    setEvidence("");
    setEvidenceButton(" ");
    setEvidenceButton(newValue.target.value);
  };

  const hamdleEvidenceChange = (event) => {
    if (event.target.files[0]) {
      setEvidence(event.target.files[0]);
      // console.log(event.target.files[0]);
    }
  };

  const handleChange = (event, newValue) => {
    setInscription(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      getAge(formValues.date) <= 65 ||
      flagError ||
      nDocError ||
      nameError ||
      lnameError ||
      jobError ||
      rucError ||
      emailError ||
      phoneError
    ) {
      // console.log("Por favor complete el formulario correctamente");
    } else {
      formValues.inscription_id = inscriptionTab;

      if (localStorage.getItem("@agromin/language") === "en") {
        formValues.language = "en";
        formValues.country = formValues.country_en;
      } else {
        formValues.language = "es";
        formValues.country = formValues.country_es;
      }
      // console.log(formValues);
      window.document.getElementById("btnCulqi").click();
    }
  };

  return (
    <CulqiProvider
      // publicKey="pk_live_2dc49f35f43d1783"
      publicKey="pk_test_7611a201f786ac3e"
      amount={49200}
      title="AGROMIN"
      currency={formValues.currency}
      description="Participante"
      onToken={(token) => {
        formValues.token = token.id;
        // console.log(token.id);
        enviar();
        // console.log(formValues);
      }}
      onError={(error) => {
        console.error("something bad happened", error);
      }}
      // Uncomment `options` to see customizations take place
      options={{
        style: {
          maincolor: "#172274",
          // buttontext: "black",
          buttoncolor: "#172274",
          maintext: "primary",
          desctext: "secondary",
          logo: "https://plataforma.agrominperu.com/favicon.png",
        },
      }}
    >
      <PageContainer title="Register" description="this is Register page">
        {isLoading && (
          <Spinner
            styles={{
              backgroundColor: "#4c4c4c8c",
              zIndex: "9999",
              position: "absolute",
            }}
          />
        )}
        <Grid
          container
          spacing={0}
          sx={{ height: "100vh", justifyContent: "center", overflow: "auto" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={9}
            display="flex"
            alignItems="center"
            style={{ zIndex: 1 }}
          >
            <Grid container spacing={0} display="flex" justifyContent="center">
              <Grid item xs={9} lg={9} xl={9}>
                <Box
                  sx={{
                    p: 4,
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <center>
                        <LogoIcon />
                      </center>
                    </div>
                  </div>
                  <Box
                    sx={{
                      p: 4,
                    }}
                  />

                  <Grid
                    container
                    spacing={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} sm={1}>
                      <PersonIcon
                        fontSize="large"
                        sx={{
                          mr: 2,
                          color: "primary.main",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={9}>
                      <Typography
                        color="textSecondary"
                        variant="h2"
                        fontWeight="500"
                        sx={{
                          mr: 1,
                        }}
                      >
                        <FormattedMessage
                          id="register.register"
                          defaultMessage="Register"
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
                    >
                      <Culqi>
                        {({ setAmount, setDescription }) => {
                          return (
                            <div className="tabs">
                              <Tabs
                                name="inscription_id"
                                value={inscriptionTab}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                                variant="fullWidth"
                              >
                                {inscripcion.map((obj, idx) => (
                                  <Tab
                                    key={idx}
                                    sx={{
                                      textTransform: "capitalize",
                                    }}
                                    label={
                                      <FormattedMessage
                                        id={obj.name}
                                        defaultMessage={obj.name}
                                      />
                                    }
                                    value={obj.id}
                                    onClick={() => {
                                      resetFormValues();

                                      obj.id === 1 ||
                                      obj.id === 2 ||
                                      obj.id === 3
                                        ? setEvidenceButton("yes")
                                        : setEvidenceButton(" ");

                                      formValues?.currency === "USD"
                                        ? setAmount(obj.payment_usd)
                                        : setAmount(obj.payment_pen);

                                      setDescription(obj.name);
                                    }}
                                    {...a11yProps(obj.id)}
                                  />
                                ))}
                              </Tabs>
                            </div>
                          );
                        }}
                      </Culqi>
                      <Culqi>
                        {({ setAmount }) => {
                          return (
                            <div className="tab-responsive">
                              <Tabs
                                name="inscription_id"
                                value={inscriptionTab}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                                textColor="secondary"
                                indicatorColor="secondary"
                                variant="fullWidth"
                                orientation="vertical"
                              >
                                {inscripcion.map((obj, idx) => (
                                  <Tab
                                    key={idx}
                                    sx={{
                                      textTransform: "capitalize",
                                    }}
                                    label={
                                      <div className="tab-item">
                                        <FormattedMessage
                                          id={obj.name}
                                          defaultMessage={obj.name}
                                        />
                                      </div>
                                    }
                                    value={obj.id}
                                    onClick={() => {
                                      obj.id === 1 ||
                                      obj.id === 2 ||
                                      obj.id === 3
                                        ? setEvidenceButton("yes")
                                        : setEvidenceButton("no");

                                      formValues?.currency === "USD"
                                        ? setAmount(obj.payment_usd)
                                        : setAmount(obj.payment_pen);
                                    }}
                                    {...a11yProps(obj.id)}
                                  />
                                ))}
                              </Tabs>
                            </div>
                          );
                        }}
                      </Culqi>
                    </Box>
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
                    {inscriptionTab === 3 ? (
                      <div>
                        <Typography
                          color="#1b97f5"
                          variant="h5"
                          fontWeight="500"
                          sx={{
                            mr: 1,
                            mb: 2,
                          }}
                        >
                          <FormattedMessage
                            id="register.warning"
                            defaultMessage="The payment made will be for the set of registered users"
                          />
                        </Typography>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <form onSubmit={onSubmit}>
                      {inscriptionTab === 6 ? (
                        <div>
                          <CustomFormLabel htmlFor="date">
                            <FormattedMessage
                              id="register.date"
                              defaultMessage="date of birth"
                            />
                          </CustomFormLabel>
                          <CustomTextField
                            id="date"
                            name="date"
                            value={formValues?.date}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            required
                            /* inputProps={{ maxLength: 12 }} */
                            type="date"
                          />
                          {flagError ? (
                            <Typography
                              color="#FF0000"
                              variant="h6"
                              fontWeight="400"
                              sx={{
                                mr: 1,
                              }}
                            >
                              <FormattedMessage
                                id="register.baddate"
                                defaultMessage="bien"
                              />
                            </Typography>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {inscriptionTab === 1 ||
                      inscriptionTab === 4 ||
                      inscriptionTab === 6 ||
                      inscriptionTab === 5 ||
                      inscriptionTab === 2 ? (
                        <div>
                          <Grid item xs={12}>
                            <CustomFormLabel id="label">
                              <FormattedMessage
                                id="register.documentType"
                                defaultMessage="Document Type"
                              />
                            </CustomFormLabel>
                            <Select
                              variant="outlined"
                              required
                              fullWidth
                              id="tdocument"
                              name="document_type"
                              value={formValues?.document_type}
                              onChange={handleInputChange}
                              labelId="Type Document"
                              defaultValue="DNI"
                            >
                              {documentos.map((doc) =>
                                localStorage.getItem("@agromin/language") ===
                                "en" ? (
                                  <MenuItem value={doc.id}>{doc.name}</MenuItem>
                                ) : (
                                  <MenuItem value={doc.id}>
                                    {doc.spanish_name}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                            <CustomFormLabel htmlFor="number">
                              <FormattedMessage
                                id="register.documentNumber"
                                defaultMessage="Document Number"
                              />
                            </CustomFormLabel>
                            <CustomTextField
                              id="documentNumber"
                              name="document_number"
                              value={formValues?.document_number}
                              onChange={handleInputChange}
                              variant="outlined"
                              fullWidth
                              required
                              inputProps={{
                                minLength: 6,
                                maxLength: 12,
                                pattern: "[0-9]*",
                              }}
                              type="number"
                            />
                            {nDocError && (
                              <Typography
                                color="#FF0000"
                                variant="h6"
                                fontWeight="400"
                                sx={{
                                  mr: 1,
                                }}
                              >
                                <FormattedMessage
                                  id="register.badDocNumber"
                                  defaultMessage="Número de documento inválido."
                                />
                              </Typography>
                            )}
                          </Grid>
                        </div>
                      ) : (
                        <Culqi>
                          {({ setAmount }) => {
                            return (
                              <div>
                                <CustomFormLabel htmlFor="number">
                                  RUC*
                                </CustomFormLabel>
                                <CustomTextField
                                  id="ruc"
                                  variant="outlined"
                                  name="ruc"
                                  value={formValues?.ruc}
                                  onChange={handleInputChange}
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
                                      id="register.rucError"
                                      defaultMessage="El RUC es inválido."
                                    />
                                  </Typography>
                                )}
                                {inscriptionTab === 3 ? (
                                  <div>
                                    <CustomFormLabel htmlFor="name">
                                      <FormattedMessage
                                        id="register.companyName"
                                        defaultMessage="Razón social"
                                      />
                                    </CustomFormLabel>
                                    <CustomTextField
                                      id="companyname"
                                      name="company_name"
                                      value={formValues?.company_name}
                                      onChange={handleInputChange}
                                      variant="outlined"
                                      fullWidth
                                      required
                                      inputProps={{ maxLength: 30 }}
                                    />
                                    <CustomFormLabel htmlFor="country">
                                      <FormattedMessage
                                        id="register.country"
                                        defaultMessage="Country"
                                      />
                                    </CustomFormLabel>

                                    {localStorage.getItem(
                                      "@agromin/language"
                                    ) === "en" ? (
                                      <Select
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="country_en"
                                        name="country_en"
                                        value={formValues?.country_en}
                                        onChange={handleInputChange}
                                        labelId="Country"
                                        defaultValue=""
                                      >
                                        {paisesEn.map((pais, index) => (
                                          <MenuItem
                                            key={index}
                                            value={pais.name}
                                          >
                                            {pais.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    ) : (
                                      <Select
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="country_es"
                                        name="country_es"
                                        value={formValues?.country_es}
                                        onChange={handleInputChange}
                                        labelId="Country"
                                        defaultValue=""
                                      >
                                        {paises.map((pais, index) => (
                                          <MenuItem
                                            key={index}
                                            value={pais.name}
                                          >
                                            {pais.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    )}
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                                <CustomFormLabel htmlFor="participants">
                                  <FormattedMessage
                                    id="register.participants"
                                    defaultMessage="Number of participants"
                                  />
                                </CustomFormLabel>
                                <Select
                                  variant="outlined"
                                  required
                                  fullWidth
                                  id="participants"
                                  name="number_participants"
                                  value={formValues?.number_participants}
                                  // onChange={handleInputChange}
                                  onInput={() => {
                                    // console.log(formValues.number_participants);
                                    inscripcion.map((obj) =>
                                      inscriptionTab === obj.id &&
                                      inscriptionTab === 3
                                        ? setAmount(
                                            obj.payment_usd *
                                              formValues.number_participants
                                          )
                                        : inscriptionTab === obj.id
                                        ? setAmount(obj.payment_usd)
                                        : null
                                    );
                                  }}
                                  defaultValue="3"
                                >
                                  {/* {participantes.map((part) => ( */}
                                  <MenuItem
                                    key={3 /* part.num */}
                                    value={3 /* part.num */}
                                  >
                                    {3 /* part.num */}
                                  </MenuItem>
                                  {/* ))} */}
                                </Select>
                              </div>
                            );
                          }}
                        </Culqi>
                      )}
                      {inscriptionTab === 3 ? (
                        <div>
                          <Typography
                            color="#1b97f5"
                            variant="h5"
                            fontWeight="500"
                            sx={{
                              mr: 1,
                              mb: 1,
                              mt: 5,
                            }}
                          >
                            <FormattedMessage
                              id="register.responsable"
                              defaultMessage="Responsable"
                            />
                          </Typography>
                        </div>
                      ) : (
                        <div></div>
                      )}
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
                            name="name"
                            value={formValues?.name}
                            onChange={handleInputChange}
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{ maxLength: 30 }}
                            autoFocus
                            autoComplete="fname"
                          />
                          {nameError && (
                            <Typography
                              color="#FF0000"
                              variant="h6"
                              fontWeight="400"
                              sx={{
                                mr: 1,
                              }}
                            >
                              <FormattedMessage
                                id="register.nameError"
                                defaultMessage="El nombre es inválido."
                              />
                            </Typography>
                          )}
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
                            name="last_name"
                            value={formValues?.last_name}
                            onChange={handleInputChange}
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{ maxLength: 30 }}
                            autoFocus
                            autoComplete="lname"
                          />
                          {lnameError && (
                            <Typography
                              color="#FF0000"
                              variant="h6"
                              fontWeight="400"
                              sx={{
                                mr: 1,
                              }}
                            >
                              <FormattedMessage
                                id="register.lnameError"
                                defaultMessage="El apellido es inválido."
                              />
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      {inscriptionTab !== 3 ? (
                        <div>
                          <CustomFormLabel htmlFor="name">
                            <FormattedMessage
                              id="companyName"
                              defaultMessage="Company Name"
                            />
                          </CustomFormLabel>
                          <CustomTextField
                            id="companyname"
                            name="company_name"
                            value={formValues?.company_name}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{ maxLength: 30 }}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {inscriptionTab === 1 || inscriptionTab === 2 ? (
                        <div>
                          <CustomFormLabel htmlFor="name">
                            <FormattedMessage id="myjob" defaultMessage="Job" />
                          </CustomFormLabel>
                          <CustomTextField
                            id="job"
                            name="job"
                            value={formValues?.job}
                            onChange={handleInputChange}
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{ maxLength: 30 }}
                          />
                          {jobError && (
                            <Typography
                              color="#FF0000"
                              variant="h6"
                              fontWeight="400"
                              sx={{
                                mr: 1,
                              }}
                            >
                              <FormattedMessage
                                id="register.jobError"
                                defaultMessage="El nombre del trabajo es inválido."
                              />
                            </Typography>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {inscriptionTab !== 3 ? (
                        <div>
                          <CustomFormLabel htmlFor="country">
                            <FormattedMessage
                              id="register.country"
                              defaultMessage="Country"
                            />
                          </CustomFormLabel>
                          {localStorage.getItem("@agromin/language") ===
                          "en" ? (
                            <Select
                              variant="outlined"
                              required
                              fullWidth
                              id="country_en"
                              name="country_en"
                              value={formValues.country_en}
                              onChange={handleInputChange}
                              labelId="Country"
                              defaultValue=""
                            >
                              {paisesEn.map((pais, index) => (
                                <MenuItem key={index} value={pais.name}>
                                  {pais.name}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Select
                              variant="outlined"
                              required
                              fullWidth
                              id="country_es"
                              name="country_es"
                              value={formValues.country_es}
                              onChange={handleInputChange}
                              labelId="Country"
                              defaultValue=""
                            >
                              {paises.map((pais, index) => (
                                <MenuItem key={index} value={pais.name}>
                                  {pais.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <CustomFormLabel htmlFor="email">
                        <FormattedMessage
                          id="register.email"
                          defaultMessage="Email Adress"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="email"
                        name="email"
                        value={formValues?.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                      />

                      <CustomFormLabel htmlFor="email">
                        <FormattedMessage
                          id="register.cEmail"
                          defaultMessage="Confirm your Email"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="confirmEmail"
                        name="confirmemail"
                        value={formValues?.confirmemail}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                      />
                      {emailError && (
                        <Typography
                          color="#FF0000"
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            mr: 1,
                          }}
                        >
                          <FormattedMessage
                            id="register.emailError"
                            defaultMessage="Emails are different."
                          />
                        </Typography>
                      )}
                      <CustomFormLabel htmlFor="currency">
                        <FormattedMessage
                          id="register.currency"
                          defaultMessage="Currency"
                        />
                      </CustomFormLabel>
                      <Culqi>
                        {({ setAmount, setCurrency }) => {
                          return (
                            <Select
                              variant="outlined"
                              required
                              fullWidth
                              id="currency"
                              name="currency"
                              value={formValues?.currency}
                              onChange={handleInputChange}
                              labelId="Currency"
                              defaultValue="PEN"
                            >
                              <MenuItem
                                value="PEN"
                                onClick={() => {
                                  setCurrency("PEN");

                                  inscripcion.map((obj) =>
                                    inscriptionTab === obj.id &&
                                    inscriptionTab === 3
                                      ? setAmount(
                                          obj.payment_pen *
                                            formValues.number_participants
                                        )
                                      : inscriptionTab === obj.id
                                      ? setAmount(obj.payment_pen)
                                      : null
                                  );
                                }}
                              >
                                PEN
                              </MenuItem>
                              <MenuItem
                                value="USD"
                                onClick={() => {
                                  setCurrency("USD");

                                  inscripcion.map((obj) =>
                                    inscriptionTab === obj.id &&
                                    inscriptionTab === 3
                                      ? setAmount(
                                          obj.payment_usd *
                                            formValues.number_participants
                                        )
                                      : inscriptionTab === obj.id
                                      ? setAmount(obj.payment_usd)
                                      : null
                                  );
                                }}
                              >
                                USD
                              </MenuItem>
                            </Select>
                          );
                        }}
                      </Culqi>
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
                            id="number"
                            name="phone_number"
                            value={formValues?.phone_number}
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
                          {phoneError && (
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

                      {inscriptionTab === 4 ? (
                        <div>
                          <CustomFormLabel id="label" style={{ color: "red" }}>
                            <FormattedMessage
                              id="register.evidence.button.student"
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
                                  checked={evidenceButton === "yes"}
                                  onChange={handleEvidenceButton}
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
                                  checked={evidenceButton === "no"}
                                  onChange={handleEvidenceButton}
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
                        </div>
                      ) : (
                        <div />
                      )}

                      {inscriptionTab === 5 ? (
                        <div>
                          <CustomFormLabel id="label" style={{ color: "red" }}>
                            <FormattedMessage
                              id="register.evidence.button.professor"
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
                                  checked={evidenceButton === "yes"}
                                  onChange={handleEvidenceButton}
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
                                  checked={evidenceButton === "no"}
                                  onChange={handleEvidenceButton}
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
                        </div>
                      ) : (
                        <div />
                      )}
                      {inscriptionTab === 6 ? (
                        <div>
                          <CustomFormLabel id="label" style={{ color: "red" }}>
                            <FormattedMessage
                              id="register.evidence.button.senior"
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
                                  checked={evidenceButton === "yes"}
                                  onChange={handleEvidenceButton}
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
                                  checked={evidenceButton === "no"}
                                  onChange={handleEvidenceButton}
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
                        </div>
                      ) : (
                        <div />
                      )}

                      {(inscriptionTab === 6 && evidenceButton === "yes") ||
                      (inscriptionTab === 5 && evidenceButton === "yes") ||
                      (inscriptionTab === 4 && evidenceButton === "yes") ? (
                        <div>
                          <CustomFormLabel htmlFor="name">
                            <FormattedMessage
                              id="register.evidence"
                              defaultMessage="Evidence"
                            />
                          </CustomFormLabel>
                          <Grid>
                            <label htmlFor="upload-photo">
                              <input
                                style={{ display: "none" }}
                                name="upload-photo"
                                id="upload-photo"
                                type="file"
                                onChange={hamdleEvidenceChange}
                                fullWidth
                                accept="application/pdf, image/png, image/gif, image/jpeg"
                                required
                              />
                              <Fab
                                color="primary"
                                size="large"
                                component="span"
                                aria-label="add"
                                style={{ width: "100%" }}
                                variant="extended"
                                sx={{}}
                              >
                                <AddIcon />
                                <FormattedMessage
                                  id="register.uploadPhoto"
                                  defaultMessage="Upload Photo"
                                />
                              </Fab>
                              {evidence ? (
                                <Typography
                                  color="#00A122"
                                  variant="h6"
                                  fontWeight="400"
                                  sx={{
                                    mr: 1,
                                  }}
                                >
                                  <FormattedMessage
                                    id="register.uploadAccept"
                                    defaultMessage="Accept"
                                  />
                                </Typography>
                              ) : (
                                <Typography
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
                                </Typography>
                              )}
                            </label>
                          </Grid>
                        </div>
                      ) : (
                        <div />
                      )}

                      <Grid
                        container
                        spacing={4}
                        sx={{
                          mb: 3,
                          mt: 1,
                        }}
                      >
                        {width > 600 ? (
                          <>
                            <Grid item xs={6} sm={6}>
                              {" "}
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
                            <Grid item xs={6} sm={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="primary"
                                    /* name="publicity"
                              checked={formValues?.publicity}
                              onChange={handleInputChange} */
                                  />
                                }
                                label={
                                  <FormattedMessage
                                    id="register.iWant"
                                    defaultMessage="I want to get most our of Agromin"
                                  />
                                }
                              />
                            </Grid>{" "}
                          </>
                        ) : (
                          <>
                            <Grid item xs={12} sm={12}>
                              {" "}
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
                            <Grid item xs={12} sm={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="primary"
                                    /* name="publicity"
                              checked={formValues?.publicity}
                              onChange={handleInputChange} */
                                  />
                                }
                                label={
                                  <FormattedMessage
                                    id="register.iWant"
                                    defaultMessage="I want to get most our of Agromin"
                                  />
                                }
                              />
                            </Grid>{" "}
                          </>
                        )}
                      </Grid>
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={12} md={3}>
                            <Typography
                              color="textSecondary"
                              variant="h5"
                              fontWeight="400"
                              sx={{
                                mr: 1,
                              }}
                            >
                              <FormattedMessage
                                id="register.aAccount"
                                defaultMessage="Already have an Account?"
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={9}>
                            <Typography
                              component={Link}
                              to="/auth/login"
                              fontWeight="600"
                              variant="h3"
                              sx={{
                                display: "block",
                                textDecoration: "none",
                                color: "primary.main",
                                textAlign: "left",
                                mt: -0.5,
                              }}
                            >
                              <FormattedMessage
                                id="register.signIn"
                                defaultMessage="Sign In"
                              />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <div>
                        <Culqi>
                          {({ openCulqi, setAmount }) => {
                            return (
                              <Button
                                disabled={evidenceButton !== "yes"}
                                id="btnCulqix2"
                                color="primary"
                                variant="contained"
                                size="large"
                                type="submit"
                                value={"enviar"}
                                fullWidth
                                onClick={() => {
                                  inscripcion.map((obj) =>
                                    inscriptionTab === obj.id &&
                                    inscriptionTab === 3 &&
                                    formValues.currency === "USD"
                                      ? setAmount(
                                          obj.payment_usd *
                                            formValues.number_participants
                                        )
                                      : inscriptionTab === obj.id &&
                                        inscriptionTab === 3 &&
                                        formValues.currency === "PEN"
                                      ? setAmount(
                                          obj.payment_pen *
                                            formValues.number_participants
                                        )
                                      : null
                                  );
                                }}
                                sx={{
                                  pt: "10px",
                                  pb: "10px",
                                }}
                              >
                                <Button
                                  id="btnCulqi"
                                  onClick={openCulqi}
                                  style={{ display: "none" }}
                                />
                                <FormattedMessage
                                  id="register.signUp"
                                  defaultMessage="signUp"
                                />
                              </Button>
                            );
                          }}
                        </Culqi>
                      </div>
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
    </CulqiProvider>
  );
};

export default Register;
