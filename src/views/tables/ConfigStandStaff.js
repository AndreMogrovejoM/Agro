import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button, Fab } from "@material-ui/core";

import { CustomTextField } from "../../components/forms/custom-elements/CustomTextField";
import { CustomFormLabel } from "../../components/forms/custom-elements/CustomFormLabel";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import Swal from "sweetalert2";
import api from "../../services/Api";

// let nameError = false;
// let lnameError = false;
// let phoneError = false;

export default function ConfigStandStaff(props) {
  const idStaff = props.id;
  const { id } = useParams();

  const [nameError, setNameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [user, setUser] = useState({
    first_name: "",
    mobile: "",
    image: "",
  });

  const [evidence, setEvidence] = useState();

  function isCharacterALetter(char) {
    return /^[A-ZñÑ ]+$/i.test(char);
  }

  function isPhone(str) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im.test(str);
  }

  const hamdleEvidenceChange = (event) => {
    if (event.target.files[0]) {
      setEvidence(event.target.files[0]);
      // console.log(event.target.files[0]);
    }
  };

  const handleChangeName = (e) => {
    // console.log(e.target.value);
    if (!isCharacterALetter(e.target.value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setUser({ first_name: e.target.value });
  };

  const handleChangeLastName = (e) => {
    // console.log(e.target.value);
    if (!isCharacterALetter(e.target.value)) {
      setLnameError(true);
    } else {
      setLnameError(false);
    }
    setUser({ last_name: e.target.value });
  };

  const handleChangePhone = (e) => {
    // console.log(e.target.value);
    if (!isPhone(e.target.value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    setUser({ mobile: e.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevformValues) => ({
      ...prevformValues,
      [name]: value,
    }));
  };

  const handleError = () => {
    Swal.fire({
      title: "¡Error!",
      text: "Compruebe todos los datos en el formulario.",
      icon: "error",
      confirmButtonColor: "#e01717",
      confirmButtonText: "Salir",
    });
  };

  useEffect(() => {
    if (idStaff) {
      getStaff(idStaff);
    }
  }, []);

  // POST
  const PostStaff = (Fdata) => {
    // console.log("Fdata:", Fdata);
    api
      .post(`/fair3D/staff/`, Fdata)
      .then((response) => {
        // console.log("RESPONSE>>>", response.data);
        Swal.fire(
          "Éxito",
          "El registro del ejecutivo fué realizado con éxito",
          "success"
        );
      })
      .catch((error) => {
        // console.log(error);
        handleError(error);
      });
  };

  // GET
  const getStaff = (id) => {
    // console.log(id);
    api
      .get(`/fair3D/staff/${id}/`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        // console.log(error);
        handleError(error);
      });
  };

  // PUT
  const PutStaff = (Fdata, id) => {
    // console.log("ID", id);
    api
      .put(`/fair3D/staff/${id}/`, Fdata)
      .then((response) => {
        // console.log("RESPONSE>>>", response.data);
        Swal.fire(
          "Éxito",
          "La edición del ejecutivo fué realizado con éxito",
          "success"
        );
      })
      .catch((error) => {
        // console.log(error);
        handleError(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log("Submit>>>", user);

    const formData = new FormData();

    if (!(nameError || lnameError || phoneError)) {
      const data = e.target;
      // console.log(data.document_type.value);
      const staff = {
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        mobile: data.mobile.value,
        company: data.company.value,
        job_title: data.job_title.value,
        email: data.email.value,
        language: localStorage.getItem("@agromin/language"),
      };
      // console.log("FDATA>>>>>>", Fdata);
      formData.append("stand", id);
      formData.append("image", evidence);
      formData.append("user", JSON.stringify(staff));

      // Display the key/value pairs
      // console.log(...formData); // shortest script solution}

      if (data.SendButton.value === "editar") {
        // console.log("EDITAR");
        PutStaff(formData, idStaff);
      } else {
        PostStaff(formData);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="name">
              <FormattedMessage id="register.name" defaultMessage="Name" />
            </CustomFormLabel>
            <CustomTextField
              id="first_name"
              type="text"
              variant="outlined"
              fullWidth
              required
              autoFocus
              name="first_name"
              onChange={handleChangeName}
              autoComplete="fname"
              value={user.first_name}
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
              onChange={handleChangeLastName}
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

        <div>
          <CustomFormLabel htmlFor="name" sx={{ pb: 1 }}>
            <FormattedMessage id="photo" defaultMessage="photo" />
          </CustomFormLabel>
          <Grid>
            <label htmlFor={`upload-photo${idStaff}`}>
              <input
                style={{ display: "none" }}
                name="upload-photo"
                id={`upload-photo${idStaff}`}
                type="file"
                onChange={hamdleEvidenceChange}
                fullWidth
                accept="image/png, image/jpeg, image/jpg"
              />
              <Fab
                color="primary"
                size="large"
                component="span"
                aria-label="add"
                style={{ width: "100%" }}
                variant="extended"
                sx={{ pb: 1 }}
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
                <div />
              )}
            </label>
          </Grid>
        </div>

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

        <CustomFormLabel htmlFor="email">
          <FormattedMessage id="register.email" defaultMessage="Email Adress" />
        </CustomFormLabel>
        {idStaff ? (
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

        <div>
          <CustomFormLabel htmlFor={`mobile${idStaff}`}>
            <FormattedMessage
              id="register.pNumber"
              defaultMessage="Phone Number"
            />
          </CustomFormLabel>
          <CustomTextField
            id={`mobile${idStaff}`}
            variant="outlined"
            fullWidth
            name="mobile"
            onChange={handleChangePhone}
            type="tel"
            value={user.mobile}
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
              <CloseIcon icon="user" width="18" height="18"></CloseIcon>
              <Box fontWeight="400" sx={{ ml: 1 }}>
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Box>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {idStaff ? (
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
                <EditIcon icon="user" width="18" height="18"></EditIcon>
                <Box fontWeight="400" sx={{ ml: 1 }}>
                  <FormattedMessage
                    id="editStaff"
                    defaultMessage="Edit Staff"
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
                    id="registerStaff"
                    defaultMessage="Register Staff"
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
    </div>
  );
}
