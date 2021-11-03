import React, { useState } from "react";

import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  // Button,
  Avatar,
} from "@material-ui/core";

import profileCover from "../../assets/images/backgrounds/portada.webp";
// import userimg from "../../assets/images/users/user2.jpg";

// import FeatherIcon from "feather-icons-react";

const CoverCard = ({ name, company, image, onSubmitImage }) => {
  const [newImage, setNewImage] = useState(image);
  // const [newPosterImage, setNewPosterImage] = useState(profilecover);
  // console.log(name, company);
  const imagehandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewImage(reader.result);
        onSubmitImage(e.target.files[0]);
      }
    };

    if (e.target.files[0] !== undefined) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const posterImagehandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setNewPosterImage(reader.result);
  //     }
  //   };
  //   // console.log(e.target.files[0])
  //   if (e.target.files[0] !== undefined)
  //     reader.readAsDataURL(e.target.files[0]);
  // };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "0",
      }}
    >
      <img
        style={{ objectFit: "cover" }}
        src={profileCover}
        alt={name}
        width="100%"
        height="320px"
      />
      <CardContent
        sx={{
          pt: "24px",
          pb: "28px",
        }}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xs={12}
          sx={{
            order: {
              xs: "1",
              sm: "1",
              lg: "2",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: "-90px",
            }}
          >
            <Box>
              <Box
                sx={{
                  padding: "4px",
                  borderRadius: "50%",

                  width: "110px",
                  height: "110px",
                  overflow: "hidden",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <input
                  style={{ display: "none", cursor: "pointer" }}
                  id="userImage"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={imagehandler}
                />
                <label htmlFor="userImage">
                  <Avatar
                    src={newImage}
                    alt={newImage}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "96px",
                      height: "96px",
                      border: (theme) =>
                        `${
                          theme.palette.mode === "dark"
                            ? "4px solid #3c414c"
                            : "4px solid #fff"
                        }`,
                    }}
                  />
                </label>
              </Box>
              <Box
                sx={{
                  mt: "5px",
                  display: "block",
                }}
              >
                <Typography
                  fontWeight="500"
                  sx={{
                    fontSize: "20px",
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {name}
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="400"
                  sx={{
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {company}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export { CoverCard };
