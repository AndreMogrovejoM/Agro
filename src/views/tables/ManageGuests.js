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
} from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";

import { useNavigate, NavLink } from "react-router-dom";
import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import PageContainer from "../../components/container/PageContainer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import Customizer from "../../layouts/full-layout/customizer/Customizer";
import Swal from "sweetalert2";
import api from "../../services/Api";
import { FormattedMessage } from "react-intl";

import { useParams } from "react-router";

import "./style.css";

let docError = false;
let nameError = false;
let lnameError = false;
let phoneError = false;

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Manejo de invitados",
  },
];

const handleReset = () => {
  Swal.fire(
    "Edición o registro de invitado Exitoso",
    "La edición o el registro del invitado fue realizado con éxito.",
    "success"
  );
};

function ManageGuests(props) {
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
    // return;
  };
  const document = async () => {
    await api.get("/profile/document_types/").then((response) => {
      setDocumentos(response.data);
    });
    // .catch((error) => {
    //   console.log("DOCUMENTOS>>>", error);
    // });
  };
  const countriesES = async () => {
    await api.get("/paises/").then((response) => {
      setPaisesEs(response.data);
    });
    // .catch((error) => {
    //   console.log("PAISES>>>>", error);
    // });
  };
  const countriesEN = async () => {
    await api.get("/countries/").then((response) => {
      setPaisesEn(response.data);
    });
    // .catch((error) => {
    //   console.log("PAISES>>>>", error);
    // });
  };
  const handleRadioButton = (newValue) => {
    setRadioButton(newValue.target.value);
  };
  const getGuestInfo = (id) => {
    // console.log(id);
    api.get(`/human_resources/admin/users/${id}`).then((response) => {
      // console.log("DATA>>", response.data);
      // console.log("res status", response.status);
      setUser(response.data);
    });
    // .catch((error) => {
    //   console.log("GUESTERROR>>>>", error);
    // });
  };
  const postGuest = (Fdata) => {
    api
      .post(`/human_resources/admin/users/`, Fdata)
      .then((response) => {
        // console.log("DATA>>", response.data);
        // console.log("res status", response.status);
        handleReset();
        setTimeout(function () {
          navigate("/admin/register-guests");
        }, 1000);
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
  const putGuest = (Fdata, id) => {
    // console.log("POSTDATA>>", Fdata);
    // console.log(id);
    const response = api
      .put(`/human_resources/admin/users/${id}/`, Fdata)
      .then((response) => {
        // console.log("PUT res :- ", response);
        // console.log("PUT res status:- ", response.status);
        Swal.fire(
          "¡Edición del invitado Exitoso!",
          "¡La edición del invitado fue realizado con éxito!.",
          "success"
        ).then(function () {
          window.location = "/admin/register-guests";
        });
      })
      .catch((error) => {
        console.log("PUT error :- ", error);
        Swal.fire(
          "Error en la edición de invitado",
          "Comprueba que todos los datos esten correctos",
          "error"
        );
      });
    console.log(response);
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
        const docNumber =
          window.document.getElementById("document_number").value;
        if (
          !(docNumber.length >= 8 && docNumber.length <= 12) ||
          !isNumeric(docNumber)
        ) {
          docError = true;
          // console.log("numero de documento invalido");
        } else {
          docError = false;
        }
        break;
      case "first_name":
        const valueName = window.document.getElementById("first_name").value;
        if (!isCharacterALetter(valueName)) {
          nameError = true;
          // console.log("nomnbre invalido");
        } else {
          nameError = false;
        }
        break;
      case "last_name":
        const valueLName = window.document.getElementById("last_name").value;
        if (!isCharacterALetter(valueLName)) {
          lnameError = true;
          // console.log("last name invalido");
        } else {
          lnameError = false;
        }
        break;
      case "mobile":
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
    checkErrorbyType(name);
  };
  useEffect(() => {
    if (id) {
      getGuestInfo(id);
    }
    countriesES();
    countriesEN();
    document();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(docError || nameError || lnameError || phoneError)) {
      const data = e.target;
      if (localStorage.getItem("@agromin/language") === "es") {
        data.country = data.country_es;
      } else {
        data.country = data.country_en;
      }
      // console.log(data.document_type.value);
      const Fdata = {
        document_type: parseInt(data.document_type.value),
        document_number: data.document_number.value,
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        mobile: data.mobile?.value,
        company: data.company.value,
        job_title: data.job_title.value,
        country: data.country.value,
        email: data.email.value,
        tipo: data.tipo.value,
      };
      if (radioButton === "no") {
        Fdata.mobile = "";
      }
      // console.log("FDATA>>>>>>", Fdata);
      if (data.SendButton.value === "editar") {
        // console.log("EDITAR");
        putGuest(Fdata, id);
      } else {
        // console.log("POSTDATA>>>>", Fdata);
        // console.log("POSTEAR");
        try {
          await postGuest(Fdata);
        } catch (error) {
          // console.log(error);
        }
      }
      // navigate("/admin/register-guests");
    }
  };
  return (
    <PageContainer title="Sign Up Guests" description="this is Register page">
      <Breadcrumb
        hideName={true}
        showBackButton={true}
        backButtonDirection={"/admin/register-guests"}
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
                  p: 1,
                }}
              >
                <Grid container spacing={0} display="flex" alignItems="center">
                  <Grid item xs={2} sm={2} md={1}>
                    {/* EditIcon */}
                    {id ? (
                      <EditIcon
                        fontSize="large"
                        sx={{
                          mr: 1,
                          color: "primary.main",
                        }}
                      />
                    ) : (
                      <PersonAddIcon
                        fontSize="large"
                        sx={{
                          mr: 1,
                          color: "primary.main",
                        }}
                      />
                    )}
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
                          id="breadcrub.EditGuest"
                          defaultMessage="Edit Guest"
                        />
                      ) : (
                        <FormattedMessage
                          id="addGuest"
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
                        {documentos.map((doc) => (
                          <MenuItem key={doc.id} value={doc.id}>
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
                      {docError && (
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
                        id="companyName"
                        defaultMessage="Institución o razón social a la que perteneces"
                      />
                    </CustomFormLabel>
                    <CustomTextField
                      id="company"
                      variant="outlined"
                      name="company"
                      onChange={handleInputChange}
                      fullWidth
                      type="text"
                      value={user?.company}
                    />
                    <CustomFormLabel htmlFor="name">
                      <FormattedMessage id="myjob" defaultMessage="Job Title" />
                    </CustomFormLabel>
                    <CustomTextField
                      id="job_title"
                      variant="outlined"
                      name="job_title"
                      onChange={handleInputChange}
                      fullWidth
                      type="text"
                      value={user?.job_title}
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
                        value={user?.country_es}
                        onChange={handleInputChange}
                        labelId="Country"
                        defaultValue=""
                      >
                        {paisesEs.map((pais) => (
                          <MenuItem key={pais.id} value={pais.name}>
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
                        {paisesEn.map((pais) => (
                          <MenuItem key={pais.id} value={pais.name}>
                            {pais.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    <CustomFormLabel htmlFor="name">
                      <FormattedMessage
                        id="guestType"
                        defaultMessage="Guest Type"
                      />
                      *
                    </CustomFormLabel>
                    {id ? (
                      <Select
                        variant="outlined"
                        required
                        fullWidth
                        id="tipo"
                        name="tipo"
                        onChange={handleInputChange}
                        value={user?.tipo}
                        labelId="Tipo Invitado"
                        defaultValue="Invitado"
                        disabled
                      >
                        <MenuItem value="Invitado Vip">
                          <FormattedMessage id="guest" defaultMessage="Guest" />{" "}
                          VIP
                        </MenuItem>
                        <MenuItem value="Invitado">
                          <FormattedMessage id="guest" defaultMessage="Guest" />{" "}
                          Normal
                        </MenuItem>
                      </Select>
                    ) : (
                      <Select
                        variant="outlined"
                        required
                        fullWidth
                        id="tipo"
                        name="tipo"
                        onChange={handleInputChange}
                        value={user?.tipo}
                        labelId="Tipo Invitado"
                        defaultValue="Invitado"
                      >
                        <MenuItem value="Invitado Vip">
                          <FormattedMessage id="guest" defaultMessage="Guest" />{" "}
                          VIP
                        </MenuItem>
                        <MenuItem value="Invitado">
                          <FormattedMessage id="guest" defaultMessage="Guest" />{" "}
                          Normal
                        </MenuItem>
                      </Select>
                    )}

                    <CustomFormLabel htmlFor="email">
                      <FormattedMessage
                        id="register.email"
                        defaultMessage="Email Adress"
                      />
                    </CustomFormLabel>
                    {id ? (
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
                    ) : (
                      <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        onChange={handleInputChange}
                        required
                        type="email"
                      />
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
                          required
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
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          to={"/admin/register-guests"}
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
                            <EditIcon
                              icon="user"
                              width="18"
                              height="18"
                            ></EditIcon>
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="breadcrub.EditGuest"
                                defaultMessage="Edit Guest"
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
                            <PersonAddIcon
                              icon="user"
                              width="18"
                              height="18"
                            ></PersonAddIcon>
                            <Box fontWeight="400" sx={{ ml: 1 }}>
                              <FormattedMessage
                                id="addGuest"
                                defaultMessage="Add Guest"
                              />
                            </Box>
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        mb: 3,
                        mt: 2,
                      }}
                    />
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

export default ManageGuests;
