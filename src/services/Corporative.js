import api from "./Api";
import Swal from "sweetalert2";

const handleResetError = (errormessage) => {
  Swal.fire({
    title: "¡Error!",
    text: "Compruebe todos los datos en el formulario.",
    icon: "error",
    confirmButtonColor: "#e01717",
    confirmButtonText: "Salir",
  });
};

const getUsers = () => api.get(`/human_resources/admin/corporate_group/`);

const getUserById = (id) => {
  const response = api.get(
    `/human_resources/admin/corporate_group/user/${id}/`
  );
  // console.log("RESPONSE CORPORATIVE>>>>>", response);
  return response;
};

const deleteUserById = (id) => {
  const response = api.delete(
    `/human_resources/admin/corporate_group/user/${id}/`
  );
  // console.log("RESPONSE DELETE>>>>>", response);
  return response;
};

const putUser = (formData) => {
  // console.log(formData);
  api
    .put(
      `/human_resources/admin/corporate_group/user/${formData.id}/`,
      formData
    )
    .then((response) => {
      // console.log("PUT res :- ", response);
      // console.log("PUT res status:- ", response.status);
      Swal.fire(
        "Operación realizada con éxito.",
        "La edición del participante fue realizada con éxito.",
        "success"
      ).then(function () {
        window.location = "/admin/register-participants";
      });
    })
    .catch((error) => {
      // console.log("PUT error :- ", error);
      handleResetError(error.response.data);
    });
  // console.log(response);
};

const postUser = (formData) => {
  api
    .post(`/human_resources/admin/corporate_group/`, formData)
    .then((response) => {
      // console.log("POST res :- ", response);
      // console.log("POST res status:- ", response.status);
      Swal.fire(
        "Operación realizada con éxito.",
        "El registro del participante fue realizado con éxito.",
        "success"
      ).then(function () {
        window.location = "/admin/register-participants";
      });
    })
    .catch((error) => {
      // console.log("POST error :- ", error.response);
      handleResetError(error.statustext);
    });
  // console.log(response);
};

const buyPases = (formData) => {
  api
    .post(`/human_resources/admin/corporate_group/buy_passes/`, formData)
    .then((response) => {
      // console.log("POST BUY res :- ", response);
      // console.log("POST BUY res status:- ", response.status);
      setTimeout(function () {
        window.location.reload(1);
      }, 700);
      Swal.fire(
        "Transacción Exitosa",
        "La compra fué realizada con éxito",
        "success"
      );
    })
    .catch((error) => {
      // console.log("POST BUY error :- ", error);
      handleResetError(error.statustext);
    });
  // console.log(response);
};

const putAdmin = (formData) => {
  api
    .put(`/human_resources/admin/corporate_group/`, formData)
    .then((response) => {
      // console.log("PUT res :- ", response);
      // console.log("PUT res status:- ", response.status);
      Swal.fire(
        "Operación realizada con éxito.",
        "La edición del administrador fué exitosa.",
        "success"
      );
    })
    .catch((error) => {
      // console.log("PUT error :- ", error);
      handleResetError(error.statustext);
    });
  // console.log(response);
};

export {
  getUsers,
  getUserById,
  putUser,
  postUser,
  deleteUserById,
  buyPases,
  putAdmin,
};
