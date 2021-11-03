import React from "react";
// import "node_modules/video-react/dist/video-react.css"; // import css
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

export const VideoPlayer = ({ video, handleClick }) => {
  // console.log(data)
  // const handleClick = () => {

  // }
  return (
    <div style={styles.container}>
      {/* <button style={styles.btnCerrar} onClick={handleClick}>Cerrar</button>  */}
      <Player
        //onClick={handleClick}
        style={styles.video}
        playsInline
        // poster={image}
        fluid={false}
        src={video}
        autoPlay
      />
    </div>
  );
};

const styles = {
  video: {
    paddingTop: "0 !important",
    right: "10px",
  },
  btnCerrar: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },

  container: {
    position: "absolute",
    top: "25%",
    left: "15%",

    width: "65%",
    height: "50vh",

    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
};
