import api from "./Api";

const getUserProfile = () => api.get("/profile/");
const updateProfile = (data) => api.put("/profile/", data);
const updatePasswordProfile = (data) =>
  api.put("/profile/password_update/", data);
const updateProfileImage = (data) => api.put("/profile/image/", data);
const resetPassword = (data) => api.post("/profile/restore_password/", data);

export {
  getUserProfile,
  updateProfile,
  updateProfileImage,
  updatePasswordProfile,
  resetPassword,
};
