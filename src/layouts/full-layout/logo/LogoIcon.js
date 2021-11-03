import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/logos/Agromin.svg";
import { useSelector } from "react-redux";
import "./style.css";

const LogoIcon = (props) => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link underline="none" to={props.route ? props.route : "/auth"}>
      {customizer.activeMode === "dark" ? (
        <img
          src={img1}
          alt="bg"
          style={{
            width: "50%",
            height: "40%",
            display: "flex",
            flexDirection: "column",
            minWidth: props.width ? props.width : "220px",
            minHeight: props.height ? props.height : "80px",
            maxWidth: props.maxWidth ? props.maxWidth : "",
          }}
        />
      ) : (
        <img
          src={img1}
          alt="bg"
          style={{
            width: "50%",
            height: "40%",
            display: "flex",
            flexDirection: "column",
            minWidth: props.width ? props.width : "220px",
            minHeight: props.height ? props.height : "80px",
          }}
        />
      )}
    </Link>
  );
};

export default LogoIcon;
