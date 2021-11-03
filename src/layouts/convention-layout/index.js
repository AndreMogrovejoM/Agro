import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container, experimentalStyled } from "@material-ui/core";

import PageContainer from "../../components/container/PageContainer";
import Spinner from "../../views/spinner/Spinner";
import { TopbarHeight } from "../../assets/global/Theme-variable";
import Header from "./header/Header";
import ChatList from "./ChatList/ChatList";
import { getUserProfile } from "../../services/UserProfile";
import { setUserProfile } from "../../redux/Auth/Action";
import { getChatList } from "../../services/Chats";
import { setChatList } from "../../redux/chats/Action";
import Storage from "../../storage";
import FreeAuth from "./freeAuth";

const ConventionLayout = () => {
  const dispatch = useDispatch();

  const { user, sidebar } = useSelector((state) => state.authReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [hasChats, setHasChats] = useState(false);

  const MainWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
  }));
  const PageWrapper = experimentalStyled("div")(({ theme, hasChats }) => ({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingRight: [hasChats ? "220px" : "0"],
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("lg")]: {
      paddingTop: TopbarHeight,
    },
    [theme.breakpoints.down("lg")]: {
      paddingTop: "64px",
    },
    [theme.breakpoints.down(700)]: {
      paddingRight: [hasChats ? "70px" : ""],
    },
  }));

  const getStorageFreeUser = async () => {
    setIsLoading(true);
    const data = await JSON.parse(Storage.getFreeUser());
    if (data !== null) dispatch(setUserProfile(data));
    setIsLoading(false);
  };

  const getUserProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      dispatch(setUserProfile(response.data));
    } catch (error) {
      // console.log("este usuario no esta registrado");
      getStorageFreeUser();
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   if (name === "" || lastName === "" || email === "") {
  //     setIsError(true);
  //     setIsLoading(false);
  //     return;
  //   }
  //   const data = { first_name: name, last_name: lastName, email: email };
  //   dispatch(setUserProfile(data));
  //   Storage.saveFreeUser(JSON.stringify(data));
  //   setIsLoading(false);
  // };

  const getChatsUsers = async () => {
    try {
      const response = await getChatList();
      dispatch(setChatList(response.data.usuarios_chat));
      // console.log("getChats", response);
      // setHasChats(true);
    } catch (error) {
      // console.log("error", error.message);
      setHasChats(false);
    }
  };

  useEffect(() => {
    if (user !== null) return;
    getUserProfileData();
  }, []);

  useEffect(() => {
    getChatsUsers();
  }, []);

  return (
    <PageContainer title="Convention" description="welcome to the experience">
      {isLoading && (
        <Spinner
          styles={{
            backgroundColor: "#4c4c4c8c",
            zIndex: "99",
            position: "absolute",
          }}
        />
      )}
      {!user ? (
        <FreeAuth setIsLoading={setIsLoading} />
      ) : (
        <MainWrapper>
          <Header user={user} paths={sidebar} />
          {hasChats && <ChatList />}
          <PageWrapper hasChats={hasChats}>
            <Container
              maxWidth={false}
              sx={{
                position: "relative",
                maxWidth: "2000px",
                paddingRight: "0 !important",
                paddingLeft: "0 !important",
              }}
            >
              <Outlet />
            </Container>
          </PageWrapper>
        </MainWrapper>
      )}
    </PageContainer>
  );
};

export default ConventionLayout;
