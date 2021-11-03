import api from "./Api";

const getUserDocuments = () =>
  api.get(`/human_resources/admin/user_documents/`);

const getUserDocumentsById = (id) =>
  api.get(`/human_resources/admin/user_documents/${id}`);

const postUserState = (id, state) => {
  const data = {
    user_id: id,
    review_id: state,
  };
  api
    .put(`/human_resources/admin/user_review_state/`, data)
    .then((response) => {
      // console.log("K_____ res :- ", response);
      // console.log("K_____ res status:- ", response.status);
    });
  // .catch((error) => {
  //   // console.log("K_____ error :- ", error);
  // });
  // console.log(response);
};

// const updateUserState = () =>

export { getUserDocuments, getUserDocumentsById, postUserState };
