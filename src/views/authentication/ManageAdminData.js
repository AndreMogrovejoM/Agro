import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  MenuItem,
  RadioGroup,
  Radio,
  Select,
  FormControlLabel,
} from "@material-ui/core";

// import img1 from "../../assets/images/backgrounds/Corporative.jpg";
// import LogoIcon from "../../layouts/full-layout/logo/LogoIcon";
import { useNavigate, NavLink } from "react-router-dom";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import Customizer from "../../layouts/full-layout/customizer/Customizer";
import api from "../../services/Api";
import CloseIcon from "@material-ui/icons/Close";
// import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

import { FormattedMessage } from "react-intl";

import { useParams } from "react-router";
import { getUsers, putAdmin } from "../../services/Corporative";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";

import "./style.css";

let nDocError = false;
let nameError = false;
let lnameError = false;
let jobError = false;
const rucError = false;
const emailError = false;
let phoneError = false;

function ManageAdminData(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    document_type: 1,
    country: "",
    country_es: "Perú",
    country_en: "Peru",
    mobile: "",
  });
  const [documentos, setDocumentos] = useState([{ name: "DNI" }]);
  const [paisesEs, setPaisesEs] = useState([{ name: "Perú" }]);
  const [paisesEn, setPaisesEn] = useState([{ name: "Peru" }]);
  const [radioButton, setRadioButton] = useState("no");

  const resetFormValues = () => {
    user.mobile = "";
  };

  const document = async () => {
    await api.get("/profile/document_types/").then((response) => {
      setDocumentos(response.data);
    });
    // .catch((error) => {
    //   // console.log("DOCUMENTOS>>>", error);
    // });
  };

  const countriesEs = async () => {
    await api.get("/paises/").then((response) => {
      setPaisesEs(response.data);
    });
    // .catch((error) => {
    //   console.log("PAISES>>>>", error);
    // });
  };

  const countriesEn = async () => {
    await api.get("/countries/").then((response) => {
      setPaisesEn(response.data);
    });
    // .catch((error) => {
    //   console.log("PAISES>>>>", error);
    // });
  };

  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "Manejo de participantes",
    },
  ];

  const getUserInfo = async () => {
    try {
      const response = await getUsers();
      // console.log("ADMINDATA>>>>", response.data.admin);
      setUser(response.data.admin);

      // console.log("UerInfo>>>>", response.data);
    } catch (error) {
      // console.log("UerInfo>>>>", error);
    }
  };

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
        // eslint-disable-next-line no-case-declarations
        const docNumber =
          window.document.getElementById("document_number").value;
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
      case "first_name":
        // eslint-disable-next-line no-case-declarations
        const valueName = window.document.getElementById("first_name").value;
        if (!isCharacterALetter(valueName)) {
          nameError = true;
          // console.log("nomnbre invalido");
        } else {
          nameError = false;
        }
        break;

      case "last_name":
        // eslint-disable-next-line no-case-declarations
        const valueLname = window.document.getElementById("last_name").value;
        if (!isCharacterALetter(valueLname)) {
          lnameError = true;
          // console.log("last name invalido");
        } else {
          lnameError = false;
        }
        break;

      case "job_title":
        // eslint-disable-next-line no-case-declarations
        const valueJob = window.document.getElementById("job_title").value;
        if (!isCharacterALetter(valueJob)) {
          jobError = true;
          // console.log("job invalido");
        } else {
          jobError = false;
        }
        break;

      case "mobile":
        // eslint-disable-next-line no-case-declarations
        const pNumber = window.document.getElementById("mobile")?.value;
        if (!isPhone(pNumber)) {
          phoneError = true;
          // console.log("numero telefono invalido");
        } else {
          phoneError = false;
        }
        break;
      default:
        break;
    }
  };

  const handleRadioButton = (newValue) => {
    setRadioButton(newValue.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
    checkErrorbyType(name);
  };

  useEffect(() => {
    getUserInfo();
    countriesEs();
    countriesEn();
    document();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !(
        nDocError ||
        nameError ||
        lnameError ||
        jobError ||
        rucError ||
        emailError ||
        phoneError
      )
    ) {
      const data = e.target;
      // console.log(data.document_type.value);
      const newId = parseInt(id);

      const Fdata = {
        id: newId,
        document_type: parseInt(data.document_type.value),
        document_number: data.document_number.value,
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        mobile: data.mobile?.value,
        job_title: data.job_title.value,
        country: data.country?.value,
        email: data.email.value,
      };

      if (radioButton === "no") {
        Fdata.mobile = "";
      }
      // console.log("FDATA>>>>>>", Fdata);
      putAdmin(Fdata);
      navigate("/admin/register-participants");
    }
  };

  return (
    <PageContainer title="Sign Up Clients" description="this is Register page">
      <Breadcrumb
        addClient={false}
        addParticipant={false}
        clientsDocuments={false}
        signUpClients={false}
        buyMore={false}
        RegisterMe={false}
        hideName={true}
        showBackButton={true}
        backButtonDirection={"/admin/register-participants"}
        items={BCrumb}
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
                <Grid container spacing={2} display="flex" alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <PersonAddIcon
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
                      {id ? (
                        <FormattedMessage
                          id="breadcrub.EditParticipant"
                          defaultMessage="Edit Participant"
                        />
                      ) : (
                        <FormattedMessage
                          id="registerMe"
                          defaultMessage="Register Me"
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
                  <form onSubmit={onSubmit}>
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
                        id="document_type"
                        name="document_type"
                        onChange={handleInputChange}
                        labelId="Type Document"
                        value={user?.document_type}
                        defaultValue="DNI"
                      >
                        {documentos.map((doc, idx) => (
                          <MenuItem key={idx} value={doc.id}>
                            {doc.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <CustomFormLabel htmlFor="name">
                        <FormattedMessage
                          id="register.documentNumber"
                          defaultMessage="Document Number"
                        />
                      </CustomFormLabel>
                      <CustomTextField
                        id="document_number"
                        variant="outlined"
                        fullWidth
                        required
                        name="document_number"
                        onChange={handleInputChange}
                        type="text"
                        value={user?.document_number}
                        inputProps={{
                          min: 6,
                          max: 12,
                          pattern: "[0-9]*",
                        }}
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

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel htmlFor="name">
                          <FormattedMessage
                            id="register.name"
                            defaultMessage="Name"
                          />
                        </CustomFormLabel>
                        <CustomTextField
                          id="first_name"
                          type="text"
                          variant="outlined"
                          fullWidth
                          required
                          autoFocus
                          name="first_name"
                          onChange={handleInputChange}
                          autoComplete="fname"
                          value={user?.first_name}
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
                          id="last_name"
                          type="text"
                          variant="outlined"
                          fullWidth
                          required
                          autoFocus
                          name="last_name"
                          onChange={handleInputChange}
                          autoComplete="lname"
                          value={user?.last_name}
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
                        value={user?.country_es}
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
                        value={user?.country_en}
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

                    <CustomFormLabel htmlFor="name">
                      <FormattedMessage
                        id="register.job"
                        defaultMessage="Job Title"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="job_title"
                      variant="outlined"
                      name="job_title"
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="text"
                      value={user?.job_title}
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

                    <CustomFormLabel htmlFor="email">
                      <FormattedMessage
                        id="register.email"
                        defaultMessage="Email Adress"
                      />
                    </CustomFormLabel>

                    <CustomTextField
                      id="email"
                      variant="outlined"
                      name="email"
                      onChange={handleInputChange}
                      fullWidth
                      required
                      type="email"
                      value={user?.email}
                      disabled
                    />

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
                            onInput={resetFormValues}
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
                            onInput={resetFormValues}
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
                          variant="outlined"
                          fullWidth
                          name="mobile"
                          onChange={handleInputChange}
                          type="tel"
                          value={user?.mobile}
                          inputProps={{ minLength: 9, maxLength: 18 }}
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

                    {/* Start buttons confirm cancel */}
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          to={"/admin/register-participants"}
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

export default ManageAdminData;
