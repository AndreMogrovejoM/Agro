import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { NavLink } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";

import { CoverCard } from "../../components/profile/CoverCard";
import { IntroCard } from "../../components/profile/IntroCard";
import {
  updateProfile,
  updateProfileImage,
  updatePasswordProfile,
} from "../../services/UserProfile";

import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/Auth/Action";

import Swal from "sweetalert2";
import { setIsLoading } from "../../redux/customizer/Action";
import { FormattedMessage } from "react-intl";

const BCrumb = [
  {
    to: "/",
    title: "Vista principal",
  },
  {
    title: "Perfíl de usuario",
  },
];

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const handleUPdatePassword = async (data) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updatePasswordProfile(data);
      // console.log(response);
      Swal.fire({
        title: `${response.data}`,
        text: ``,
        icon: "success",
        confirmButtonText: "Vale",
      });
    } catch (error) {
      // console.log("error password", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleUpdateProfile = async (data) => {
    dispatch(setIsLoading(true));
    try {
      const response = await updateProfile(data);
      dispatch(setUserProfile(response.data));
      // console.log("response", response);
      Swal.fire({
        title: `${response.data}`,
        text: ``,
        icon: "success",
        confirmButtonText: "Vale",
      });
    } catch (error) {
      // console.log("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleUpdateProfileImage = async (data) => {
    const formData = new FormData();
    formData.set("profile_image", data);
    try {
      const response = await updateProfileImage(formData);
      dispatch(setUserProfile(response.data));
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <PageContainer
      title="Perfíl de usuario"
      description="this is User Profile page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="Perfíl de usuario" items={BCrumb}></Breadcrumb>
      {/* end breadcrumb */}
      {user !== null && (
        <CoverCard
          name={`${user.first_name} ${user.last_name}`}
          company={user.company}
          image={user.profile_image}
          onSubmitImage={handleUpdateProfileImage}
        />
      )}
      <div className="row">
        <div className="col">
          <center>
            <Button
              to="/convention"
              component={NavLink}
              variant="contained"
              startIcon={<StorefrontIcon />}
              sx={{ minWidth: "215px", m: 2 }}
            >
              <Typography variant="h4" sx={{ fontWeight: "500" }}>
                <FormattedMessage
                  id="login.convention.button"
                  defaultMessage="Free"
                />
              </Typography>
            </Button>
          </center>
        </div>
      </div>

      <Grid container spacing={0}>
        <Grid item sm={12} lg={12} xs={12}>
          {user !== null && (
            <IntroCard
              data={user}
              onSubmitProfile={handleUpdateProfile}
              onChangePassword={handleUPdatePassword}
            />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
